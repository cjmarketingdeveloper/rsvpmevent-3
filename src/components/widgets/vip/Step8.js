import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { FaUpload } from "react-icons/fa";

function Step8({setStep,  
            spouseInformation, setSpouseInformation, setSpouseDietary,
            spouseNeedFlight, setSpouseNeedFlight, 
            spouseClinicEvent, setSpouseClinicEvent, setSpouseAirport,
            spouseWorkingPharm, setSpouseWorkingPharm, setSpouseDesignation,
            setProcessing
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
                setProcessing(true);
                const diet = await axios.get(CONSTANTS.API_URL +"settings/list/dietaries/v1");
        
                if(diet.data.length > 0){
                    setDietaryOptionList(diet.data);
                }
                setProcessing(false);
            }catch(errorData){
                console.log(errorData);
                setProcessing(false);
            }
        }
        
        const handleDivClick = () => {
            // This triggers the hidden file input's click event
            fileInputRef.current.click();
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            
            // Simple validation for 2MB
            if (file && file.size > 2 * 1024 * 1024) {
                toast.warning("File is too large! Please upload a document smaller than 2MB.");
                e.target.value = null; // Clear input
                return;
            }

            setSpouseInformation((prev) => ({
                ...prev,
                IdDocument: file,
                })
            );
        };

        const addAllergy = () => {
            if (currentAllergy.trim() !== '') {
                setSpouseInformation((prev) => ({
                    ...prev,
                    allergies: [...prev.allergies, currentAllergy.trim()],
                }));

                setCurrentAllergy(''); // Clear the small input field
            }
        };

        // 2. Remove allergy from the array
        const removeAllergy = (indexToRemove) => {
            setSpouseInformation((prev) => ({
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
        <div className="card p-4 minor-yellow">
            <h5>Spouse - Profile Details </h5>
            
            <div className="mb-3 mt-3 question-box">
                    
                    
                    <div className="mb-3">
                        <label>Are they working in the pharmacy?</label>
                        <button 
                            type="button"
                            className={`btn ${spouseWorkingPharm ? 'btn-selected' : 'btn-outline-black'} btn-full mb-3`}
                            onClick={() => setSpouseWorkingPharm(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${!spouseWorkingPharm ? 'btn-selected' : 'btn-outline-black'} btn-full mb-3`}
                            onClick={() => setSpouseWorkingPharm(false)}
                            >
                            No
                        </button>
                    </div>
                    
                    {
                        spouseWorkingPharm && <div className="mb-3">
                                                <label>What's their designation?</label>
                                                <input type="text" className="form-control" onChange={(e) => setSpouseDesignation(e.target.value)} />
                                            </div>
                    }
                    {
                        dietaryOptionList.length > 0 && (
                            <div className="mb-3">
                                <label>Dietary Requirementst?</label>
                                <div className="custom-select-wrapper ">
                                    <select 
                                        className="form-control"
                                        onChange={(e) => setSpouseDietary(e.target.value)}
                                        >
                                        <option value=""></option>
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
                            {spouseInformation.allergies.map((allergy, index) => (
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
                        <label>Will you require a flight</label>
                        <button 
                            type="button"
                            className={`btn ${spouseNeedFlight ? 'btn-selected' : 'btn-outline-black'} btn-full mb-3`}
                            onClick={() => setSpouseNeedFlight(true)}
                            >
                            Yes
                        </button>
                        <button 
                            type="button"
                            className={`btn ${!spouseNeedFlight ? 'btn-selected' : 'btn-outline-black'} btn-full mb-3`}
                            onClick={() => {
                                        setSpouseNeedFlight(false);
                                        setSpouseAirport("")
                                    }
                                }
                            >
                            No
                        </button>
                    </div>
                    {
                        spouseNeedFlight && (
                            <div className="mb-3">
                                <label>Preferred Airport</label>
                                <div>
                                    Select depature airport (Outside Gauteng only)
                                </div>
                                <div className="custom-select-wrapper ">
                                    <select 
                                        className="form-control"
                                        onChange={(e) => setSpouseAirport(e.target.value)}
                                        >
                                        <option value=""></option>
                                        {
                                                listAirports.map((airport) => {
                                                    return <option key={airport._id} value={airport.title}>{airport.title}</option>
                                                })
                                        }
                                    </select>
                                </div>
                            </div>
                        )
                    }
                <div className="mb-3">
                   <div 
                        onClick={handleDivClick}
                        className="input-dialogue"
                        style={{ cursor: 'pointer' }}>

                      <label className="text-center">ID Document (Max 2MB)</label>
                        <div className="upload-icon-hip">
                            <FaUpload />
                        </div>
                        <div className="text-center">
                            Click to upload document
                        </div>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Hides the input from view
                            onChange={handleFileChange}
                            />
                            {
                                spouseInformation.IdDocument && (
                                <small className="text-success d-block mt-2">
                                    File selected: {spouseInformation.IdDocument.name}
                                </small>
                               )
                            }
                   </div>
                </div>
            </div>
            {
                spouseInformation.IdDocument && (
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

export default Step8