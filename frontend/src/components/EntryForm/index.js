import { useEffect, useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EntryForm = ({ entries }) => {
  console.log(entries, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  return (
    <div>
      <h1>this is the entry form component</h1>
      <form></form>
    </div>
  );
};

// need to pull in prompts here

export default EntryForm;
