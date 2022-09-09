import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //for keeping track of prev state for going back a page
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
  
    setMode(newMode);

    const replaceHistory = [...history];
    replaceHistory[replaceHistory.length-1] = newMode;
   
    console.log('replaceHistory:',replaceHistory);

    replace ?  
    setHistory([...replaceHistory]) : 
    setHistory([...history,newMode]);
  
    //console.log(history);
  }

  function back() {
  
    if(history.length > 1) {
      const newHistory = history.pop();
      //console.log('new history', newHistory);
      setHistory([...newHistory]);
      setMode(history[history.length -1]);
    }
  }

  return { mode, transition, back };
}
