import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOneEntry } from "../../store/currentEntry";

const Entry = () => {
  const dispatch = useDispatch();
  const { entryId } = useParams();
  console.log(entryId);

  const user = useSelector((state) => state.session.user);
  const entry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  // how do i make the entry title change to the entry text just by clicking on it
  // want to try useEffect
  return (
    <div>
      {user && (
        <div>
          <h1>encrypted entry: </h1>
          {entry.text}
        </div>
      )}
    </div>
  );
};

export default Entry;
