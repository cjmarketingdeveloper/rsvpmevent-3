import React, { useState } from 'react'
import NavigationHeaders from '../components/NavigationHeaders'
import { FaClipboardCheck, FaClinicMedical } from "react-icons/fa";
import Spinner from '../components/Spinner';
import Step1 from '../components/widgets/potential/Step1';
import Step2 from '../components/widgets/potential/Step2';
import Step3 from '../components/widgets/potential/Step3';
import Step4 from '../components/widgets/potential/Step4';
import Step5 from '../components/widgets/potential/Step5';
import Step6 from '../components/widgets/potential/Step6';
import Step7 from '../components/widgets/potential/Step7';
import StepAccomodation from '../components/widgets/potential/StepAccomodation';
import StepArrangements from '../components/widgets/potential/StepArrangements';
import StepRegistrationConfirmed from '../components/widgets/potential/StepRegistrationConfirmed';
import imgFranchise from '../assets/imgFranchise.png';
import imgFootLogo from '../assets/logoFooter.png';
import bgOpFoot from '../assets/bgOpFoot.png';
import FooterArea from '../components/FooterArea';

function Potential() {

      const [processing, setProcessing]                                 = useState(false);
      const [step, setStep]                                             = useState(1);
      //////////////////////////////////////////////////////////////////////
        const [hasSpouse, setHasSpouse]                                 = useState(null);
  
        // Define your flows
        const flow1Max = 9;  // No spouse
        const flow2Max = 10; // With spouse
  
        // Determine total steps and increment dynamically
        const totalSteps = hasSpouse ? flow2Max : flow1Max;
        
        // Calculate progress percentage automatically
        // We use Math.min to ensure we don't exceed 100%
        const rateCovered = Math.floor(((step - 1) / totalSteps) * 100);
      //////////////////////////////////////////////////////////////////////
      const [pDetails, setPDetails]                                      = useState("");
      const [selectedEvent, setSelectedEvent]                            = useState([]);
      const [pcdtOption, setPCDTOption]                                  = useState(null); //true or false
      const [needFlight, setNeedFlight]                                  = useState(null); // true or false
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
        
        const [personDietary, setPersonDietary]                                                       = useState("69848cb90ca620e036ea3b9e");
        const [personAccomodation, setPersonAccomodation]                                             = useState(null); // true or false
        const [additionalNotes, setAdditionalNotes]                                                   = useState("");
        const [personClinicEvent, setPersonClinicEvent]                                               = useState(null); // true or false
        const [personAirport, setPersonAirport]                                                       = useState("");
        const [accomodationType, setAccomodationType]                                                 = useState("");
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
    
        const [spouseAccomodation, setSpouseAccomodation]                                             = useState(false);
        const [spouseDietary, setSpouseDietary]                                                       = useState("69848cb90ca620e036ea3b9e");
        const [spouseNeedFlight, setSpouseNeedFlight]                                                 = useState(null); // true or false
        const [spPcdtOption, setSPPCDTOption]                                                         = useState(null); // true or false
        const [spouseWorkingPharm, setSpouseWorkingPharm]                                             = useState(null); // true or false
        const [spouseClinicEvent, setSpouseClinicEvent]                                               = useState(null); // true or false
        const [spouseAirport, setSpouseAirport]                                                       = useState("");
        const [spouseDesignation, setSpouseDesignation]                                               = useState("");
        const [spouseAccomodationType, setSpouseAccomodationType]                                      = useState(""); 
        const [specialAccomodation, setSpecialAccomodation]                                         = useState("");
    //////////////////////////////////////////////////
      const EVENTCODE = "39098";
      const EVENTCLINIC = "57987";
    ///////////////////////////////////////////////////
    const [goingToTradeshow, setGoingToTradeshow]                                               = useState(null); //true or false
    const [goingToGalaDiner, setGoingToGalaDiner] 			                                        = useState(null); //true or false
    const [spGoingToTradeshow, setSpGoingToTradeshow]                                           = useState(null); //true or false
    const [spGoingToGalaDiner, setSpGoingToGalaDiner] 			                                    = useState(null);

    const handleNext = () => {
      if (step === 5 && !hasSpouse) {
        setStep(8); // Jump over Step 7 & 8
      } else {
        setStep(prev => prev + 1);
      }
    };

    // Function to handle moving backward
    const handleBack = () => {
      if (step === 8 && !hasSpouse) {
        setStep(5); // Jump back over Step 7 & 8
      } else if (step > 1) {
        setStep(prev => prev - 1);
      }
    };
    
  return (
    <div className="lane-panel">
       <NavigationHeaders
            iconType={<img src={imgFranchise} className="home-icon-img" />}
            mainTitle={"The Local Choice Pharmacies Potential Franchisee"}
            subTitle={"Express your interest in franchise opportunities"}
            step={step}
            totalSteps={totalSteps} // Pass this down
            handleBack={handleBack}
         />
         {
            processing && <Spinner />
         }

         {
            (step <= totalSteps ) ? 
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
                              />
             }

             {
               step === 2 && <Step2 
                                setStep={handleNext}
                                EVENTCODE={EVENTCODE} 
                                setSelectedEvent={setSelectedEvent}
                                selectedEvent={selectedEvent}
                                setProcessing={setProcessing}
                              />
             }
             {
               step === 3 && <Step3 
                                setStep={handleNext}
                                person={person}
                                setPerson={setPerson}
                              />
             }
            {
               step === 5 && <Step4 
                                setStep={handleNext}
                                pcdtOption={pcdtOption}
                                setPCDTOption={setPCDTOption} 
                                personInformation={personInformation}
                                setPersonInformation={setPersonInformation}
                                setPersonDietary={setPersonDietary}
                                needFlight={needFlight}
                                setNeedFlight={setNeedFlight}
                                personClinicEvent={personClinicEvent}
                                setPersonClinicEvent={setPersonClinicEvent}
                                setPersonAirport={setPersonAirport}
                                goingToTradeshow={goingToTradeshow}
                                setGoingToTradeshow={setGoingToTradeshow}
                                goingToGalaDiner={goingToGalaDiner}
                                setGoingToGalaDiner={setGoingToGalaDiner}
                              />
             }

            {
                  step === 4 && <Step5 
                                    setStep={handleNext}
                                      setHasSpouse={setHasSpouse}
                                      hasSpouse={hasSpouse}
                                    />
              }
              
                  {/* ONLY if there is a Spouse*/}
                  {
                    step === 6 && <Step6 
                              setStep={handleNext}
                              spouse={spouse}
                              setSpouse={setSpouse}
                            />
                  }
                  {/* ONLY if there is a Spouse*/}
                  {
                     step === 7 && <Step7
                              setStep={handleNext}
                              spPcdtOption={spPcdtOption}
                              setSPPCDTOption={setSPPCDTOption}
                              spouseInformation={spouseInformation}
                              setSpouseInformation={setSpouseInformation}
                              setSpouseDietary={setSpouseDietary}
                              spouseNeedFlight={spouseNeedFlight}
                              setSpouseNeedFlight={setSpouseNeedFlight}
                              spouseClinicEvent={spouseClinicEvent}
                              setSpouseClinicEvent={setSpouseClinicEvent}
                              spouseAirport={spouseAirport}
                              setSpouseAirport={setSpouseAirport}
                              spouseWorkingPharm={spouseWorkingPharm}
                              setSpouseWorkingPharm={setSpouseWorkingPharm}
                              setSpouseDesignation={setSpouseDesignation}
                              spGoingToTradeshow={spGoingToTradeshow}
                              setSpGoingToTradeshow={setSpGoingToTradeshow}
                              spGoingToGalaDiner={spGoingToGalaDiner}     
                              setSpGoingToGalaDiner={setSpGoingToGalaDiner}
                              setProcessing={setProcessing}
                            />
                }

                {
               step === 8 && <StepAccomodation
                                setStep={handleNext}
                                hasSpouse={hasSpouse}
                                personAccomodation={personAccomodation}
                                setPersonAccomodation={setPersonAccomodation}
                                spouseAccomodation={spouseAccomodation}
                                setSpouseAccomodation={setSpouseAccomodation}
                                setAccomodationType={setAccomodationType}
                                setSpouseAccomodationType={setSpouseAccomodationType}
                            />
                          
              }
              {
                
               step === 9 && <StepArrangements
                                setStep={handleNext}
                                setAdditionalNotes={setAdditionalNotes} 
                                selectedEvent={selectedEvent}
                                pcdtOption={pcdtOption}
                                pDetails={pDetails}
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
                                spouseClinicEvent={spouseClinicEvent}
                                EVENTCLINIC={EVENTCLINIC}
                                spouseDesignation={spouseDesignation}
                                spouseWorkingPharm={spouseWorkingPharm}
                                accomodationType={accomodationType}
                                spouseAccomodationType={spouseAccomodationType}
                                goingToTradeshow={goingToTradeshow}
                                goingToGalaDiner={goingToGalaDiner}
                                spGoingToGalaDiner={spGoingToGalaDiner}
                                spGoingToTradeshow={spGoingToTradeshow}
                                specialAccomodation={specialAccomodation}
                                setProcessing={setProcessing}
                              />
                        
              }
              {
                
               step === 10 && <StepRegistrationConfirmed
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

export default Potential