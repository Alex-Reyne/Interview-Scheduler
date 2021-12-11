import React, { useState } from "react"

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode])

  const transition = (newMode, replace=false) => {

    if (replace) {
      history.pop();
    }

    setHistory([...history, newMode]);
    setMode(newMode);
  }

  const back = () => {
    if (history.length === 1) {
      return;
    }

    history.pop();
    const lastMode = history.length - 1;

    setMode(history[lastMode]);
  }

  return { mode, transition, back }
}