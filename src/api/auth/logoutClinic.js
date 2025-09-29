export const logoutClinic = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};
