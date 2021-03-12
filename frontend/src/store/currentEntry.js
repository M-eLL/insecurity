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

export const editOneEntry = (entryId, title, text) => async (dispatch) => {
  const response = await fetch(`/api/users/entries/${entryId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      text,
    }),
  });
  const entry = response.data;
  console.log(entry);
  dispatch(setEntry(entry));
};

// export const editOneEntry = (entry) => async (dispatch) => {
//   const { title, text, encryption_key, entryId } = entry;
//   const response = await fetch(`/api/users/entries/${entryId}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       title,
//       text,
//       encryption_key,
//     }),
//   });
//   const newEntry = response.data;
//   console.log(newEntry);
//   dispatch(editEntry(newEntry));
// };

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
