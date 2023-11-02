import { takeLatest } from "redux-saga/effects";
import { get_data_table, push_data_view } from "../Actions/Saga_action";
import { message } from "antd";
import axios from "axios";

function* publishData(action) {
  console.log(action.payload);
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload.id}/publish/true`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.response_publish_id}`,
    },
  };
  try {
    const response = yield axios(config);
    console.log(response);
    if (response) {
      const dispatch = action.dispatch;
      const auth_data = action.response_publish_id;
      dispatch(get_data_table(auth_data));
      dispatch(push_data_view(action.payload.id, auth_data));
      message.success(`Row published successfully.`);
    }
  } catch (error) {
    message.error(`Please publish again`);
    console.log("Error occured in delete_row_on_table method", error);
  }
}

function* publish_data_sa() {
  //console.log("inside the publish post method saga file");
  yield takeLatest("PUBLISH_DATA", publishData);
}
export default publish_data_sa;
