function checkAdmin() {
    const token = localStorage.getItem('admin_token');
    if(!token){ alert("Sila login sebagai admin"); window.location.href="login.html"; }
}