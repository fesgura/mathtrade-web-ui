// A row of GET mathtrades/<id>/users/ (MembershipMathtradesSerializer, the
// regular-member shape). id = the user id.
export type ParticipantRow = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
  location: { id: number; name: string } | null;
  ready_items: number;
  commitment: boolean;
  trades: number;
};

export type ParticipantSortKey = "name" | "city" | "ready_items" | "commitment" | "trades";
