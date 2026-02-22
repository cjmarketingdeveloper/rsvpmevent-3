function Step1({setStep, pDetails, setPDetails}) {


  return (
    <div className="card-step">
        <div className="card p-4">
            <h5>Entity Details* </h5>
            <div className="graish mt-3">
                Enter your entity informaiton
            </div>
            <input 
                type="text"
                className="form-control mt-3 mb-3"
                value={pDetails}
                placeholder="Enter name"
                onChange={ (e) => setPDetails(e.target.value)}
                />

            {
                pDetails.length > 1 && (
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

export default Step1