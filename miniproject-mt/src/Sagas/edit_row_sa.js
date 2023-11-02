import { takeLatest } from "redux-saga/effects";
import { get_data_table } from "../Actions/Saga_action";
import { message } from "antd";
import axios from "axios";

function* edit_Data(action) {
  const data = new FormData();
  data.set("name", `${action.payload.name}`);
  data.set("content", `${action.payload.content}`);
  data.set("image", action.payload.image);
  data.set("_method", "patch");
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload.id}`,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${action.auth_data}`,
    },
    data: data,
  };
  try {
    const response = yield axios(config);
    console.log(response, "response of edit row saga");
    const dispatch = action.dispatch;
    const auth_data = action.auth_data;
    const is_edit_id = action.payload.id;
    dispatch(get_data_table(auth_data, is_edit_id, dispatch));

    message.success(`Edited successfully`);
  } catch (error) {
    message.error(`Please create again`);
    console.log("Error occured in edit method in create data", error);
  }
}

function* edit_row_sa() {
  //console.log("inside the edit data in view page saga file");
  yield takeLatest("EDIT_DATA", edit_Data);
}
export default edit_row_sa;
