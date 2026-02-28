let html5QrCode;
let currentCameraId = null;

/* ================================
   SEMAK KOD MANUAL
================================ */
async function semakKod() {
    const kod = document.getElementById("kodInput").value.trim();
    const resultBox = document.getElementById("result");
    const btnSijil = document.getElementById("btnSijil");

    if (!kod) {
        resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
        btnSijil.style.display = "none";
        return;
    }

    resultBox.innerHTML = "⏳ Sedang semak...";
    btnSijil.style.display = "none";

    try {
        const response = await fetch(CONFIG.API_URL + "?kod=" + encodeURIComponent(kod));
        const data = await response.json();

        if (data.kod_siri_status.includes("✅")) {
            triggerConfetti();
        }

        // Badge warna
        let badgeColor = '#dc3545'; // default merah
        if(data.status_penebusan === "TELAH DITEBUS") badgeColor = '#d4af37';
        else if(data.status_penebusan === "BELUM DITEBUS") badgeColor = '#28a745';

        resultBox.innerHTML = `
            <div class="result-card" style="position:relative;">
              <div class="watermark">GADIS QS HQ</div>
              <span class="btn-premium" style="background-color:${badgeColor}; padding:5px 10px; border-radius:5px;">
                ${data.kod_siri_status}
              </span>
              <p><strong>Nama:</strong> ${data.nama}</p>
              <p><strong>Hadiah:</strong> ${data.hadiah}</p>
              <p><strong>Status Kod:</strong> ${data.status_kod}</p>
              <p>Pembelian Produk: ${data.pembelian_produk}</p>
              <p><strong>Harga:</strong> ${data.harga}</p>
              <p><strong>No. Telefon:</strong> ${data.no_telefon}</p>
              <p><strong>No. IC:</strong> ${data.no_ic}</p>
              <p><strong>Status Penebusan:</strong> ${data.status_penebusan}</p>
              <p><strong>Disahkan Oleh:</strong> ${data.disahkan_oleh}</p>
              <p><strong>Bandar / Negeri:</strong> ${data.bandar_negeri}</p>
            </div>
        `;

        if(data.sijil_url && data.sijil_url !== "") {
            btnSijil.href = data.sijil_url;
            btnSijil.style.display = "inline-block";
        } else {
            btnSijil.style.display = "none";
        }

    } catch (error) {
        resultBox.innerHTML = "<span style='color:red;'>Ralat sambungan server.</span>";
        btnSijil.style.display = "none";
    }
}

/* ================================
   QR SCANNER
================================ */
window.startScanner = function(){

  const reader = document.getElementById("qr-reader");
  const successBox = document.getElementById("scan-success");

  reader.style.display = "block";

  const html5QrCode = new Html5Qrcode("qr-reader");
  const config = { fps: 10, qrbox: 250 };

  html5QrCode.start(
    { facingMode: "environment" },
    config,
    qrMessage => {

      html5QrCode.stop();

      if(qrMessage.startsWith(
        "https://gadis-hq.github.io/ganjaran/verify.html"
      )){

        // 🔊 Beep
        const audio = new Audio("assets/beep.mp3");
        audio.play();

        // 🟢 Glow success
        successBox.style.display = "block";
        reader.style.display = "none";

        // 🎆 Confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // 📺 Auto fullscreen kiosk
        enterKioskMode();

        setTimeout(()=>{
          window.location.href = qrMessage;
        },1800);

      } else {
        alert("QR tidak sah.");
      }

    },
    errorMessage => {}
  ).catch(err=>{
    alert("Tidak dapat akses kamera.");
  });
};

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById("qr-reader").innerHTML = "";
            document.getElementById("qr-reader").style.display = "none";
        });
    }
}

window.enterKioskMode = function(){

  const doc = document.documentElement;

  if(doc.requestFullscreen){
    doc.requestFullscreen();
  } else if(doc.webkitRequestFullscreen){
    doc.webkitRequestFullscreen();
  } else if(doc.msRequestFullscreen){
    doc.msRequestFullscreen();
  }

};

/* ================================
   Confetti
================================ */
function triggerConfetti() {
    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff99cc','#d4af37','#fff0f5']
    });
}
