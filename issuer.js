/**
 * Bite 4 — organiser workspace UI.
 *
 * All domain logic lives in ./issuance.js. This file only holds the step state,
 * reads the form, and renders. Nothing is stored or sent anywhere.
 */

import {
  DEMO_TRAINING,
  DEMO_CONTENT,
  DEMO_PARTICIPANTS_CSV,
  DEMO_ISSUER,
  parseParticipants,
  buildOpenBadgeRecord,
  publicPageFields,
  deterministicUuid,
  issuanceTimestamp,
  issueBatch,
  asDccTemplate,
  slugify
} from "./issuance.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const TOTAL_STEPS = 5;

const state = {
  step: 1,
  furthest: 1,
  training: { ...DEMO_TRAINING },
  content: { ...DEMO_CONTENT, competencies: [...DEMO_CONTENT.competencies], signatories: [...DEMO_CONTENT.signatories] },
  csv: DEMO_PARTICIPANTS_CSV,
  parsed: parseParticipants(DEMO_PARTICIPANTS_CSV),
  previewIndex: 0,
  batch: null,
  selectedRecord: 0
};

/* ------------------------------------------------------------------ *
 * Small helpers
 * ------------------------------------------------------------------ */

let toastTimer;
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2000);
}

async function copy(text, confirmation) {
  try {
    await navigator.clipboard.writeText(text);
    toast(confirmation);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    toast(confirmation);
  }
}

const lines = (value) =>
  String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value || "—";
  const [year, month, day] = value.split("-");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

function cell(text, className) {
  const td = document.createElement("td");
  if (className) td.className = className;
  td.textContent = text;
  return td;
}

/* ------------------------------------------------------------------ *
 * Form binding
 * ------------------------------------------------------------------ */

const TRAINING_FIELDS = {
  "t-title": "title",
  "t-issuer": "issuer",
  "t-date": "date",
  "t-duration": "duration",
  "t-location": "location",
  "t-description": "description"
};

function writeFormFromState() {
  Object.entries(TRAINING_FIELDS).forEach(([id, key]) => {
    $(`#${id}`).value = state.training[key] ?? "";
  });
  $("#c-competencies").value = state.content.competencies.join("\n");
  $("#c-criteria").value = state.content.criteria;
  $("#c-signatories").value = state.content.signatories.join("\n");
  $("#c-brand").value = state.content.brandName;
  $("#p-csv").value = state.csv;
}

function readForm() {
  Object.entries(TRAINING_FIELDS).forEach(([id, key]) => {
    state.training[key] = $(`#${id}`).value.trim();
  });
  state.content.competencies = lines($("#c-competencies").value);
  state.content.criteria = $("#c-criteria").value.trim();
  state.content.signatories = lines($("#c-signatories").value);
  state.content.brandName = $("#c-brand").value.trim();
  state.csv = $("#p-csv").value;
  state.parsed = parseParticipants(state.csv);
  if (state.previewIndex >= state.parsed.validCount) state.previewIndex = 0;
}

/* ------------------------------------------------------------------ *
 * Step navigation
 * ------------------------------------------------------------------ */

function stepFromHash() {
  const match = /^#step-([1-5])$/.exec(window.location.hash || "");
  return match ? Number(match[1]) : null;
}

function goToStep(step, { scroll = true } = {}) {
  state.step = Math.min(Math.max(step, 1), TOTAL_STEPS);
  state.furthest = Math.max(state.furthest, state.step);
  // Steps are deep-linkable, so a single screen can be shared or reloaded.
  // replaceState is unavailable on some origins (file://), which must not break navigation.
  try {
    window.history.replaceState(null, "", `#step-${state.step}`);
  } catch {
    /* keep the step change even if the URL cannot be updated */
  }
  render();
  const panel = $(`#step-${state.step}`);
  if (scroll && panel) panel.scrollIntoView({ block: "start", behavior: "smooth" });
}

