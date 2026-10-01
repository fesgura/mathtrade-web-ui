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
