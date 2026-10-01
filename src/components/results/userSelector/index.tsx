"use client";
import { useContext, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import { InputContainer, Select, Label } from "@/components/form";

const tradesOf = (entry: { commitment?: unknown; trades?: number }) =>
  entry.commitment ? entry.trades || 0 : 0;

const UserSelector = ({ compact = false }: { compact?: boolean }) => {
  const {
    userList,
    currentUserId: user,
    setCurrentUserId,
  } = useContext(ResultsContext);

  const userListForSelector = useMemo(() => {
    return [...(userList || [])]
      .filter((entry) => {
        return tradesOf(entry) > 0 || String(entry.id) === String(user);
      })
      .sort((a, b) => (a.last_name < b.last_name ? -1 : 1))
      .map((entry) => {
        const name = `${entry.first_name || ""} ${entry.last_name || ""}`.trim();
        const loc = entry.location?.name;
        return {
          value: String(entry.id),
          text: loc ? `${name} (${loc})` : name,
        };
      });
  }, [userList, user]);

  return (
    <div className={compact ? "w-full min-w-0 sm:w-auto sm:max-w-sm sm:flex-1" : "max-w-lg mx-auto py-4"}>
      <InputContainer className={compact ? "mb-0" : undefined}>
        <Label text="filter.User" name="user" size="sm" />
        <Select
          data={{ user: user != null && user !== "" ? String(user) : "" }}
          name="user"
          options={userListForSelector}
          icon="user"
          size="sm"
          ariaLabel="filter.User"
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
