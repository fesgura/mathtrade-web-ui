import { createContext, useMemo, useState, useContext } from "react";

export const GridContext = createContext({
  groupsVisible: {},
  setGroupsVisible: () => {},
  showNoOptionsAdv: false,
  setShowNoOptionsAdv: () => {},
});

export const GridContextProvider = ({ children }) => {
  const [groupsVisible, setGroupsVisible] = useState({});
  const [showNoOptionsAdv, setShowNoOptionsAdv] = useState(false);

  return (
    <GridContext.Provider
      value={{
        groupsVisible,
        setGroupsVisible,
        showNoOptionsAdv,
        setShowNoOptionsAdv,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
