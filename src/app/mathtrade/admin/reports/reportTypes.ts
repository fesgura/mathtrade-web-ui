export type Person = { id: number; first_name: string; last_name: string } | null;

export type ItemElement = {
  name: string;
  thumbnail: string | null;
  box_status: string;
  component_status: string;
  comment: string;
  images: string;
};

export type ItemDetail = {
  id: number;
  title: string;
  owner:
    | (Person & {
        username: string;
        whatsapp?: string | null;
        telegram?: string | null;
      })
    | null;
  location: string | null;
  elements: ItemElement[];
} | null;

export type ReportComment = {
  id: number;
  user_info: Person;
  comment: string;
  created: string;
};

export type ReportRow = {
  id: number;
  user: Person;
  reported_user: Person;
  // The item's title, or the one stored with the report once the item is
  // gone (BE reports/snapshot.py).
  item_title: string | null;
  // BGG names of the item's copies, stored with the report.
  game_name?: string | null;
  // The owner deleted (or withdrew) the item: no item_detail, only the
  // stored title and game.
  item_deleted?: boolean;
  // The report's edition (null for old reports the backfill couldn't date).
  mathtrade?: number | null;
  // Whose item it was, stored with the report (shown once the item is gone).
  item_owner?: { id: number | null; name: string | null } | null;
  item_detail: ItemDetail;
  images: string | null;
  comments: ReportComment[];
  assigned_trade_code: string | number | null;
  box: number | null;
  box_number: number | null;
  box_origin_name: string | null;
  box_destination_name: string | null;
  found_in_box_number: number | null;
  comment: string;
  created: string;
  resolved_at: string | null;
  // "logistics" reports (or any with a box) stay hidden from the item owner
  // until an admin shares them.
  source?: string;
  shared_with_owner_at?: string | null;
  // Owner activity after the report (BE: item last_update / owner comments).
  edited_after_report?: boolean;
  owner_replied?: boolean;
  // "withdrawn" when the owner withdrew the item (auto-resolved).
  resolution?: string | null;
};

// Logistics reports (or any with a box) stay hidden from the owner until an
// admin shares them.
export const isInternal = (row: ReportRow) =>
  !!row.item_detail && (row.source === "logistics" || !!row.box);
