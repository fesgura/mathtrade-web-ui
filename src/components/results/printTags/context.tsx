import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type PrintTagsValue = {
  pages: string[];
  setPages: Dispatch<SetStateAction<string[]>>;
};

export const PrintTagsContext = createContext<PrintTagsValue>({
  pages: [],
  setPages: () => {},
});

export const PrintTagsContextProvider = ({
  children = null,
}: {
  children?: ReactNode;
}) => {
  const [pages, setPages] = useState<string[]>([]);

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
