import { useContext, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import { getI18Ntext } from "@/i18n";

import { InputContainer, Select, Label } from "@/components/form";

const UserSelector = () => {
  /* RESULTS CONTEXT *****************************************/
  const {
    userList,
    currentUserId: user,
    setCurrentUserId,
  } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  const userListForSelector = useMemo(() => {
    return userList
      .sort((a, b) => {
        return a.last_name < b.last_name ? -1 : 1;
      })

      .map((user) => {
        const {
          id: value,
          first_name,
          last_name,
          location,
          commitment,
          trades: tradesPre,
        } = user;

        const trades = commitment ? tradesPre : 0;

        return {
          value,
          text: `${first_name} ${last_name} (${
            location?.name || ""
          }), ${trades} ${getI18Ntext(
            trades === 1 ? "result.trade" : "result.trades"
          )}`,
        };
      });
  }, [userList]);

  return (
    <div className="max-w-lg mx-auto py-4">
      <InputContainer>
        <Label text="filter.User" name="user" size="sm" />
        <Select
          data={{ user }}
          name="user"
          options={userListForSelector}
          icon="user"
          onChange={(v) => {
            if (v) {
              setCurrentUserId(v);
            }
          }}
        />
      </InputContainer>
    </div>
  );
};

export default UserSelector;
