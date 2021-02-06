import { fetch } from "./csrf.js";

const GET_ENTRY = "entry/setEntry";

const setEntry = (payload) => ({
  type: GET_ENTRY,
  payload,
});

export const getOneEntry = (entryId) => async (dispatch) => {
  let response = await fetch(`/api/users/entries/${entryId}`);
  const entry = response.data;
  console.log(entry);
  dispatch(setEntry(entry));
};
const initState = {};

const reducer = (state = initState, action) => {
  // let newState = Object.assign({}, state);
  let newState;
  switch (action.type) {
    case GET_ENTRY:
      newState = action.payload;
      return { ...newState };
    default:
      return state;
  }
};

export default reducer;
