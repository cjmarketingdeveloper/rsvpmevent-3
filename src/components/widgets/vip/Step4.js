import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step4({setStep, hasSpouse, setHasSpouse, setSpouseGoingEvent, listEventsPublic}) {
    const [selectedEvent, setSelectedEvent]                   = useState([]);

    const handleToggleHavingEvent = (eventObj) => {
      setSpouseGoingEvent(eventObj.eventCode);
      setSelectedEvent((prevSelected) => {
        // If the clicked event is already selected, deselect it (return null)
        // Otherwise, set the new eventObj as the only selected item
        return prevSelected?._id === eventObj._id ? null : eventObj;
      });
    };

  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Spouse Attendance </h5>
            <div className="graish mt-3">
                Will your spouse be attending?
            </div>
                
            <div className="mb-3 mt-3 question-box">
                <button 
                    type="button"
                    className={`btn ${hasSpouse ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                    onClick={() => setHasSpouse(true)}
                    >
                    Yes
                </button>
                <button 
                    type="button"
                    className={`btn ${hasSpouse === false ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                    onClick={() => setHasSpouse(false)}
                    >
                    No
                </button>
            </div>
             {
                hasSpouse === true && (
                     <div className="info-gray mt-2 mb-4">
                        Disclaimer: Unique contact details (email and phone) are required for each registrant. Please do not reuse information between accounts.
                    </div>
                )
            }
            
            {
                hasSpouse && (
                    <div className="mt-4 mb-2">
                        <label>Which event will your spouse be attending?</label>
                            {
                                listEventsPublic &&
                                listEventsPublic.length > 0 && (
                                <div className="event-list ">
                                    {
                                        listEventsPublic.map((myEvent, index ) => {
                                                const isSelected = selectedEvent?._id === myEvent._id;
                                        return <div className="event-item mb-3" key={index}>
                                                    <button
                                                            type="button"
                                                            className={`btn ${isSelected ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                                                            onClick={() => handleToggleHavingEvent(myEvent)}
                                                        >
                                                            {myEvent.title}
                                                        </button>
                                                </div>
                                        })
                                    }                     
                                    
                                </div>
                                )
                            }
                        </div>
                )
            }
            
            {
                hasSpouse != null && (
                    <>
                        <button
                            className="btn btn-main btn-full" 
                            onClick={() =>  setStep(prev => prev + 1)}>
                                Continue
                        </button>
                    </>
                    )
            }
            
        </div>
    </div>
  )
}

export default Step4