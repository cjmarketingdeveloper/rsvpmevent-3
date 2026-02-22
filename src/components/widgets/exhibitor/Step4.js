
function Step4({setStep, staffRsvp, setStaffRsvp}) {

    
  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Expo Staff RSVP* </h5>
            <div className="graish mt-3">
                
            </div>
            <div className="event-list ">
                <label>Will you be bringing additional expo staff?</label>
                <div className="event-item mb-3">                    
                    <button 
                        type="button"
                        className={`btn ${staffRsvp ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setStaffRsvp(true)}
                        >
                        Yes
                    </button>
                </div>
                <div className="event-item mb-3">                    
                    <button 
                        type="button"
                        className={`btn ${!staffRsvp ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setStaffRsvp(false)}
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

export default Step4