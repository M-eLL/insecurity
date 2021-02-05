import { fetch } from "./csrf.js";

const SET_ENTRIES = "entries/setEntries";

const setEntries = (payload) => ({
  type: SET_ENTRIES,
  payload,
});

export const getEntries = (userId) => async (dispatch) => {
  let response = await fetch(`/api/users/${userId}/entries`);
  const entries = response.data;
  dispatch(setEntries(entries));
};

const initState = {};

const reducer = (state = initState, action) => {
  // let newState = Object.assign({}, state);
  let newState;
  switch (action.type) {
    // case SET_ENTRIES:
    //   for (let entry of action.payload) {
    //     newState[entry.id] = entry;
    //   }
    //   return newState;
    case SET_ENTRIES:
      newState = action.payload;
      return { ...newState };
    default:
      return state;
  }
};

export default reducer;
