import React from 'react'

function Step10Builder({ setStep, standBuilder, setStandBuilder}) {
    
  return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Stand Builder*</h5>
                <p className="text-muted small">Will you be using your own stand builder?*</p>
                <div className="content-list ">
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${standBuilder ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setStandBuilder(true)}
                        >
                       Yes
                    </button>
                </div>
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${!standBuilder ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setStandBuilder(false)}
                        >
                        No
                    </button>
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

export default Step10Builder