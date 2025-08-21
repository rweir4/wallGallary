// src/index.js
import { createRoot } from "react-dom/client";

// src/App.jsx
import React, { useState } from "react";

// gymSeed.js
var CLIMBING_GYMS = [
  // Tennessee - Knoxville Area (Closest to Farragut)
  {
    id: 1,
    name: "Onsight Rock Gym",
    city: "Knoxville",
    state: "TN",
    address: "5335 Western Avenue, 37921",
    phone: "(865) 888-912",
    website: "https://www.onsightrockgym.com/?gad_source=1&gad_campaignid=1002661861&gbraid=0AAAAADQ3wZ4KnNuKYc7BEburXPJEBVTef&gclid=Cj0KCQjwh5vFBhCyARIsAHBx2wx_0VpwEDzQkM8EO_yePqd8eVAyrFVMRYpiuRRDB4YUH_VcSBylij8aAoPOEALw_wcB",
    services: ["Bouldering", "Top Rope", "Lead Climbing"],
    description: "Knoxville's largest indoor rock climbing gym",
    distance_from_farragut: 15,
    latitude: 35.9676,
    longitude: -83.9429
  },
  {
    id: 2,
    name: "The Climbing Center",
    city: "Knoxville",
    state: "TN",
    address: null,
    phone: null,
    website: "https://tcc.riversportsoutfitters.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing"],
    description: "Full gym with bouldering, top ropes, and lead climbing",
    distance_from_farragut: 15,
    latitude: 35.9606,
    longitude: -83.9207
  },
  {
    id: 3,
    name: "VolWall Climbing Gym",
    city: "Knoxville",
    state: "TN",
    address: "University of Tennessee, HPER Building Room 202B, Knoxville, TN",
    phone: null,
    website: "https://recsports.utk.edu/utop/climbing-wall/",
    services: ["Bouldering", "Rope Climbing"],
    description: "6,000 square feet split between bouldering and rope climbing",
    distance_from_farragut: 20,
    latitude: 35.9544,
    longitude: -83.9295
  },
  // Tennessee - Chattanooga Area
  {
    id: 4,
    name: "Synergy Climbing and Ninja",
    city: "Chattanooga",
    state: "TN",
    address: "427 East Main Street, Chattanooga, TN 37408",
    phone: null,
    website: "https://synergyclimbingandninja.com/",
    services: ["Bouldering", "Ninja Training", "Fitness"],
    description: "Large 25,000 sq ft facility with bouldering, ninja, and fitness",
    distance_from_farragut: 85,
    latitude: 35.0456,
    longitude: -85.3097
  },
  // Tennessee - Nashville Area
  {
    id: 5,
    name: "The Climb Gym Nashville West",
    city: "Nashville",
    state: "TN",
    address: null,
    phone: null,
    website: "https://theclimbgyms.com/nashville/",
    services: ["Bouldering", "Top Rope", "Lead Climbing", "Fitness"],
    description: "Part of The Climb Gyms chain with multiple Nashville locations",
    distance_from_farragut: 90,
    latitude: 36.1627,
    longitude: -86.7816
  },
  {
    id: 6,
    name: "The Climb Gym Nashville East",
    city: "Nashville",
    state: "TN",
    address: null,
    phone: null,
    website: "https://theclimbgyms.com/nashville-east/",
    services: ["Bouldering", "Top Rope", "Lead Climbing", "Fitness"],
    description: "Part of The Climb Gyms chain with multiple Nashville locations",
    distance_from_farragut: 85,
    latitude: 36.1627,
    longitude: -86.6816
  },
  {
    id: 7,
    name: "The Climb Gym Nashville South",
    city: "Nashville",
    state: "TN",
    address: null,
    phone: null,
    website: "https://theclimbgyms.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing", "Fitness"],
    description: "Part of The Climb Gyms chain with multiple Nashville locations",
    distance_from_farragut: 95,
    latitude: 36.0627,
    longitude: -86.7816
  },
  {
    id: 8,
    name: "The Climb Gym Murfreesboro",
    city: "Murfreesboro",
    state: "TN",
    address: null,
    phone: null,
    website: "https://theclimbgyms.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing", "Fitness"],
    description: "Part of The Climb Gyms chain",
    distance_from_farragut: 80,
    latitude: 35.8456,
    longitude: -86.3903
  },
  {
    id: 9,
    name: "The Crag Nashville",
    city: "Nashville",
    state: "TN",
    address: null,
    phone: null,
    website: "https://iloverockclimbing.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing"],
    description: "Indoor rock climbing in Nashville area",
    distance_from_farragut: 90,
    latitude: 36.1627,
    longitude: -86.7816
  },
  {
    id: 10,
    name: "The Crag Franklin",
    city: "Franklin",
    state: "TN",
    address: null,
    phone: null,
    website: "https://iloverockclimbing.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing"],
    description: "Indoor rock climbing in Franklin area",
    distance_from_farragut: 95,
    latitude: 35.9251,
    longitude: -86.8689
  },
  {
    id: 11,
    name: "High Point Climbing & Fitness",
    city: "Nashville",
    state: "TN",
    address: null,
    phone: null,
    website: "https://www.highpointclimbing.com/",
    services: ["Climbing", "Fitness", "Community Programs"],
    description: "Premier climbing, fitness, and community facility",
    distance_from_farragut: 90,
    latitude: 36.1627,
    longitude: -86.7816
  },
  // Georgia - Atlanta Metro
  {
    id: 12,
    name: "Central Rock Gym Atlanta",
    city: "Atlanta",
    state: "GA",
    address: null,
    phone: null,
    website: "https://centralrockgym.com/atlanta/",
    services: ["Lead Climbing", "Top Rope", "Bouldering", "Fitness", "Yoga"],
    description: "Offers lead climbing, top roping, bouldering, fitness, and yoga",
    distance_from_farragut: 100,
    latitude: 33.749,
    longitude: -84.388
  },
  {
    id: 13,
    name: "Central Rock Gym Midtown",
    city: "Atlanta",
    state: "GA",
    address: null,
    phone: null,
    website: "https://centralrockgym.com/midtown/",
    services: ["Lead Climbing", "Top Rope", "Bouldering", "Fitness", "Yoga"],
    description: "Listed among top climbing gyms in Atlanta",
    distance_from_farragut: 95,
    latitude: 33.771,
    longitude: -84.3857
  },
  {
    id: 14,
    name: "The Overlook Boulder + Fitness",
    city: "Atlanta",
    state: "GA",
    address: "Atlanta BeltLine's Westside Trail",
    phone: null,
    website: "https://overlookclimbing.com/",
    services: ["Bouldering", "Fitness Classes"],
    description: "Located on the Atlanta BeltLine's Westside Trail with bouldering and fitness classes",
    distance_from_farragut: 98,
    latitude: 33.749,
    longitude: -84.428
  },
  {
    id: 15,
    name: "Wall Crawler Rock Club",
    city: "Atlanta",
    state: "GA",
    address: null,
    phone: null,
    website: "https://wallcrawlerclimbing.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing"],
    description: "Over 8,800 square feet of climbing surface",
    distance_from_farragut: 100,
    latitude: 33.749,
    longitude: -84.388
  },
  {
    id: 16,
    name: "Stone Summit Climbing & Fitness Center",
    city: "Atlanta",
    state: "GA",
    address: null,
    phone: null,
    website: "https://centralrockgym.com/atlanta/",
    services: ["Top Rope", "Lead Climbing", "Bouldering", "Yoga", "Fitness"],
    description: "Features walls 25-60 feet high, bouldering room, yoga studio (Now part of Central Rock Gym)",
    distance_from_farragut: 95,
    latitude: 33.749,
    longitude: -84.388
  },
  {
    id: 17,
    name: "Adrenaline Climbing",
    city: "Suwanee",
    state: "GA",
    address: null,
    phone: null,
    website: "https://www.adrenalineclimbing.com/",
    services: ["Auto Belay", "Bouldering", "Top Rope"],
    description: "10 auto belays and bouldering",
    distance_from_farragut: 85,
    latitude: 34.0512,
    longitude: -84.0719
  },
  {
    id: 18,
    name: "Escalade Rock Climbing",
    city: "Kennesaw",
    state: "GA",
    address: null,
    phone: null,
    website: "https://www.escaladegym.com/",
    services: ["Bouldering", "Top Rope", "Lead Climbing"],
    description: "Among Atlanta's top climbing gyms",
    distance_from_farragut: 90,
    latitude: 34.0234,
    longitude: -84.6155
  }
];

