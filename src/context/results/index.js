import { useContext, createContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";

export const ResultsContext = createContext({
  userList: [],
  setUserList: () => {},
  currentUser: null,
  currentUserId: null,
  setCurrentUserId: () => {},

  //
  MathTradeResults: null,
  setMathTradeResults: () => {},
});

export const ResultsContextProvider = ({ children }) => {
  /* PAGE CONTEXT *****************************************/
  const { userId } = useContext(PageContext);
  /* end PAGE CONTEXT *****************************************/

  const [userList, setUserList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(userId);
  const [MathTradeResults, setMathTradeResults] = useState(null);

  const currentUser = useMemo(() => {
    if (!userList.length || !currentUserId) {
      return null;
    }

    return userList.filter((u) => u.id === currentUserId)[0] || null;
  }, [userList, currentUserId]);

  return (
    <ResultsContext.Provider
      value={{
        userList,
        setUserList,
        currentUser,
        currentUserId,
        setCurrentUserId,

        //
        MathTradeResults,
        setMathTradeResults,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};
