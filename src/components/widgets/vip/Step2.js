import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step2({setStep, pDetails, selectedEvent, setSelectedEvent, EVENTCODES,
            goingEvent, setGoingEvent, setListEventsPublic, setProcessing}) {

    const [listOfEvents, setListOfEvents]                                 = useState([]);
  
    useEffect(() => {
      collectEventsByEventCode();
    },[])

    const collectEventsByEventCode = async () => {
      try{

          const conditions = {
            "eventCodes" : EVENTCODES
          }
          setProcessing(true);
          const response = await axios.put(CONSTANTS.API_URL +"events/details/codes/v2/" , conditions);
          setListOfEvents(response.data);
          setListEventsPublic(response.data);
          setProcessing(false);
      }catch(err){
        console.log(err);
        setProcessing(false);
      }
    }

    const handleToggleHavingEvent = (eventObj) => {
      setGoingEvent(eventObj.eventCode);
      setSelectedEvent((prevSelected) => {
        // If the clicked event is already selected, deselect it (return null)
        // Otherwise, set the new eventObj as the only selected item
        return prevSelected?._id === eventObj._id ? null : eventObj;
      });
    };

  return (
    <div className="card-step">
        <div className="card p-4">
             <h5>Event Selection</h5>
              <p className="graish">Select which events you will be attending.</p>
            <div className="mt-4">
              {
                listOfEvents &&
                listOfEvents.length > 0 && (
                  <div className="event-list ">
                      {
                        listOfEvents.map((myEvent, index ) => {
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
            
            <button 
                    className="btn btn-main btn-full mt-2"
                    onClick={() => 
                      {     
                        setStep(prev => prev + 1);
                      }
                    }>Select & Continue
                </button>
        </div>
    </div>
  )
}

export default Step2