import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { FaUpload } from "react-icons/fa";

function Step2({setStep, setProcessing, EVENTCODE, setSelectedEvent, selectedEvent}) {

    const [listOfEvents, setListOfEvents]                                 = useState([]);
    
    useEffect(() => {
        collectEventsByEventCode();
    },[])

    const collectEventsByEventCode = async () => {
        try{

            setProcessing(true);
            const response = await axios.get(CONSTANTS.API_URL +"events/details/code/v1/" + EVENTCODE);
       
            setListOfEvents(response.data);
            setProcessing(false);
        }catch(err){
        setProcessing(false);
        }
    }

    const handleToggleHavingEvent = (eventObj) => {
      setSelectedEvent((prevSelected) => {
        // 1. Check if the object ID already exists in the array
        const exists = prevSelected.find((item) => item._id === eventObj._id);

        if (exists) {
          // 2. If it exists, filter it out (remove)
          return prevSelected.filter((item) => item._id !== eventObj._id);
        } else {
          // 3. If it doesn't exist, add the new object
          return [...prevSelected, eventObj];
        }
      });
    };

  return (
    <div className="card-step">
        <div className="card p-4 minor-blue">
            <h5>Clinic Conference Confirmation</h5>
              <div className="graish mt-3">
                Please confirm your attendance.
              </div>
             <div className="mt-3">
                {
                  listOfEvents &&
                  listOfEvents.length > 0 && (
                    <div className="event-list ">
                        {
                          listOfEvents.map((myEvent, index ) => {
                                  const isSelected = selectedEvent.some((item) => item._id === myEvent._id);
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