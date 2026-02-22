import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function StepAccomodation({setStep,  
        hasSpouse,
        personAccomodation, setPersonAccomodation,
        spouseAccomodation, setSpouseAccomodation,
        setAccomodationType, setSpouseAccomodationType, setSpecialAccomodation
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
                    </div>
                    )
            }
             <div className="mb-3">
                <label>Any special accomodation requirements?</label>
                <textarea className="form-control" onClick={(e) => setSpecialAccomodation(e.target.value)}>
                </textarea>
             </div>
            {
                /*
                hasSpouse && (
                   <>
                     <div className="mb-3">
                        <label>Does your spouse require accomodation</label>
                        <button 
                                type="button"
                                className={`btn ${spouseAccomodation ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                                onClick={() => setSpouseAccomodation(true)}
                                >
                                Yes
                            </button>
                            <button 
                                type="button"
                                className={`btn ${spouseAccomodation === false ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                                onClick={() => setSpouseAccomodation(false)}
                                >
                                No
                            </button>
                        </div>

                         {
                            spouseAccomodation && (
                                <div className="mb-3">
                                    <label>What type of accomodation do you require?</label>
                                    <select className="form-control" onChange={(e) => setSpouseAccomodationType(e.target.value)}>
                                        <option value="">Select Accomodation Type</option>
                                        <option value="single">Single (1 person -  not sharing)</option>
                                        <option value="double">Double (2 people - sharing)</option>
                                    </select>
                                     <div className="mt-3 mb-4 info-gray">
                                        Notice: Single accomodation will be charged on to the attendees own account.
                                    </div>
                                </div>
                                )
                        }
                   </>
                )
                */
            }

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