import React, { useEffect } from 'react';
import InteractableSlide from './components/InteractableSlide';
import { useStore } from './store.jsx';


const App = () => {
  const { state } = useStore();

  useEffect(() => {
    console.log('Dialog messages:', state.dialog);
  }, [state.dialog]);


  return (
    <InteractableSlide/>
  );
};

export default App;
