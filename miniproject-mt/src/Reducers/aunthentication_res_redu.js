const data = [];

const aunthentication_res_redu = (state = data, action) => {
  switch (action.type) {
    case "AUTH_LOGIN_RESPONSE":
      //console.log(action.payload);
      return [action.payload];
    default:
      return state;
  }
};

export default aunthentication_res_redu;
