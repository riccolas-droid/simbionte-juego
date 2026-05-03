const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

ctx.fillStyle = "#111";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#f3f3f3";
ctx.font = "28px system-ui";
ctx.fillText("Simbionte activo", 40, 70);

ctx.strokeStyle = "#78ffb0";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(80, canvas.height - 80);
ctx.lineTo(canvas.width / 2, canvas.height / 3);
ctx.lineTo(canvas.width - 80, canvas.height - 80);
ctx.stroke();

// === AI PATCH Sun May  3 01:40:51 UTC 2026 ===
export function drawHud(ctx, state) {
  const { levelName, coherence, distortion, falseLines, totalLines } = state;

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
  ctx.fillText(`Líneas falsas detectadas: ${falseLines} (${totalLines>0?Math.round(falseLines/totalLines*100):0}%)`, 38, 152);

  ctx.restore();
}
