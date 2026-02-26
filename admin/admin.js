const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw34iaobuZVWwmJ7vlLqOCKzTedVSgwqcYpyPDZiMYUUUqXTLNAFnX7m9TwzZI7RXYh/exec";
const SECURITY_KEY = "GADIS-HQ-2026-ULTRA";

if(localStorage.getItem("adminAuth") !== "true"){
  window.location.href = "index.html";
}

async function loadAdminData(){
  const response = await fetch(
    APPS_SCRIPT_URL + "?key=" + SECURITY_KEY + "&mode=admin"
  );

  const data = await response.json();

  document.getElementById("totalKod").innerText = data.total;
  document.getElementById("redeemKod").innerText = data.redeem;
  document.getElementById("bandarAktif").innerText = data.bandars;

  renderTable(data.list);
}

function renderTable(list){
  const tbody = document.querySelector("#redeemTable tbody");
  tbody.innerHTML = "";

  list.forEach(item=>{
    tbody.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.kod}</td>
        <td>${item.bandar}</td>
        <td>${item.tarikh}</td>
        <td>
          <button onclick="blockKod('${item.kod}')">Block</button>
        </td>
      </tr>
    `;
  });
}

async function blockKod(kod){
  await fetch(
    APPS_SCRIPT_URL + "?key=" + SECURITY_KEY + "&block=" + kod
  );
  alert("Kod diblock.");
  loadAdminData();
}

setInterval(loadAdminData, 10000);
loadAdminData();
