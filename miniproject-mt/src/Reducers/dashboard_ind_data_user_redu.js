const data = [];

const dashboard_ind_data_user_redu = (state = data, action) => {
  switch (action.type) {
    case "GET_IND_USER_PUBLISHED_SUCCESS":
      //console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default dashboard_ind_data_user_redu;
