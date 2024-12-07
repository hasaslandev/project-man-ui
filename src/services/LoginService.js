import axios from "axios";
// import { PureComponent } from "react";
import { API_BASE_URL } from "../Constants/BaseUrl";

export default class LoginService /* extends PureComponent */ {
  Login(email, password) {
    return axios.post(API_BASE_URL + "Auth/login", {
      email: email,
      password: password,
    });
  }
  Register(email, password, firstName, lastName) {
    return axios
      .post(API_BASE_URL + "Auth/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        console.log(response.data);
      });
  }
}
