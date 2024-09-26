'use client'

import { useDataContext } from '@/context/DataContext';
import React, { useState } from 'react';

interface SegundaEtapaProps {
  onNextStep: () => void;
}

export function SegundaEtapa({ onNextStep }: SegundaEtapaProps) {

  const { ig, setIg } = useDataContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <div className="w-full mx-auto max-w-[450px]">
      <div className="w-full !bg-white flex flex-col min-h-[100vh] flex-1">
        <div className="light flex flex-col items-center pb-[100px] px-[30px]">
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            role="progressbar"
            data-state="indeterminate"
            data-max="100"
            className="relative overflow-hidden rounded-full bg-red-100 w-full h-[10px] px-[20px] mt-[30px]"
          >
            <div
              data-state="indeterminate"
              data-max="100"
              className="h-full w-full flex-1 bg-red-500 transition-all"
              style={{ transform: 'translateX(-55%)' }}
            ></div>
          </div>
          <img alt="" loading="lazy" width="200" height="200" decoding="async" data-nimg="1" className="w-full px-[20px] mt-[40px] "
            src="/2.webp" />

          <h1 className="text-black text-3xl -mt-[10px] text-center font-semibold ">
            Primeiro, qual é o seu perfil?
          </h1>
          <p className="font-nunito text-black text-lg my-8">Informe seu perfil para iniciar a análise</p>
          <form className="grid mt-4 w-full max-w-sm items-center gap-1.5" onSubmit={handleSubmit}>
            <label className="font-medium peer-disabled:cursor-not-allowed text-black peer-disabled:opacity-70 text-[17px]" htmlFor="ig">
              Seu Instagram (sem o @)
            </label>
            <input
              type="text"
              className="flex h-10 text-black w-full border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-2xl text-[17px] font-nunito py-[32px] mt-2 px-[25px]"
              required
              id="ig"
              placeholder="Ex.: cristiano"
              value={ig}
              onChange={(e) => setIg(e.target.value)}
            />
            <div className="mt-8 w-full">
              <button
                className="items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-900/90 h-10 px-4 py-2 font-nunito font-bold flex bg-red-500 rounded-2xl w-full !py-[30px]"
                type="submit"
                disabled={!ig}
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}