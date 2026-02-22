import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { FaUpload } from "react-icons/fa";

function Step5({setStep,  
            personInformation, setPersonInformation, setPersonDietary,
            personDietary, setPersonClinicEvent, setPersonAirport
        }) {

        const [dietaryOptionList, setDietaryOptionList]                 = useState([]);

        const [currentAllergy, setCurrentAllergy]                       = useState('');
        const fileInputRef                                              = useRef(null);

        useEffect(() => {
            listTheDietaries();
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
        
        const handleDivClick = () => {
            // This triggers the hidden file input's click event
            fileInputRef.current.click();
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            
            // Simple validation for 2MB
            if (file && file.size > 4 * 1024 * 1024) {
                toast.warning("File is too large! Please upload a document smaller than 4MB.");
                e.target.value = null; // Clear input
                return;
            }

            setPersonInformation((prev) => ({
                ...prev,
                IdDocument: file,
                })
            );
        };

        const addAllergy = () => {
            if (currentAllergy.trim() !== '') {
                setPersonInformation((prev) => ({
                    ...prev,
                    allergies: [...prev.allergies, currentAllergy.trim()],
                }));

                setCurrentAllergy(''); // Clear the small input field
            }
        };

        // 2. Remove allergy from the array
        const removeAllergy = (indexToRemove) => {
            setPersonInformation((prev) => ({
            ...prev,
            allergies: prev.allergies.filter((_, index) => index !== indexToRemove),
            }));
        };

  

  return (
    <div className="card-step">
        <div className="card p-4 minor-blue">
            <h5>Primary Attendee Dietary Requirements & Allergies</h5>
                            
            <div className="mb-3 mt-3 question-box">
                    
                    {
                        dietaryOptionList.length > 0 && (
                            <div className="mb-3">
                                <label>Dietary Requirements</label>
                                <div className="custom-select-wrapper ">
                                    <select 
                                        className="form-control"
                                        onChange={(e) => setPersonDietary(e.target.value)}
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
                            {personInformation.allergies.map((allergy, index) => (
                            <span key={index} className="badge bg-info text-dark p-2 d-flex align-items-center">
                                {allergy}
                                <button
                                    type="button"
                                    className="btn-close btn-close-white ms-2"
                                    style={{ fontSize: '0.6rem' }}
                                    onClick={() => removeAllergy(index)}
                                    ></button>
                            </span>
                            ))}
                        </div>
                </div>

                <div className="mb-3">
                    {/*
                   <div 
                        onClick={handleDivClick}
                        className="input-dialogue"
                        style={{ cursor: 'pointer' }}>

                            <div className="upload-icon-hip">
                                <FaUpload />
                            </div>
                            <div className="d-flex">
                                <div className="text-center up-text-1">
                                    Click to upload document
                                </div>
                                <div className="text-center  up-text-2">
                                    PDF, JPG, JPEG, or PNG (Max 2MB)
                                </div>
                            </div>
                        
                        <input 
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Hides the input from view
                            onChange={handleFileChange}
                            />
                            {
                                personInformation.IdDocument && (
                                <small className="text-success d-block mt-2">
                                    File selected: {personInformation.IdDocument.name}
                                </small>
                               )
                            }
                   </div>
                   */}
                </div>
            </div>
            {
                personDietary.length > 0  && (
                    <button
                        className="btn btn-main btn-full" 
                        onClick={() => setStep(prev => prev + 1)}>
                            Continue
                    </button>
                )
            }
        </div>
    </div>
  )
}

export default Step5