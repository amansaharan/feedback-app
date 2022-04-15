import { useState, useContext, useEffect } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEditState, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEditState.edit === true) {
      setText(feedbackEditState.item.text);
      setRating(feedbackEditState.item.rating);
      setBtnDisabled(false);
    }
  }, [feedbackEditState]);

  const handleChange = ({ target: { value } }) => {
    // 👈  get the value
    if (value === '') {
      setBtnDisabled(true);
      setMessage(null)

      // prettier-ignore
    } else if (value.trim().length < 10) {
      // 👈 check for less than 10
      setMessage('Text must be at least 10 characters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = { text: text, rating: rating };

    if (feedbackEditState.edit === true) {
      updateFeedback(feedbackEditState.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }

    setText('');
    setBtnDisabled(true);
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Please provide your valueable feedback</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            type='text'
            placeholder='please provide feedback'
            value={text}
            onChange={handleChange}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Submit
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}
export default FeedbackForm;
