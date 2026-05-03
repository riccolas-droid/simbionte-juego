const fs = require("fs");

const brief = fs.readFileSync("agent/NIGHTLY_BRIEF.md", "utf8");
const rules = fs.readFileSync("agent/AGENT_RULES.md", "utf8");
const backlog = fs.readFileSync("agent/backlog.json", "utf8");

const output = `
# Prompt para el agente nocturno

Lee estas reglas y mejora el HUD del juego con una mejora pequeña y segura.

${rules}

${brief}

Backlog:
${backlog}

Estado actual:
- El juego ya tiene HUD.
- El HUD ya muestra nivel, coherencia, distorsión y líneas falsas.
- Existe un array llamado aiHudLines.
- El sistema dibuja automáticamente las líneas de aiHudLines.
- Tú NO debes dibujar nada directamente.

Memoria operativa:
- No repitas una línea similar a las ya existentes en aiHudLines.
- Si ya existe distorsión, coherencia o líneas falsas, no vuelvas a formular esas métricas.
- Prioriza consejos, estado interpretado o siguiente acción del jugador.

Objetivo:
- Añadir UNA sola línea informativa al HUD.
- La línea debe ayudar al jugador a entender mejor el estado del juego.

Reglas estrictas:
- NO devuelvas JSON objeto.
- NO devuelvas código.
- NO uses ctx.
- NO uses canvas.
- NO uses function.
- NO uses import.
- NO uses export.
- NO uses punto y coma.
- NO uses coordenadas.
- NO expliques nada.
- NO uses markdown.
- Devuelve SOLO un JSON string válido.

Variables permitidas dentro del texto:
- \${state.falseLines}
- \${state.totalLines}
- \${state.coherence}
- \${state.distortion}
- \${state.levelName}

Ejemplo válido:
"Falsas detectadas: \${state.falseLines}/\${state.totalLines}"

Ejemplo válido:
"Coherencia actual: \${state.coherence}%"

Ejemplo inválido:
{
  "file": "hud.js",
  "code": "ctx.fillText(...)"
}

Si dudas, responde exactamente:
"ERROR"
`;

fs.writeFileSync("agent/COMPILED_AGENT_PROMPT.md", output.trim());
console.log("Brief compilado en agent/COMPILED_AGENT_PROMPT.md");
