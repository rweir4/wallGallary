const Card = ({ currentGym, onPrev, onNext }) => {
  return (
    <div className="card-container">
      <div className="gym-info">
        <h1>{currentGym.name}</h1>
        <h2>{currentGym.city}</h2>
      </div>
      <iframe src={`${currentGym.website}`} frameborder="0" title={`${currentGym.name}`} className="gym-embed"></iframe>
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