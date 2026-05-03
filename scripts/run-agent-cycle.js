import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function insertAgent(role, status, message) {
 const { error } = await supabase.from("agents").upsert(
  {
    role,
    status,
    message,
  },
  {
    onConflict: "role",
  }
);

  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`${role} → ${status}: ${message}`);
}

async function main() {
  await insertAgent("designer", "running", "Analizando estado actual y posibles mejoras");
  await insertAgent("designer", "done", "Propone una mejora pequeña del HUD o feedback visual");

  await insertAgent("architect", "running", "Revisando reglas, zona segura y archivo permitido");
  await insertAgent("architect", "done", "Cambio limitado a hud.js dentro de la zona segura");

  await insertAgent("coder", "running", "El workflow genera y aplica el patch de IA");
  await insertAgent("coder", "done", "Patch aplicado al juego si pasó las reglas");

  await insertAgent("tester", "running", "Ejecutando validación automática");
  await insertAgent("tester", "done", "Tests completados por el workflow");

  await insertAgent("memory", "done", "Ciclo registrado en Supabase");
}

main();
