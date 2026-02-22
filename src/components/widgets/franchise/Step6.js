import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step6({setStep, hasSpouse, setHasSpouse}) {

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
                hasSpouse != null && (
                    <button
                        className="btn btn-main btn-full" 
                        onClick={() =>  setStep(prev => prev + 1)}>
                            Continue
                    </button>
                    )
            }
            
        </div>
    </div>
  )
}

export default Step6