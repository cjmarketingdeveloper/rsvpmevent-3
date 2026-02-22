function Step3({setStep, person, setPerson}) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const isPhoneValid = /^\d{10}$/.test(person.phonenumber);

    const allFieldsFilled = 
        person.name?.trim() !== "" &&
        person.surname?.trim() !== "" &&
        person.email?.trim() !== "" &&
        person.phonenumber?.trim() !== "";
        
    const canContinue = allFieldsFilled && isPhoneValid;

  return (
    <div className="card-step">
        <div className="card p-4">
          
            <div className="mt-4">
                <h5>Primary Exhibitor - Contact Details</h5>
                
                <div className="mb-3">
                    <label>Name*</label>
                    <input 
                    className="form-control"
                    name="name"
                    value={person.name}
                    onChange={handleChange} 
                    placeholder="Enter Name"
                    />
                </div>

                <div className="mb-3">
                    <label>Surname</label>
                    <input 
                        className="form-control"
                        name="surname"
                        value={person.surname}
                        onChange={handleChange} 
                        placeholder="Enter Surname"
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        className="form-control"
                        name="email"
                        value={person.email}
                        onChange={handleChange} 
                        placeholder="Enter Email Address"
                    />
                </div>
                
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input 
                        className="form-control"
                        name="phonenumber"
                        value={person.phonenumber}
                        onChange={handleChange} 
                        maxLength={10}
                        placeholder="Enter Phone Number"
                    />
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


export default Step3