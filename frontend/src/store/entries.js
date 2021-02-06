import { fetch } from "./csrf.js";

const SET_ENTRIES = "entries/setEntries";
const SET_ONE_ENTRY = "entries/setOneEntry";
const ADD_ENTRY = "entries/addEntries";
// const EDIT_ENTRIES = "entries/editEntries";

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

// const editEntries = (payload) => ({
//   type: EDIT_ENTRIES,
//   payload,
// });

export const getEntries = (userId) => async (dispatch) => {
  let response = await fetch(`/api/users/entries`);
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

// export const updateEntry = (entryObj) => async (dispatch) => {
//   const res = await fetch(`/api/users/${entryObj.user_id}/edit-entry`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(entryObj),
//   });
//   console.log(entryObj);
//   dispatch(editEntries(entryObj));
//   return entryObj;
// };

const initState = {};

const reducer = (state = initState, action) => {
  // let newState = Object.assign({}, state);
  let newState;
  switch (action.type) {
    case SET_ENTRIES:
      newState = action.payload;
      return { ...newState };
    case ADD_ENTRY:
      newState = action.payload;
      return { ...state, newState };
    default:
      return state;
  }
};

export default reducer;
