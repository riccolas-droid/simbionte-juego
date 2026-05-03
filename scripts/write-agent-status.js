import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const role = process.argv[2] || "system";
const status = process.argv[3] || "running";
const message = process.argv.slice(4).join(" ") || "sin mensaje";

const { error } = await supabase.from("agents").insert({
  role,
  status,
  message
});

if (error) {
  console.error(error);
  process.exit(1);
}

console.log(`Agent status saved: ${role} → ${status}`);