function renderStepNav() {
  $$("#stepnav button").forEach((button) => {
    const step = Number(button.dataset.goto);
    button.setAttribute("data-state", step < state.furthest ? "done" : "open");
    if (step === state.step) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  for (let step = 1; step <= TOTAL_STEPS; step += 1) {
    $(`#step-${step}`).hidden = step !== state.step;
  }
}

/* ------------------------------------------------------------------ *
 * Step 1–3 rendering
 * ------------------------------------------------------------------ */

function renderTrainingEcho() {
  $("#training-echo").textContent = state.training.title || "Untitled training";
  const count = state.content.competencies.length;
  $("#competency-count").textContent = `${count} ${count === 1 ? "competency" : "competencies"}`;
}

function renderParticipants() {
  const { rows, validCount, invalidCount, headerDetected } = state.parsed;

  $("#readout-valid").querySelector("dd").firstChild.nodeValue = String(validCount);
  const invalidBlock = $("#readout-invalid");
  invalidBlock.querySelector("dd").firstChild.nodeValue = String(invalidCount);
  invalidBlock.className = invalidCount ? "state-warn" : "";

  const stateBlock = $("#readout-state");
  const stateValue = stateBlock.querySelector("dd");
  if (!rows.length) {
    stateValue.firstChild.nodeValue = "Empty";
    stateBlock.className = "";
    $("#readout-state-note").textContent = "Paste a list to begin.";
  } else if (invalidCount) {
    stateValue.firstChild.nodeValue = "Partial";
    stateBlock.className = "state-warn";
    $("#readout-state-note").textContent = `${headerDetected ? "Header row skipped. " : ""}Invalid rows are skipped at issuance.`;
  } else {
    stateValue.firstChild.nodeValue = "Clean";
    stateBlock.className = "state-ok";
    $("#readout-state-note").textContent = headerDetected ? "Header row detected and skipped." : "All rows parsed.";
  }

  const wrap = $("#parsed-table-wrap");
  wrap.innerHTML = "";
  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No rows parsed yet.";
    wrap.appendChild(empty);
  } else {
    const table = document.createElement("table");
    table.innerHTML =
      "<thead><tr><th>Line</th><th>Name</th><th>Email</th><th>State</th></tr></thead>";
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      if (!row.valid) tr.className = "invalid";
      tr.appendChild(cell(String(row.line), "mono"));
      tr.appendChild(cell(row.name || "—"));
      tr.appendChild(cell(row.email || "—", "mono"));
      const stateCell = document.createElement("td");
      const pill = document.createElement("span");
      pill.className = `pill ${row.valid ? "ok" : "warn"}`;
      pill.textContent = row.valid ? "ready" : row.issues.join(" · ");
      stateCell.appendChild(pill);
      tr.appendChild(stateCell);
      body.appendChild(tr);
    });
    table.appendChild(body);
    wrap.appendChild(table);
  }

  $("#participants-status").textContent = rows.length
    ? `${validCount} of ${rows.length} rows ready to issue.`
    : "Nothing parsed yet.";
}

/* ------------------------------------------------------------------ *
 * Step 4 — preview
 * ------------------------------------------------------------------ */

async function renderPreview() {
  const participants = state.parsed.valid;
  const select = $("#participant-select");
  select.innerHTML = "";
  participants.forEach((participant, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = participant.name;
    select.appendChild(option);
  });

  if (!participants.length) {
    select.disabled = true;
    $("#cert-title").textContent = "No participants yet";
    $("#cert-recipient").textContent = "—";
    $("#cert-id").textContent = "—";
    $("#cert-issuer").textContent = "—";
    $("#cert-date").textContent = "—";
    $("#cert-duration").textContent = "—";
    $("#cert-signatories").textContent = "—";
    $("#cert-competencies").textContent = "—";
    $("#public-fields").innerHTML = "";
    $("#record-json").textContent = "Add participants in step 3.";
    $("#record-summary").textContent = "—";
    $("#preview-status").textContent = "No participants to preview.";
    return;
  }

  select.disabled = false;
  const index = Math.min(state.previewIndex, participants.length - 1);
  state.previewIndex = index;
  select.value = String(index);

  const participant = participants[index];
  const issuedAt = issuanceTimestamp(state.training);
  const uuid = await deterministicUuid(
    `credential::${slugify(state.training.title)}::${state.training.date}::${participant.email}`
  );
  const record = buildOpenBadgeRecord({
    training: state.training,
    content: state.content,
    participant,
    uuid,
    issuedAt
  });

  $("#cert-title").textContent = state.training.title || "Untitled training";
  $("#cert-recipient").textContent = participant.name;
  $("#cert-id").textContent = uuid.slice(0, 8);
  $("#cert-issuer").textContent = state.content.brandName || state.training.issuer || "—";
  $("#cert-date").textContent = formatDate(state.training.date);
  $("#cert-duration").textContent = state.training.duration || "—";
  $("#cert-signatories").textContent = state.content.signatories.length
    ? `Signatories on the source certificate: ${state.content.signatories.join(", ")}`
    : "No signatories listed.";
  const competencyCount = state.content.competencies.length;
  $("#cert-competencies").textContent = `${competencyCount} ${competencyCount === 1 ? "competency" : "competencies"}`;

  const fields = publicPageFields({
    training: state.training,
    content: state.content,
    participant,
    record
  });
  const body = $("#public-fields");
  body.innerHTML = "";
  fields.forEach(([label, value]) => {
    const tr = document.createElement("tr");
    tr.appendChild(cell(label));
    tr.appendChild(cell(value || "—"));
    body.appendChild(tr);
  });

  $("#record-summary").textContent = `${record.type.join(" + ")} · unsigned`;
  $("#record-json").textContent = JSON.stringify(record, null, 2);
  $("#preview-status").textContent = `Previewing ${index + 1} of ${participants.length}. Every participant gets the same achievement, a distinct credential id.`;
}

