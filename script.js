const SUPABASE_URL = "https://votybcxzsobtbmmwvpsl.supabase.co";
const SUPABASE_KEY = "WKLEJ_TUTAJ_ANON_KEY";

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`
};

// DODAWANIE
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("code").value;
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;

  await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
    method: "POST",
    headers,
    body: JSON.stringify([{ code, name, type }])
  });

  alert("Dodano!");
});

// WYSZUKIWANIE
async function search() {
  const q = document.getElementById("search").value;

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?or=(code.ilike.*${q}*,name.ilike.*${q}*)`,
    { headers }
  );

  const data = await res.json();

  document.getElementById("results").innerHTML =
    data.map(p => `<p>${p.code} | ${p.name} | ${p.type}</p>`).join("");
}
