const enc = new TextEncoder();

function b64urlToBytes(input) {
  const pad = '='.repeat((4 - input.length % 4) % 4);
  const base64 = (input + pad).replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

function decodeJson(segment) {
  return JSON.parse(new TextDecoder().decode(b64urlToBytes(segment)));
}

function setSignal(id, state, title, detail) {
  const el = document.getElementById(id);
  el.className = `signal ${state}`;
  el.querySelector('strong').textContent = title;
  el.querySelector('span').textContent = detail;
}

function equalJwk(a, b) {
  return a && b && a.kty === b.kty && a.n === b.n && a.e === b.e;
}

async function loadMaterial() {
  const [tokenRes, issuerRes] = await Promise.all([
    fetch('./obv3/credential-jwt.txt', { cache: 'no-store' }),
    fetch('./issuer.json', { cache: 'no-store' })
  ]);
  if (!tokenRes.ok || !issuerRes.ok) throw new Error('Could not load credential material. Serve the repo over HTTP, not file://.');
  return {
    token: (await tokenRes.text()).trim(),
    issuer: await issuerRes.json()
  };
}

async function verifyToken(token, issuer, tamper = false) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Credential is not a compact JWT.');
  const [headerPart, payloadPart, signaturePart] = parts;
  const header = decodeJson(headerPart);
  const payload = decodeJson(payloadPart);

  document.getElementById('summary').innerHTML = `<strong>${payload.credentialSubject?.achievement?.name ?? 'Credential'}</strong><br>${payload.credentialSubject?.identifier?.[0]?.identityHash ?? 'Unknown recipient'}<br><br><span style="opacity:.7">Signed by ${payload.issuer?.name ?? payload.iss}</span>`;
  document.getElementById('credentialId').textContent = payload.id ?? payload.jti ?? '';

  const structureOk = header.alg === 'RS256' &&
    Array.isArray(payload.type) && payload.type.includes('OpenBadgeCredential') && payload.type.includes('VerifiableCredential') &&
    payload.issuer?.id === payload.iss && payload.id === payload.jti &&
    payload.credentialSubject?.id === payload.sub &&
    Number.isFinite(payload.nbf) && payload.nbf <= Math.floor(Date.now() / 1000);

  setSignal(
    'structureSignal',
    structureOk ? 'good' : 'bad',
    structureOk ? 'Credential structure consistent' : 'Credential structure failed checks',
    structureOk ? 'Open Badges / VC type, issuer, IDs, subject and not-before time are internally consistent.' : 'One or more structural invariants are invalid.'
  );

  const issuerKeyOk = equalJwk(header.jwk, issuer.publicKeyJwk) && header.kid === issuer.publicKeyJwk.kid;
  setSignal(
    'issuerSignal',
    issuerKeyOk ? 'good' : 'bad',
    issuerKeyOk ? 'Demo issuer key matches' : 'Issuer key mismatch',
    issuerKeyOk ? `Public key ${header.kid} matches issuer.json.` : 'The credential header does not match the public key declared by the demo issuer.'
  );

  const publicKey = await crypto.subtle.importKey(
    'jwk',
    { kty: header.jwk.kty, n: header.jwk.n, e: header.jwk.e, alg: 'RS256', ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );

  let signedInput = `${headerPart}.${payloadPart}`;
  if (tamper) {
    const changed = { ...payload, name: `${payload.name} [TAMPERED]` };
    const changedBytes = enc.encode(JSON.stringify(changed));
    const changedPart = btoa(String.fromCharCode(...changedBytes)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    signedInput = `${headerPart}.${changedPart}`;
  }

  const signatureOk = await crypto.subtle.verify(
    { name: 'RSASSA-PKCS1-v1_5' },
    publicKey,
    b64urlToBytes(signaturePart),
    enc.encode(signedInput)
  );

  setSignal(
    'signatureSignal',
    signatureOk ? 'good' : 'bad',
    signatureOk ? 'Signature valid' : (tamper ? 'Tamper detected' : 'Signature invalid'),
    signatureOk
      ? 'The exact signed header and payload verify with the published RSA public key.'
      : (tamper ? 'A single in-memory change invalidated the original signature, as expected.' : 'The signed bytes do not verify with the published public key.')
  );

  return { signatureOk, structureOk, issuerKeyOk };
}

async function run(tamper = false) {
  try {
    const material = await loadMaterial();
    await verifyToken(material.token, material.issuer, tamper);
  } catch (error) {
    setSignal('signatureSignal', 'bad', 'Verification error', error.message);
    setSignal('structureSignal', 'bad', 'Could not inspect structure', 'Serve this repository with a local HTTP server and try again.');
    setSignal('issuerSignal', 'bad', 'Could not inspect issuer', 'issuer.json could not be loaded or parsed.');
  }
}

document.getElementById('verifyButton').addEventListener('click', () => run(false));
document.getElementById('tamperButton').addEventListener('click', () => run(true));
run(false);
