import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANTS from "../../../CONSTANTS";
import { Link } from 'react-router-dom'

function StepRegistrationConfirmed({person,pharmacy}) {
    

  return (
    <div className="card-step">
        <div className="card p-4">
            <h4 className="text-center">Registration is Confirmed </h4>
            <div className="info-gray mt-3 mb-2">
                  <div className="ops">
                      <div className="title-left">Phone:</div>
                      <div className="answr-right">{person.phonenumber}</div>
                  </div>
                  <div className="ops">
                      <div className="title-left">Name:</div>
                      <div className="answr-right">{person.name}</div>
                  </div>
                  <div className="ops">
                      <div className="title-left">Surname:</div>
                      <div className="answr-right">{person.surname}</div>
                  </div>
                  <div className="ops">
                      <div className="title-left">Pharmacy:</div>
                      <div className="answr-right">{pharmacy.code}</div>
                  </div>
            </div>
             

            <div className="mb-3 mt-3 info-green">
               <strong>PLEASE NOTE</strong> 
               
               <p>
                Your cellphone number will be used as your username and the password you create will be used to login to the 
                Mevent App.
               </p>
            </div>

             <div className="mb-3 mt-2 info-orange">
               Confirmation email has been sent to {person.email} <br/><br/>
               For any changes to your registration please contact <a href="mailto:conference@thelocalchoice.net">conference@thelocalchoice.net</a>
            </div>
            
             <Link 
                to="/"
                className="btn btn-main">
                Home
             </Link>
        </div>
    </div>
  )
}

export default StepRegistrationConfirmed