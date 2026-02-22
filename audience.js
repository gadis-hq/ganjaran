document.addEventListener('DOMContentLoaded', ()=>{
    const stats = document.getElementById('stats-content');
    stats.innerHTML = `<p>Jumlah Kod Sah:120</p><p>Jumlah Kod Telah Ditebus:85</p><p>Jumlah Kod Belum Ditebus:35</p>`;

    const top5List = document.getElementById('top5-list');
    ['Kuala Lumpur','Johor Bahru','Penang','Ipoh','Kota Bharu'].forEach(b=>{ const li=document.createElement('li'); li.innerText=b; top5List.appendChild(li); });

    document.getElementById('heatmap-map').innerHTML='<p style="text-align:center; padding-top:120px;">[Heatmap Bandar]</p>';
    document.getElementById('led-display').innerHTML='<p style="text-align:center;">Animasi LED aktif</p>';
});

function triggerConfetti(){ confetti({particleCount:120,spread:70,origin:{y:0.6},colors:CONFIG.CONFETTI_COLORS}); }