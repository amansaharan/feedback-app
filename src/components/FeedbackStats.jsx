import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  let rating = feedback.reduce((acc, current) => {
    return acc + current.rating;
  }, 0);
  let average = rating / feedback.length;
  average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>
        {feedback.length === 0
          ? 'No reviews'
          : feedback.length === 1
          ? '1 review'
          : `${feedback.length} reviews`}
      </h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}
export default FeedbackStats;
