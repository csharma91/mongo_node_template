import {
  SET_STOCKFEEDS,
  LOADING_DATA,
  LIKE_STOCKFEED,
  UNLIKE_STOCKFEED,
  DELETE_STOCKFEED,
  SET_ERRORS,
  POST_STOCKFEED,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_STOCKFEED,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all Stockfeeds by User
export const getStockfeeds = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  const AuthToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common["x-auth-token"] = AuthToken;
  axios
    .get("/api/stockfeed")
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_STOCKFEEDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_STOCKFEEDS,
        payload: []
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