/* ------------------------------------------------------------------ *
 * Step 5 — issuance
 * ------------------------------------------------------------------ */

function renderIssueHeader() {
  const count = state.parsed.validCount;
  const button = $("#issue-button");
  $("#issue-headline").textContent = `Issue ${count} credential${count === 1 ? "" : "s"}`;
  button.textContent = count ? `Issue ${count} credential${count === 1 ? "" : "s"}` : "Issue credentials";
  button.disabled = count === 0;
  $("#issue-subline").textContent = count
    ? `${state.training.title || "Untitled training"} · ${state.content.competencies.length} competencies · ${
        state.parsed.invalidCount
      } row${state.parsed.invalidCount === 1 ? "" : "s"} skipped.`
    : "Add participants first.";
}

function renderIssuedRecord() {
  if (!state.batch || !state.batch.records.length) {
    $("#record-sheet").hidden = true;
    return;
  }
  const index = Math.min(state.selectedRecord, state.batch.records.length - 1);
  const record = state.batch.records[index];
  $("#record-sheet").hidden = false;
  $("#record-sheet-id").textContent = record.localCredentialId;
  $("#issued-record-json").textContent = JSON.stringify(record, null, 2);
  $$("#issued-rows tr").forEach((row, rowIndex) => {
    row.setAttribute("aria-selected", String(rowIndex === index));
  });
}

function renderIssuedTable() {
  const sheet = $("#issued-sheet");
  if (!state.batch) {
    sheet.hidden = true;
    $("#record-sheet").hidden = true;
    $("#clear-issuance").hidden = true;
    $("#issue-status").textContent = "Not issued yet.";
    return;
  }

  sheet.hidden = false;
  $("#clear-issuance").hidden = false;
  $("#batch-label").textContent = `batch ${state.batch.batchId} · ${state.batch.count} records · ${state.batch.issuedAt}`;

  const body = $("#issued-rows");
  body.innerHTML = "";
  state.batch.records.forEach((record, index) => {
    const tr = document.createElement("tr");
    tr.className = "selectable";
    tr.tabIndex = 0;

    const who = document.createElement("td");
    who.innerHTML = "";
    const name = document.createElement("div");
    name.textContent = record.recipient.name;
    const email = document.createElement("div");
    email.className = "mono-cell";
    email.style.color = "var(--muted)";
    email.textContent = record.recipient.email;
    who.append(name, email);
    tr.appendChild(who);

    const id = document.createElement("td");
    const local = document.createElement("div");
    local.className = "mono-cell";
    local.textContent = record.localCredentialId;
    const uuid = document.createElement("div");
    uuid.className = "mono-cell";
    uuid.style.color = "var(--muted)";
    uuid.textContent = record.credentialUuid;
    id.append(local, uuid);
    tr.appendChild(id);

    const delivery = document.createElement("td");
    const deliveryPill = document.createElement("span");
    deliveryPill.className = "pill neutral";
    deliveryPill.textContent = record.delivery.status;
    const deliveryNote = document.createElement("div");
    deliveryNote.className = "note";
    deliveryNote.style.marginTop = "6px";
    deliveryNote.textContent = record.delivery.channel;
    delivery.append(deliveryPill, deliveryNote);
    tr.appendChild(delivery);

    const status = document.createElement("td");
    const statusPill = document.createElement("span");
    statusPill.className = "pill ok";
    statusPill.textContent = record.status;
    const statusNote = document.createElement("div");
    statusNote.className = "note";
    statusNote.style.marginTop = "6px";
    statusNote.textContent = record.proofStatus;
    status.append(statusPill, statusNote);
    tr.appendChild(status);

    const select = () => {
      state.selectedRecord = index;
      renderIssuedRecord();
    };
    tr.addEventListener("click", select);
    tr.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select();
      }
    });
    body.appendChild(tr);
  });

  $("#issue-status").textContent = `${state.batch.count} demo credentials issued locally · batch ${state.batch.batchId} · deterministic, unsigned.`;
  renderIssuedRecord();
}

