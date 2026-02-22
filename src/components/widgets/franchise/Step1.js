import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step1({setStep, setPharmacy, setProcessing}) {

    const [pharmacyCode, setPharmacyCode]                       = useState("");

    const handlePharmacySearch = async () => {
        try
            {
                if(pharmacyCode.length < 6){
                    toast.warning("Please ensure that you have valid pharmacy code! ");
                    return;
                }

                setProcessing(true);

                const response = await axios.get(CONSTANTS.API_URL +"settings/pharmacy/item/v1/" + pharmacyCode);
                
                if(response.data != null){
                    setPharmacy(response.data);
                    setStep(prev => prev + 1);
                }else {
                    toast.warning("Invalid Pharmacy Code!");
                }
                setProcessing(false);
        }catch(err){
            console.log(err);
            toast.error("Something went wrong, please try again later!");
            setProcessing(false);
        }
    }

  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>CJ Midrand Account Number </h5>
            <div className="graish mt-3">
                Your registration will automatically linked to this account
            </div>
            <input 
                type="text"
                className="form-control mt-3 mb-3"
                value={pharmacyCode}
                onChange={ (e) => setPharmacyCode(e.target.value)}
                placeholder="Enter account number"
                />
                
            <button
                className="btn btn-main btn-full" 
                onClick={handlePharmacySearch}>
                    Continue
            </button>
        </div>
    </div>
  )
}

export default Step1