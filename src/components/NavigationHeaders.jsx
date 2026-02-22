import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navigate.css';
import { FaChevronLeft } from 'react-icons/fa';

function NavigationHeaders({iconType, mainTitle, subTitle, step, totalSteps, handleBack}) {

  const navigate                                              = useNavigate();
  const onBackClick = () => {
    if (step === 1) {
      navigate('/');
    } else {
      handleBack();
    }
  };

  return (
    <div className="head-nav">
      <button 
         onClick={onBackClick}
        className="btn btn-main mg-5"
        >
        <span className="arrow-item"><FaChevronLeft /></span> 
        Back
      </button>
      
      <div className="head-nav__content">
        <div className="head-logo">
          {iconType}
        </div>
        <div className="head-text">
          <h4 className="h-nav">{mainTitle}</h4>
          <p className="graish">{subTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeaders