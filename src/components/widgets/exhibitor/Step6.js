import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { FaRegTrashAlt } from "react-icons/fa";

function Step6({setStep, members, setMembers}) {

    const [currentStaff, setCurrentStaff] = useState({ name: '', surname: '' });

    // Handle adding a member to the global list
    const addStaffMember = () => {
        if (members.length >= 10) {
            toast.error("You can only add up to 10 staff members.");
            return;
        }

        if (currentStaff.name.trim() === '' || currentStaff.surname.trim() === '') {
            toast.warning("Please provide both a name and a surname.");
            return;
        }

        // Add to the array and reset local inputs
        setMembers([...members, { ...currentStaff, id: Date.now() }]);
        setCurrentStaff({ name: '', surname: '' });
    };

    // Remove a member from the list
    const removeStaffMember = (id) => {
        setMembers(members.filter(m => m.id !== id));
    };

  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Expo Staff Details* </h5>
            <div className="event-list ">
                <label>Add up to 10 additional staff members</label>
                <div className="row g-2 mb-3">
                    <div className="col-md-5">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Name"
                            value={currentStaff.name}
                            onChange={(e) => setCurrentStaff({...currentStaff, name: e.target.value})}
                        />
                    </div>
                    <div className="col-md-5">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Surname"
                            value={currentStaff.surname}
                            onChange={(e) => setCurrentStaff({...currentStaff, surname: e.target.value})}
                        />
                    </div>
                    <div className="col-md-2">
                        <button 
                            type="button"
                            className="btn btn-outline-simple btn-pd-clicker" 
                            onClick={addStaffMember}
                            disabled={members.length >= 10}
                        >
                            Click here to add members to the Staff List
                        </button>
                    </div>
                </div>

                {/* Render the list of added members */}
                <div className="member-list mt-4 mb-4">
                    {members.map((member) => (
                        <div key={member.id} className="d-flex justify-content-between align-items-center bg-light p-2 mb-2 rounded border">
                            <span><strong>{member.name}</strong> {member.surname}</span>
                            <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => removeStaffMember(member.id)}
                            >
                            <FaRegTrashAlt />
                            </button>
                        </div>
                    ))}
                    
                    {members.length === 0 && (
                        <p className="text-center text-muted small">No staff members added yet.</p>
                    )}
                </div>

                 <div className="info-gray mt-2 mb-4">
                    Disclaimer: Please note maximum of 2 expo staff per exhibitor in the tradeshow hall at any time. No staff swaps between 10:30–15:00. Additional staff will incur extra charges.
                </div>
                <div className="mb-3 text-end">
                    <small className={members.length >= 10 ? "text-danger" : "text-muted"}>
                        Staff Count: ({members.length}/10)
                    </small>
                </div>


            </div>


            {
                members.length > 0 && (
                    <button
                        className="btn btn-main btn-full" 
                        onClick={() => {
                            setStep(prev => prev + 1)
                        }}>
                            Continue
                    </button>
                )
            }
        </div>
    </div>
  )
}

export default Step6