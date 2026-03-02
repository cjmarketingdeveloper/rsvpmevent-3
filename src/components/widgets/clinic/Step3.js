import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step3({setStep, clinicDesignation, setClinicDesignation, setPCDTOption}) {

  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Select your Designation </h5>
          
            <div className="mt-4">
                <p className="graish">Choose the option that best describes you.</p>
                <button 
                        type="button"
                        className={`btn ${clinicDesignation === 'PCDT Pharmacist' ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                        onClick={() => {
                                setClinicDesignation('PCDT Pharmacist');
                                setPCDTOption(true);
                             }
                        }                      
                    >
                    PCDT Pharmacist
                </button>

                <button 
                        type="button"
                        className={`btn ${clinicDesignation === 'Clinic Nurse' ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                        onClick={() => {
                                setClinicDesignation('Clinic Nurse');
                                setPCDTOption(false);
                            }
                        }
                    >
                    Clinic Nurse
                </button>
                
            </div>
            {clinicDesignation.length > 0 && (
            <button
                className="btn btn-main btn-full" 
                onClick={() =>  setStep(prev => prev + 1)}>
                    Continue
            </button>)}
        </div>
    </div>
  )
}


export default Step3