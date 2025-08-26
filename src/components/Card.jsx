const RESTRICTED_WEBSITES = ['reddit'];

const Card = ({ currentGym, onPrev, onNext }) => {
  const isRestricted = RESTRICTED_WEBSITES.find(url => url.match(/`${currentGym?.website}`/g));
  // console.log('is restricted', isRestricted)

  return (
    <div className="card-container">
      <div className="gym-info">
        <h1>{currentGym.name}</h1>
        <h2>{currentGym.city}</h2>
      </div>
      {isRestricted ?
        <iframe src={`${currentGym.website}`} frameborder="0" title={`${currentGym.name}`} className="gym-embed" /> :
        <img className="generic-embed-img" src='images/climbing-generic.png' />
      }
      <button className="arrow" onClick={onPrev}>
        <img src='images/left-arrow.png' />
      </button>
      <button className="arrow" onClick={onNext}>
        <img src='images/right-arrow.png' />
      </button>
    </div>
  );
}

export default Card;