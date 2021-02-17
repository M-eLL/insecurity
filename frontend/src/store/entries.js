import { fetch } from "./csrf.js";

const SET_ENTRIES = "entries/setEntries";
const SET_ONE_ENTRY = "entries/setOneEntry";
const ADD_ENTRY = "entries/addEntries";
const SET_HIDDEN = "entries/hideEntry";

const setEntries = (payload) => ({
  type: SET_ENTRIES,
  payload,
});
const addEntry = (payload) => ({
  type: ADD_ENTRY,
  payload,
});
const setOneEntry = (payload) => ({
  type: SET_ONE_ENTRY,
  payload,
});

const hideEntry = (payload) => ({
  type: SET_HIDDEN,
  payload,
});

export const lockEntry = (entryId) => async (dispatch) => {
  let response = await fetch(`/api/users/entries/${entryId}`, {
    method: "PATCH",
  });
  const entries = response.data;
  dispatch(hideEntry(entries));
};

export const getEntries = (bubblebop = false) => async (dispatch) => {
  let response = await fetch(`/api/users/entries/${bubblebop}`);
  const entries = response.data;
  dispatch(setEntries(entries));
};

export const getOneEntry = (entryId) => async (dispatch) => {
  let response = await fetch(`/api/users/entries/${entryId}`);
  const entry = response.data;
  dispatch(setOneEntry(entry));
};

export const createEntry = (entry) => async (dispatch) => {
  const { title, text, userId, encryption_key } = entry;
  let response = await fetch(`/api/users/${userId}/entries`, {
    method: "POST",
    body: JSON.stringify({ title, text, encryption_key }),
  });
  const newEntry = response.data.entry;
  dispatch(addEntry(newEntry));
};

const initState = {};

const reducer = (state = initState, action) => {
  // let newState = Object.assign({}, state);
  let newState;
  switch (action.type) {
    case SET_ENTRIES:
      newState = {};
      action.payload.forEach((entry) => (newState[entry.id] = entry));
      return { ...newState };
    case ADD_ENTRY:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case SET_HIDDEN:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};

export default reducer;
