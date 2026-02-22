import React, { useState } from 'react'
import NavigationHeaders from '../components/NavigationHeaders'
import { FaClipboardCheck, FaHive } from "react-icons/fa";
import Spinner from '../components/Spinner';

import Step1 from '../components/widgets/tradeshow/Step1';
import Step2 from '../components/widgets/tradeshow/Step2';
import Step3 from '../components/widgets/tradeshow/Step3';
import Step4 from '../components/widgets/tradeshow/Step4';
import Step5 from '../components/widgets/tradeshow/Step5';
import StepArrangements from '../components/widgets/tradeshow/StepArrangements';
import StepRegistrationConfirmed from '../components/widgets/tradeshow/StepRegistrationConfirmed';
import imgTradeShow from '../assets/imgTradeShow.png';
import imgFootLogo from '../assets/logoFooter.png';
import bgOpFoot from '../assets/bgOpFoot.png';
import FooterArea from '../components/FooterArea';
import Step6 from '../components/widgets/tradeshow/Step6';

function TradeShow() {
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
    const [personAirport, setPersonAirport]                            = useState("");
    const [accomodationType, setAccomodationType]                      = useState("");
    const [pharmacy, setPharmacy]                                      = useState(null);
    const [pcdtOption, setPCDTOption]                                  = useState(false);
    const [clinicDesignation, setClinicDesignation]                    = useState("");
    const [selectedProfessions, setSelectedProfessions]                = useState("");
    const [personDietary, setPersonDietary]                            = useState('69848cb90ca620e036ea3b9e');
    const [needFlight, setNeedFlight]                                  = useState(false);
    const [personAccomodation, setPersonAccomodation]                  = useState(false);
    const [theDetails, setTheDetails]                                  = useState("");
    const [person, setPerson]                                          = useState({
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
    const [specialAccomodation, setSpecialAccomodation]                                         = useState("");
      //////////////////////////////////////////////////
      const EVENTCODE = "69385"; 
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
            iconType={<img src={imgTradeShow} className="home-icon-img" />}
            mainTitle={"The Local Choice Pharmacies Tradeshow"}
            subTitle={"Complete your RSVP for the tradeshow conference"}
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
                                selectedProfessions={selectedProfessions}
                                setSelectedProfessions={setSelectedProfessions}
                                EVENTCODE={EVENTCODE}
                                setProcessing={setProcessing}
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
                                    pcdtOption={pcdtOption}
                                    setPCDTOption={setPCDTOption}
                                    personInformation={personInformation}
                                    setPersonDietary={setPersonDietary}
                                    needFlight={needFlight}
                                    setNeedFlight={setNeedFlight}
                                    setPersonInformation={setPersonInformation}
                                    setPersonAirport={setPersonAirport}
                                    />
                                  
              }
              {
                  step === 6 && <Step6
                                    setStep={handleNext}
                                    theDetails={theDetails}
                                    setTheDetails={setTheDetails}
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
                                    personAirport={personAirport}
                                    accomodationType={accomodationType}
                                    clinicDesignation={clinicDesignation}
                                    selectedProfessions={selectedProfessions}
                                    pcdtOption={pcdtOption}
                                    selectedEvent={selectedEvent}
                                    person={person}
                                    theDetails={theDetails}
                                    specialAccomodation={specialAccomodation}
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

export default TradeShow