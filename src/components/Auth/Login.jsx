import React, { useEffect } from "react"; // useEffect ekleyin
import { useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginService";
import Cookies from "js-cookie"; // Cookie kütüphanesini ekleyin
import { checkAuthorization } from "../../services/AuthControlPage";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginService = new LoginService();
  const {
    register: oRegister,
    handleSubmit: oHandleSubmit,
    formState: { errors: oErrors },
  } = useForm();
  const {
    register: aRegister,
    handleSubmit: aHandleSubmit,
    formState: { errors: aErrors },
  } = useForm();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      checkAuthorization(token, navigate);
    }
  }, [navigate]);

  const oOnSubmit = (data) => {
    console.log("Öğrenci Giriş Verileri:", data);
    loginService
      .Login(data.email, data.password)
      .then((result) => {
        const { success, message, data: responseData } = result.data;
        if (success) {
          Cookies.set("token", responseData.token, { expires: 7 });
          checkAuthorization(responseData.token, navigate);
        } else {
          console.log("Giriş başarısız:", message);
        }
      })
      .catch((error) => {
        console.error("Giriş hatası:", error);
      });
  };

  const aOnSubmit = (data) => {
    console.log("Akademisyen Giriş Verileri:", data);
    loginService
      .Login(data.email, data.password)
      .then((result) => {
        const { success, message, data: responseData } = result.data;
        if (success) {
          Cookies.set("token", responseData.token, { expires: 7 });
          checkAuthorization(responseData.token, navigate);
        } else {
          console.log("Giriş başarısız:", message);
        }
      })
      .catch((error) => {
        console.error("Giriş hatası:", error);
      });
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <img
              src="dist/img/selcukTeknology.png"
              alt="Selcuk Technology Logo"
              style={{ width: "350px", height: "240px" }}
            />
          </a>
        </div>

        <div className="card">
          <div
            className="card-body login-card-body"
            style={{ backgroundColor: "lightgrey" }}
          >
            <Tabs>
              <TabList>
                <Tab>Öğrenci</Tab>
                <Tab>Akademisyen</Tab>
              </TabList>

              <TabPanel>
                <div className="example-small-box mat-elevation-z4">
                  <p className="login-box-msg">Hoşgeldin Öğrenci</p>
                  <form onSubmit={oHandleSubmit(oOnSubmit)}>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...oRegister("email", { required: true })}
                      />
                      {oErrors.email && <span>Email zorunlu</span>}
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>

                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Şifre"
                        {...oRegister("password", { required: true })}
                      />
                      {oErrors.password && <span>Şifre zorunlu</span>}
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <div className="icheck-primary">
                          <input type="checkbox" id="rememberOgrenci" />
                          <label htmlFor="rememberOgrenci">Beni Hatırla</label>
                        </div>
                      </div>
                      <div className="col-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Giriş Yap
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="example-large-box mat-elevation-z4">
                  <p className="login-box-msg">Hoşgeldin Akademisyen</p>
                  <form onSubmit={aHandleSubmit(aOnSubmit)}>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...aRegister("email", { required: true })}
                      />
                      {aErrors.email && <span>Email zorunlu</span>}
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>

                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Şifre"
                        {...aRegister("password", { required: true })}
                      />
                      {aErrors.password && <span>Şifre zorunlu</span>}
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <div className="icheck-primary">
                          <input type="checkbox" id="rememberAkademisyen" />
                          <label htmlFor="rememberAkademisyen">
                            Beni Hatırla
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Giriş Yap
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </TabPanel>
            </Tabs>
            <p className="mb-1">
              <a href="/forget-password">Şifremi Unuttum</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">
                Kayıt Ol
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
