import { CLIMBING_GYMS } from '../../gymSeed';

const Card = ({ currentGym, setCurrentGym }) => {
  const gymInfo = CLIMBING_GYMS.find(gym => gym.id === currentGym);
  return (
    <div className="card-container">
      <div className="gym-info">
        <h1>{gymInfo.name}</h1>
        <h2>{gymInfo.city}</h2>
      </div>
      <iframe src={`${gymInfo.website}`} frameborder="0" title={`${gymInfo.name}`} className="gym-embed"></iframe>
      <button className="arrow" onClick={(() => currentGym > 1 && setCurrentGym(currentGym - 1))}>
        <img src='images/left-arrow.png' />
      </button>
      <button className="arrow" onClick={(() => currentGym < CLIMBING_GYMS.length && setCurrentGym(currentGym + 1))}>
        <img src='images/right-arrow.png' />
      </button>
    </div>
  );
}

export default Card;