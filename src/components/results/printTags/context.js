import { createContext, useState } from "react";

export const PrintTagsContext = createContext({
  pages: ["asdss"],
  setPages: () => {},
});

export const PrintTagsContextProvider = ({ children }) => {
  const [pages, setPages] = useState([]);

  return (
    <PrintTagsContext.Provider
      value={{
        pages,
        setPages,
      }}
    >
      {children}
    </PrintTagsContext.Provider>
  );
};
