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
