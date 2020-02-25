import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_STOCKFEED,
  UNLIKE_STOCKFEED
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  name: "",
  bio: "",
  stock: "",
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };

    case LIKE_STOCKFEED:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            name: state.name,
            id: action.payload.id
          }
        ]
      };

    case UNLIKE_STOCKFEED:
      return {
        ...state,
        likes: state.likes.filter(like => like.id !== action.payload.id)
      };
    default:
      return state;
  }
}
