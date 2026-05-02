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
