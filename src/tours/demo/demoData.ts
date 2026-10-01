// Example data for the tutorial's example cards (src/tours/demo), shaped like
// the API responses so the real cards render it. Never sent anywhere: the
// cards are shown inert while a tour runs on an empty list.
export const DEMO_IMAGE = "/img/tour/ejemplo-juego.svg";

const catan = {
  bgg_id: 13,
  type: 1,
  primary_name: "CATAN",
  alternate_names: ["CATAN", "Los Colonos de Catán"],
  thumbnail: DEMO_IMAGE,
  year: 1995,
  contains: [],
  min_players: null,
  max_players: null,
  min_playtime: null,
  max_playtime: null,
  dependency: 3.0,
  dependency_votes: { "1": 0, "2": 21, "3": 294, "4": 31, "5": 1 },
  rank: 597,
  rate: 7.09,
  rate_votes: 136656,
  weight: 2.29,
  weight_votes: 8409,
};

// Mi ludoteca: one copy of yours (GET api/elements/).
export const demoElement = {
  id: -1,
  game: catan,
  bgg_version_id: "other",
  name: "CATAN (1995)",
  thumbnail: DEMO_IMAGE,
  language: "Spanish",
  publisher: "Devir",
  year: "2015",
  box_size: 3,
  offered: null,
};

// The person shown as owner/offerer in the examples.
const demoMember = {
  id: -1,
  username: "ejemplo",
  first_name: "Persona",
  last_name: "de ejemplo",
  location: { id: -1, name: "AMBA", province: "AMBA", geolocation: null, mandatory_attendance: true },
  avatar: null,
  commitment: null,
  event_attendance: true,
};

// One offered copy (the `elements` entry of an item).
const demoCopy = {
  id: -1,
  element: { ...demoElement, id: null },
  box_status: "MB",
  component_status: "MB",
  images: "",
  comment: "",
};

// Yo ofrezco: one of your offered copies (GET .../user-items/).
export const demoMyItem = {
  id: -1,
  title: "CATAN (1995)",
  membership: demoMember,
  copies: 1,
  elements: [demoCopy],
  value: 5,
  group: null,
  added_mt: null,
  last_update: null,
  ready: true,
};

// Juegos ofrecidos: a game someone else offers (GET .../games/).
export const demoGame = {
  name: "CATAN",
  bgg_id: 13,
  type: 1,
  dependency: catan.dependency,
  rank: catan.rank,
  rate: catan.rate,
  weight: catan.weight,
  thumbnail: DEMO_IMAGE,
  ban_id: null,
  value: null,
  year: 1995,
  dependency_votes: catan.dependency_votes,
  rate_votes: catan.rate_votes,
  weight_votes: catan.weight_votes,
  matched_bgg_id: 0,
  items: [
    { id: -2, title: "CATAN (1995)", membership: demoMember, elements: [{ ...demoCopy, id: -2 }], value: null, ignored: false },
  ],
};
