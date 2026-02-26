const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby77skERInziyInY2vlgrBUcZG-e5IIM4lV4dTGxdvhq_1MgIqAE4CazEm2mivwQbo0/exec";

// =======================
// LIVE STATS
// =======================
async function loadStats(){
  const res = await fetch(APPS_SCRIPT_URL + "?mode=stats");
  const data = await res.json();

  document.getElementById("totalSah").innerText = data.totalSah;
  document.getElementById("totalTebus").innerText = data.totalTebus;

  const totalBelum = data.totalSah - data.totalTebus;
  document.getElementById("totalBelum").innerText = totalBelum;

  updateChartLive(data.totalSah, data.totalTebus);

  if(data.newRedeem){
    playSound();
    showWinner(data.latestWinner);
  }
}

setInterval(loadStats,5000);
loadStats();

// =======================
// CHART (Triple Line)
// =======================
const ctx = document.getElementById('liveChart').getContext('2d');

let liveChart = new Chart(ctx,{
  type:'line',
  data:{
    labels:[],
    datasets:[
      {label:'Kod Sah',data:[],borderColor:'#ff69b4',tension:0.4},
      {label:'Kod Ditebus',data:[],borderColor:'#d4af37',tension:0.4},
      {label:'Belum Tebus',data:[],borderColor:'#8a2be2',borderDash:[5,5],tension:0.4}
    ]
  }
});

function updateChartLive(sah,tebus){
  const belum = sah - tebus;
  const time = new Date().toLocaleTimeString();

  liveChart.data.labels.push(time);
  liveChart.data.datasets[0].data.push(sah);
  liveChart.data.datasets[1].data.push(tebus);
  liveChart.data.datasets[2].data.push(belum);

  if(liveChart.data.labels.length>15){
    liveChart.data.labels.shift();
    liveChart.data.datasets.forEach(d=>d.data.shift());
  }

  liveChart.update();
}

// =======================
// AUDIO & POPUP
// =======================
function playSound(){
  document.getElementById("notifySound").play();
}

function showWinner(name){
  const popup = document.getElementById("winnerPopup");
  popup.innerText = "🏆 Pemenang: " + name;
  popup.style.display="block";

  setTimeout(()=>{
    popup.style.display="none";
  },5000);
}

// =======================
// EVENT MODE
// =======================
function eventMode(){
  document.body.classList.toggle("event-mode");
  document.documentElement.requestFullscreen();
}
