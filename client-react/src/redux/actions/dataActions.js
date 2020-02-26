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

//Like a Stockfeed
export const likeStockfeed = stockfeedId => dispatch => {
  const AuthToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common["x-auth-token"] = AuthToken;
  axios
    .put(`/api/stockfeed/${stockfeedId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_STOCKFEED,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//Unlike a Stockfeed
export const unlikeStockfeed = stockfeedId => dispatch => {
  const AuthToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common["x-auth-token"] = AuthToken;
  axios.put(`/api/stockfeed/${stockfeedId}/unlike`).then(res => {
    dispatch({
      type: UNLIKE_STOCKFEED,
      payload: res.data
    }).catch(err => console.log(err));
  });
};

//POST a NEW Stockfeed
export const postStockfeed = newStockfeed => dispatch => {
  dispatch({ type: LOADING_UI });
  const AuthToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common["x-auth-token"] = AuthToken;
  axios
    .post("/api/stockfeed", newStockfeed)
    .then(res => {
      dispatch({
        type: POST_STOCKFEED,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
