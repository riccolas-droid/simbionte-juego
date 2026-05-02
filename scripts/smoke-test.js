const fs = require("fs");

const required = [
  "index.html",
  "hud.js",
  "package.json",
  "agent/AGENT_RULES.md",
  "agent/NIGHTLY_BRIEF.md",
  "agent/backlog.json",
  "scripts/create-nightly-brief.js"
];

let ok = true;

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Falta archivo requerido: ${file}`);
    ok = false;
  }
}

if (!ok) process.exit(1);

console.log("Smoke test correcto: estructura básica presente.");
