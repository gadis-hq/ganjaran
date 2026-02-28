import { CONFIG } from "./config.js";

const data = JSON.parse(localStorage.getItem("winnerData"));

const nameEl = document.getElementById("winnerName");
const statusEl = document.getElementById("statusMessage");
const counterEl = document.getElementById("scanCount");

// 🎙 Papar Nama
nameEl.textContent = data?.nama || "PEMENANG";

// 🎇 Fireworks Loop
function launchFireworks(){
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 }
  });
}

// Loop setiap 1.5 saat
let fireInterval = setInterval(launchFireworks, 1500);

// 📡 Live Global Counter dari Apps Script
fetch(CONFIG.WEB_APP + "?mode=todayCount")
.then(res=>res.json())
.then(result=>{
  if(result.success){
    counterEl.textContent = result.total;
  }
});

// 🔊 Bunyi ikut status
if(data?.status === "TELAH_DITEBUS"){

  statusEl.innerHTML =
    "<h2 style='color:red'>⚠ KOD SUDAH DITEBUS</h2>";

  new Audio("assets/alert.mp3").play();

}else{

  statusEl.innerHTML =
    "<h2 style='color:lime'>✔ KOD SAH</h2>";

  new Audio("assets/success.mp3").play();
}

// Auto kembali ke scanner selepas 8 saat
setTimeout(()=>{
  clearInterval(fireInterval);
  window.location.href="semakkod.html";
},8000);
