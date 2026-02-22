import React, { useState } from 'react'

function Step12Gala({ setStep, galaAttendance, setGalaAttendance, dietaryOptionList, galaGuests, setGalaGuests}) {

    
    const updateGuest = (index, field, value) => {
        const updatedGuests = [...galaGuests];
        updatedGuests[index][field] = value;
        setGalaGuests(updatedGuests);
    };

    // Helper to add allergy to the list
    const addAllergy = (index) => {
        const guest = galaGuests[index];
        if (guest.currentAllergy.trim()) {
            const updatedAllergies = [...guest.allergies, guest.currentAllergy.trim()];
            updateGuest(index, 'allergies', updatedAllergies);
            updateGuest(index, 'currentAllergy', ''); // Clear input
        }
    };

  return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Gala Attendance*</h5>
                <p className="text-muted small">Two gala tickets are included for your stand</p>
                <div className="content-list ">                    
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${galaAttendance ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => setGalaAttendance(true)}
                            >
                            Yes
                        </button>
                    </div>
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${!galaAttendance ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => setGalaAttendance(false)}
                            >
                            No
                        </button>
                    </div>

                    <div className="mt-3">
                        
                        {/* Conditional Rendering for Guests */}
                        {
                            galaAttendance && (
                                <div className="mt-4 guest-details-section">
                                    {galaGuests.map((guest, index) => (
                                        <div key={index} className="guest-form green-block mb-4 p-3 border rounded">
                                            <h6 className="fw-bold">Guest {index + 1}</h6>
                                            
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    placeholder="First Name"
                                                    value={guest.firstName}
                                                    onChange={(e) => updateGuest(index, 'firstName', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Surname"
                                                    value={guest.lastName}
                                                    onChange={(e) => updateGuest(index, 'lastName', e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="small fw-bold">Dietary Requirements*</label>
                                                <div className="custom-select-wrapper">
                                                    <select
                                                        className="form-control"
                                                        value={guest.dietary}
                                                        onChange={(e) => updateGuest(index, 'dietary', e.target.value)}
                                                    >
                                                        <option value="">Select Option</option>
                                                        {dietaryOptionList.map((opt, i) => (
                                                            <option key={i} value={opt._id}>{opt.title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <label className="small fw-bold">Allergies</label>
                                                <div className="input-group mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="e.g. Peanuts"
                                                        value={guest.currentAllergy}
                                                        onChange={(e) => updateGuest(index, 'currentAllergy', e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                addAllergy(index);
                                                            }
                                                        }}
                                                    />
                                                    <button 
                                                        className="btn btn-outline-secondary" 
                                                        type="button" 
                                                        onClick={() => addAllergy(index)}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                
                                                {/* Display added allergies as badges */}
                                                <div className="d-flex flex-wrap gap-1">
                                                    {guest.allergies.map((allergy, aIndex) => (
                                                        <span key={aIndex} className="badge bg-light text-dark border">
                                                            {allergy}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                <button
                        className="btn btn-main btn-full" 
                        onClick={() => {
                            setStep(prev => prev + 1)
                        }}
                    >
                    Continue
                </button>
            </div>             
    </div>
  )
}

export default Step12Gala