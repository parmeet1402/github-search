import store from "../store";

// loader starts
export const fetch_post = () => ({
  type: "FETCH_USER"
});

// post is received and is passed as argument
export const receive_post = post => ({
  type: "FETCHED_USER",
  payload: post
});

// post is not received
export const receive_error = () => ({
  type: "RECEIVE_ERROR"
});

// redux-thunk implementation of post
export const thunk_action_creator = username => {
  const user = username.replace(/\s/g, ""); // sanitization
  store.dispatch(fetch_post()); // loader is called
  return (
    dispatch,
    getState // thunk function is returned
  ) =>
    fetch(`https://api.github.com/users/${user}`) // API call
      .then(data => data.json())
      .then(data => {
        // data is received
        if (data.message === "Not Found") {
          // Check if no user is found
          throw new Error("No such user found!!"); // Throw error no such user found
        } else {
          dispatch(receive_post(data)); // post is received action is called
        }
      })
      .catch(err => dispatch(receive_error())); // error action creator is called
};
