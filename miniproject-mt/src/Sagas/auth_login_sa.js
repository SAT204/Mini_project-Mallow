import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { message } from "antd";
function* PostData(action) {
  console.log(action.payload);
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://react-assignment-api.mallow-tech.com/api/login",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: action.payload,
  };
  try {
    const response = yield axios(config);
    console.log(response);
    console.log(response.data);
    console.log(response.headers.authorization);
    yield put({ type: "AUTH_LOGIN_SUCCESS", payload: response.data });
    yield put({
      type: "AUTH_LOGIN_RESPONSE",
      payload: response.headers.authorization,
    });
    if (response) {
      message.success(`Logingin...`);
      action.navigate("/Profile");
    }
  } catch (error) {
    console.log("Error Occured in auth-login method", error);
    message.error(`Invalid Credentials`);
  }
}

function* auth_login_sa() {
  //console.log("inside the login method saga file");
  yield takeLatest("AUTH_LOGIN", PostData);
}
export default auth_login_sa;
