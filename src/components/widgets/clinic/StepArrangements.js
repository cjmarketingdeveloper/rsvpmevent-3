import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function StepArrangements({setStep, pharmacy, personInformation, 
            personDietary, personAccomodation, needFlight,
            clinicDesignation, pcdtOption, selectedEvent, personAirport, person, accomodationType,
            eventCode, personAccomPrefferedName, personAccomPrefferedPharmacy, persSpecialArrange,
            setProcessing   
        }) {

    const [additionalNotes, setAdditionalNotes]                                                   = useState("");
    const handleFormSubmission = async () => {
        try{
            
            const formData = new FormData();
                   
                formData.append("pharmacycode", pharmacy.pharmacycode);
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
                formData.append("profileId", "69848ba40ca620e036ea3b8f");
                formData.append("profileName", "Clinic");
                formData.append("spouseNumber", '');
                formData.append("workingPharm", false);
                formData.append("spouseVariation", false);
                formData.append("details", "");
                // 3. Append Arrays (Backend usually expects them stringified or as multiple entries)
                formData.append("events", eventCode);
                formData.append("profession", [clinicDesignation]);
                formData.append("accomodationType", accomodationType);

                formData.append("tradeshow", null);
                formData.append("galaDinner", null);
                formData.append("preferredPartner", personAccomPrefferedName); 
                formData.append("preferredPartnerPharm", personAccomPrefferedPharmacy);
                formData.append("accommodation", persSpecialArrange);
                
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
            
             setProcessing(false);
            console.log("*******************");
            console.log(result);
            toast.success("Thank you for your submission");
             setStep(prev => prev + 1)
        }catch(err){
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