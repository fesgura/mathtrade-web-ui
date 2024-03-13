import {
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { getRandomColor } from "@/utils/color";

const useGroupEditor = (group, onClose) => {
  /* PAGE CONTEXT **********************************************/
  const { setMyGroups } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* INPUT REF **********************************************/
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  /* end INPUT REF **********************************************/

  // MY GROUPS ********************************************
  const afterLoadMyGroups = useCallback(
    (newGroups) => {
      setMyGroups(newGroups);
      onClose();
    },
    [setMyGroups, onClose]
  );
  const [loadMyGroups, , loadingMyGropus] = useFetch({
    endpoint: "GET_MYITEM_GROUPS",
    initialState: [],
    afterLoad: afterLoadMyGroups,
  });
  // end MY GROUPS ********************************************

  /* PUT GROUP ************************************************/
  const afterLoadPutMyItemGroup = useCallback(() => {
    loadMyGroups();
  }, [loadMyGroups]);

  const [putMyItemGroup, , loadingPut, errorPut] = useFetch({
    endpoint: "PUT_MYITEM_GROUPS",
    method: "PUT",
    afterLoad: afterLoadPutMyItemGroup,
  });
  /* end PUT GROUP ************************************************/

  /* POST GROUP ************************************************/
  const afterLoadPostMyItemGroup = useCallback(() => {
    loadMyGroups();
  }, [loadMyGroups]);

  const [postMyItemGroup, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_MYITEM_GROUPS",
    method: "POST",
    afterLoad: afterLoadPostMyItemGroup,
  });
  /* end POST GROUP ************************************************/

  /* DELETE GROUP ************************************************/
  const afterDeletePostMyItemGroup = useCallback(() => {
    loadMyGroups();
  }, [loadMyGroups]);

  const [deleteMyItemGroup, , loadingDelete] = useFetch({
    endpoint: "DELETE_MYITEM_GROUPS",
    method: "DELETE",
    afterLoad: afterDeletePostMyItemGroup,
  });
  /* end DELETE GROUP ************************************************/

  const [color, setColor] = useState(group?.color || getRandomColor());
  const data = useMemo(() => {
    if (group) {
      return group;
    }

    return { name: "" };
  }, [group]);

  const onSubmit = useCallback(
    (dataToSend) => {
      if (group) {
        const groupClone = { ...group };
        const { id } = groupClone;
        delete groupClone.id;

        putMyItemGroup({
          urlParams: [id],
          params: {
            ...groupClone,
            ...dataToSend,
          },
        });
      } else {
        postMyItemGroup({
          params: { ...dataToSend, item_ids: [] },
        });
      }
    },
    [group, putMyItemGroup, postMyItemGroup]
  );

  const onDelete = useCallback(
    (e) => {
      e.preventDefault();
      const { id } = group;
      deleteMyItemGroup({
        urlParams: [id],
      });
    },
    [group, deleteMyItemGroup]
  );

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const validations = {
    name: ["required"],
    color: ["required"],
  };

  return {
    color,
    setColor,
    inputRef,
    data,
    onSubmit,
    onCancel,
    onDelete,
    validations,
    loading: loadingPut || loadingMyGropus || loadingPost,
    error: errorPut || errorPost,
  };
};

export default useGroupEditor;
