// Why the user can't invite yet, in the backend's order (POST users/referral/):
// signed up in this edition -> contribution approved (if required) -> rules
// quiz passed (if required). "No history" is handled by the referral page.
export type InviteBlock = "notSignedUp" | "contributionPending" | "rulesQuizPending" | null;

export const INVITE_BLOCK_TEXT: Record<Exclude<InviteBlock, null>, string> = {
  notSignedUp: "referral.notSignedUp",
  contributionPending: "referral.contributionPending",
  rulesQuizPending: "referral.rulesQuizPending",
};

export const getInviteBlock = (membership: any): InviteBlock => {
  if (!membership) return "notSignedUp";
  // contribution/rules are null when the edition doesn't require them.
  const contribution = membership.contribution;
  if (contribution?.required && contribution.status !== "approved") {
    return "contributionPending";
  }
  const rules = membership.rules;
  if (rules?.required && !rules.accepted_at) return "rulesQuizPending";
  return null;
};
