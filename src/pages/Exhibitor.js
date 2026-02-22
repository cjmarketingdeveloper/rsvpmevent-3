import React, { useEffect, useState } from 'react'
import bgOpFoot from '../assets/bgOpFoot.png';
import imgExhibitor from '../assets/imgExhibitor.png';
import imgFootLogo from '../assets/logoFooter.png';
import FooterArea from '../components/FooterArea';
import NavigationHeaders from '../components/NavigationHeaders';
import Spinner from '../components/Spinner';
import { FaClipboardCheck } from "react-icons/fa";
import Step1 from '../components/widgets/exhibitor/Step1';
import Step2 from '../components/widgets/exhibitor/Step2';
import Step3 from '../components/widgets/exhibitor/Step3';
import Step4 from '../components/widgets/exhibitor/Step4';
import Step5 from '../components/widgets/exhibitor/Step5';
import Step6 from '../components/widgets/exhibitor/Step6';
import Step7 from '../components/widgets/exhibitor/Step7';
import Step8Stand from '../components/widgets/exhibitor/Step8Stand';
import Step9StandDetails from '../components/widgets/exhibitor/Step9StandDetails';
import Step10Builder from '../components/widgets/exhibitor/Step10Builder';
import Step10StandCategory from '../components/widgets/exhibitor/Step10StandCategory';
import Step11Furniture from '../components/widgets/exhibitor/Step11Furniture';
import Step12Gala from '../components/widgets/exhibitor/Step12Gala';
import Step13 from '../components/widgets/exhibitor/Step13';
import StepRegistrationConfirmed from '../components/widgets/exhibitor/StepRegistrationConfirmed';
import axios from 'axios';
import * as CONSTANTS from "../CONSTANTS";

