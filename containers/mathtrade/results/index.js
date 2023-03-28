import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import ResultsView from "views/mathtrade/results";
import storage from "utils/storage";
import { useApi, MathTradeService } from "api_serv";
import useCanEdit from "hooks/useCanEdit";

const Results = () => {
  const canViewResults = useCanEdit("results");

  const [myUserId, setMyUserId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [mathTradeResults, setMathTradeResults] = useState([]);
  const [mathTradeResultsAll, setMathTradeResultsAll] = useState([]);

  const [allUsers, setAllUsers] = useState(false);

  const [getMathTradeResults, , loading, errors] = useApi({
    promise: MathTradeService.getMathTradeResults,
    initialState: [],
    afterLoad: (res) => {
      setMathTradeResults(res);
    },
  });

  const [getMathTradeResultsAll, , loadingAll, errorsAll] = useApi({
    promise: MathTradeService.getMathTradeResults,
    initialState: [],
    afterLoad: (res) => {
      res.sort((a, b) => {
        return a.user.last_name > b.user.last_name ? 1 : -1;
      });
      setMathTradeResultsAll(res);
    },
  });

  const [getUsers, users, loadingUsers, errorsUsers] = useApi({
    promise: MathTradeService.getMathTradeUsers,
    initialState: [],
  });

  useEffect(() => {
    if (canViewResults) {
      const storeData = storage.get();
      setMyUserId(storeData?.user?.data?.id);
      setUserId(storeData?.user?.data?.id);
    }
    getUsers();
  }, [canViewResults]);

  useEffect(() => {
    if (canViewResults && userId && userId !== "") {
      getMathTradeResults({ user: userId });
    } else {
      setMathTradeResults([]);
    }
  }, [userId, canViewResults]);

  useEffect(() => {
    if (canViewResults && allUsers && mathTradeResultsAll.length === 0) {
      getMathTradeResultsAll({ all: true });
    }
  }, [allUsers, canViewResults, mathTradeResultsAll]);

  useEffect(() => {
    if (userId && userId !== "" && users.length) {
      const newCurrentUserArray = users.filter((u) => {
        return u.id === userId;
      });
      if (newCurrentUserArray[0]) {
        setCurrentUser(newCurrentUserArray[0]);
      } else {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [userId, users]);

  return (
    <PrivateEnv>
      <ResultsView
        canViewResults={canViewResults}
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        userId={userId}
        myUserId={myUserId}
        currentUser={currentUser}
        users={users}
        setUserId={setUserId}
        loading={loading || loadingUsers || loadingAll}
        errors={errors || errorsUsers || errorsAll}
        mathTradeResults={mathTradeResults}
        mathTradeResultsAll={mathTradeResultsAll}
      />
    </PrivateEnv>
  );
};

export default Results;
