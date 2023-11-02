import { takeLatest } from "redux-saga/effects";
import { get_data_table } from "../Actions/Saga_action";
import { message } from "antd";
import axios from "axios";

function* deleteData(action) {
  console.log(action.payload);
  var config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload.id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.response_data_del}`,
    },
    data: action.payload,
  };
  try {
    const response = yield axios(config);
    console.log(response);
    if (response) {
      const dispatch = action.dispatch;
      const auth_data = action.response_data_del;
      dispatch(get_data_table(auth_data));
      message.success(`Deleted the row successfully.`);
    }
  } catch (error) {
    message.error(`Please delete again`);
    console.log("Error occured in delete_row_on_table method", error);
  }
}

function* delete_row_sa() {
  //console.log("inside the delete_row_on_table saga file");
  yield takeLatest("DELETE_DATA", deleteData);
}
export default delete_row_sa;
