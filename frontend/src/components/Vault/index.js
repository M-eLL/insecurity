import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";

const Vault = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);
  console.log(entries);

  useEffect(() => {
    dispatch(getEntries(true));
  }, [dispatch]);

  return (
    <div>
      {Object.values(entries).map(
        (entry) =>
          entry.locked === true && (
            <Link key={entry.id} to={`/entries/${entry.id}`}>
              <div id="entries-list">
                <h1>{entry.title}</h1>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default Vault;
