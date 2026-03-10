import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step6({setStep, spouse, setSpouse}) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpouse((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    // Validation Logic
    const isPasswordValid = 
        spouse.password?.length >= 6 && 
        spouse.password?.length <= 20 &&
        /[a-zA-Z]/.test(spouse.password) && // Has letters
        /\d/.test(spouse.password);         // Has numbers

    const isPhoneValid = /^\d{10}$/.test(spouse.phonenumber);

    const allFieldsFilled = 
        spouse.name?.trim() !== "" &&
        spouse.surname?.trim() !== "" &&
        spouse.email?.trim() !== "" &&
        spouse.phonenumber?.trim() !== "" &&
        spouse.password?.trim() !== "";

    const canContinue = allFieldsFilled && isPasswordValid && isPhoneValid;

  return (
    <div className="card-step">
        <div className="card p-4">
          
            <div className="mt-4">
                <h5>Spouse Attendee - Personal Details</h5>
                
                <div className="mb-3">
                    <label>Name</label>
                    <input 
                    className="form-control"
                    name="name"
                    value={spouse.name}
                    onChange={handleChange} 
                    placeholder="Enter Name"
                    />
                </div>

                <div className="mb-3">
                    <label>Surname</label>
                    <input 
                        className="form-control"
                        name="surname"
                        value={spouse.surname}
                        onChange={handleChange} 
                        placeholder="Enter Surname"
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        className="form-control"
                        name="email"
                        value={spouse.email}
                        onChange={handleChange} 
                        placeholder="Enter Email Address"
                    />
                </div>
                
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input 
                        className="form-control"
                        name="phonenumber"
                        value={spouse.phonenumber}
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
                        value={spouse.password}
                        onChange={handleChange}
                        placeholder="Enter Password (6-12 chars, letters & numbers)" 
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

export default Step6