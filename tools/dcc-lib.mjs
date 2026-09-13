import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import jsonld from 'jsonld';
import * as Ed25519Multikey from '@digitalbazaar/ed25519-multikey';

function asPath(file) {
  return file instanceof URL ? fileURLToPath(file) : file;
}

export async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

export async function writeJson(file, value) {
  const target = asPath(file);
  await fs.mkdir(path.dirname(target), {recursive: true});
  await fs.writeFile(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export async function generateDidKey() {
  const generated = await Ed25519Multikey.generate();
  const material = await generated.export({publicKey: true, secretKey: true});
  const fingerprint = material.publicKeyMultibase;
  const did = `did:key:${fingerprint}`;
  const id = `${did}#${fingerprint}`;
  const keyPair = await Ed25519Multikey.from({...material, id, controller: did});
  return {did, id, keyPair};
}

export async function importKeyPair(serialized) {
  return Ed25519Multikey.from(serialized);
}

export async function publicMaterial(keyPair) {
  return keyPair.export({publicKey: true});
}

export function didDocument({did, publicKey}) {
  return {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/multikey/v1'
    ],
    id: did,
    verificationMethod: [publicKey],
    assertionMethod: [publicKey.id]
  };
}

export function createDocumentLoader({did, publicKey}) {
  const controllerDocument = didDocument({did, publicKey});
  const networkLoader = jsonld.documentLoaders.node();

  return async url => {
    if(url === did) {
      return {contextUrl: null, document: controllerDocument, documentUrl: url};
    }
    if(url === publicKey.id) {
      return {contextUrl: null, document: publicKey, documentUrl: url};
    }
    return networkLoader(url);
  };
}
