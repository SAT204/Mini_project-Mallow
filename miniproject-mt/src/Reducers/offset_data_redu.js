const data = [];

const offset_data_redu = (state = data, action) => {
  switch (action.type) {
    case "PUSH_OFFSET":
      //console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default offset_data_redu;
