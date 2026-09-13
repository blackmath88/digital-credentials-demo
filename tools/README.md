# Demo issuance tools

Bite 3 proves the cryptographic trust boundary without pretending that Implement Learning Institute or University of Basel has issued the credential.

## 1. Create a local RSA signing key

```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out demo-private.pem
```

`demo-private.pem` is ignored by Git and must stay local.

## 2. Install the one Python dependency

```bash
python3 -m pip install cryptography
```

## 3. Issue a credential

```bash
python3 tools/issue-demo.py \
  --private-key demo-private.pem \
  --payload obv3/credential-jwt-payload.json \
  --out obv3/credential-jwt.txt \
  --issuer-out issuer.local.json \
  --kid demo-rs256-local
```

The script embeds the RSA public JWK in the JWT header, which follows the RS256 path shown in the 1EdTech Open Badges 3.0 implementation guide.

## 4. Verify in the browser

Serve the repo over HTTP:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/verify.html`.

The verifier checks:

- the JWT uses `RS256`;
- the signed bytes verify with the RSA public key;
- the public key in the JWT header matches `issuer.json`;
- `iss` matches `issuer.id`;
- `jti` matches credential `id`;
- `sub` matches `credentialSubject.id`;
- the credential is both `VerifiableCredential` and `OpenBadgeCredential`;
- `nbf` is not in the future.

The **tamper test** changes one signed field in memory while keeping the original signature. Verification must fail.

## Trust boundary

A cryptographically valid signature proves control of the corresponding private key and integrity of the signed bytes. It does not, by itself, prove that the human-readable issuer name is an accredited institution or that another organization endorses the credential.

For a real pilot, the institution would control the issuer domain and key publication / signing process.
