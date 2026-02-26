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
