import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function StepAccomodation({setStep,
        personAccomodation, setPersonAccomodation,
        accomodationType, setAccomodationType,
        setPersonAccomPrefferedName, setPersonAccomPrefferedPharmacy, setPersSpecialArrange
    }) {


  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Accomodation Attendance </h5>                
            <div className="mb-3 mt-3 question-box">
                <label>Do you require accomodation?</label>
                <button 
                    type="button"
                    className={`btn ${personAccomodation ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                    onClick={() => setPersonAccomodation(true)}
                    >
                    Yes
                </button>
                <button 
                    type="button"
                    className={`btn ${personAccomodation === false ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                    onClick={() => setPersonAccomodation(false)}
                    >
                    No
                </button>
            </div>
            
            {
                 personAccomodation && (
                    <div className="mb-4">
                        <label>What type of accomodation do you require?</label>
                        <div className="custom-select-wrapper">
                            <select className="form-control" onChange={(e) => setAccomodationType(e.target.value)}>
                                <option value="">Select Accomodation Type</option>
                                <option value="single">Single (1 person -  not sharing)</option>
                                <option value="double">Double (2 people - sharing)</option>
                            </select>
                        </div>
                        {
                            accomodationType === "single" &&  (<div className="mt-3 info-gray mb-3">
                            Notice: Single accomodation will be charged on to the attendees own account.
                        </div>)
                        }
                        {
                            accomodationType === "double" &&   (<div className="mt-3 mb-3">
                              Sharing allocation suggestion (optional)<br/>
                              <label> Preferred Sharing Partner -Name & Surname</label>
                            
                                <input 
                                    type="text" 
                                    className="form-control mb-3" onChange={(e) => setPersonAccomPrefferedName(e.target.value)}
                                    placeholder="Enter partners full name" />
                              
                              <label>Pharmacy name of Preferred sharing Partner </label>
                              <input 
                                    type="text" 
                                    className="form-control mb-3" onChange={(e) => setPersonAccomPrefferedPharmacy(e.target.value)}
                                    placeholder="Enter partners pharmacy" />
                        </div>)
                        }
                        
                    </div>
                    )
            }

             <div className="mb-3">
                <label>Any special accomodation requirements?</label>
                <textarea className="form-control"  onChange={(e) => setPersSpecialArrange(e.target.value)}>
                </textarea>
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

export default StepAccomodation