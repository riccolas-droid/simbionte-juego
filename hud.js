const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const state = {
  coherence: 72,
  distortion: 28,
  falseLines: 2,
  totalLines: 7,
  levelName: "Sala I - Punto de fuga"
};

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function drawBackground() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPerspectiveLines() {
  ctx.strokeStyle = "#78ffb0";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(80, canvas.height - 80);
  ctx.lineTo(canvas.width / 2, canvas.height / 3);
  ctx.lineTo(canvas.width - 80, canvas.height - 80);
  ctx.stroke();
}

function drawHud() {
  ctx.fillStyle = "#f3f3f3";
  ctx.font = "28px system-ui";
  ctx.fillText("HUD", 40, 42);

  ctx.font = "26px system-ui";
  ctx.fillText("Simbionte activo", 40, 82);

  ctx.font = "18px system-ui";
  ctx.fillText(`Nivel: ${state.levelName}`, 40, 124);
  ctx.fillText(`Coherencia: ${Math.max(0, Math.round(state.coherence))}%`, 40, 154);
  ctx.fillText(`Distorsión: ${Math.round(state.distortion)}%`, 40, 184);
  ctx.fillText(`Líneas falsas: ${state.falseLines}/${state.totalLines}`, 40, 214);

  // AI_SAFE_ZONE_START
  // El simbionte puede añadir aquí mejoras pequeñas y seguras.
  // Usa ctx y state. No uses import/export. No crees funciones nuevas.

  ctx.font = "16px system-ui";
  ctx.fillStyle = "#8cff9b";
  ctx.fillText("Estado: estable", 40, 246);
  ctx.fillText("Próxima mutación: ciclo nocturno", 40, 272);

  
// === AI PATCH ===
ctx.fillStyle = "#faa"; ctx.font = "12px system-ui"; ctx.fillText(`Falsas: ${state.falseLines}`, canvas.width - 100, 40);
  // AI_SAFE_ZONE_END
}

function draw() {
  drawBackground();
  drawPerspectiveLines();
  drawHud();

  requestAnimationFrame(draw);
}

draw();
