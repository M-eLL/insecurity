import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";

const Vault = () => {
  const dispatch = useDispatch();

  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries(true));
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        This is the vault of hidden entries component
      </h1>
      {Object.values(entries).map((entry) => (
        <Link key={entry.id} to={`/entries/${entry.id}`}>
          <div id="entries-list">
            <div>{entry.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Vault;
