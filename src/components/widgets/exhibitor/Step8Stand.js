import React from 'react'

function Step8Stand({ setStep, hasStandNumber, setHasStandNumber}) {
  return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Stand Number*</h5>
                <p className="text-muted small">Do you have a designed stand number?*</p>
                <div className="content-list ">
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${hasStandNumber ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setHasStandNumber(true)}
                        >
                       Yes
                    </button>
                </div>
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${!hasStandNumber ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setHasStandNumber(false)}
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

export default Step8Stand