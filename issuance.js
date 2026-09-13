/**
 * Bite 4 — organiser issuance model.
 *
 * A pure, dependency-free ES module: demo fixtures, participant parsing,
 * Open Badges 3.0 mapping and deterministic local demo issuance.
 *
 * Deliberately absent: network calls, storage, accounts, email delivery and
 * signing. Nothing here claims institutional issuing authority.
 */

export const DEMO_ISSUER = {
  id: "https://example.invalid/issuers/digital-credentials-demo",
  name: "Digital Credentials Demo Issuer",
  kind: "prototype-demo-issuer",
  notice:
    "Prototype issuer. Records created here are demo issuances and are not signed by, or on behalf of, any institution."
};

export const CONTEXTS = [
  "https://www.w3.org/ns/credentials/v2",
  "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
];

/** Default training, taken from the existing Change Management Training fixture. */
export const DEMO_TRAINING = {
  title: "Change Management Training",
  issuer: "Implement Learning Institute",
  date: "2025-08-26",
  duration: "8 hours",
  location: "Zürich",
  description:
    "An eight-hour training in practical change management, combining core models, communication, resistance and applied exercises."
};

/** Default credential content for that training. */
export const DEMO_CONTENT = {
  competencies: [
    "Role and responsibilities of a Change Agent",
    "Dimensions of change communication",
    "Levels of resistance (Maurer)",
    "Change curve (Kübler-Ross)",
    "Adoption model (Rogers)",
    "Feedback: the 4Cs",
    "Practical application of change-management tools"
  ],
  criteria:
    "Completion of the eight-hour Change Management Training, covering the role of a Change Agent, change communication, resistance, the Kübler-Ross and Rogers models, feedback and the practical application of change-management tools.",
  signatories: ["Denise Pellet", "Emilie Lara Schölly"],
  brandName: "Implement Learning Institute"
};

export const DEMO_PARTICIPANTS_CSV = `name,email
Achim Imboden,achim@example.org
Anna Keller,anna@example.org
Jonas Frei,jonas@example.org
Miriam Vogt,miriam@example.org
Luca Meier,luca@example.org`;

const EMAIL_PATTERN = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;

/* ------------------------------------------------------------------ *
 * Participant list parsing
 * ------------------------------------------------------------------ */

