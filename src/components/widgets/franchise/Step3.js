import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step3({setStep, selectedProfessions, setSelectedProfessions, EVENTCODE, setProcessing, setQuestGalaKind}) {

    const [jobTitles, setJobTitles]                                 = useState([]);
    const [hasOther, setHasOther]                                   = useState(false);
    
    useEffect(() => {
        collectListOfJobTitles();
    },[])

    const collectListOfJobTitles = async () => {
        try{

            setProcessing(true);
            const response = await axios.get(CONSTANTS.API_URL +"users/profile/job-titles/v1/" + EVENTCODE);
            
            if(response.data.length > 0){
                setJobTitles(response.data);
            }
            setProcessing(false);
        } catch(err){
            console.log(err);
            setProcessing(false);
        }
    }

  return (
    <div className="card-step">
        <div className="card p-4">
          
            <div className="mt-4">
                <h5>Select Your Designation</h5>
                <p className="graish">Choose the option that best describes you.</p>

                <button 
                        type="button"
                        className={`btn ${selectedProfessions === "Franchisee" ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                        onClick={() => {
                                setSelectedProfessions("Franchisee");
                                setHasOther(false);  
                                setQuestGalaKind("Will you attend the Gala Dinner");     
                            }}
                    >
                    Franchisee
                </button>

                <button 
                        type="button"
                        className={`btn ${selectedProfessions === "Responsible Pharmacist" ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                        onClick={() => {
                            setSelectedProfessions("Responsible Pharmacist");
                            setHasOther(false); 
                            setQuestGalaKind("Will you attend the Boma Dinner");         
                            }
                        }
                    >
                    Responsible Pharmacist
                </button>

                <button 
                        type="button"
                        className={`btn ${selectedProfessions === "Pharmacy Manager" ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                        onClick={() => {
                                setSelectedProfessions("Pharmacy Manager");
                                setHasOther(false); 
                                setQuestGalaKind("Will you attend the Boma Dinner");         
                            }
                        }
                    >
                    Pharmacy Manager
                </button>

                <button 
                    type="button"
                    className={`btn btn-outline-simple btn-full mb-3`}
                    onClick={() => setHasOther(!hasOther)}
                    >
                    {hasOther ? '' : 'Other'}
                </button>
                
                 {
                    hasOther && (
                        <div className="input-other mt-2">
                            <input 
                                type="text" 
                                className="form-control mb-2" 
                                onChange={(e) => {
                                    setSelectedProfessions(e.target.value);
                                    setQuestGalaKind("Will you attend the Boma Dinner");  
                                  }
                                }
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
        </div>  
    </div>
  )
}

export default Step3