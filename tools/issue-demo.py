#!/usr/bin/env python3
"""Issue an Open Badges 3.0 demo credential as an RS256 VC-JWT.

The private key is intentionally supplied at runtime and must never be committed.
Requires: pip install cryptography
"""

import argparse
import base64
import json
from pathlib import Path

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def public_jwk(private_key, kid: str) -> dict:
    numbers = private_key.public_key().public_numbers()
    n = numbers.n.to_bytes((numbers.n.bit_length() + 7) // 8, "big")
    e = numbers.e.to_bytes((numbers.e.bit_length() + 7) // 8, "big")
    return {
        "kty": "RSA",
        "n": b64url(n),
        "e": b64url(e),
        "alg": "RS256",
        "use": "sig",
        "kid": kid,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--private-key", required=True, type=Path)
    parser.add_argument("--payload", default=Path("obv3/credential-jwt-payload.json"), type=Path)
    parser.add_argument("--out", default=Path("obv3/credential-jwt.txt"), type=Path)
    parser.add_argument("--issuer-out", type=Path, help="Optional path for a public issuer profile JSON")
    parser.add_argument("--kid", default="demo-rs256-local")
    args = parser.parse_args()

    private_key = serialization.load_pem_private_key(args.private_key.read_bytes(), password=None)
    if not isinstance(private_key, rsa.RSAPrivateKey):
        raise SystemExit("Private key must be RSA for this RS256 demo.")

    payload = json.loads(args.payload.read_text(encoding="utf-8"))
    jwk = public_jwk(private_key, args.kid)
    header = {
        "alg": "RS256",
        "typ": "JWT",
        "jwk": {"kty": jwk["kty"], "n": jwk["n"], "e": jwk["e"]},
        "kid": jwk["kid"],
    }

    header_part = b64url(json.dumps(header, separators=(",", ":"), ensure_ascii=False).encode())
    payload_part = b64url(json.dumps(payload, separators=(",", ":"), ensure_ascii=False).encode())
    signing_input = f"{header_part}.{payload_part}".encode("ascii")
    signature = private_key.sign(signing_input, padding.PKCS1v15(), hashes.SHA256())
    token = f"{header_part}.{payload_part}.{b64url(signature)}"

    args.out.write_text(token + "\n", encoding="utf-8")
    print(f"Wrote signed credential to {args.out}")

    if args.issuer_out:
        issuer = payload.get("issuer", {})
        profile = {
            **issuer,
            "publicKeyJwk": jwk,
            "trustNotice": "Signature validity and institutional trust are separate checks.",
        }
        args.issuer_out.write_text(json.dumps(profile, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Wrote public issuer profile to {args.issuer_out}")


if __name__ == "__main__":
    main()
