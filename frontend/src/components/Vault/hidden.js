import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneEntry,
  deleteOneEntry,
  editOneEntry,
} from "../../store/currentEntry";
import { lockEntry } from "../../store/entries";
import CryptoJS from "crypto-js";

const Hidden = () => {
  return (
    <>
      <h1>single hidden entry component</h1>
      <h2>SECRETS</h2>
    </>
  );
};

export default Hidden;
