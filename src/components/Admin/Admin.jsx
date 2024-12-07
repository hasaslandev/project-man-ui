import React, { useEffect } from "react"; // useEffect ekleyin
import Cookies from "js-cookie"; // Cookie kütüphanesini ekleyin
import { useNavigate } from "react-router-dom";
import { checkAuthorization } from "../../services/AuthControlPage";

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      checkAuthorization(token, navigate);
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};
export default AdminPage;
