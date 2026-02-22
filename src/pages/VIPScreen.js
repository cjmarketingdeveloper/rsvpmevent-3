import React, { useState } from 'react'
import NavigationHeaders from '../components/NavigationHeaders'
import { FaStar } from 'react-icons/fa'
import Step1 from '../components/widgets/vip/Step1';
import Step2 from '../components/widgets/vip/Step2';
import Step3 from '../components/widgets/vip/Step3';
import Step4 from '../components/widgets/vip/Step4';
import Step5 from '../components/widgets/vip/Step5';
import Step6 from '../components/widgets/vip/Step6';
import Step7 from '../components/widgets/vip/Step7';
import StepAccomodation from '../components/widgets/vip/StepAccomodation';
import StepArrangements from '../components/widgets/vip/StepArrangements';
import StepRegistrationConfirmed from '../components/widgets/vip/StepRegistrationConfirmed';
import Step5Flight from '../components/widgets/vip/Step5Flight';
import { FaClipboardCheck } from "react-icons/fa";
import Spinner from '../components/Spinner';
import imgVIP from '../assets/imgVIP.png';
import imgFootLogo from '../assets/logoFooter.png';
import bgOpFoot from '../assets/bgOpFoot.png';
import FooterArea from '../components/FooterArea';

function VIPScreen() {
    const [processing, setProcessing]                                 = useState(false);
    const [step, setStep]                                             = useState(1);
    //////////////////////////////////////////////////////////////////////
      const [hasSpouse, setHasSpouse] = useState(false);

      // Define your flows
      const flow1Max = 10;  // No spouse
      const flow2Max = 11; // With spouse

      // Determine total steps and increment dynamically
      const totalSteps = hasSpouse ? flow2Max : flow1Max;
      
      // Calculate progress percentage automatically
      // We use Math.min to ensure we don't exceed 100%
      const rateCovered = Math.floor(((step - 1) / totalSteps) * 100);
    //////////////////////////////////////////////////////////////////////
    const [selectedEvent, setSelectedEvent]                            = useState([]);
    const [pDetails, setPDetails]                                      = useState("");
      
    const [selectedProfessions, setSelectedProfessions]                                 = useState("");
    const [pcdtOption, setPCDTOption]                                  = useState(false);

    const [needFlight, setNeedFlight]                                  = useState(false);
    const [person, setPerson]                                          = useState({
      'name'            :'',
      'surname'         :'',
      'email'           :'',
      'phonenumber'     :'',
      'password'        :'',
    });

    const [personInformation, setPersonInformation]                                          = useState({
      'pcdtpharmacist'  : false,
      'dietary'         : '',
      'allergies'       : [],
      'IdDocument'      : null, //file document less than 2mb
    });

    const [spouse, setSpouse]                                          = useState({
        'name'            :'',
        'surname'         :'',
        'email'           :'',
        'phonenumber'     :'',
        'password'        :'',
    });

    const [spouseInformation, setSpouseInformation]                                          = useState({
      'pcdtpharmacist'  : false,
      'dietary'         : '',
      'allergies'       : [],
      'IdDocument'      : null, //file document less than 2mb
    });

    const [personDietary, setPersonDietary]                                                       = useState("69848cb90ca620e036ea3b9e");
    const [personAccomodation, setPersonAccomodation]                                             = useState(false);
    const [additionalNotes, setAdditionalNotes]                                                   = useState("");
    
    const [spouseAccomodation, setSpouseAccomodation]                                             = useState(false);
    const [spouseDietary, setSpouseDietary]                                                       = useState("69848cb90ca620e036ea3b9e");
    const [spouseNeedFlight, setSpouseNeedFlight]                                                 = useState(false);
    const [spPcdtOption, setSPPCDTOption]                                                         = useState(false);

    const [personClinicEvent, setPersonClinicEvent]                                               = useState(false);
    const [personAirport, setPersonAirport]                                                       = useState("");
    const [accomodationType, setAccomodationType]                                                 = useState("");
    const [spouseAirport, setSpouseAirport]                                                       = useState("");

    const [spouseAccomodationType, setSpouseAccomodationType]                                     = useState(""); 
    
    const [listEventsPublic, setListEventsPublic]                                                 = useState([]);
    const [specialAccomodation, setSpecialAccomodation]                                           = useState("");
    ///////////////////////////////////////////////////
    const EVENTCODE   = "18261"; //main event code
    const EVENTCODES  = ["69385", "36298", "98228"]; //main event, gala event and tradeshow
    const EVENTCLINIC = "57987"; //clinic event option
    ///////////////////////////////////////////////////
    const [goingEvent, setGoingEvent]                                                             = useState("");
    const [spouseGoingEvent, setSpouseGoingEvent]                                                 = useState("");
    const [personSpecialAccomodation, setPersonSpecialAccomodation]                               = useState("");
    
    const handleNext = () => {
      if (step === 6 && !hasSpouse) {
        setStep(9); // Jump over Step 7 & 8
      } else {
        setStep(prev => prev + 1);
      }
    };

    // Function to handle moving backward
    const handleBack = () => {
      if (step === 9 && !hasSpouse) {
        setStep(6); // Jump back over Step 7 & 8
      } else if (step > 1) {
        setStep(prev => prev - 1);
      }
    };
    
  return (
    <div className="lane-panel">
       <NavigationHeaders
          iconType={<img src={imgVIP} className="home-icon-img" />}
          mainTitle={"The Local Choice Pharmacy VIP"}
          subTitle={"Complete your RSVP for the conference and tradeshow"}
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
                                pDetails={pDetails}
                                setPDetails={setPDetails} 
                                setProcessing={setProcessing}
                              />
             }

             {
               step === 2 && <Step2 
                                setStep={handleNext}
                                pDetails={pDetails} 
                                selectedEvent={selectedEvent}
                                setSelectedEvent={setSelectedEvent}
                                EVENTCODES={EVENTCODES}
                                goingEvent={goingEvent} 
                                setGoingEvent={setGoingEvent}
                                setProcessing={setProcessing}
                                setListEventsPublic={setListEventsPublic}
                              />
             }

             {
               step === 3 && <Step3 
                              setStep={handleNext}
                              person={person}
                              setPerson={setPerson}
                              setProcessing={setProcessing}/>
             }

             {
               step === 4 && <Step4 
                              setStep={handleNext}
                              hasSpouse={hasSpouse}
                              setHasSpouse={setHasSpouse}    
                              setSpouseGoingEvent={setSpouseGoingEvent}
                              listEventsPublic={listEventsPublic}                          
                            />
              }
              {
               step === 5 && <Step5
                              setStep={handleNext}
                              personInformation={personInformation}
                              setPersonInformation={setPersonInformation}
                              setPersonDietary={setPersonDietary}
                              personDietary={personDietary} 
                              setPersonClinicEvent={setPersonClinicEvent}
                              setPersonAirport={setPersonAirport}
                            />
              }
              {
               step === 6 && <Step5Flight
                              setStep={handleNext}
                              needFlight={needFlight}
                              setNeedFlight={setNeedFlight}
                              personAirport={personAirport} 
                              setPersonAirport={setPersonAirport}
                            />
              }
                 {/* ONLY if there is a Spouse*/}
                  {
                  step === 7 && <Step6
                                    setStep={handleNext}
                                    spouse={spouse}
                                    setSpouse={setSpouse}                                  
                                  />
                  }

                  {/* ONLY if there is a Spouse*/}
                  {
                    step === 8 && <Step7 
                              setStep={handleNext}
                                spouseInformation={spouseInformation} 
                                setSpouseInformation={setSpouseInformation}  
                                setSpouseDietary={setSpouseDietary}
                                spouseDietary={spouseDietary} 
                                spouseNeedFlight={spouseNeedFlight}                                 
                                setSpouseNeedFlight={setSpouseNeedFlight}
                                setSpouseAirport={setSpouseAirport}
                                setProcessing={setProcessing}
                            />
              }                                       

              {
                
               step === 9 && <StepAccomodation
                                setStep={handleNext}
                                hasSpouse={hasSpouse}
                                personAccomodation={personAccomodation}
                                setPersonAccomodation={setPersonAccomodation}
                                spouseAccomodation={spouseAccomodation}
                                setSpouseAccomodation={setSpouseAccomodation}
                                setAccomodationType={setAccomodationType}
                                setSpouseAccomodationType={setSpouseAccomodationType}
                                setPersonSpecialAccomodation={setPersonSpecialAccomodation}
                            />
                          
              }
              
              {
                
               step === 10 && <StepArrangements
                                setStep={handleNext}
                                setAdditionalNotes={setAdditionalNotes} 
                                pcdtOption={pcdtOption}
                                pDetails={pDetails}
                                selectedEvent={selectedEvent}
                                selectedProfessions={selectedProfessions}
                                person={person}
                                personInformation={personInformation}
                                personDietary={personDietary}
                                personAccomodation={personAccomodation}
                                additionalNotes={additionalNotes}
                                needFlight={needFlight}
                                hasSpouse={hasSpouse}
                                spouse={spouse}
                                spouseInformation={spouseInformation}
                                spouseDietary={spouseDietary}
                                spouseAccomodation={spouseAccomodation}
                                spouseNeedFlight={spouseNeedFlight}
                                spPcdtOption={spPcdtOption}
                                personAirport={personAirport}
                                personClinicEvent={personClinicEvent}
                                spouseAirport={spouseAirport}
                                EVENTCLINIC={EVENTCLINIC}
                                accomodationType={accomodationType}
                                spouseAccomodationType={spouseAccomodationType}
                                personSpecialAccomodation={personSpecialAccomodation}
                                spouseGoingEvent={spouseGoingEvent}
                                specialAccomodation={specialAccomodation}
                                setProcessing={setProcessing}
                              />
                        
              }
              {
                
               step === 11 && <StepRegistrationConfirmed
                                person={person}
                                pDetails={pDetails}
                                hasSpouse={hasSpouse}
                                spouse={spouse}
                              />
                          
              }

              <img src={bgOpFoot} alt="background" className="img-bg-op-foot"/>
              <FooterArea step={step} totalSteps={totalSteps} handleBack={handleBack} imgFootLogo={imgFootLogo}/>
        </div>
    </div>
  )
}

export default VIPScreen