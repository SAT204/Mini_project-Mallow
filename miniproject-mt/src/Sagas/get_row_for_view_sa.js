import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getRow(action) {
  console.log(action.payload);
  const data = "";
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.auth_data}`,
    },
    data: data,
  };

  try {
    const response = yield axios(config);
    console.log(response);
    yield put({ type: "GET_ROW_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error occured in GET roe for view method", error);
  }
}

function* get_row_for_view_sa() {
  //console.log("inside the get row for view page saga file");
  yield takeLatest("PUSH_DATA_VIEW", getRow);
}
export default get_row_for_view_sa;
