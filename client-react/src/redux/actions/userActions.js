import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

export const loginUser = userData => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("api/auth", userData)
    .then(res => {
      const AuthToken = res.data.token;
      axios.defaults.headers.common["Authorization"] = AuthToken;
      dispatch(getUserData());
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err.response.data);
      console.log(typeof err.response.data);
      this.setState({
        errors: err.response.data.errors[0],
        loading: false
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/api/stockfeed/all")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
