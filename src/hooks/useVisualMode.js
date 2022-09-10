import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //for keeping track of prev state for going back a page
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
  
    setMode(newMode);

    replace ?  
    setHistory(prev => [...prev.slice(0,-1), newMode]) : 
    setHistory(prev => [...prev,newMode]);
  
  }

  function back() {

    if(history.length > 1) {

      setMode(history[history.length -2]);
      setHistory(prev => [...prev.slice(0,-1)]);
      //USED POP EARLIER WHY DID IT HAVE THE BUG WHERE on the second click it got rid of everything
      // must be mutating the original array
    }

  }

  return { mode, transition, back };
}
