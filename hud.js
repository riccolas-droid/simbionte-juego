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

// === AI PATCH Sun May  3 02:07:45 UTC 2026 ===
ctx.fillText("HUD", 38, 30);

// AI_SAFE_ZONE_START
// El simbionte puede añadir aquí mejoras pequeñas y seguras.
// === AI PATCH ===
ctx.fillText(`Coherencia: ${Math.max(0, Math.round(coherence))}%`, 38, 104);
// AI_SAFE_ZONE_END
