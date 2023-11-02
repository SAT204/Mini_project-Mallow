const data = [];

const data_table_redu = (state = data, action) => {
  switch (action.type) {
    case "GET_DATA_SUCCESS":
      // console.log("get method is excuted successfully");
      // console.log(action.payload);
      return action.payload;
    case "POST_DATA_SUCCESS":
      // console.log("post method is excuted successfully");
      // console.log(action.payload);
      return state;
    case "DELETE_DATA_SUCCESS":
      // console.log("delete method is excuted successfully");
      // console.log(action.payload);
      return state;
    default:
      return state;
  }
};
export default data_table_redu;
