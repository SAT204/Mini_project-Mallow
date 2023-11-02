const data = [];

const auth_redu = (state = data, action) => {
  switch (action.type) {
    case "AUTH_LOGIN_SUCCESS":
      //console.log("auth login method is excuted successfully");
      //console.log(action.payload);
      return [action.payload];
    case "AUTH_SIGNUP_SUCCESS":
      //console.log("auth register method iss excuted successfully");
      //console.log(action.payload);
      return state;
    case "LOG_OUT":
      //console.log(action.payload);
      return [action.payload];
    default:
      return state;
  }
};
export default auth_redu;
