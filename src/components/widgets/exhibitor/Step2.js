function Step2({setStep, selectedEvent, setSelectedEvent}) {

    
  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Event Selection* </h5>
            <div className="graish mt-3">
                Select Which events you will be attending
            </div>
            <div className="content-list ">
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${selectedEvent === "Clinic Talk" ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setSelectedEvent("Clinic Talk")}
                        >
                        Clinic Talk
                    </button>
                </div>
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${selectedEvent === "Tradeshow & Clinic Talk" ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setSelectedEvent("Tradeshow & Clinic Talk")}
                        >
                        Tradeshow & Clinic Talk
                    </button>
                </div>
                <div className="event-item mb-3">
                    <button 
                        type="button"
                        className={`btn ${selectedEvent === "Tradeshow" ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                        onClick={() => setSelectedEvent("Tradeshow")}
                        >
                        Tradeshow
                    </button>
                </div>
                                        
            </div>

            <button
                className="btn btn-main btn-full" 
                onClick={() => {
                    setStep(prev => prev + 1)
                }}>
                    Select & Continue
            </button>
             

        </div>
    </div>
  )
}

export default Step2