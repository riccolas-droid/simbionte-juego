# Prompt para el agente nocturno

Lee estas reglas y mejora el juego con un cambio pequeño y verificable.

export const levels = [
  {
    name: "Sala I - El punto que no existe",
    target: { x: 640, y: 240 },
    lines: [
      { a: { x: 120, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 1160, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 280, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 1000, y: 720 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 240, y: 180 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 1040, y: 180 }, b: { x: 640, y: 240 }, real: true },
      { a: { x: 100, y: 420 }, b: { x: 530, y: 170 }, real: false },
      { a: { x: 1180, y: 420 }, b: { x: 760, y: 150 }, real: false }
    ]
  },
  {
    name: "Sala II - Reflejo contaminado",
    target: { x: 640, y: 260 },
    lines: [
      { a: { x: 80, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 1200, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 380, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 900, y: 720 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 450, y: 120 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 830, y: 120 }, b: { x: 640, y: 260 }, real: true },
      { a: { x: 1020, y: 360 }, b: { x: 770, y: 210 }, real: false },
      { a: { x: 1040, y: 500 }, b: { x: 720, y: 310 }, real: false }
    ]
  }
];


export function drawHud(ctx, state) {
  const { levelName, coherence, distortion, falseLines } = state;

  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = "rgba(0,0,0,0.48)";
  ctx.fillRect(20, 20, 330, 150);

  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.strokeRect(20, 20, 330, 150);

  ctx.fillStyle = "#f3f3f3";
  ctx.font = "16px system-ui";
  ctx.fillText("VISIÓN SIMBIÓTICA", 38, 50);

  ctx.font = "13px system-ui";
  ctx.fillText(levelName, 38, 76);
  ctx.fillText(`Coherencia: ${Math.round(coherence)}%`, 38, 104);
  ctx.fillText(`Distorsión: ${Math.round(distortion)}%`, 38, 128);
  ctx.fillText(`Líneas falsas detectadas: ${falseLines}`, 38, 152);

  ctx.restore();
}


Backlog:
import { levels } from "./levels.js";
import { drawHud } from "./hud.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let currentLevelIndex = 0;
let vanishingPoint = { x: 640, y: 260 };
let dragging = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function getLevel() {
  return levels[currentLevelIndex % levels.length];
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function scoreLevel(level) {
  const d = distance(vanishingPoint, level.target);
  const coherence = Math.max(0, 100 - d / 3);
  const distortion = 100 - coherence;
  return { coherence, distortion };
}

function drawCorridor() {
  const w = canvas.width;
  const h = canvas.height;

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, "#1d1b22");
  gradient.addColorStop(1, "#08080b");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(w * 0.25, h * 0.18, w * 0.5, h * 0.55);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const y = h * 0.55 + i * 28;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + i * 5);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(170, 220, 255, 0.08)";
  ctx.fillRect(w * 0.76, h * 0.24, w * 0.12, h * 0.32);
}

function drawLines(level) {
  for (const line of level.lines) {
    ctx.beginPath();
    ctx.moveTo(line.a.x, line.a.y);
    ctx.lineTo(vanishingPoint.x, vanishingPoint.y);

    ctx.strokeStyle = line.real
      ? "rgba(110,255,170,0.85)"
      : "rgba(255,80,95,0.85)";

    ctx.lineWidth = line.real ? 2 : 3;
    ctx.stroke();
  }
}

function drawVanishingPoint(level) {
  const s = scoreLevel(level);
  const stable = s.coherence > 88;

  ctx.save();
  ctx.translate(vanishingPoint.x, vanishingPoint.y);

  ctx.strokeStyle = stable ? "rgba(230,255,255,1)" : "rgba(255,220,120,1)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, stable ? 15 : 20, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(28, 0);
  ctx.moveTo(0, -28);
  ctx.lineTo(0, 28);
  ctx.stroke();

  ctx.restore();

  if (stable) {
    ctx.fillStyle = "rgba(230,255,255,0.85)";
    ctx.font = "22px system-ui";
    ctx.fillText("COHERENCIA RESTAURADA", vanishingPoint.x - 120, vanishingPoint.y - 45);
  }
}

function loop() {
  const level = getLevel();
  const s = scoreLevel(level);

  drawCorridor();
  drawLines(level);
  drawVanishingPoint(level);

  drawHud(ctx, {
    levelName: level.name,
    coherence: s.coherence,
    distortion: s.distortion,
    falseLines: level.lines.filter(l => !l.real).length
  });

  requestAnimationFrame(loop);
}

canvas.addEventListener("pointerdown", (e) => {
  dragging = true;
  vanishingPoint = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("pointermove", (e) => {
  if (dragging) vanishingPoint = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("pointerup", () => {
  dragging = false;
});

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "n") {
    currentLevelIndex++;
    vanishingPoint = { x: 640, y: 260 };
  }
});

loop();


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