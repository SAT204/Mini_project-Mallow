import { takeLatest } from "redux-saga/effects";
import { get_data_table } from "../Actions/Saga_action";
import { message } from "antd";
import axios from "axios";

function* post_Data(action) {
  try {
    const data = new FormData();
    console.log(action.payload.name);
    data.set("name", `${action.payload.name}`);
    data.set("content", `${action.payload.content}`);
    data.set("image", action.payload.image);
    yield axios
      .post("https://react-assignment-api.mallow-tech.com/api/posts", data, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: action.payload.auth_key,
        },
      })
      .then((response) => {
        console.log(response);
        const dispatch = action.dispatch;
        const auth_data = action.auth_data;
        dispatch(get_data_table(auth_data));
        message.success(`Posts created successfully`);
      });
  } catch (error) {
    message.error(`Please create again`);
    console.log("Error occured in POST method in create data", error);
  }
}

function* create_data_sa() {
  //console.log("inside the post data in table saga file");
  yield takeLatest("CREATE_DATA", post_Data);
}
export default create_data_sa;
