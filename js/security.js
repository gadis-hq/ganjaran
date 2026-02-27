export function requireRole(role){
  const userRole = localStorage.getItem("role");
  if(userRole !== role){
    window.location.href="admin.html";
  }
}
