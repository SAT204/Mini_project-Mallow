import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Allreducer from "./Reducers";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import auth_login_sa from "./Sagas/auth_login_sa";
import auth_signup_sa from "./Sagas/auth_signup_sa";
import get_data_table_sa from "./Sagas/get_data_table_sa";
import create_data_sa from "./Sagas/create_data_sa";
import delete_row_sa from "./Sagas/delete_row_sa";
import publish_data_sa from "./Sagas/publish_data_sa";
import unpublish_data_sa from "./Sagas/unpublish_data_sa";
import edit_row_sa from "./Sagas/edit_row_sa";
import get_row_for_view_sa from "./Sagas/get_row_for_view_sa";
import get_dashboard_side_sa from "./Sagas/get_dashboard_side_sa";
import get_ind_published_post_sa from "./Sagas/get_ind_published_post_sa";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(Allreducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(auth_login_sa);
sagaMiddleware.run(auth_signup_sa);
sagaMiddleware.run(get_data_table_sa);
sagaMiddleware.run(create_data_sa);
sagaMiddleware.run(delete_row_sa);
sagaMiddleware.run(publish_data_sa);
sagaMiddleware.run(unpublish_data_sa);
sagaMiddleware.run(edit_row_sa);
sagaMiddleware.run(get_row_for_view_sa);
sagaMiddleware.run(get_dashboard_side_sa);
sagaMiddleware.run(get_ind_published_post_sa);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
