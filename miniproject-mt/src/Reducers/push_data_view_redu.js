const data = [];

const push_data_view_redu = (state = data, action) => {
  switch (action.type) {
    case "GET_ROW_SUCCESS":
      //console.log(action.payload);
      return action.payload;
    case "CLEAR_VIEW":
      //console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default push_data_view_redu;
