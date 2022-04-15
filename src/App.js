import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FeedbackList from './components/FeedbackList';
import Header from './components/Header';

import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import About from './pages/About';

import { FeedbackProvider } from './context/FeedbackContext';

const App = () => {
  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FeedbackProvider>
  );
};

export default App;
