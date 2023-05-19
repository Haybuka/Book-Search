import { ACTION_TYPES, StoreContext } from "@/context/store-context";
import React, { useState, useContext } from "react";

const useTrackLocation = () => {
  const { dispatch } = useContext(StoreContext);

  // const [latLong, setLatLong] = useState("");
  const [locationMsg, setLocationMsg] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude} , ${longitude}` },
    });
    // setLatLong(`${latitude} , ${longitude}`);
    setIsFindingLocation(false);
  };
  const error = () => {
    setLocationMsg("Unable to retrieve location");
    setLocationMsg("");
  };
  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationMsg("geolocation noit supported");
      setIsFindingLocation(false);
    } else {
      console.log("location");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    // latLong,
    handleTrackLocation,
    locationMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