function splitLine(line) {
  const delimiter = line.includes(",")
    ? ","
    : line.includes(";")
      ? ";"
      : line.includes("\t")
        ? "\t"
        : ",";
  const cells = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (char === delimiter && !quoted) {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function isHeaderRow(cells) {
  return /^names?$/i.test(cells[0] || "") && /^e[-\s]?mail(\s?address)?$/i.test(cells[1] || "");
}

/**
 * Parse a pasted `name,email` list.
 * Returns every row, valid or not, so the organiser can see what failed and why.
 */
export function parseParticipants(input) {
  const rows = [];
  const seenEmails = new Set();
  let headerSkipped = false;
  let firstDataRow = true;

  String(input || "")
    .split(/\r?\n/)
    .forEach((rawLine, lineIndex) => {
      const line = rawLine.trim();
      if (!line) return;
      const cells = splitLine(line);
      if (firstDataRow && !headerSkipped && isHeaderRow(cells)) {
        headerSkipped = true;
        firstDataRow = false;
        return;
      }
      firstDataRow = false;

      const name = cells[0] || "";
      const email = (cells[1] || "").toLowerCase();
      const issues = [];

      if (!name) issues.push("missing name");
      if (!email) issues.push("missing email");
      else if (!EMAIL_PATTERN.test(email)) issues.push("email not parseable");
      else if (seenEmails.has(email)) issues.push("duplicate email");

      if (email && EMAIL_PATTERN.test(email)) seenEmails.add(email);

      rows.push({
        line: lineIndex + 1,
        raw: line,
        name,
        email,
        valid: issues.length === 0,
        issues
      });
    });

  const valid = rows.filter((row) => row.valid);
  return {
    rows,
    valid,
    validCount: valid.length,
    invalidCount: rows.length - valid.length,
    total: rows.length,
    headerDetected: headerSkipped
  };
}

/* ------------------------------------------------------------------ *
 * Deterministic identifiers
 * ------------------------------------------------------------------ */

function fallbackDigest(seed) {
  // FNV-1a, repeated with a salt, used only where Web Crypto is unavailable
  // (for example when the page is opened directly from the file system).
  const bytes = new Uint8Array(16);
  for (let block = 0; block < 4; block += 1) {
    let hash = 0x811c9dc5;
    const text = `${block}:${seed}`;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    bytes[block * 4] = (hash >>> 24) & 0xff;
    bytes[block * 4 + 1] = (hash >>> 16) & 0xff;
    bytes[block * 4 + 2] = (hash >>> 8) & 0xff;
    bytes[block * 4 + 3] = hash & 0xff;
  }
  return bytes;
}

async function digest(seed) {
  if (globalThis.crypto?.subtle) {
    const data = new TextEncoder().encode(seed);
    const hash = await globalThis.crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hash);
  }
  return fallbackDigest(seed);
}

function toHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * A deterministic UUID (RFC 9562 version 8, custom construction) derived from
 * the seed. The same training + participant always yields the same credential
 * id, so the demo batch is reproducible.
 */
export async function deterministicUuid(seed) {
  const bytes = (await digest(seed)).slice(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x80;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = toHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function initials(value) {
  const parts = String(value || "")
    .split(/\s+/)
    .filter(Boolean);
  const letters = parts.map((part) => part[0]).join("");
  return (letters || "DC").slice(0, 3).toUpperCase();
}

export function achievementId(training) {
  return `https://example.invalid/achievements/${slugify(training.title) || "achievement"}`;
}

/** Issuance time is derived from the training date so demo batches stay reproducible. */
export function issuanceTimestamp(training) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(training.date || "") ? training.date : "1970-01-01";
  return `${date}T00:00:00Z`;
}

export function credentialUrl(uuid) {
  return `https://credentials.example.invalid/c/${uuid}`;
}

/* ------------------------------------------------------------------ *
 * Open Badges 3.0 mapping
 * ------------------------------------------------------------------ */

/**
 * Map one participant to an unsigned Open Badges 3.0 `OpenBadgeCredential`.
 * The shape mirrors `obv3/dcc-credential-template.json`, so a record from this
 * workflow can be handed to the Bite 3.1 signing path unchanged.
 */
export function buildOpenBadgeRecord({ training, content, participant, uuid, issuedAt }) {
  return {
    "@context": [...CONTEXTS],
    id: `urn:uuid:${uuid}`,
    type: ["VerifiableCredential", "OpenBadgeCredential"],
    issuer: {
      id: DEMO_ISSUER.id,
      type: ["Profile"],
      name: DEMO_ISSUER.name
    },
    validFrom: issuedAt,
    name: training.title,
    description: `Demo credential representing ${training.title}${
      training.duration ? ` (${training.duration})` : ""
    }${training.location ? ` in ${training.location}` : ""}. Issued by a prototype demo issuer, not by ${
      content.brandName || training.issuer
    }.`,
    credentialSubject: {
      type: ["AchievementSubject"],
      name: participant.name,
      identifier: [
        {
          type: "IdentityObject",
          identityHash: participant.email,
          identityType: "emailAddress",
          hashed: false,
          salt: "not-used-demo"
        }
      ],
      achievement: {
        id: achievementId(training),
        type: ["Achievement"],
        achievementType: "Course",
        name: training.title,
        description: training.description,
        criteria: { narrative: content.criteria },
        tag: [...content.competencies]
      }
    }
  };
}

/** The fields the public participant page would render for this credential. */
export function publicPageFields({ training, content, participant, record }) {
  return [
    ["Achievement", training.title],
    ["Recipient", participant.name],
    ["Named issuer on certificate", content.brandName || training.issuer],
    ["Issued", training.date],
    ["Duration", training.duration],
    ["Location", training.location],
    ["Competencies listed", String(content.competencies.length)],
    ["Signatories", content.signatories.length ? content.signatories.join(", ") : "—"],
    ["Credential id", record.id],
    ["Machine-readable record", "Open Badges 3.0 OpenBadgeCredential"],
    ["Proof", "None — demo issuance, not institutionally signed"]
  ];
}

/* ------------------------------------------------------------------ *
 * Issuance
 * ------------------------------------------------------------------ */

/** One issued demo credential. */
function issuanceRecord({ training, content, participant, uuid, issuedAt, batchId, index }) {
  const record = buildOpenBadgeRecord({ training, content, participant, uuid, issuedAt });
  return {
    localCredentialId: `DEMO-${initials(training.title)}-${issuedAt.slice(0, 4)}-${String(index + 1).padStart(3, "0")}`,
    credentialUuid: uuid,
    batchId,
    recipient: { name: participant.name, email: participant.email },
    achievement: {
      name: training.title,
      description: training.description,
      criteria: content.criteria,
      competencies: [...content.competencies]
    },
    issuer: {
      name: DEMO_ISSUER.name,
      id: DEMO_ISSUER.id,
      kind: DEMO_ISSUER.kind,
      namedOnCertificate: content.brandName || training.issuer,
      institutionallySigned: false
    },
    issuedAt,
    status: "demo-issued",
    proofStatus: "unsigned — no institutional signature",
    delivery: { status: "link ready", channel: "manual handoff (no email in this bite)" },
    credentialUrl: credentialUrl(uuid),
    machineReadableRecord: record
  };
}

/**
 * Issue a batch locally. Deterministic: the same training, content and
 * participant list always produce the same ids and the same records.
 */
export async function issueBatch({ training, content, participants }) {
  const issuedAt = issuanceTimestamp(training);
  const batchSeed = [
    slugify(training.title),
    training.date,
    slugify(content.brandName || training.issuer),
    participants.map((participant) => participant.email).join("|")
  ].join("::");
  const batchId = (await deterministicUuid(`batch::${batchSeed}`)).slice(0, 8);

  const records = [];
  for (const [index, participant] of participants.entries()) {
    const uuid = await deterministicUuid(
      `credential::${slugify(training.title)}::${training.date}::${participant.email}`
    );
    records.push(
      issuanceRecord({ training, content, participant, uuid, issuedAt, batchId, index })
    );
  }

  return {
    batchId,
    issuedAt,
    issuerKind: DEMO_ISSUER.kind,
    trustNotice: DEMO_ISSUER.notice,
    count: records.length,
    records
  };
}

/**
 * Export one record in the input shape used by `tools/issue-dcc.mjs`, so the
 * Bite 3.1 did:key / eddsa-rdfc-2022 path can sign it locally without edits.
 */
export function asDccTemplate(record) {
  const template = structuredClone(record.machineReadableRecord);
  template["@context"] = [...CONTEXTS, "https://w3id.org/security/data-integrity/v2"];
  template.issuer = {
    id: "did:key:REPLACED_AT_ISSUE_TIME",
    type: ["Profile"],
    name: DEMO_ISSUER.name
  };
  return template;
}
