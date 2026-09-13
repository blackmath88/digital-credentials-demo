const fallbackCredential = {
  id: "DC-2025-001",
  recipient: { name: "Achim Imboden" },
  issuer: { name: "Implement Learning Institute" },
  achievement: {
    name: "Change Management Training",
    description: "An eight-hour training in practical change management, combining core models, communication, resistance and applied exercises.",
    capabilities: [
      "Role and responsibilities of a Change Agent",
      "Meaning of change management for successful transformation",
      "Price of change", "Dimensions of communication", "Levels of resistance (Maurer)", "Change curve (Kübler-Ross)",
      "Adoption model (Rogers)", "Feedback: the 4Cs", "Strategies and key messages for effective change communication",
      "Understanding resistance and strategies to address it", "Practical application of change-management tools", "A holistic approach to change management"
    ]
  },
  issuedOn: "2025-08-26", issuedOnLabel: "26 August 2025", location: "Zürich", duration: "8 hours"
};
const $ = (selector) => document.querySelector(selector);
let credential = fallbackCredential;
let toastTimer;
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2200); }
function credentialUrl() { return window.location.href.split("#")[0]; }
function embedSnippet() { const url = credentialUrl(); return `<a href="${url}" rel="credential" style="font: 600 14px/1.4 system-ui; color: #171714; text-decoration-thickness: 1px; text-underline-offset: 3px;">${credential.achievement.name} · ${credential.issuer.name} · ${credential.issuedOn.slice(0, 4)}</a>`; }
async function copyText(text, confirmation) {
  try { await navigator.clipboard.writeText(text); showToast(confirmation); }
  catch { const input = document.createElement("textarea"); input.value = text; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove(); showToast(confirmation); }
}
function renderCredential(data) {
  credential = data;
  $("#achievement-name").textContent = data.achievement.name; $("#recipient-name").textContent = data.recipient.name; $("#issuer-name").textContent = data.issuer.name;
  $("#location").textContent = data.location; $("#issue-date").textContent = data.issuedOnLabel; $("#issue-date").setAttribute("datetime", data.issuedOn); $("#duration").textContent = data.duration;
  $("#credential-id-short").textContent = data.id; $("#achievement-description").textContent = data.achievement.description; $("#record-recipient").textContent = data.recipient.name;
  $("#record-issuer").textContent = data.issuer.name; $("#record-issued").textContent = data.issuedOnLabel; $("#record-duration").textContent = data.duration; $("#record-id").textContent = data.id;
  const list = $("#capability-list"); list.innerHTML = "";
  data.achievement.capabilities.forEach((capability) => { const item = document.createElement("div"); item.className = "capability"; item.textContent = capability; list.appendChild(item); });
  $("#embed-code").textContent = embedSnippet();
}
function setupQR() {
  const host = $("#qr-code");
  if (window.QRCode) { host.innerHTML = ""; new QRCode(host, { text: credentialUrl(), width: 106, height: 106, correctLevel: QRCode.CorrectLevel.M }); }
  else { host.textContent = "QR"; host.style.display = "grid"; host.style.placeItems = "center"; }
}
function linkedinDetails() { return `${credential.achievement.name}\n${credential.issuer.name}\nIssued ${credential.issuedOnLabel}\nCredential ID: ${credential.id}\nCredential URL: ${credentialUrl()}`; }
function setupActions() {
  $("#copy-link-action").addEventListener("click", () => copyText(credentialUrl(), "Credential link copied."));
  $("#copy-embed-action").addEventListener("click", () => copyText(embedSnippet(), "HTML snippet copied."));
  $("#print-action").addEventListener("click", () => window.print());
  $("#share-action").addEventListener("click", async () => {
    const payload = { title: `${credential.achievement.name} — ${credential.recipient.name}`, text: `${credential.achievement.name} · ${credential.issuer.name}`, url: credentialUrl() };
    if (navigator.share) { try { await navigator.share(payload); } catch (error) { if (error.name !== "AbortError") showToast("Share was not available."); } }
    else { await copyText(credentialUrl(), "Credential link copied for sharing."); }
  });
  $("#linkedin-action").addEventListener("click", async () => { await copyText(linkedinDetails(), "Credential details copied. Opening LinkedIn…"); window.open("https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME", "_blank", "noopener,noreferrer"); });
}
async function boot() {
  try { const response = await fetch("./credential.json", { cache: "no-store" }); if (!response.ok) throw new Error("Credential file unavailable"); renderCredential(await response.json()); }
  catch { renderCredential(fallbackCredential); }
  setupActions(); if (document.readyState === "complete") setupQR(); else window.addEventListener("load", setupQR, { once: true });
}
boot();
