import React from 'react'

function Step6({
                setStep, theDetails, setTheDetails
            }) {
  return (
    <div className="card-step">
        <div className="card p-4 ">
            <h5>Date Attending </h5>
            <div className="graish">
                Select your attendance date
            </div>
            
            <div className="mb-3">              
                <button 
                    type="button"
                    className={`btn ${theDetails === "Friday, 15 May" ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                    onClick={() => setTheDetails("Friday, 15 May")}
                    >
                    Friday, 15 May
                </button>
                <button 
                    type="button"
                    className={`btn ${theDetails === "Saturday, 16 May" ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                    onClick={() => setTheDetails("Saturday, 16 May")
                        }
                    >
                    Saturday, 16 May
                </button>
                <button 
                    type="button"
                    className={`btn ${theDetails === "Friday & Saturday, 15 - 16 May" ? 'btn-selected' : 'btn-outline-simple'} btn-full mb-3`}
                    onClick={() => setTheDetails("Friday & Saturday, 15 - 16 May")  }
                    >
                    Friday & Saturday, 15 - 16 May
                </button>
            </div>

            <button
                className="btn btn-main btn-full mt-2"
                onClick={() => {
                            setStep(prev => prev + 1);
                        }
                    } 
                >
                Continue
            </button>
        </div>
    </div>
  )
}

export default Step6