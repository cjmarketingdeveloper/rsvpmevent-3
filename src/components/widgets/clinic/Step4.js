import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step4({setStep, person, setPerson}) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validation Logic
    const isPasswordValid = 
        person.password?.length >= 6 && 
        person.password?.length <= 20 &&
        /[a-zA-Z]/.test(person.password) && // Has letters
        /\d/.test(person.password);         // Has numbers

    const isPhoneValid = /^\d{10}$/.test(person.phonenumber);

    const allFieldsFilled = 
        person.name?.trim() !== "" &&
        person.surname?.trim() !== "" &&
        person.email?.trim() !== "" &&
        person.phonenumber?.trim() !== "" &&
        person.password?.trim() !== "";
        
    const canContinue = allFieldsFilled && isPasswordValid && isPhoneValid;

  return (
    <div className="card-step">
        <div className="card p-4">
          
            <div className="mt-4">
                <h5>Primary Attendee - Personal Details</h5>
                
                <div className="mb-3">
                    <label>Name</label>
                    <input 
                        className="form-control"
                        name="name"
                        value={person.name}
                        onChange={handleChange} 
                        placeholder="Enter Name"
                    />
                </div>

                <div className="mb-3">
                    <label>Surname</label>
                    <input 
                        className="form-control"
                        name="surname"
                        value={person.surname}
                        onChange={handleChange} 
                        placeholder="Enter Surname"
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        className="form-control"
                        name="email"
                        value={person.email}
                        onChange={handleChange} 
                        placeholder="Enter Email Address"
                    />
                </div>
                
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input 
                        className="form-control"
                        name="phonenumber"
                        value={person.phonenumber}
                        maxLength={10}
                        onChange={handleChange} 
                        placeholder="Enter Phone Number"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label> 
                    <input 
                        className="form-control"
                        name="password"
                        value={person.password}
                        onChange={handleChange}
                        placeholder="Enter Password" 
                    />
                    <div className="password-info">Min 6 characters, letters and numbers</div>
                </div>
                            
                {
                    canContinue && (
                            <button
                                className="btn btn-main btn-full mt-2"
                                onClick={() => {
                                        setStep(prev => prev + 1);
                                    }
                                } 
                            >
                                Continue
                            </button>
                        )
                }

            </div>
        </div>  
    </div>
  )
}

export default Step4