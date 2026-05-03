const fs = require("fs");

const brief = fs.readFileSync("agent/NIGHTLY_BRIEF.md", "utf8");
const rules = fs.readFileSync("agent/AGENT_RULES.md", "utf8");
const backlog = fs.readFileSync("agent/backlog.json", "utf8");

const output = `
# Prompt para el agente nocturno

Lee estas reglas y mejora el juego con un cambio pequeño y verificable.

${rules}

${brief}

Backlog:
${backlog}

Instrucciones:
- Haz solo una mejora.
- No rompas el juego.
- No modifiques archivos fuera de: hud.js, index.html.
- La mejora debe ser pequeña y segura.
- No inventes archivos nuevos.
- El código debe ser directamente insertable (sin markdown, sin \`\`\`).

RESPONDE SOLO EN JSON VÁLIDO CON ESTE FORMATO EXACTO:

{
  "file": "hud.js o index.html",
  "description": "qué mejora haces",
  "code": "código exacto a insertar sin markdown"
}

IMPORTANTE:
- NO escribas texto fuera del JSON
- NO expliques nada fuera del JSON
- NO uses bloques de código (\`\`\`)
- SOLO devuelve JSON válido

Si no puedes cumplir el formato, responde exactamente:

{
  "file": "",
  "description": "ERROR",
  "code": ""
}
`;

fs.writeFileSync("agent/COMPILED_AGENT_PROMPT.md", output.trim());
console.log("Brief compilado en agent/COMPILED_AGENT_PROMPT.md");
