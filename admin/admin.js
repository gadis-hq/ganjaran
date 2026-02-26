let lastTebusCount = 0;
let map;
let heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 4.2105, lng: 101.9758 },
  });

  loadHeatmap();
}

async function loadHeatmap() {
  const res = await fetch(APPS_SCRIPT_URL + "?key=" + SECURITY_KEY + "&mode=heatmap");
  const data = await res.json();

  const points = data.map(loc =>
    new google.maps.LatLng(loc.lat, loc.lng)
  );

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: points,
    radius: 35
  });

  heatmap.setMap(map);
}

function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));

  let obj = document.getElementById(id);

  let timer = setInterval(function() {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

const percent = Math.round((data.totalTebus / data.totalSah) * 100);

document.getElementById("progressBar").style.width = percent + "%";
document.getElementById("progressText").innerText = percent + "%";

function eventMode(){
  document.documentElement.requestFullscreen();
  document.body.classList.toggle("event-mode");
}

let osmMap;
let osmHeat;

function initOSM(){
  osmMap = L.map('osmMap').setView([4.2105,101.9758],6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap'
  }).addTo(osmMap);

  loadOSMHeatmap();
}

async function loadOSMHeatmap(){
  const res = await fetch(APPS_SCRIPT_URL + "?mode=heatmap");
  const data = await res.json();

  const heatPoints = data.map(loc => [loc.lat, loc.lng, 0.5]);

  osmHeat = L.heatLayer(heatPoints,{
    radius:25,
    blur:20
  }).addTo(osmMap);

  // Marker bandar
  data.forEach(loc=>{
    L.circleMarker([loc.lat,loc.lng],{
      radius:8,
      color:'#ff69b4'
    }).addTo(osmMap);
  });
}

function switchMap(type){

  document.getElementById("googleMap").style.display="none";
  document.getElementById("osmMap").style.display="none";

  if(type==="google"){
    document.getElementById("googleMap").style.display="block";
    if(!googleMap) initGoogleMap();
  }

  if(type==="osm"){
    document.getElementById("osmMap").style.display="block";
    if(!osmMap) initOSM();
  }
}

const ctx = document.getElementById('liveChart').getContext('2d');

let liveChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Kod Sah',
        data: [],
        borderColor: '#ff69b4',
        backgroundColor: 'rgba(255,105,180,0.08)',
        tension: 0.4,
        fill: false,
        pointRadius: 3
      },
      {
        label: 'Kod Ditebus',
        data: [],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212,175,55,0.08)',
        tension: 0.4,
        fill: false,
        pointRadius: 3
      },
      {
        label: 'Kod Belum Tebus',
        data: [],
        borderColor: '#8a2be2',
        backgroundColor: 'rgba(138,43,226,0.08)',
        tension: 0.4,
        fill: false,
        borderDash: [5,5],
        pointRadius: 3
      }
    ]
  },
  options: {
    responsive: true,
    animation: {
      duration: 700,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: { display: false },
      y: { beginAtZero: true }
    }
  }
});

function updateChartLive(value){

  const time = new Date().toLocaleTimeString();

  liveChart.data.labels.push(time);
  liveChart.data.datasets[0].data.push(value);

  // Hadkan maksimum 15 data supaya graf sentiasa bergerak
  if(liveChart.data.labels.length > 15){
    liveChart.data.labels.shift();
    liveChart.data.datasets[0].data.shift();
  }

  liveChart.update();
}

function updateChartLive(totalSah, totalTebus){

  const totalBelum = totalSah - totalTebus;
  const time = new Date().toLocaleTimeString();

  liveChart.data.labels.push(time);

  liveChart.data.datasets[0].data.push(totalSah);
  liveChart.data.datasets[1].data.push(totalTebus);
  liveChart.data.datasets[2].data.push(totalBelum);

  if(liveChart.data.labels.length > 15){
    liveChart.data.labels.shift();
    liveChart.data.datasets.forEach(ds => ds.data.shift());
  }

  liveChart.update();
}