// src/components/Card.jsx
import { jsx, jsxs } from "react/jsx-runtime";
var Card = ({ currentGym, setCurrentGym }) => {
  const gymInfo = CLIMBING_GYMS.find((gym) => gym.id === currentGym);
  return /* @__PURE__ */ jsxs("div", { className: "card-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "gym-info", children: [
      /* @__PURE__ */ jsx("h1", { children: gymInfo.name }),
      /* @__PURE__ */ jsx("h2", { children: gymInfo.city })
    ] }),
    /* @__PURE__ */ jsx("iframe", { src: `${gymInfo.website}`, frameborder: "0", title: `${gymInfo.name}`, className: "gym-embed" }),
    /* @__PURE__ */ jsx("button", { className: "arrow", onClick: (() => currentGym > 1 && setCurrentGym(currentGym - 1)), children: /* @__PURE__ */ jsx("img", { src: "images/left-arrow.png" }) }),
    /* @__PURE__ */ jsx("button", { className: "arrow", onClick: (() => currentGym < CLIMBING_GYMS.length && setCurrentGym(currentGym + 1)), children: /* @__PURE__ */ jsx("img", { src: "images/right-arrow.png" }) })
  ] });
};
var Card_default = Card;

// src/App.jsx
import { jsx as jsx2 } from "react/jsx-runtime";
var App = () => {
  const [currentGym, setCurrentGym] = useState(1);
  return /* @__PURE__ */ jsx2(Card_default, { currentGym, setCurrentGym });
};
var App_default = App;

// src/index.js
import { jsx as jsx3 } from "react/jsx-runtime";
var domNode = document.getElementById("root");
var root = createRoot(domNode);
root.render(/* @__PURE__ */ jsx3(App_default, {}));
