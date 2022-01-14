import React, { Component } from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function App() {


  
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
  const [count, setCount] = useState(1);
  console.log("fdsfdf",count)

 
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
 
  const wait = React.useCallback(() => {
    increment()
    setStatus("wait");
  }, []);

  const increment = React.useCallback(() => {
    setCount(count + 1);
    console.log(count,"внизху")
  }, []);

  return (
    <div>
      <p>Вы кликнули {count} раз(а)</p>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className="start-button" onClick={start}>
        Start
      </button>
      <button className="stop-button" onClick={stop}>
        Stop
      </button>
      <button onClick={reset}>Reset</button>
      <button onClick={wait}>Wait</button>
    </div>
  );
}

export default App;
