import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function StepArrangements({setStep, setAdditionalNotes 
            , selectedEvent, pcdtOption, pDetails, needFlight
            , selectedProfessions, person, personInformation, personDietary, personAccomodation
            , additionalNotes, personAirport, personClinicEvent, accomodationType, hasSpouse
            , spouse, spouseInformation, spouseDietary, spouseAccomodation ,
             spouseNeedFlight, spPcdtOption, spouseAirport, spouseWorkingPharm, spouseDesignation,
             spouseClinicEvent, spouseAccomodationType, personSpecialAccomodation,spouseGoingEvent, 
            EVENTCLINIC, specialAccomodation, setProcessing 
        }) {


    const handleFormSubmission = async () => {
        try{
            
                const eventCodes = selectedEvent.eventCode;

                // 1. Create the plain JavaScript object
                const requestData = {
                    pharmacycode: pDetails,
                    name: person.name,
                    surname: person.surname,
                    email: person.email,
                    password: person.password,
                    phonenumber: person.phonenumber,
                    pcdt: false,
                    allergies: personInformation.allergies,
                    dietary: personDietary,
                    personAccomodation: personAccomodation,
                    additionalNotes: additionalNotes,
                    flight: needFlight,
                    personAirport: needFlight ? personAirport : '',
                    profileId: "69848be40ca620e036ea3b92",
                    profileName: "VIP",
                    spouseNumber: hasSpouse ? spouse.phonenumber : '',
                    workingPharm: false,
                    spouseVariation: false,
                    events: eventCodes, // Sent as a real array
                    profession: selectedProfessions, // Sent as a real array
                    accomodationType: personAccomodation ? accomodationType : '',
                    details: "",
                    accommodation: personSpecialAccomodation,
                    specialAccomodation: specialAccomodation,
                    IdDocument: ""
                };

                setProcessing(true);
                // 5. Post using Axios
                const result = await axios.post(CONSTANTS.API_URL + "auth/register/rsvp/v2/data", 
                    requestData
                );
                    
                if(hasSpouse){
                    /////////////////////////////////
                        const spouseData = {
                            pharmacycode: pDetails,
                            name: spouse.name,
                            surname: spouse.surname,
                            email: spouse.email,
                            password: spouse.password,
                            phonenumber: spouse.phonenumber,
                            pcdt: false,
                            allergies: spouseInformation.allergies,
                            dietary: spouseDietary,
                            personAccomodation: spouseAccomodation,
                            additionalNotes: additionalNotes,
                            flight: spouseNeedFlight,
                            personAirport: spouseNeedFlight ? spouseAirport : '',
                            profileId: "69848be40ca620e036ea3b92",
                            profileName: "VIP",
                            spouseNumber: hasSpouse ? person.phonenumber : '',
                            profession: spouseDesignation,
                            workingPharm: false,
                            spouseVariation: true,
                            events: spouseGoingEvent, // Real array/data structure
                            accomodationType: spouseAccomodation ? spouseAccomodationType : '',
                            specialAccomodation: specialAccomodation,
                            IdDocument: ""
                        };

                    await axios.post(CONSTANTS.API_URL + "auth/register/rsvp/v2/data", spouseData);
                    /////////////////////////////////
                }
             setProcessing(false);
            console.log("*******************");
            console.log(result);
            toast.success("Thank you for your submission");
             setStep(prev => prev + 1)
        }catch(err){
            console.log("********>>>>>>>>>");
            console.log(err);
            const serverMessage = err.response?.data?.message;

            // 2. Fallback to a generic message if no specific message exists
            const finalMessage = serverMessage || "Something went wrong, please try again later";

            toast.error(finalMessage)
            setProcessing(false);
        }
    }
  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Additional Arrangements </h5>
                
            <div className="mb-3 mt-3 question-box">
                <label>Any additional arrangements? {pcdtOption}</label>
                <textarea 
                    className="form-control message-h"
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    >
                </textarea>
               
            </div>
            
            <button
                className="btn btn-success btn-full" 
                onClick={handleFormSubmission}>
                    Submit
            </button>
        </div>
    </div>
  )
}

export default StepArrangements