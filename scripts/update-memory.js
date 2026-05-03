import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lastText = fs.existsSync("agent/last_text.txt")
  ? fs.readFileSync("agent/last_text.txt", "utf8").trim()
  : "";

const hud = fs.existsSync("hud.js")
  ? fs.readFileSync("hud.js", "utf8")
  : "";

const stateText = `
Estado actual del sistema:
- Panel Supabase conectado.
- Agentes visibles en tiempo real.
- HUD del juego activo.
- aiHudLines controla las líneas extra del HUD.
- Última línea añadida por IA: ${lastText}

Reglas aprendidas:
- No repetir HUD.
- No repetir métricas ya visibles.
- No usar ctx directamente.
- Añadir solo líneas informativas útiles.
`.trim();

const backlog = {
  applied_last: lastText,
  hud_has_ai_lines: hud.includes("aiHudLines"),
  next_focus: [
    "evitar duplicados semánticos",
    "añadir información útil no repetida",
    "mejorar feedback del jugador"
  ]
};

const { error } = await supabase.from("memory").upsert(
  {
    id: 1,
    state_text: stateText,
    backlog_json: backlog,
    updated_at: new Date().toISOString()
  },
  { onConflict: "id" }
);

if (error) {
  console.error(error);
  process.exit(1);
}

console.log("Memory updated");
