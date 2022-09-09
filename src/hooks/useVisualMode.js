import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //for keeping track of prev state for going back a page
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    //console.log('newMode',newMode);
    //console.log('current mode:', mode);
    setMode(newMode);
    const newHistory = history.pop(); 
    replace ?  
    setHistory([...newHistory,newMode]) : 
    setHistory([...history,newMode]);
  
    //console.log(history);
  }

  function back() {
    //cannot go back past initial
    //history will always be set to
    console.log('history',history)
    if(history.length > 1) {
      const newHistory = history.pop();
      console.log('new history', newHistory);
      setHistory([...newHistory]);
    }
  }

  return { mode, transition, back };
}
