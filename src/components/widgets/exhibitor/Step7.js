import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";

function Step7({ setStep, person, members, setMembers, setDietary, allergies, setAllergies, dietaryOptionList, setDietaryOptionList }) {

    //const [dietaryOptionList, setDietaryOptionList] = useState([]);
    const [currentAllergy, setCurrentAllergy] = useState(""); // Fixed: Changed from [] to ""
    // Local state to track the text input for each specific member's allergy field
    const [memberAllergyInputs, setMemberAllergyInputs] = useState({});

    useEffect(() => {
        //listTheDietaries();
    }, [])

    const listTheDietaries = async () => {
        try {
            const diet = await axios.get(CONSTANTS.API_URL + "settings/list/dietaries/v1");
            if (diet.data.length > 0) {
                setDietaryOptionList(diet.data);
            }
        } catch (errorData) {
            console.log(errorData);
        }
    }

    // --- Primary Contact Allergy Logic ---
    const addAllergy = () => {
        if (currentAllergy.trim() !== "") {
            setAllergies([...allergies, currentAllergy.trim()]);
            setCurrentAllergy("");
        }
    };

    const removeAllergy = (indexToRemove) => {
        setAllergies(allergies.filter((_, index) => index !== indexToRemove));
    };

    // --- Additional Staff Logic ---
    const updateMemberDietary = (index, value) => {
        const updatedMembers = [...members];
        updatedMembers[index].dietary = value;
        setMembers(updatedMembers);
    };

    const addMemberAllergy = (memberIndex) => {
        const allergyText = memberAllergyInputs[memberIndex] || "";
        if (allergyText.trim() !== "") {
            const updatedMembers = [...members];
            // Initialize allergies array if it doesn't exist for this member
            const currentMemberAllergies = updatedMembers[memberIndex].allergies || [];
            updatedMembers[memberIndex].allergies = [...currentMemberAllergies, allergyText.trim()];
            
            setMembers(updatedMembers);
            // Clear only this specific member's input
            setMemberAllergyInputs({ ...memberAllergyInputs, [memberIndex]: "" });
        }
    };

    const removeMemberAllergy = (memberIndex, allergyIndex) => {
        const updatedMembers = [...members];
        updatedMembers[memberIndex].allergies = updatedMembers[memberIndex].allergies.filter((_, i) => i !== allergyIndex);
        setMembers(updatedMembers);
    };

    return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Dietary Requirements*  </h5>
                <p className="text-muted small">Specify dietary needs and allergies for all attendees*</p>

                {/* 1. PRIMARY CONTACT SECTION */}
                <div className="green-block mb-4 p-3 rounded">
                    <h6 className="text-success">Primary Contact: {person.name} {person.surname}</h6>
                    <hr />
                    <div className="mb-3">
                        <label className="form-label">Dietary Requirements</label>
                        <div className="custom-select-wrapper">
                            <select 
                                className="form-control" 
                                onChange={(e) => setDietary(e.target.value)} 
                                value="69848cb90ca620e036ea3b9e">
                                {dietaryOptionList.map((opt, i) => (
                                    <option key={i} value={opt._id}>{opt.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

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
                            <button className="btn btn-outline-secondary" type="button" onClick={addAllergy}>Add</button>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            {allergies.map((allergy, index) => (
                                <span key={index} className="badge bg-info text-dark p-2">
                                    {allergy}
                                    <button type="button" className="btn-close ms-2" style={{fontSize: '0.5rem'}} onClick={() => removeAllergy(index)}></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. ADDITIONAL STAFF MEMBERS SECTION */}
                {members.map((member, mIdx) => (
                    <div key={member.id || mIdx} className="green-block mb-4 p-3 rounded shadow-sm">
                        <h6>Staff Member: {member.name} {member.surname}</h6>
                        <hr />
                        
                        <div className="mb-3">
                            <label className="form-label">Dietary Requirements</label>
                            <div className="custom-select-wrapper">
                                <select 
                                    className="form-control" 
                                    value={member.dietary || "69848cb90ca620e036ea3b9e"} 
                                    onChange={(e) => updateMemberDietary(mIdx, e.target.value)}
                                >
                                    {dietaryOptionList.map((opt, i) => (
                                        <option key={i} value={opt._id}>{opt.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Allergies</label>
                            <div className="input-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add allergy..."
                                    value={memberAllergyInputs[mIdx] || ""}
                                    onChange={(e) => setMemberAllergyInputs({ ...memberAllergyInputs, [mIdx]: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMemberAllergy(mIdx))}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => addMemberAllergy(mIdx)}>Add</button>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {(member.allergies || []).map((allergy, aIdx) => (
                                    <span key={aIdx} className="badge bg-secondary p-2">
                                        {allergy}
                                        <button type="button" className="btn-close btn-close-white ms-2" style={{fontSize: '0.5rem'}} onClick={() => removeMemberAllergy(mIdx, aIdx)}></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mb-3 mt-2 info-orange">
                    <strong>Please note</strong> 
                    <p>Changes to dietary requirements will not be allowed during lunch time of your selected date</p>
                </div>    

                 <button
                    className="btn btn-main btn-full" 
                    onClick={() => {
                        setStep(prev => prev + 1)
                    }}>
                        Continue
                </button>
            </div>
        </div>
    )
}

export default Step7