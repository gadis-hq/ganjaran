async function fetchKodSiri(kod) {
    try {
        const res = await fetch(`${CONFIG.API_URL}?kod=${encodeURIComponent(kod)}`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.error("Fetch error:", e);
        return { success:false, message:"Ralat sambungan server." };
    }
}