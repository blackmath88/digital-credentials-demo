import fs from 'node:fs/promises';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as eddsaRdfc2022CryptoSuite} from '@digitalbazaar/eddsa-rdfc-2022-cryptosuite';
import jsigs from 'jsonld-signatures';
import {
  createDocumentLoader,
  didDocument,
  generateDidKey,
  publicMaterial,
  readJson,
  writeJson
} from './dcc-lib.mjs';

const {purposes: {AssertionProofPurpose}} = jsigs;
const templatePath = new URL('../obv3/dcc-credential-template.json', import.meta.url);
const privateKeyPath = new URL('../.keys/dcc-demo-ed25519.json', import.meta.url);
const publicDidPath = new URL('../issuer-did.json', import.meta.url);
const outputPath = new URL('../obv3/dcc-signed-credential.json', import.meta.url);

const template = await readJson(templatePath);
const {did, keyPair} = await generateDidKey();
const publicKey = await publicMaterial(keyPair);
const privateKey = await keyPair.export({publicKey: true, secretKey: true});

await fs.mkdir(new URL('../.keys/', import.meta.url), {recursive: true});
await writeJson(privateKeyPath, privateKey);
await writeJson(publicDidPath, didDocument({did, publicKey}));

const credential = structuredClone(template);
credential.issuer.id = did;

const suite = new DataIntegrityProof({
  signer: keyPair.signer(),
  cryptosuite: eddsaRdfc2022CryptoSuite
});

const signedCredential = await jsigs.sign(credential, {
  suite,
  purpose: new AssertionProofPurpose(),
  documentLoader: createDocumentLoader({did, publicKey})
});

await writeJson(outputPath, signedCredential);

console.log(`Issued demo credential as ${did}`);
console.log(`Proof: ${signedCredential.proof?.type} / ${signedCredential.proof?.cryptosuite}`);
console.log('Private key: .keys/dcc-demo-ed25519.json (gitignored)');
console.log('Public DID document: issuer-did.json');
console.log('Credential: obv3/dcc-signed-credential.json');
