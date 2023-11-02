import { put, takeLatest } from "redux-saga/effects";
import { push_data_view } from "../Actions/Saga_action";
import axios from "axios";

function* getData(action) {
  console.log(action.payload);
  const data = "";
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://react-assignment-api.mallow-tech.com/api/posts?limit=10&page=1&sort=name&order=desc",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.payload}`,
    },
    data: data,
  };
  try {
    const response = yield axios(config);
    console.log(response);
    yield put({ type: "GET_DATA_SUCCESS", payload: response.data.data });
    if (action.is_edit_id) {
      const get_id = action.is_edit_id;
      const dispatch = action.dispatch;
      const auth_data = action.payload;
      dispatch(push_data_view(get_id, auth_data));
    }
  } catch (error) {
    console.log("Error occured in GET method", error);
  }
}

function* get_data_table_sa() {
  //console.log("inside the get_table saga file");
  yield takeLatest("GET_DATA_TABLE", getData);
}
export default get_data_table_sa;
