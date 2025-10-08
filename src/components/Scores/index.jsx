import React from 'react';
import { ScoreBoardContext } from "../../Context/Context";
import './index.css';
import { useNavigate } from 'react-router-dom';

function Scores() {

  const navigate = useNavigate()
  const onClickBeatBtn = () => {
      navigate('/instructions')
  }

  // const { resultList } = useContext(ScoreBoardContext);
  const currentUser = localStorage.getItem("username")
  const resultList = JSON.parse(localStorage.getItem(`results_${currentUser}`))
 
  if (resultList.length === 0) {
    return (
      <div className="no-scores-container">
      <img 
        src="https://i.pinimg.com/736x/02/b8/0d/02b80d0b48ce0a7c4196dcd8e335c661.jpg" 
        alt="No Data" 
        className="no-data-image" 
      />
      <p className="no-scores-msg">You haven't played any challenges yet!</p>
      <button className="play-button" onClick={() => navigate('/instructions')}>Play Now</button>
    </div>
    )
  }

  // Find best score
  const bestScore = resultList.reduce((max, score) => {
    if (score.acc > max.acc) {
      return score;
    } else if (score.acc === max.acc) {
      return score.k < max.k ? score : max;
    } else {
      return max;
    }
  }, resultList[0]);

  // Get last 10 games (most recent)
  const recentScores = resultList.slice(-10).reverse();

  

  return (
    <div className="scoreboard-container">
      <h1>My Scores</h1>
      <div className="best-score-wrapper">
      <li className="best-score-card">
        <div className="best-score-left">
          <img src="https://i.pinimg.com/736x/74/bf/5d/74bf5dd33eb695c50d257bac94b34c2b.jpg" alt="Badge" className="score-image" />
          <div className="best-score-label">Best Score</div>
        </div>
        <div className="best-score-right">
          <p><span className="time-taken-text">Time Taken: </span>{bestScore.k}s</p>
          <p><span className="accuarcy-text">Accuracy: </span>{bestScore.acc.toFixed(2)}%</p>
          <button className="beat-button" onClick={onClickBeatBtn}>Beat it!</button>
        </div>
      </li>
    </div>


      <h2>🕒 Recent Scores</h2>
      <ul className="score-grid">
        {recentScores.map((scoreItem, index) => (
          <li key={index} className="score-card">
            <div className="circle-wrapper">
              <svg className="progress-ring" width="100" height="100">
                <circle className="ring-bg" stroke="#eee" strokeWidth="8" fill="transparent" r="45" cx="50" cy="50" />
                <circle
                  className="ring-progress"
                  stroke={scoreItem.acc >= 90 ? "#4caf50" : scoreItem.acc >= 70 ? "#ff9800" : "#f44336"}
                  strokeWidth="8"
                  fill="transparent"
                  r="45"
                  cx="50" cy="50"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - scoreItem.acc / 100)}`}
                />
              </svg>
              <div className="circle-text">{scoreItem.acc.toFixed(0)}%</div>
            </div>
            <p className="score-detail"><span className='time-taken-text'>Time Taken : </span>{scoreItem.k}s</p>
            <p className="score-detail"><span className='accuarcy-text'>Accuracy: </span>{scoreItem.acc.toFixed(2)}%</p>
            <p className="timestamp">{scoreItem.timeStamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scores;
