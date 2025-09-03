import React, { useState, useEffect } from 'react'
import style from "./Timer.module.css"
import { calculateTime, formatTime } from '../utils/auxiliaryFunctions';


const Timer = () => {
  const [time,setTime] = useState(0); //current time
  const [initialTime,setInitialTime] = useState(0); //time set by user
  const [isRunning,setIsRunning] = useState(false);
  const [editState,setEditState] = useState({ field: null, value: '' });

  //useEffect hook to update the progress bar as time counts down
  useEffect(()=>{
    setInterval(()=>{
      const progress = initialTime > 0 ? (time / initialTime) * 100 : 0;
      document.documentElement.style.setProperty('--progress', `${progress}%`);
    })
  },[time,initialTime])

  // useEffect hook to change the current time when its running
  useEffect(()=>{
    let interval = null;
    if(time>0 && isRunning){
      interval = setInterval(()=>{
        setTime(t=> t-1)
      },1000)
    }
    else if(time ===0){
      setIsRunning(false)
    }
    return () => {
      if (interval) clearInterval(interval); // cleanup part
    };
  },[isRunning,time])

  //function to edit the time 
  const handleEditField = (field) =>{
    //if editting is finished
    if (editState.field === field){
      const newTime = {
        ...formatTime(time),
        [field]: editState.value.padStart(2, '0') 
      };
    const calculatedTime = calculateTime(newTime.hours,newTime.minutes,newTime.seconds);
   // Update time and initial time with the new calculated value
   setTime(calculatedTime);
   setInitialTime(calculatedTime);

   // Reset editing state
   setEditState({ field: null, value: '' });
    }
    else{
      //editting starts
      setIsRunning(false); //timer is stoppped while editting
      setEditState({ field, value: formatTime(time)[field].replace(/^0+/, '') }); // to set the field and remove leading zeros 
      
    }
  };
   // Handle input changes for editing time fields 
   const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2); // Allow only numbers, max 2 digits
    setEditState((prevState) => ({ ...prevState, value })); // Update only the value in editState
  };

  const { hours, minutes, seconds} = formatTime(time);


  return (
    <div className={style.timerApp}>
      <div className={style.timerDisplay}>
        <div className={style.timerCircle}>
          <div className={style.timerTime}>
            {editState.field === 'hours' ? (
              <input
                className={style.timeInput}
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField('hours')}
                autoFocus
              />
            ) : (
              <span className={style.timeUnit} onClick={() => handleEditField('hours')}>{hours}</span>
            )}
            :
            {editState.field === 'minutes' ? (
              <input
                className={style.timeInput}
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField('minutes')}
                autoFocus
              />
            ) : (
              <span className={style.timeUnit} onClick={() => handleEditField('minutes')}>{minutes}</span>
            )}
            :
            {editState.field === 'seconds' ? (
              <input
                className={style.timeInput}
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField('seconds')}
                autoFocus
              />
            ) : (
              <span className={style.timeUnit} onClick={() => handleEditField('seconds')}>{seconds}</span>
            )}
          </div>
        </div>
      </div>
      <div className={style.actionButtons}>
        <button className={style.actionButton} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'} {/* Toggle between Start and Pause */}
        </button>
        <button className={style.actionButton} onClick={() => { setTime(0); setInitialTime(0); setIsRunning(false); }}>
          Reset {/* Reset the timer */}
        </button>
      </div>
    </div>
  );
}

export default Timer