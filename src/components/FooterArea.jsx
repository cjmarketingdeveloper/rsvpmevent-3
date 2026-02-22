import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navigate.css';


function FooterArea({step, totalSteps, handleBack, imgFootLogo}) {

  const navigate                                              = useNavigate();
  const onBackClick = () => {
    if (step === 1) {
      navigate('/');
    } else {
      handleBack();
    }
  };

  return (
    <div className="foot-nav">
        <button 
            onClick={onBackClick}
            className="btn btn-outline-back"
            >
            Back
        </button>
        
        <div className="foot-logo">
            <img src={imgFootLogo} alt="logo" className="img-part-foot"/>
        </div>
    </div>
  )
}

export default FooterArea