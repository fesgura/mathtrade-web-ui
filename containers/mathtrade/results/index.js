import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import ResultsView from "views/mathtrade/results";
import storage from "utils/storage";
import { useApi, MathTradeService } from "api_serv";

const Results = () => {
  const [myUserId, setMyUserId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [mathTradeResults, setMathTradeResults] = useState([]);

  const [getMathTradeResults, , loading, errors] = useApi({
    promise: MathTradeService.getMathTradeResults,
    initialState: [],
    afterLoad: (res) => {
      setMathTradeResults(res);
    },
  });

  const [getUsers, users, loadingUsers, errorsUsers] = useApi({
    promise: MathTradeService.getMathTradeUsers,
    initialState: [],
  });

  useEffect(() => {
    const storeData = storage.get();
    setMyUserId(storeData?.user?.data?.id);
    setUserId(storeData?.user?.data?.id);
    getUsers();
  }, []);

  useEffect(() => {
    if (userId && userId !== "") {
      getMathTradeResults(userId);
    } else {
      setMathTradeResults([]);
    }
  }, [userId]);

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
        userId={userId}
        myUserId={myUserId}
        currentUser={currentUser}
        users={users}
        setUserId={setUserId}
        loading={loading || loadingUsers}
        errors={errors || errorsUsers}
        mathTradeResults={mathTradeResults}
      />
    </PrivateEnv>
  );
};

export default Results;
