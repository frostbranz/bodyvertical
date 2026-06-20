import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ======================
   SUPABASE CONFIG
====================== */
const SUPABASE_URL = "https://votybcxzsobtbmmwvpsl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Ym7q_VzRgm0VXNdrhoPWmA_eBzH-9B9";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ======================
   ADMIN LOGIN
====================== */
const ADMIN_CODE = "7432";

const loginPanel = document.getElementById("loginPanel");
const app = document.getElementById("app");

document.getElementById("loginBtn").addEventListener("click", () => {
  const val = document.getElementById("adminCode").value;

  if (val === ADMIN_CODE) {
    loginPanel.classList.add("hidden");
    app.classList.remove("hidden");
  } else {
    document.getElementById("loginMsg").innerText = "Wrong code";
  }
});

/* ======================
   SEARCH
====================== */
document.getElementById("searchBtn").addEventListener("click", async () => {
  const value = document.getElementById("searchInput").value;
  const out = document.getElementById("results");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`code.ilike.%${value}%,name.ilike.%${value}%`);

  if (error) {
    out.innerHTML = "Error";
    return;
  }

  if (!data.length) {
    out.innerHTML = "No results";
    return;
  }

  out.innerHTML = data.map(x => `
    <div style="margin-top:10px; padding:10px; background:#0b0f14; border-radius:10px;">
      <b>${x.name}</b><br/>
      ${x.code} / ${x.type}
    </div>
  `).join("");
});

/* ======================
   ADMIN ADD
====================== */
document.getElementById("addBtn").addEventListener("click", async () => {
  const code = document.getElementById("code").value;
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;

  const msg = document.getElementById("adminMsg");

  const { error } = await supabase
    .from("profiles")
    .insert([{ code, name, type }]);

  msg.innerText = error ? "Error adding" : "Added successfully";
});
