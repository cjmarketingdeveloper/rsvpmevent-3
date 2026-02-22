import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function StepArrangements({setStep, setAdditionalNotes 
            , selectedEvent, pcdtOption, pDetails, needFlight
            , person, personInformation, personDietary, personAccomodation
            , additionalNotes, hasSpouse
            , spouse, spouseInformation, spouseDietary, spouseAccomodation ,
              spouseNeedFlight, spPcdtOption, personAirport,  personClinicEvent, spouseAirport, spouseClinicEvent,
              spouseWorkingPharm, spouseDesignation, accomodationType, spouseAccomodationType,
              goingToTradeshow, goingToGalaDiner, spGoingToGalaDiner, spGoingToTradeshow,
            EVENTCLINIC, specialAccomodation, setProcessing   
        }) {


    const handleFormSubmission = async () => {
        try{
            
            const formData = new FormData();

            const eventCodes = selectedEvent.map(obj => obj.eventCode);
            const eventSpouses = eventCodes;
            
            if(personClinicEvent && !eventCodes.includes(EVENTCLINIC)){
                eventCodes.push(EVENTCLINIC);
            }
            
            if(spouseClinicEvent && !eventSpouses.includes(EVENTCLINIC)){
                eventSpouses.push(EVENTCLINIC);
            }
                   
                formData.append("pharmacycode", pDetails);
                formData.append("name", person.name);
                formData.append("surname", person.surname);
                formData.append("email", person.email);
                formData.append("password", person.password);
                formData.append("phonenumber", person.phonenumber);
                formData.append("pcdt", pcdtOption);
                formData.append("allergies", personInformation.allergies);
                formData.append("dietary", personDietary);
                formData.append("personAccomodation", personAccomodation);
                formData.append("additionalNotes", additionalNotes);
                formData.append("flight", needFlight);
                formData.append("personAirport", needFlight ? personAirport : '');
                formData.append("profileId", "69848b1d0ca620e036ea3b87");
                formData.append("profileName", "Potential Franchisee");
                formData.append("spouseNumber", hasSpouse ? spouse.phonenumber : '');
                formData.append("workingPharm", false);
                formData.append("spouseVariation", false);
                // 3. Append Arrays (Backend usually expects them stringified or as multiple entries)
                formData.append("events", eventCodes);
                formData.append("profession", "");
                formData.append("accomodationType", personAccomodation ? accomodationType : '');
                formData.append("tradeshow", goingToTradeshow);
                formData.append("galaDinner", goingToGalaDiner);
                 formData.append("details", "");
                // 4. Append the File
                // IMPORTANT: personInformation.IdDocument must be a File object 
                // (e.g., from e.target.files[0])
                if (personInformation.IdDocument) {
                    formData.append("IdDocument", personInformation.IdDocument);
                }

                setProcessing(true);
                // 5. Post using Axios
                const result = await axios.post(CONSTANTS.API_URL + "auth/register/rsvp/v1/upload", 
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                    

                if(hasSpouse){
                    /////////////////////////////////
                        const spouseFfmData = new FormData();

                            spouseFfmData.append("pharmacycode", pDetails);
                            spouseFfmData.append("name", spouse.name);
                            spouseFfmData.append("surname", spouse.surname);
                            spouseFfmData.append("email", spouse.email);
                            spouseFfmData.append("password", spouse.password);
                            spouseFfmData.append("phonenumber", spouse.phonenumber);
                            spouseFfmData.append("pcdt", spPcdtOption);
                            spouseFfmData.append("allergies", spouseInformation.allergies);
                            spouseFfmData.append("dietary", spouseDietary);
                            spouseFfmData.append("personAccomodation", spouseAccomodation);
                            spouseFfmData.append("additionalNotes", additionalNotes);
                            spouseFfmData.append("flight", spouseNeedFlight);
                            spouseFfmData.append("personAirport", spouseNeedFlight ? spouseAirport : '');
                            spouseFfmData.append("profileId", "697e96345f569e161eb4d472");
                            spouseFfmData.append("profileName", "Potential");
                            spouseFfmData.append("spouseNumber", hasSpouse ? person.phonenumber : '');
                            spouseFfmData.append("profession", spouseDesignation);
                            spouseFfmData.append("workingPharm", true); //double check why its showing error spouseWorkingPharm
                            spouseFfmData.append("spouseVariation", true);

                            // 3. Append Arrays (Backend usually expects them stringified or as multiple entries)
                            spouseFfmData.append("events", eventSpouses);
                            spouseFfmData.append("accomodationType", spouseAccomodation ? spouseAccomodationType : '');
                            spouseFfmData.append("tradeshow", spGoingToTradeshow);
                            spouseFfmData.append("galaDinner", spGoingToGalaDiner);

                            // 4. Append the File
                            // IMPORTANT: personInformation.IdDocument must be a File object 
                            // (e.g., from e.target.files[0])
                            if (spouseInformation.IdDocument) {
                                spouseFfmData.append("IdDocument", spouseInformation.IdDocument);
                            }

                             await axios.post(CONSTANTS.API_URL + "auth/register/rsvp/v1/upload", 
                                spouseFfmData,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );
                    /////////////////////////////////
                }
             setProcessing(false);
            console.log("*******************");
            console.log(result);
            toast.success("Thank you for your submission");
             setStep(prev => prev + 1)
        }catch(err){
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
            <div className="graish mt-3">
            </div>
                
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