import React from 'react'
import imageLogo from '../assets/logo-top.png';
import { FaHouseUser, FaClinicMedical, FaHospital, FaHotel, FaStar, FaHive } from "react-icons/fa";
import { Link } from 'react-router-dom';
import imgBackground from '../assets/bg-main-home.jpg';

import imgFranchise from '../assets/imgFranchise.png';
import imgPotential from '../assets/imgPotential.png'
import imgClinic from '../assets/imgClinic.png';
import imgVIP from '../assets/imgVIP.png';
import imgExhibitor from '../assets/imgExhibitor.png';
import imgTradeShow from '../assets/imgTradeShow.png';

function StartScreen() {
  return (
    <div className="main-home home-back" style={{backgroundImage: `url(${imgBackground})`}}>
       <div className="head-line">
         <img src={imageLogo} className="head-img" />
         <h4 className="mt-3">Conference & Tradeshow Registration</h4>
       </div>
       <div className="content-main-home">
          <div className="min-horizontal"></div>
          <div className="section-card">
                <div className="icon-img home-icon">
                   <img src={imgFranchise} className="home-icon-img" />
                </div>
                <h3>The Local Choice Franchisee</h3>
                <p className="graish">
                  RSVP for Franchise Conference & TradeShow
                </p>
                <Link to={'/franchisee'} className="btn btn-main btn-full">Register</Link>
          </div>

          <div className="section-card">
                <div className="icon-img home-icon">
                  <img src={imgPotential} className="home-icon-img" />
                </div>
                <h3>Potential Franchisee</h3>
                <p className="graish">
                  RSVP for Franchise Conference & Tradeshow
                </p>
                <Link to={'/potential'} className="btn btn-main btn-full">Register</Link>
          </div>

          <div className="section-card">
                <div className="icon-img home-icon">
                  <img src={imgClinic} className="home-icon-img" />
                </div>
                <h3>Clinic</h3>
                <p className="graish">
                  RSVP for Clinic Conference
                </p>
                <Link to={'/clinic'} className="btn btn-main btn-full">Register</Link>
          </div>

          <div className="section-card">
                <div className="icon-img home-icon">
                  <img src={imgVIP} className="home-icon-img" />
                </div>
                <h3>VIP</h3>
                <p className="graish">
                  VIP event RSVP
                </p>
                <Link to={'/vip'} className="btn btn-main btn-full">Register</Link>
          </div>
      
          <div className="section-card">
                <div className="icon-img home-icon">
                  <img src={imgExhibitor} className="home-icon-img" />
                </div>
                <h3>Exhibitor</h3>
                <p className="graish">
                  Register for Exhibitor Events
                </p>
                <Link to={'/exhibitor'} className="btn btn-main btn-full">Register</Link>
          </div>
          
          <div className="section-card">
                <div className="icon-img home-icon">
                  <img src={imgTradeShow} className="home-icon-img" />
                </div>
                <h3>Tradeshow</h3>
                <p className="graish">
                  RSVP for TradeShow
                </p>
                <Link to={'/tradeshow'} className="btn btn-main btn-full">Register</Link>
          </div>
       </div>
    </div>
  )
}

export default StartScreen