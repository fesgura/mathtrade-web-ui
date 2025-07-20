import { useContext, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import { InputContainer, Select, Label } from "@/components/form";

const UserSelector = ({ currentUserId, setCurrentUserId }) => {
  /* RESULTS CONTEXT *****************************************/
  const { userList } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  const userListForSelector = useMemo(() => {
    return userList
      .sort((a, b) => {
        return a.last_name < b.last_name ? -1 : 1;
      })

      .map((user) => {
        const { id: value, first_name, last_name, location } = user;

        return {
          value,
          text: `${full_name} (${location?.name || ""})`,
        };
      });
  }, [userList]);

  return (
    <div className="max-w-lg mx-auto py-4">
      <InputContainer>
        <Label text="filter.User" name="user" size="sm" />
        <Select
          data={{ currentUserId }}
          name="currentUserId"
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
