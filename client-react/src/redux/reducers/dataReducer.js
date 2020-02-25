import {
  SET_STOCKFEEDS,
  LIKE_STOCKFEED,
  UNLIKE_STOCKFEED,
  LOADING_DATA
} from "../types";

const initialState = {
  stockfeeds: [],
  stockfeed: {},
  loading: false
};
export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_STOCKFEEDS:
      return {
        ...state,
        stockfeeds: actions.payload,
        loading: false
      };
    case LIKE_STOCKFEED:
    case UNLIKE_STOCKFEED:
      let index = state.stockfeeds.findIndex(
        stockfeed => stockfeed.id === actions.payload.id
      );
      console.log("LIKE");
      console.log(index);
      state.stockfeed[index] = actions.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
