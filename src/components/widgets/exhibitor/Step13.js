import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step13({ setStep, staffRsvp, pDetails, selectedEvent, person,
                   dietary, standDetails, members,  hasStandNumber, standBuilder, 
                   standCategory, furnitureRequirments, 
                   galaAttendance,additionalArrange, setAdditionalArrange, 
                   galaGuests, specialAccomodation, setProcessing}) {


    const handleFormSubmission = async () => {
        try{
    
                const requestData = {
                    staffRsvp: staffRsvp, //Boolean
                    pDetails: pDetails,  //String
                    selectedEvent: selectedEvent,  //String
                    person: person, //object
                    dietary: dietary,  //String
                    standDetails: standDetails,
                    members: members, //Array of objects
                    hasStandNumber: hasStandNumber, //Boolean
                    standBuilder: standBuilder, //Boolean
                    standCategory: standCategory,   //String
                    furnitureRequirments: furnitureRequirments, //Boolean
                    galaAttendance: galaAttendance, //Boolean
                    additionalArrange: additionalArrange,  
                    galaGuests: galaGuests
                };

                setProcessing(true);
                // 5. Post using Axios
                const result = await axios.post(CONSTANTS.API_URL + "users/exhibitor-list/v1/data", 
                    requestData
                );

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
                <h5>Additional Arrangements*</h5>
                <p >Any additional arrangements needed?*</p>
                <div className="content-list ">
               
                    <div className="mb-3">
                            <textarea 
                                type="text"
                                name="standHeader"
                                className="form-control"                            
                                placeholder="Please specify any additional arrangements..." // Fixed placeholder typo
                                onChange={(e) => setAdditionalArrange(e.target.value)}
                                ></textarea>
                    </div>             
                </div>

            </div>

            <button
                className="btn btn-success btn-full mt-4" 
                onClick={handleFormSubmission}>
                    Submit
            </button>
    </div>
  )
}

export default Step13