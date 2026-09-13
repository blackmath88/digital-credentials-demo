import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as eddsaRdfc2022CryptoSuite} from '@digitalbazaar/eddsa-rdfc-2022-cryptosuite';
import jsigs from 'jsonld-signatures';
import * as Ed25519Multikey from '@digitalbazaar/ed25519-multikey';
import {createDocumentLoader, readJson} from './dcc-lib.mjs';

const {purposes: {AssertionProofPurpose}} = jsigs;
const credentialPath = new URL('../obv3/dcc-signed-credential.json', import.meta.url);
const issuerPath = new URL('../issuer-did.json', import.meta.url);

const credential = await readJson(credentialPath);
const didDocument = await readJson(issuerPath);
const did = didDocument.id;
const publicKeyDocument = didDocument.verificationMethod?.[0];

if(!did?.startsWith('did:key:')) {
  throw new Error(`Expected did:key issuer, got ${did}`);
}
if(!publicKeyDocument?.publicKeyMultibase) {
  throw new Error('Issuer DID document is missing a Multikey verification method.');
}
if(credential.issuer?.id !== did) {
  throw new Error('Credential issuer does not match the DID controller.');
}

const publicKey = await Ed25519Multikey.from(publicKeyDocument);
const suite = new DataIntegrityProof({cryptosuite: eddsaRdfc2022CryptoSuite});
const result = await jsigs.verify(credential, {
  suite,
  purpose: new AssertionProofPurpose(),
  documentLoader: createDocumentLoader({did, publicKey: await publicKey.export({publicKey: true})})
});

const proof = Array.isArray(credential.proof) ? credential.proof[0] : credential.proof;
const shapeChecks = {
  openBadgeCredential: credential.type?.includes('OpenBadgeCredential'),
  didKeyIssuer: credential.issuer?.id?.startsWith('did:key:'),
  dataIntegrityProof: proof?.type === 'DataIntegrityProof',
  dccCryptosuite: proof?.cryptosuite === 'eddsa-rdfc-2022',
  assertionMethod: proof?.proofPurpose === 'assertionMethod',
  verificationMethodBoundToIssuer: proof?.verificationMethod?.startsWith(`${did}#`)
};

console.log(JSON.stringify({
  verified: result.verified,
  proof: {
    type: proof?.type,
    cryptosuite: proof?.cryptosuite,
    verificationMethod: proof?.verificationMethod
  },
  shapeChecks
}, null, 2));

if(!result.verified || Object.values(shapeChecks).some(value => value !== true)) {
  if(result.error) console.error(result.error);
  process.exitCode = 1;
}
