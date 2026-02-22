import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";


function Step3({setStep, selectedProfessions, setSelectedProfessions, EVENTCODE, setProcessing}) {

    const [jobTitles, setJobTitles]                                 = useState([]);
    const [hasOther, setHasOther]                                   = useState(false);
   
    useEffect(() => {
        collectListOfJobTitles();
    },[])

    const collectListOfJobTitles = async () => {
        try{

            setProcessing(true);
            const response = await axios.get(CONSTANTS.API_URL +"users/profile/job-titles/v1/" + EVENTCODE);
            //console.log(response.data);
            if(response.data.length > 0){
                setJobTitles(response.data);
            }
            setProcessing(false);
        } catch(err){
            console.log(err);
            setProcessing(false);
        }
    }

    const handleTogglingJob = (job) => {
        if(hasOther){
            setHasOther(false);
        }
        setSelectedProfessions((prevProf) => {
            // If the same job is clicked, clear the selection (toggle off)
            // Otherwise, replace the string with the new job
            return prevProf === job ? "" : job;
        });
    };
  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Select your Designation </h5>
            <p className="graish">Choose the option that best describes you.</p>
             {
                    jobTitles.length > 0 && (
                        <div className="question-box">
                            {
                                jobTitles.map((job, index) => {
                                     const isSelected = selectedProfessions === job;
                                    return <button 
                                                type="button"
                                                className={`btn ${isSelected ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                                                onClick={() => handleTogglingJob(job)}
                                                key={index}
                                            >
                                            {job}
                                        </button>
                                          
                                })
                            }
                         

                            {
                                hasOther && (
                                    <div className="input-other">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            onChange={(e) => setSelectedProfessions(e.target.value)}
                                            placeholder="Enter your Designation"
                                            />
                                    </div>
                                )
                            }
                            {
                                selectedProfessions.length > 0  && (
                                                                <button 
                                                                    className="btn btn-main btn-full mt-2"
                                                                    onClick={() => 
                                                                    {                                                                   
                                                                        setStep(prev => prev + 1);
                                                                    }
                                                                    }>Continue
                                                                </button>)
                            }
                        </div>
                    )
                }
        </div>
    </div>
  )
}


export default Step3