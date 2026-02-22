import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { FaUpload } from "react-icons/fa";

function Step4({setStep,  
            pcdtOption, setPCDTOption, 
            personInformation, setPersonInformation, setPersonDietary,
            needFlight, setNeedFlight,
            personClinicEvent, setPersonClinicEvent, setPersonAirport,
            goingToTradeshow, setGoingToTradeshow,
            goingToGalaDiner, setGoingToGalaDiner
        }) {
        
        const [dietaryOptionList, setDietaryOptionList]                 = useState([]);

        const [currentAllergy, setCurrentAllergy]           = useState('');
        const fileInputRef                                  = useRef(null);
        const [listAirports, setListAirports]                           = useState([]);

        useEffect(() => {
            listTheDietaries();
            fetchAirports(); 
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
        <div className="card p-4">
            <h5>Primary - Profile Details</h5>
                
            <div className="mb-3 mt-3 question-box">
                    <div className="mb-3">
                        <label>PCDT Pharmacist ?</label>
                        <button 
                            type="button"
                            className={`btn ${pcdtOption ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setPCDTOption(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${pcdtOption === false ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setPCDTOption(false)}
                            >
                            No
                        </button>
                    </div>

                       {
                        pcdtOption && (
                            <div className="mb-3">
                                <label>Will you be attending the Clinic conference?</label>
                                <button 
                                    type="button"
                                    className={`btn ${personClinicEvent ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                                    onClick={() => setPersonClinicEvent(true)}
                                    >
                                    Yes
                                </button>
                                <button 
                                    type="button"
                                    className={`btn ${personClinicEvent === false ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                                    onClick={() => setPersonClinicEvent(false)}
                                    >
                                    No
                                </button>
                            </div>
                        )
                    }

                             
                    <div className="mb-3">
                        <label>Will you attend the Gala Dinner*</label>
                        <button 
                            type="button"
                            className={`btn ${goingToGalaDiner ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setGoingToGalaDiner(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${goingToGalaDiner === false ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setGoingToGalaDiner(false)}
                            >
                            No
                        </button>
                    </div>
          
                    <div className="mb-3">
                        <label>Will you attend the Tradeshow*</label>
                        <button 
                            type="button"
                            className={`btn ${goingToTradeshow ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setGoingToTradeshow(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${goingToTradeshow === false ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setGoingToTradeshow(false)}
                            >
                            No
                        </button>
                    </div>

                    <div className="mb-3">
                        <label>Will you require a flight?</label>
                        <button 
                            type="button"
                            className={`btn ${needFlight ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                            onClick={() => setNeedFlight(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${needFlight === false ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
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
                                        <option value="" disabled hidden>Specify Preferred Airport</option>
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
                   <div 
                        onClick={handleDivClick}
                        className="input-dialogue"
                        style={{ cursor: 'pointer' }}>

                            <div className="upload-icon-hip">
                                <FaUpload />
                            </div>
                            <div className="d-flex">
                                <div className="text-center up-text-1">
                                    Click to upload ID document
                                </div>
                                <div className="text-center  up-text-2">
                                    PDF, JPG, JPEG, or PNG (Max 4MB)
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
                </div>
            </div>
            {
                personInformation.IdDocument && (
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

export default Step4