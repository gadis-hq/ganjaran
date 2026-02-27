const WEB_APP = "WEB_APP_URL_PUAN";
const SECRET_KEY = "GADIS_SECRET_KEY";

/* ===========================
   SEMAK KOD
=========================== */

window.semakKod = function(){

const kod = document.getElementById("kodInput")
.value.trim().toUpperCase();

fetch(WEB_APP+"?mode=semak&kod="+kod)
.then(res=>res.json())
.then(data=>{

if(!data.success){
 document.getElementById("result").innerHTML =
 "<b style='color:red'>Kod Tidak Sah</b>";
 return;
}

if(data.status==="TELAH_DITEBUS"){
 document.getElementById("result").innerHTML =
 "<b style='color:green'>TELAH DITEBUS</b>";
 generateQR(kod);
}

if(data.status==="AKTIF_BELUM_DITEBUS"){
 document.getElementById("result").innerHTML =
 "<b style='color:orange'>AKTIF</b>";
 generateQR(kod);
}

});
}

/* ===========================
   GENERATE QR
=========================== */

function generateQR(code){

const token = btoa(code + SECRET_KEY);

const verifyUrl =
`https://gadis-hq.github.io/ganjaran/verify.html?code=${code}&token=${token}`;

QRCode.toCanvas(
document.getElementById("qrCanvas"),
verifyUrl,
{width:150}
);
}

/* ===========================
   PWA INSTALL
=========================== */

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e)=>{
 e.preventDefault();
 deferredPrompt = e;
 document.getElementById('installBtn').style.display='block';
});

document.getElementById('installBtn')
.addEventListener('click', ()=>{
 deferredPrompt.prompt();
 deferredPrompt.userChoice.then(()=>{
  deferredPrompt = null;
 });
});

/* ===========================
   SERVICE WORKER
=========================== */

if('serviceWorker' in navigator){
 navigator.serviceWorker.register('service-worker.js');
}
