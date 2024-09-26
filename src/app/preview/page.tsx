'use client'

import React, { useState } from 'react';
import PrimeiraEtapa from './(components)/PrimeiraEtapa';
import { SegundaEtapa } from './(components)/SegundaEtapa';
import TerceiraEtapa from './(components)/TerceiraEtapa';
import QuartaEtapa from './(components)/QuartaEtapa';
import QuintaEtapa from './(components)/QuintaEtapa';
import SextaEtapa from './(components)/SextaEtapa';
import SetimaEtapa from './(components)/SetimaEtapa';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 2);
  }

  return (
    <div>
      {step === 1 && <PrimeiraEtapa onNextStep={nextStep} />}
      {step === 2 && <SegundaEtapa onNextStep={nextStep} />}
      {step === 3 && <TerceiraEtapa onNextStep={nextStep} />}
      {step === 4 && <QuartaEtapa onNextStep={nextStep} onPrevStep={prevStep} />}
      {step === 5 && <QuintaEtapa onNextStep={nextStep} />}
      {step === 6 && <SextaEtapa onNextStep={nextStep} />}
      {step === 7 && <SetimaEtapa />}
    </div>
  );
};

export default MultiStepForm;