import React, { useState, useEffect, Fragment } from "react";
import Locations from "./Locations";
import { withFirebase } from "../FirebaseContext";

const LocationsContainer = ({ firebase, sectionIndex }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribeToListener = firebase.onCollection({
      path: "locations",
      onSnapshot: handleLocationsChange,
    });

    return () => unsubscribeToListener();
  }, [firebase]);

  const handleLocationsChange = locations => {
    setLocations(locations);
  };

  const setLocationOpen = async (id, open) => {
    firebase.set({
      path: "locations",
      document: id,
      data: {
        open,
      },
    });
  }

  if (sectionIndex !== 1) {
    return <Fragment />;
  }

  return <Locations locations={locations} setLocationOpen={setLocationOpen} />;
};

export default withFirebase(LocationsContainer);
