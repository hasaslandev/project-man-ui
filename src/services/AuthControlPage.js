import { jwtDecode } from "jwt-decode";

export const checkAuthorization = (token, navigate) => {
  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (userRole.includes("student")) {
      // navigate("/Ogrenci");
      return decodedToken;
    } else if (userRole.includes("academician")) {
      // navigate("/Akademisyen");
      return decodedToken;
    } else if (userRole.includes("admin")) {
      // navigate("/Admin");
      return decodedToken;
    } else {
      console.log("Yetkisiz erişim");
    }
  } catch (error) {
    console.error("Token çözümlenemedi:", error);
  }
};
