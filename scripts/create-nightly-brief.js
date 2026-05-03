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
- NO modifiques index.html.
- Solo puedes modificar hud.js.
- NO crees funciones nuevas.
- NO uses export.
- El código debe estar pensado para insertarse dentro de la zona AI_SAFE_ZONE de hud.js.
- Dentro de AI_SAFE_ZONE solo puedes usar: ctx, state, canvas.

- No uses variables sueltas como falseLines, coherence o distortion.
- Usa siempre state.falseLines, state.coherence, state.distortion.
- No dibujes fondos ni rectángulos dentro de AI_SAFE_ZONE.
- Solo añade texto o indicadores pequeños.

- No uses import ni export.
- No reemplaces funciones existentes.
- NO reemplaces el archivo completo.
- Solo puedes añadir 1 o 2 líneas simples al código existente.
- La mejora debe ser pequeña y segura.
- No inventes archivos nuevos.
- El código debe ser directamente insertable.
- Si dudas, responde ERROR.

RESPONDE SOLO EN JSON VÁLIDO CON ESTE FORMATO EXACTO:

{
  "file": "hud.js",
  "description": "qué mejora haces",
  "code": "código exacto a insertar sin markdown"
}

IMPORTANTE:
- NO escribas texto fuera del JSON
- NO expliques nada fuera del JSON
- NO uses bloques de código
- SOLO devuelve JSON válido
- NO uses import
- NO uses export

Si no puedes cumplir el formato, responde exactamente:

{
  "file": "",
  "description": "ERROR",
  "code": ""
}
`;

fs.writeFileSync("agent/COMPILED_AGENT_PROMPT.md", output.trim());
console.log("Brief compilado en agent/COMPILED_AGENT_PROMPT.md");
