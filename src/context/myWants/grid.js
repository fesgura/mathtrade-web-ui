import { createContext, useMemo, useState, useContext } from "react";

export const GridContext = createContext({
  groupsVisible: {},
  setGroupsVisible: () => {},
});

export const GridContextProvider = ({ children }) => {
  const [groupsVisible, setGroupsVisible] = useState({});

  return (
    <GridContext.Provider
      value={{
        groupsVisible,
        setGroupsVisible,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
