import { fetch } from "./csrf.js";

const GET_ENTRY = "entry/setEntry";
const DELETE_ENTRY = "entry/deleteEntry";
const EDIT_ENTRY = "entry/editEntry";

const setEntry = (payload) => ({
  type: GET_ENTRY,
  payload,
});

const deleteEntry = (payload) => ({
  type: DELETE_ENTRY,
  payload,
});

const editEntry = (payload) => ({
  type: EDIT_ENTRY,
  payload,
});

export const getOneEntry = (entryId) => async (dispatch) => {
  let response = await fetch(`/api/users/entries/${entryId}`);
  const entry = response.data;
  console.log(entry);
  dispatch(setEntry(entry));
};

export const deleteOneEntry = (entryId) => async (dispatch) => {
  const response = await fetch(`/api/users/entries/${entryId}`, {
    method: "DELETE",
  });
  const id = response.data.entryId;
  dispatch(deleteEntry(id));
};

export const editOneEntry = (entryId, title) => async (dispatch) => {
  const response = await fetch(`/api/users/entries/${entryId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
    }),
  });
  const entry = response.data;
  console.log(entry);
  dispatch(editEntry(entry));
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
