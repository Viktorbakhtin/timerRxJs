import React, { Component } from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsub = new Subject();
    interval(1000)
      .pipe(takeUntil(unsub)).subscribe(() => {
        if (status === "run") {
          setSec(a => a + 1000);
        }
      });
    return () => {
      unsub.next();
      unsub.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus("run");
  }, []);

  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
  }, []);

  const wait = () => {
    setCount(count + 1)
    interval(300)
    if (count >= 2) {
      setCount(0)
      setStatus("wait");
    } else return false
  }

  return (
    <div>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      {
        status == 'run' ? <button className="stop-button" onClick={stop}>
          Stop
        </button> : <button className="stop-button" onClick={start}>
          Start
        </button>
      }
      <button onClick={reset}>Reset</button>
      <button onClick={wait}>Wait</button>
    </div>
  );
}
export default App;
