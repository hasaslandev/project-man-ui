import axios from "axios";
// import { PureComponent } from "react";
import { API_BASE_URL } from "../Constants/BaseUrl";

export default class LessonService {
  GetLessons(page, pageSize) {
    return axios.get(
      API_BASE_URL + `Lesson/GetLessons?index=${page}&size=${pageSize}`
    );
  }
  GetAcademicYearList() {
    return axios.get(API_BASE_URL + `Lesson/AcademicYearList`);
  }
  UpdateLesson(model) {
    return axios.post(`http://localhost:5226/api/Lesson/UpdateLesson`, model);
  }
  AddLesson(model) {
    axios.post("http://localhost:5226/api/Lesson/AddLesson", model);
  }
}