async function issue() {
  readForm();
  if (!state.parsed.validCount) {
    toast("No valid participants to issue.");
    return;
  }
  state.batch = await issueBatch({
    training: state.training,
    content: state.content,
    participants: state.parsed.valid
  });
  state.selectedRecord = 0;
  renderIssuedTable();
  toast(`${state.batch.count} demo credentials issued.`);
}

/* ------------------------------------------------------------------ *
 * Render + wiring
 * ------------------------------------------------------------------ */

function render() {
  renderStepNav();
  renderTrainingEcho();
  renderParticipants();
  renderIssueHeader();
  if (state.step === 4) renderPreview();
}

function wire() {
  $$("[data-next]").forEach((button) =>
    button.addEventListener("click", () => {
      readForm();
      goToStep(Number(button.dataset.next));
    })
  );

  $$("#stepnav button").forEach((button) =>
    button.addEventListener("click", () => {
      readForm();
      goToStep(Number(button.dataset.goto));
    })
  );

  $$("input, textarea").forEach((field) =>
    field.addEventListener("input", () => {
      readForm();
      renderTrainingEcho();
      renderParticipants();
      renderIssueHeader();
      if (state.step === 4) renderPreview();
    })
  );

  $("[data-action='reset']").addEventListener("click", () => {
    state.training = { ...DEMO_TRAINING };
    state.content = {
      ...DEMO_CONTENT,
      competencies: [...DEMO_CONTENT.competencies],
      signatories: [...DEMO_CONTENT.signatories]
    };
    state.csv = DEMO_PARTICIPANTS_CSV;
    state.batch = null;
    state.previewIndex = 0;
    writeFormFromState();
    readForm();
    renderIssuedTable();
    render();
    toast("Demo data restored.");
  });

  $("[data-action='load-demo-csv']").addEventListener("click", () => {
    $("#p-csv").value = DEMO_PARTICIPANTS_CSV;
    readForm();
    renderParticipants();
    renderIssueHeader();
    toast("5 demo participants loaded.");
  });

  $("#participant-select").addEventListener("change", (event) => {
    state.previewIndex = Number(event.target.value);
    renderPreview();
  });

  $("#prev-participant").addEventListener("click", () => {
    const count = state.parsed.validCount;
    if (!count) return;
    state.previewIndex = (state.previewIndex - 1 + count) % count;
    renderPreview();
  });

  $("#next-participant").addEventListener("click", () => {
    const count = state.parsed.validCount;
    if (!count) return;
    state.previewIndex = (state.previewIndex + 1) % count;
    renderPreview();
  });

  window.addEventListener("hashchange", () => {
    const step = stepFromHash();
    if (step && step !== state.step) goToStep(step, { scroll: false });
  });

  $("#issue-button").addEventListener("click", issue);

  $("#clear-issuance").addEventListener("click", () => {
    state.batch = null;
    renderIssuedTable();
    toast("Batch cleared.");
  });

  $("#copy-record").addEventListener("click", () => {
    if (!state.batch) return;
    copy(JSON.stringify(state.batch.records[state.selectedRecord], null, 2), "Issuance record copied.");
  });

  $("#copy-dcc").addEventListener("click", () => {
    if (!state.batch) return;
    copy(
      JSON.stringify(asDccTemplate(state.batch.records[state.selectedRecord]), null, 2),
      "DCC signing input copied. Save it to obv3/dcc-credential-template.json."
    );
  });
}

function boot() {
  writeFormFromState();
  readForm();
  wire();
  const initial = stepFromHash();
  if (initial) {
    state.step = initial;
    state.furthest = initial;
    // A deep link opens the step, but the page should still read from the top.
    // The browser scrolls to the fragment after load, so undo it then too.
    window.scrollTo(0, 0);
    window.addEventListener("load", () => window.scrollTo(0, 0), { once: true });
  }
  render();
  console.info(`${DEMO_ISSUER.name}: ${DEMO_ISSUER.notice}`);
}

boot();
