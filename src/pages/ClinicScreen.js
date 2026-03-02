import React, { useState } from 'react'
import NavigationHeaders from '../components/NavigationHeaders'
import { FaClipboardCheck, FaHospital } from "react-icons/fa";
import Spinner from '../components/Spinner';

import Step1 from '../components/widgets/clinic/Step1';
import Step2 from '../components/widgets/clinic/Step2';
import Step3 from '../components/widgets/clinic/Step3';
import Step4 from '../components/widgets/clinic/Step4';
import Step5 from '../components/widgets/clinic/Step5';
import StepAccomodation from '../components/widgets/clinic/StepAccomodation';
import StepArrangements from '../components/widgets/clinic/StepArrangements';
import StepRegistrationConfirmed from '../components/widgets/clinic/StepRegistrationConfirmed';
import imgClinic from '../assets/imgClinic.png';
import imgFootLogo from '../assets/logoFooter.png';
import bgOpFoot from '../assets/bgOpFoot.png';
import FooterArea from '../components/FooterArea'

function ClinicScreen() {
    const [processing, setProcessing]                                 = useState(false);
    const [step, setStep]                                             = useState(1);
    //////////////////////////////////////////////////////////////////////
    // Determine total steps and increment dynamically
    const totalSteps = 8;
    
    // Calculate progress percentage automatically
    // We use Math.min to ensure we don't exceed 100%
    const rateCovered = Math.floor(((step - 1) / totalSteps) * 100);
  //////////////////////////////////////////////////////////////////////
    const [selectedEvent, setSelectedEvent]                            = useState([]);
    const [pharmacy, setPharmacy]                                      = useState(null);
    const [pcdtOption, setPCDTOption]                                  = useState(null); //true or false
    const [clinicDesignation, setClinicDesignation]                    = useState("");
    const [personDietary, setPersonDietary]                            = useState('69848cb90ca620e036ea3b9e');
    const [needFlight, setNeedFlight]                                  = useState(null); //true or false
    const [personAccomodation, setPersonAccomodation]                  = useState(null); //true or false
    const [personAirport, setPersonAirport]                                                       = useState("");
    const [accomodationType, setAccomodationType]                                = useState('');
    const [personAccomPrefferedName, setPersonAccomPrefferedName]                = useState('');
    const [personAccomPrefferedPharmacy, setPersonAccomPrefferedPharmacy]        = useState('');
    const [persSpecialArrange, setPersSpecialArrange]                            = useState("");
    const [person, setPerson]                                                    = useState({
        'name'            :'',
        'surname'         :'',
        'email'           :'',
        'phonenumber'     :'',
        'password'        :'',
      });
  
    const [personInformation, setPersonInformation]                                          = useState({
              'dietary'         : '',
              'allergies'       : [],
              'IdDocument'      : null, //file document less than 2mb
            });
    
      //////////////////////////////////////////////////
      const EVENTCODE = "57987";
      ///////////////////////////////////////////////////

      const handleNext = () => {
        setStep(prev => prev + 1);
      };

      // Function to handle moving backward
      const handleBack = () => {
        setStep(prev => prev - 1);
      };

  return (
    <div className="lane-panel">
         <NavigationHeaders
          iconType={<img src={imgClinic} className="home-icon-img" />}
          mainTitle={"The Local Choice Pharmacies Clinic Conference"}
          subTitle={"Complete your RSVP for the clinic conference"}
          step={step}
          totalSteps={totalSteps} // Pass this down
          handleBack={handleBack}
         />

        {
            processing && <Spinner />
        }

         {
            (step < totalSteps ) ? 
              <div className="step-progress-box">
                  <div className="d-flex justify-content-between">
                    <div className="graish">
                      Step {step} / {totalSteps}
                    </div>
                    <div className="graish">
                      {rateCovered}% Complete
                    </div>
                  </div>
                  <div className="progress-bar mt-3">
                    <div className="progress-fill"
                      style={{width: rateCovered +'%'}}></div>
                  </div>
              </div>
                :
                <div className="nav-success-icon">
                    <FaClipboardCheck />
                </div>
          }

          <div className="content-components">
          
              {
                
                step === 1 && <Step1 
                                setStep={handleNext}
                                setPharmacy={setPharmacy} 
                                setProcessing={setProcessing}
                              />
              }

             {
               step === 2 && <Step2 
                                setStep={handleNext}
                                EVENTCODE={EVENTCODE} 
                                selectedEvent={selectedEvent}
                                setSelectedEvent={setSelectedEvent}
                                setProcessing={setProcessing}
                              />
             }
             {
               step === 3 && <Step3 
                                setStep={handleNext}
                                setClinicDesignation={setClinicDesignation}
                                clinicDesignation={clinicDesignation}
                                setPCDTOption={setPCDTOption}
                              />
             }
               {
               step === 4 && <Step4 
                                setStep={handleNext}
                                person={person}
                                setPerson={setPerson}
                              />
            }
            {
                  step === 5 && <Step5 
                                    setStep={handleNext}
                                    personInformation={personInformation}
                                    setPersonDietary={setPersonDietary}
                                    needFlight={needFlight}
                                    setNeedFlight={setNeedFlight}
                                    setPersonInformation={setPersonInformation}
                                    setPersonAirport={setPersonAirport}
                                    />
                                  
              }
              
              {
                  step === 6 && <StepAccomodation 
                                    setStep={handleNext}
                                    personAccomodation={personAccomodation}
                                    setPersonAccomodation={setPersonAccomodation}
                                    accomodationType={accomodationType}
                                    setAccomodationType={setAccomodationType}
                                    setPersonAccomPrefferedName={setPersonAccomPrefferedName}
                                    setPersonAccomPrefferedPharmacy={setPersonAccomPrefferedPharmacy}
                                    setPersSpecialArrange={setPersSpecialArrange}
                                    />                     
              }
               
               {
                  step === 7 && <StepArrangements 
                                    setStep={handleNext}
                                    personAccomodation={personAccomodation}
                                    pharmacy={pharmacy}
                                    personInformation={personInformation}
                                    personDietary={personDietary}
                                    needFlight={needFlight}
                                    clinicDesignation={clinicDesignation}
                                    pcdtOption={pcdtOption}
                                    selectedEvent={selectedEvent}
                                    accomodationType={accomodationType}
                                    personAirport={personAirport}
                                    person={person}
                                    eventCode={EVENTCODE}
                                    personAccomPrefferedName={personAccomPrefferedName}
                                    personAccomPrefferedPharmacy={personAccomPrefferedPharmacy} 
                                    persSpecialArrange={persSpecialArrange}
                                    setProcessing={setProcessing}
                                    />
                                  
              }

               {
                  step === 8 && <StepRegistrationConfirmed 
                                    setStep={handleNext}
                                    pharmacy={pharmacy}
                                    person={person}
                                    />
                                  
              }

              <img src={bgOpFoot} alt="background" className="img-bg-op-foot"/>
              <FooterArea step={step} totalSteps={totalSteps} handleBack={handleBack} imgFootLogo={imgFootLogo}/>
          </div>
    </div>
  )
}

export default ClinicScreen