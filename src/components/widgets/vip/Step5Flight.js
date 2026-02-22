import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { FaUpload } from "react-icons/fa";

function Step5Flight({setStep,  
            needFlight, setNeedFlight, personAirport, setPersonAirport
        }) {

        const [listAirports, setListAirports]                           = useState([]);

        useEffect(() => {
            fetchAirports();  
        },[])
    

        const fetchAirports = async () => {
            try {
                
                const response = await axios.get(CONSTANTS.API_URL +"flights/airports/collect/list/v1");
                setListAirports(response.data);
            } catch (error) {
                console.log("Error fetching airports", error);
            }
        }

  return (
    <div className="card-step">
        <div className="card p-4 minor-blue">
            <h5>Primary VIP</h5>
                            
            <div className="mb-3 mt-3 question-box">
                                       
                    <div className="mb-3">
                        <label>Will you require a flight</label>
                        <button 
                            type="button"
                            className={`btn ${needFlight ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setNeedFlight(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${!needFlight ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => {
                                        setNeedFlight(false);
                                        setPersonAirport("")
                                    }
                                }
                            >
                            No
                        </button>
                    </div>
                    {
                        needFlight && (
                            <div className="mb-3">
                                <label>Preferred Airport</label>
                                <div>
                                    Select depature airport (Outside Gauteng only)
                                </div>
                                <div className="custom-select-wrapper ">
                                    <select 
                                        className="form-control"
                                        onChange={(e) => setPersonAirport(e.target.value)}
                                        defaultValue=""
                                        >
                                        <option value="" disabled hidden>Specify Airport</option>
                                        {
                                                listAirports.map((airport) => {
                                                    return <option key={airport._id} value={airport.title}>{airport.title}</option>
                                                })
                                        }
                                    </select>
                                </div>
                                <div className="info-gray mt-2 mb-4">
                                    Disclaimer: The attendee is responsible for any cost related to missed flights, or changes made after booking.
                                </div>
                            </div>
                        )
                    }

                              
            </div>
            
            <button
                className="btn btn-main btn-full" 
                onClick={() => setStep(prev => prev + 1)}>
                    Continue
            </button>
        </div>
    </div>
  )
}

export default Step5Flight