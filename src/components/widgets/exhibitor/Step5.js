import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step4({setStep, person, setDietary, allergies, setAllergies, dietaryOptionList, setDietaryOptionList}) {

    const [currentAllergy, setCurrentAllergy]                       = useState([]);

    useEffect(() => {
        //listTheDietaries();
    },[])

    const listTheDietaries = async () => {
        try{

            const diet = await axios.get(CONSTANTS.API_URL +"settings/list/dietaries/v2");
    
            if(diet.data.length > 0){
                setDietaryOptionList(diet.data);
            }
        }catch(errorData){
            console.log(errorData);
        }
    }

    const addAllergy = () => {
        if (currentAllergy.trim() !== "") {
            // Just append the new allergy to the existing array
            setAllergies([...allergies, currentAllergy.trim()]);
            setCurrentAllergy(""); // Clear the input
        }
    };

    // 2. Remove an allergy
    const removeAllergy = (indexToRemove) => {
        // Keep everything except the one at the specific index
        setAllergies(allergies.filter((_, index) => index !== indexToRemove));
    };

  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Dietary Requirements* </h5>
            <div className="graish mt-3">
                
            </div>
            <div className="event-list ">
                <label>Specify dietary needs and allergies for all attendies</label>
                <div className="green-block mb-3">    
                    <div className="mb-3">
                        <h5>Primary Contact: {person.name}</h5>   
                        {
                            dietaryOptionList.length > 0 && (
                                <div className="mb-3">
                                    <label>Dietary Requirements</label>
                                    <div className="custom-select-wrapper ">
                                        <select 
                                            className="form-control"
                                            onChange={(e) => setDietary(e.target.value)}
                                            value="69848cb90ca620e036ea3b9e"
                                            >
                                            {
                                                    dietaryOptionList.map((dietOption, index) => {
                                                        return <option key={index} value={dietOption._id}>{dietOption.title}</option>
                                                    })
                                            }
                                        </select>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                   
                    <div className="mb-3">
                                <label className="form-label">Allergies</label>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Peanuts"
                                        value={currentAllergy}
                                        onChange={(e) => setCurrentAllergy(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
                                    />
                                    <button 
                                        className="btn btn-outline-secondary" 
                                        type="button" 
                                        onClick={addAllergy}>
                                        Add
                                    </button>
                                </div>

                                {/* Render the list of added allergies */}
                                <div className="d-flex flex-wrap gap-2">
                                    {
                                        allergies.map((allergy, index) => (
                                            <span key={index} className="badge bg-info text-dark p-2 d-flex align-items-center">
                                                {allergy}
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white ms-2"
                                                    style={{ fontSize: '0.6rem' }}
                                                    onClick={() => removeAllergy(index)}
                                                    ></button>
                                            </span>
                                            ))
                                        }
                                    </div>
                    </div>
                    
                </div>
                 <div className="mt-3 mb-3">
                    <div className="info-orange">
                        <strong>Please note</strong><br/>
                        Changes to the dietary requirements will not be allowed during the lunch time of your selected date.
                    </div>
                 </div>                       
            </div>

            <button
                className="btn btn-main btn-full" 
                onClick={() => {
                    setStep(prev => prev + 1)
                }}>
                    Continue
            </button>
        </div>
    </div>
  )
}

export default Step4