function Exhibitor() {
  const [processing, setProcessing]                                 = useState(false);
  const [step, setStep]                                             = useState(1);
  const [cCategory, setCCategory]                                   = useState("");
  //////////////////////////////////////////////////////////////////////
  const [staffRsvp, setStaffRsvp]                           = useState(false);
    // Determine total steps and increment dynamically
      const flow1Max = 15;  // No spouse
      const flow2Max = 16; // With spouse

      // Determine total steps and increment dynamically
      const totalSteps = staffRsvp ? flow2Max : flow1Max;
      
      // Calculate progress percentage automatically
      // We use Math.min to ensure we don't exceed 100%
      const rateCovered = Math.floor(((step - 1) / totalSteps) * 100);
    //////////////////////////////////////////////////////////////////////
    const [pDetails, setPDetails]                             = useState("");
    const [selectedEvent, setSelectedEvent]                   = useState("");
    const [person, setPerson]                                 = useState({
      "name": "",
      "surname": "",
      "email": "",
      "phonenumber": "",
      "password": ""
    });
    
    const [dietaryOptionList, setDietaryOptionList]                 = useState([]);

    const [dietary, setDietary]                               = useState("");
    const [allergies, setAllergies]                           = useState([]);
   
    const [standDetails, setStandDetails]                     = useState({
      "standNumber" : "",
      "standHeader": ""
    });

    const [members, setMembers]                                           = useState([]);
    const [hasStandNumber, setHasStandNumber]                             = useState(false);
    const [standBuilder, setStandBuilder]                                 = useState(false);
    const [standCategory, setStandCategory]                               = useState("");
    const [furnitureRequirments, setFurnitureRequirments]                 = useState(false);
    const [galaAttendance, setGalaAttendance]                             = useState(false);
    const [additionalArrange, setAdditionalArrange]                       = useState("");
    /////////////////////////////////////////////////////////////////////////
    const [galaGuests, setGalaGuests]                                     = useState([
        { firstName: '', lastName: '', dietary: '69848cb90ca620e036ea3b9e', allergies: [], currentAllergy: '' },
        { firstName: '', lastName: '', dietary: '69848cb90ca620e036ea3b9e', allergies: [], currentAllergy: '' }
    ]);
    /////////////////////////////////////////////////////////////////////////
    const handleNext = () => {
        setStep((prevStep) => {
          switch (prevStep) {
            case 4:
              // True goes to 6 (skips 5), False goes to 5.
              return staffRsvp ? 6 : 5;

            case 5:
              // If we are at 5, staffRsvp was false. Jump straight to 8.
              return 8;
            case 11:
              return cCategory === 'c' ? 14 : 12;
            default:
              // Steps 1, 2, 3, 6, 7, and 8+ all just add 1.
              return prevStep + 1;
          }
        });
    };
    // Function to handle moving backward
    const handleBack = () => {
      setStep((prevStep) => {
        switch (prevStep) {
          case 8:
            // If staffRsvp was false, they came from 5. 
            // If true, they came from 7.
            return staffRsvp ? 7 : 5;

          case 6:
            // If they are at 6, they jumped over 5 from 4.
            return 4;

          case 5:
            // Standard back to 4.
            return 4;
          
          case 14:
            // If they chose 'c', they came from 10. Otherwise, they came from 12.
            return cCategory === 'c' ? 11 : 13;
          default:
            // Standard decrement for steps 2, 3, 4, and 7.
            return prevStep - 1;
        }
      });
    };

    useEffect(() => {
        listTheDietaries();
    },[])
        
    const listTheDietaries = async () => {
        try{
            const diet = await axios.get(CONSTANTS.API_URL +"settings/list/dietaries/v2");    
            if(diet.data.length > 0){
                setDietaryOptionList(diet.data);
            }
        }catch(errorData){
            console.log(errorData);
        }
    }

  return (
    <div className="lane-panel">
        <NavigationHeaders
            iconType={<img src={imgExhibitor} className="home-icon-img" />}
            mainTitle={"The Local Choice Pharmacies Exhibitor"}
            subTitle={"Complete your RSVP for exhibitor participation"}
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
            { /*** Always show ***/}
             {
                
                step === 1 && <Step1 
                                setStep={handleNext} 
                                pDetails={pDetails} 
                                setPDetails={setPDetails}
                              />
              }
              { /*** Always show ***/}
              {
                
                step === 2 && <Step2 
                                setStep={handleNext} 
                                selectedEvent={selectedEvent}
                                setSelectedEvent={setSelectedEvent}
                              />
              }
              { /*** Always show ***/}
              {
                
                step === 3 && <Step3 
                                setStep={handleNext} 
                                person={person}
                                setPerson={setPerson}
                              />
              }
              { /*** Always show ***/}
              {
                
                step === 4 && <Step4 
                                setStep={handleNext} 
                                staffRsvp={staffRsvp}
                                setStaffRsvp={setStaffRsvp}
                              />
              }
                          
              { /*** Only show when staffRsvp true ***/}
              {
                 
                   step === 5 &&  <Step5
                                        setStep={handleNext}
                                        person={person}
                                        setDietary={setDietary}
                                        allergies={allergies}
                                        setAllergies={setAllergies}  
                                        dietaryOptionList={dietaryOptionList}
                                        setDietaryOptionList={setDietaryOptionList}                         
                                      />                                        
              }
              { /*** Only show when staffRsvp false ***/}
              {
                step === 6 && <Step6
                                setStep={handleNext}
                                members={members} 
                                setMembers={setMembers}                         
                               />
              }
               { /*** Only show when staffRsvp true ***/}
              {
                
                step === 7 && <Step7
                                setStep={handleNext}
                                person={person}
                                members={members} 
                                setMembers={setMembers}
                                setDietary={setDietary}
                                allergies={allergies}
                                setAllergies={setAllergies} 
                                dietaryOptionList={dietaryOptionList}
                                setDietaryOptionList={setDietaryOptionList}  
                               />
                                              
              }
              { /*** Always show ***/}
              {
                
                step === 8 && <Step8Stand
                                setStep={handleNext}
                                hasStandNumber={hasStandNumber}
                                setHasStandNumber={setHasStandNumber} 
                               />                
              }
              { /*** Always show ***/}
              {
                
                step === 9 && <Step9StandDetails
                                setStep={handleNext}
                                standDetails={standDetails}
                                setStandDetails={setStandDetails}                           
                               />
                              
              }
              { /*** Always show ***/}
              {
                
                step === 10 && <Step10Builder
                                setStep={handleNext}
                                standBuilder={standBuilder}
                                setStandBuilder={setStandBuilder}                           
                               />
                              
              }
              { /*** Always show ***/}
              {
                
                step === 11 && <Step10StandCategory
                                setStep={handleNext}
                                standCategory={standCategory}
                                setStandCategory={setStandCategory}  
                                setCCategory={setCCategory}                         
                               />
                              
              }
              {
                
                step === 12 && <Step11Furniture
                                setStep={handleNext}
                                furnitureRequirments={furnitureRequirments}
                                setFurnitureRequirments={setFurnitureRequirments}                           
                               />
              }

              {
                
                step === 13 && <Step12Gala
                                setStep={handleNext}
                                galaAttendance={galaAttendance}
                                setGalaAttendance={setGalaAttendance}  
                                dietaryOptionList={dietaryOptionList}
                                galaGuests={galaGuests} 
                                setGalaGuests={setGalaGuests}                      
                               />
                              
              }

              {
                
                step === 14 && <Step13
                                setStep={handleNext}
                                staffRsvp={staffRsvp}
                                pDetails={pDetails}
                                selectedEvent={selectedEvent}
                                person={person}
                                dietary={dietary}
                                standDetails={standDetails}
                                members={members}
                                hasStandNumber={hasStandNumber}
                                standBuilder={standBuilder}
                                standCategory={standCategory}
                                furnitureRequirments={furnitureRequirments}
                                galaAttendance={galaAttendance}
                                additionalArrange={additionalArrange}
                                setAdditionalArrange={setAdditionalArrange}   
                                galaGuests={galaGuests} 
                                setProcessing={setProcessing}                      
                               />
                              
              }

              {
                
                step === 15 && <StepRegistrationConfirmed
                                person={person}
                                pDetails={pDetails}                          
                               />
              }
              
          </div>
          <div>
            <img src={bgOpFoot} alt="background" className="img-bg-op-foot"/>
            <FooterArea step={step} totalSteps={totalSteps} handleBack={handleBack} imgFootLogo={imgFootLogo}/>
          </div>
    </div>
  )
}

export default Exhibitor