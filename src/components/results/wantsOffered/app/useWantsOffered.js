import { useContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { ResultsContext } from "@/context/results";
import data from "./data";

const { users, items, wants } = data;

const enieRexExp = new RegExp("ñ", "g");

const aRexExp = new RegExp("á", "g");

const normas = {
  ñ: "n",
  ü: "u",
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
};

const normasArray = Object.entries(normas);

const normalizeName = (name) => {
  let n = name;

  normasArray.forEach(([key, value]) => {
    const re = new RegExp(key, "g");
    n = n.replace(re, value);
  });
  return n;
};

const useWantsOffered = () => {
  /* PAGE CONTEXT *****************************************/
  const { userId } = useContext(PageContext);
  /* end PAGE CONTEXT *****************************************/

  /* RESULTS CONTEXT *****************************************/
  const { userList } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  const [currentUserId, setCurrentUserId] = useState(userId);

  const userIndex = useMemo(() => {
    let index = -1;
    if (!userList || !currentUserId) {
      return index;
    }

    const user = userList.find((u) => {
      return `${u.id}` === `${currentUserId}`;
    });

    if (!user) {
      return index;
    }

    let name = `${user.full_name}`.toLowerCase();

    name = normalizeName(name);

    Object.entries(users).forEach(([key, value]) => {
      if (value.toLowerCase().includes(name)) {
        index = key;
      }
    });

    return index;
  }, [userList, currentUserId]);

  const wantsOffer = useMemo(() => {
    if (userIndex < 0) {
      return [];
    }

    const want = wants[userIndex];

    if (!want) {
      return [];
    }

    const wantsOffered = want.map(({ num, offered }) => {
      const title = items[num]?.name || "No Title";
      const offeredItems = offered
        .split(",")
        .map((numOffered) => {
          const { name: nameOffered, user: userOfferIndex } = items[
            numOffered
          ] || { name: null };
          if (!nameOffered) {
            return null;
          }

          const userOfferName = users[userOfferIndex] || "No Name";

          return {
            title: nameOffered,
            user: userOfferName,
          };
        })
        .filter((x) => x !== null);

      return {
        title,
        offeredItems,
      };
    });

    return wantsOffered;
  }, [userIndex]);

  return { currentUserId, setCurrentUserId, wantsOffer };
};

export default useWantsOffered;
