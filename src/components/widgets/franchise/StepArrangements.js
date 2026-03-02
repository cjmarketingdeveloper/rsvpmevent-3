import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function StepArrangements({setStep, setAdditionalNotes 
            , selectedEvent, pcdtOption, pharmacy, needFlight
            , selectedProfessions, person, personInformation, personDietary, personAccomodation
            , additionalNotes, hasSpouse
            , spouse, spouseInformation, spouseDietary, spouseAccomodation ,
              spouseNeedFlight, spPcdtOption, personAirport,  personClinicEvent, spouseAirport, spouseClinicEvent,
              spouseWorkingPharm, spouseDesignation, accomodationType, spouseAccomodationType,
              goingToTradeshow, goingToGalaDiner, spGoingToTradeshow, spGoingToGalaDiner,
            EVENTCLINIC, EVENTCODE, questGalaKind, specialAccomodation, setProcessing   
        }) {


    const handleFormSubmission = async () => {
        try{
            
            const formData = new FormData();
            let eventCodes = selectedEvent.map(obj => obj.eventCode);         
            let eventSpouses = eventCodes;
            

            if(personClinicEvent && !eventCodes.includes(EVENTCLINIC)){               
                eventCodes.push(EVENTCLINIC);                
            }

    
            if(spouseClinicEvent && !eventSpouses.includes(EVENTCLINIC)){
                eventSpouses.push(EVENTCLINIC);
                eventSpouses.split(',');
            }
    
             let eventTypeAttend = questGalaKind
            .split("attend the ")[1]  // Get everything after "attend the "
            .split(" Dinner")[0];
            /*
            const formObject = {
                    "pharmacycode"  : pharmacy.code,
                    "events"   : eventCodes, 
                    "name"  : person.name,
                    "surname"   : person.surname,   
                    "email"   : person.email,
                    "password"  : person.password,
                    "phonenumber"   : person.phonenumber,   
                    "profession"   : selectedProfessions,
                    "pcdt" : pcdtOption,
                    "allergies" : personInformation.allergies,
                    "dietary"   : personDietary,
                    "personAccomodation" : personAccomodation,
                    "additionalNotes" : additionalNotes,
                    "IdDocument"   : personInformation.IdDocument, //file
                    "spouseNumber" : hasSpouse ? spouse.phonenumber : '',
                    "personAirport" : personAirport
                }
                */
                
                formData.append("pharmacycode", pharmacy.code);
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
                formData.append("profileId", "697e95525f569e161eb4d45f");
                formData.append("profileName", "Franchisee");
                formData.append("spouseNumber", hasSpouse ? spouse.phonenumber : '');
                formData.append("workingPharm", false);
                formData.append("spouseVariation", hasSpouse ? true : false);
                // 3. Append Arrays (Backend usually expects them stringified or as multiple entries)
                formData.append("events", eventCodes);
                formData.append("profession", selectedProfessions);
                formData.append("accomodationType", personAccomodation ? accomodationType : '');
                formData.append("tradeshow", goingToTradeshow);
                formData.append("galaDinner", goingToGalaDiner);
                formData.append("details",eventTypeAttend);
                formData.append("accommodation", specialAccomodation);
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

                            spouseFfmData.append("pharmacycode", pharmacy.code);
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
                            spouseFfmData.append("profileId", "697e95525f569e161eb4d45f");
                            spouseFfmData.append("profileName", "Franchisee");
                            spouseFfmData.append("spouseNumber", hasSpouse ? person.phonenumber : '');
                            spouseFfmData.append("profession", spouseDesignation);
                            spouseFfmData.append("workingPharm", spouseWorkingPharm);
                            spouseFfmData.append("spouseVariation", true);
                            spouseFfmData.append("details", eventTypeAttend);

                            // 3. Append Arrays (Backend usually expects them stringified or as multiple entries)
                            spouseFfmData.append("events", eventSpouses);
                            spouseFfmData.append("accomodationType", spouseAccomodation ? spouseAccomodationType : '');
                            spouseFfmData.append("tradeshow", spGoingToTradeshow);
                            spouseFfmData.append("galaDinner", spGoingToGalaDiner);
                            spouseFfmData.append("accommodation", specialAccomodation);
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