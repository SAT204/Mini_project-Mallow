import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getDashboard_sidebar(action) {
  //console.log(action.payload);
  const data = "";
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://react-assignment-api.mallow-tech.com/api/public/posts?offset=${action.offset}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.payload}`,
    },
    data: data,
  };
  try {
    const response = yield axios(config);
    console.log(response, "get dashboard side datas");
    yield put({
      type: "GET_DASHBOARD_SIDEBAR_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error occured in GET method", error);
  }
}

function* get_dashboard_side_sa() {
  //console.log("inside the get_dashboard_sidebar_table saga file");
  yield takeLatest("GET_DASHBOARD_SIDE_BAR_DATA", getDashboard_sidebar);
}
export default get_dashboard_side_sa;
