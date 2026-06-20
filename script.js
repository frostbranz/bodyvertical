const SUPABASE_URL = "https://votybcxzsobtbmmwvpsl.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ym7q_VzRgm0VXNdrhoPWmA_eBzH-9B9";

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`
};

// LOGIN
function login() {
  const code = document.getElementById("adminCode").value;

  if (code === "7432") {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadData();
  } else {
    document.getElementById("loginError").innerText = "Zły kod!";
  }
}

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

  e.target.reset();
  loadData();
});

// WYSZUKIWANIE LIVE
document.getElementById("search").addEventListener("input", (e) => {
  loadData(e.target.value);
});

// LOAD
async function loadData(filter = "") {
  let url = `${SUPABASE_URL}/rest/v1/profiles?select=*`;

  if (filter) {
    url += `&or=(code.ilike.*${filter}*,name.ilike.*${filter}*)`;
  }

  const res = await fetch(url, { headers });
  const data = await res.json();

  render(data);
}

// RENDER
function render(data) {
  const el = document.getElementById("results");

  if (!data.length) {
    el.innerHTML = "<p>Brak wyników</p>";
    return;
  }

  el.innerHTML = data.map(p =>
    `<p><b>${p.code}</b> | ${p.name} | ${p.type}</p>`
  ).join("");
}
