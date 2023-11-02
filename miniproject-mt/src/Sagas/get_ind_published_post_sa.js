import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* get_ind_published_post(action) {
  //console.log(action.payload);
  const id = action.id;
  //const data = "";
  var config = {
    method: "get",
    url: `https://react-assignment-api.mallow-tech.com/api/public/posts/${id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.auth_data}`,
    },
  };
  try {
    const response = yield axios(config);
    console.log(response);
    yield put({
      type: "GET_IND_PUBLISHED_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error occured in get_ind_published_post_sa method", error);
  }
}

function* get_ind_published_post_sa() {
  //console.log("inside the get_ind_published_post saga file");
  yield takeLatest("SHOW_PUBLISHED_POST", get_ind_published_post);
}
export default get_ind_published_post_sa;
