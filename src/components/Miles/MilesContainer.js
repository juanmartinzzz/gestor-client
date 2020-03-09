import React, { useState, useEffect } from "react";
import { withFirebase } from "../FirebaseContext";
import Miles from "./Miles";

const MilesContainer = ({ email, firebase }) => {
  const [pointEntries, setPointEntries] = useState([]);

  useEffect(() => {
    const runSync = async () => {
      const userEmail = await firebase.getDocument({
        path: "emails",
        document: email,
      });

      const userPointEntries = [];
      Object.keys(userEmail.orders).map(key => userEmail.orders[key].pointEntries.map(pointEntry => userPointEntries.push(pointEntry)));
      
      const sortedPointEntries = userPointEntries.sort((a, b) => a.created.seconds > b.created.seconds);

      setPointEntries(sortedPointEntries);
    }

    runSync();
  }, []);

  if (pointEntries.length === 0) {
    return null;
  }

  return <Miles pointEntries={pointEntries} />;
};

export default withFirebase(MilesContainer);
