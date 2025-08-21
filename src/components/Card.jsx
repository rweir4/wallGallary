const Card = ({ gym, setCurrentGym }) => {
  return (
    <div className="card-container">
      {gym.name}
      {gym.city}
      {/* <button onClick={(() => setCurrentGym(nextGym))}></button> */}
    </div>
  );
}

export default Card;

// id: 1,
// name: "Onsight Rock Gym",
// city: "Knoxville",
// state: "TN",
// address: "5335 Western Avenue, 37921",
// phone: (865) 888-912,
// website: "https://www.onsightrockgym.com/?gad_source=1&gad_campaignid=1002661861&gbraid=0AAAAADQ3wZ4KnNuKYc7BEburXPJEBVTef&gclid=Cj0KCQjwh5vFBhCyARIsAHBx2wx_0VpwEDzQkM8EO_yePqd8eVAyrFVMRYpiuRRDB4YUH_VcSBylij8aAoPOEALw_wcB",
// services: ["Bouldering", "Top Rope", "Lead Climbing"],
// description: "Knoxville's largest indoor rock climbing gym",
// distance_from_farragut: 15,
// latitude: 35.9676,
// longitude: -83.9429