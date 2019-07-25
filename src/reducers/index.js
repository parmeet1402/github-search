const initialState = {
  userData: {},
  isFetching: false,
  isError: false
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, isFetching: true };
    case "FETCHED_USER":
      return { ...state, isFetching: false, userData: { ...action.payload } };
    case "RECEIVE_ERROR":
      return { ...state, isError: true, isFetching: false };
    default:
      return state;
  }
};

export default asyncReducer;
