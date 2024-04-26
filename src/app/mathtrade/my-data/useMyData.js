import { useStore } from "@/store";
import useFetch from "@/hooks/useFetch";
import { useContext, useCallback, useEffect, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { formatLocations } from "@/utils";
import { formatDateString } from "@/utils/dateUtils";

const selectLocationById = (locations, id) => {
  const item = locations ? locations.filter((loc) => loc.id === id) : [];
  return item[0] || null;
};

const useMyData = () => {
  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("myData");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  const store = useStore((state) => state.data);
  const locations = useStore((state) => state.locations);
  const { membership, mathtrade } = store;
  const updateStore = useStore((state) => state.updateStore);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentEventAttendance, setCurrentEventAttendance] = useState(null);

  const meetingDay = useMemo(() => {
    return formatDateString(mathtrade?.meeting_date || null);
  }, [mathtrade]);

  useEffect(() => {
    if (locations && locations.length && membership?.location) {
      setCurrentLocation(selectLocationById(locations, membership?.location));
    }
  }, [membership, locations]);

  useEffect(() => {
    setCurrentEventAttendance(membership?.event_attendance);
  }, [membership]);

  const changeCurrentLocation = useCallback(
    (newLocationId) => {
      const newLocation = selectLocationById(locations, newLocationId);
      setCurrentLocation(newLocation);

      setCurrentEventAttendance((oldEventAttendance) => {
        return newLocation?.mandatory_attendance
          ? true
          : oldEventAttendance || false;
      });
    },
    [locations]
  );

  // SING IN MT ***************************************
  const urlParamsMemberId = useMemo(() => {
    return [membership?.user_id || "none"];
  }, [membership]);

  const afterLoadSign = useCallback(
    (membership) => {
      updateStore("data", {
        ...store,
        membership,
      });
    },
    [store, updateStore]
  );

  const [signInMathTrade, , loadingSignInMathTrade, errorSignInMathTrade] =
    useFetch({
      endpoint: "SINGIN_MATHTRADE",
      method: "POST",
      afterLoad: afterLoadSign,
    });
  // END SING IN MT ***************************************

  // EDIT IN MT ***************************************
  const [
    editMemberMathTrade,
    ,
    loadingEditMemberMathTrade,
    errorEditMemberMathTrade,
  ] = useFetch({
    endpoint: "EDIT_MYDATA_MATHTRADE",
    method: "PUT",
    urlParams: urlParamsMemberId,
    afterLoad: afterLoadSign,
  });
  // END EDIT IN MT ***************************************

  // CANCEL IN MT ***************************************

  const afterLoadCancel = useCallback(() => {
    updateStore("data", {
      ...store,
      membership: null,
    });
  }, [store, updateStore]);

  const [
    cancelMemberMathTrade,
    ,
    loadingCancelMemberMathTrade,
    errorCancelMemberMathTrade,
  ] = useFetch({
    endpoint: "SIGNOUT_MYDATA_MATHTRADE",
    method: "DELETE",
    urlParams: urlParamsMemberId,
    afterLoad: afterLoadCancel,
  });
  // END CANCEL IN MT ***************************************

  // SUBMIT ***************************************
  const onSubmit = useCallback(
    (params) => {
      delete params.terms_acceptance;
      if (membership) {
        editMemberMathTrade({
          params,
        });
      } else {
        signInMathTrade({
          params,
        });
      }
    },
    [editMemberMathTrade, signInMathTrade, membership]
  );
  // END SUBMIT ***************************************

  // SIGN OUT ***************************************
  const onSignOut = useCallback(() => {
    cancelMemberMathTrade({
      params: { userId: membership?.user_id || "none" },
    });
  }, [cancelMemberMathTrade, membership]);
  // END SIGN OUT ***************************************

  const [acceptTyC, setAcceptTyC] = useState(false);

  return {
    validations: {
      location: ["required"],
    },
    meetingDay,
    isMathtrade: mathtrade !== null,
    isMembership: membership !== null,
    currentLocation, //: membership?.location,
    currentEventAttendance,
    isMandatoryAttendance: currentLocation?.mandatory_attendance,
    changeCurrentLocation,
    locations: formatLocations(locations),
    onSubmit,
    onSignOut,
    loading:
      loadingSignInMathTrade ||
      loadingEditMemberMathTrade ||
      loadingCancelMemberMathTrade,
    error:
      errorSignInMathTrade ||
      errorEditMemberMathTrade ||
      errorCancelMemberMathTrade,
    acceptTyC,
    setAcceptTyC,
  };
};
export default useMyData;
