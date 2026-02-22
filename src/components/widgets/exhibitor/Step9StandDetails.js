import React from 'react'

function Step9StandDetails({ setStep, standDetails, setStandDetails}) {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setStandDetails((prevState) => ({
        ...prevState,
        [name]: value,
    }));
    };
  return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Stand Number*</h5>
                <p >Enter your stand details?*</p>
                <div className="content-list ">
                   <div className="mb-3">
                        <label>Stand Number*</label>
                        <input 
                            type="text"
                            name="standNumber"
                            className="form-control"                            
                            placeholder="Enter your stand number"
                            value={standDetails.standNumber} // Link to state
                            onChange={handleChange}
                            />
                   </div>
                   <div className="mb-3">
                        <label>Tradeshow Stand Header*</label>
                        <textarea 
                            type="text"
                            name="standHeader"
                            className="form-control"                            
                            placeholder="Enter your stand header" // Fixed placeholder typo
                            value={standDetails.standHeader}  // Link to state
                            onChange={handleChange}
                            ></textarea>
                   </div> 
                   <div className="mb-3 info-orange">
                        <strong>Please note</strong> Pay close attention to spelling and use of capital letters. This text will be used 
                        for printing your stand header.

                    </div>            
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

export default Step9StandDetails