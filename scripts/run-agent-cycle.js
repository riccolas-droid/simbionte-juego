import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function insertAgent(role, status, message) {
  const { error } = await supabase.from("agents").insert({
    role,
    status,
    message,
  });

  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`${role} → ${status}: ${message}`);
}

async function main() {
  await insertAgent("designer", "running", "Explorando posibles mejoras");
  await insertAgent("designer", "done", "Propone mejorar feedback visual");

  await insertAgent("architect", "running", "Revisando dónde encaja el cambio");
  await insertAgent("architect", "done", "Cambio permitido dentro de hud.js");

  await insertAgent("coder", "running", "Generando patch pequeño");
  await insertAgent("coder", "done", "Patch generado correctamente");

  await insertAgent("tester", "running", "Validando que el juego no rompe");
  await insertAgent("tester", "done", "Validación completada sin errores");

  await insertAgent("memory", "done", "Estado del ciclo guardado");
}

main();
