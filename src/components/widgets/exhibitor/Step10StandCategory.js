import React, { useState } from 'react'

function Step10StandCategory({ setStep, standCategory, setStandCategory, setCCategory}) {

    const [labelTitle, setLabelTitle]                        = useState("Continue");
    
  return (
        <div className="card-step">
            <div className="card p-4">
                <h5>Stand Category*</h5>
                <p className="text-muted small">Will you be using your own stand builder?*</p>
                <div className="content-list ">
                    
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${standCategory === 'A (3 x 6)' ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => {
                                        setStandCategory('A (3 x 6)');
                                        setLabelTitle("Continue");
                                        setCCategory("");
                                    }
                                }
                            >
                            A (3 x 6)
                        </button>
                    </div>
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${standCategory === 'B (3 x 3)' ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => {
                                setStandCategory('B (3 x 3)');
                                setLabelTitle("Continue");
                                setCCategory("");
                            }}
                            >
                            B (3 x 3)
                        </button>
                    </div>
                    <div className="event-item mb-3">
                        <button 
                            type="button"
                            className={`btn ${standCategory === 'C (2 x 2)' ? 'btn-selected' : 'btn-outline-simple'} btn-full`}
                            onClick={() => {
                                setLabelTitle("I Understand, Continue");
                                setStandCategory('C (2 x 2)');
                                setCCategory("c");
                            }}
                            >
                            C (2 x 2)
                        </button>
                    </div>

                </div>
                
                {
                    standCategory === 'C (2 x 2)' && (
                        <div className="stand-category-view">
                            <h5>Category C (2x2) Important Information</h5>
                            <p>Please review the following information about stand category</p>
                            <div className="mt-3 mb-3 info-orange">
                                <strong>Please note:</strong><br/>
                                <ul>
                                    <li>This category does not include tables or chairs</li>
                                    <li>Please arrange your own furniture if required</li>
                                    <li>Gala tickets are also not included</li>
                                </ul>
                                <p>
                                    If you need assistance with please contact: Marrizelle 
                                    Geldenhuise at  
                                    <a to={'mailto:marizelle@cjmarketing.co'}> marizelle@cjmarketing.co</a>
                                </p>

                            </div>
                        </div>
                    )
                }

                <button
                    className="btn btn-main btn-full" 
                    onClick={() => {
                        setStep(prev => prev + 1)
                    }}>
                    {labelTitle}
                </button>
            </div>

            
             
    </div>
  )
}

export default Step10StandCategory