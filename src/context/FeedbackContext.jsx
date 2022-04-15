import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 5,
      text: 'This is 1st feedback',
    },
  ]);

  const [feedbackEditState, setFeedbackEditState] = useState({
    item: {},
    edit: false,
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete it?')) {
      console.log(id);
      setFeedback(() => feedback.filter((item) => item.id !== id));
    }
  };
  const addFeedback = (feed) => {
    feed.id = uuidv4();
    setFeedback([feed, ...feedback]);
  };

  const updateFeedback = (id, updatedItem) => {
    const updatedFeedbacks = feedback.map((feed) =>
      feed.id === id ? { ...feed, ...updatedItem } : feed
    );
    setFeedback(updatedFeedbacks);
    setFeedbackEditState({
      item: {},
      edit: false,
    });
  };

  const editFeedback = (item) => {
    setFeedbackEditState({
      item: item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEditState,
        handleDelete,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
