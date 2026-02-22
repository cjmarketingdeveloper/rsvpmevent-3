import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step1({setStep, pDetails, setPDetails}) {


  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Pharmacy Details </h5>
            <div className="graish mt-3">
                Enter pharmacy details
            </div>
            <input 
                type="text"
                className="form-control mt-3 mb-3"
                value={pDetails}
                placeholder="Enter pharmacy name"
                onChange={ (e) => setPDetails(e.target.value)}
                />

            {
                pDetails.length > 1 && (
                     <button
                        className="btn btn-main btn-full" 
                        onClick={() => {
                            setStep(prev => prev + 1)
                        }}>
                            Continue
                    </button>
                )
            }

        </div>
    </div>
  )
}

export default Step1