const data = JSON.parse(localStorage.getItem("winnerData"));

const nameEl = document.getElementById("winnerName");
const statusEl = document.getElementById("statusMessage");
const counterEl = document.getElementById("scanCount");

// 🎙 Papar nama besar
if(data && data.nama){
  nameEl.textContent = data.nama;
}else{
  nameEl.textContent = "PEMENANG";
}

// 📊 Live Counter
let today = new Date().toDateString();
let storedDate = localStorage.getItem("scanDate");

if(storedDate !== today){
  localStorage.setItem("scanDate", today);
  localStorage.setItem("scanCounter", 0);
}

let count = parseInt(localStorage.getItem("scanCounter")) || 0;
count++;
localStorage.setItem("scanCounter", count);

counterEl.textContent = count;

// 🎆 Confetti
confetti({
  particleCount: 150,
  spread: 90,
  origin: { y: 0.6 }
});

// 🔊 Bunyi ikut status
if(data.status === "TELAH_DITEBUS"){
  statusEl.innerHTML =
    "<h2 style='color:red'>⚠ KOD SUDAH DITEBUS</h2>";

  const audio = new Audio("assets/alert.mp3");
  audio.play();

}else{

  statusEl.innerHTML =
    "<h2 style='color:lime'>✔ KOD SAH</h2>";

  const audio = new Audio("assets/success.mp3");
  audio.play();
}

// Auto kembali semula selepas 6 saat
setTimeout(()=>{
  window.location.href="semakkod.html";
},6000);

document.addEventListener('DOMContentLoaded', ()=>{
    const stats = document.getElementById('stats-content');
    stats.innerHTML = `<p>Jumlah Kod Sah:120</p><p>Jumlah Kod Telah Ditebus:85</p><p>Jumlah Kod Belum Ditebus:35</p>`;

    const top5List = document.getElementById('top5-list');
    ['Kuala Lumpur','Johor Bahru','Penang','Ipoh','Kota Bharu'].forEach(b=>{ const li=document.createElement('li'); li.innerText=b; top5List.appendChild(li); });

    document.getElementById('heatmap-map').innerHTML='<p style="text-align:center; padding-top:120px;">[Heatmap Bandar]</p>';
    document.getElementById('led-display').innerHTML='<p style="text-align:center;">Animasi LED aktif</p>';
});

function triggerConfetti(){ confetti({particleCount:120,spread:70,origin:{y:0.6},colors:CONFIG.CONFETTI_COLORS}); }
