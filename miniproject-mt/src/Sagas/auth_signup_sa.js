import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

function* postData(action) {
  console.log("action", action.payload);
  try {
    const response = yield call(
      axios.post,
      "https://react-assignment-api.mallow-tech.com/api/register",
      action.payload
    );
    console.log("result", response);
    yield put({ type: "AUTH_SIGNUP_SUCCESS", payload: response.data });
    if (response) {
      message.success(`Registered successfully, please Login to continue`);
      action.navigate("/");
    }
  } catch (error) {
    message.error(`Account already exist`);
    console.error(error);
  }
}
function* auth_signup_sa() {
  //console.log("inside the auth_signup post saga file");
  yield takeLatest("AUTH_SIGNUP", postData);
}
export default auth_signup_sa;
