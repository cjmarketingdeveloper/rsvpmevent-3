import React from 'react'

function Step11Furniture({ setStep, furnitureRequirments, setFurnitureRequirments}) {
    
  return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Furniture Requirements*</h5>
                <p className="text-muted small">Do you require chairs and a table?*</p>
                <div className="content-list ">
                    
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${furnitureRequirments ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => setFurnitureRequirments(true)}
                            >
                            Yes
                        </button>
                    </div>
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${!furnitureRequirments ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => setFurnitureRequirments(false)}
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

export default Step11Furniture