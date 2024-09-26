import React from 'react';

interface PrimeiraEtapaProps {
  onNextStep: () => void;
}

const PrimeiraEtapa: React.FC<PrimeiraEtapaProps> = ({ onNextStep }) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <div className="w-full mx-auto max-w-[450px]">
      <div className=" w-full !bg-white flex flex-col min-h-[100vh]  flex-1">
        <div className="light flex flex-col items-center pb-[100px] px-[30px]">
          <div
            role="progressbar"
            aria-valuemax={100}
            aria-valuemin={0}
            data-state="indeterminate"
            data-max={100}
            className="relative overflow-hidden rounded-full bg-red-100 w-full h-[10px] px-[20px] mt-[30px]"
          >
            <div
              data-state="indeterminate"
              data-max={100}
              className="h-full w-full flex-1 bg-red-500 transition-all"
              style={{ transform: 'translateX(-67%)' }}
            />
          </div>

          <img alt="" loading="lazy" width="200" height="200" decoding="async" data-nimg="1" className="w-full px-[20px] mt-[40px] "
            src="/1.webp" />

          <h1 className="text-black text-3xl -mt-[10px] text-center font-semibold ">Descubra em 1 minuto quem ainda te ama e quem te odeia</h1>
          <div className="items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 flex p-[5px] text-base px-[29px] bg-blue-100 text-blue-700 w-fit mt-[30px]">Resultado Imediato</div>
          <div className="grid mt-[30px] gap-[10px] grid-cols-2">
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">Quem não te tira os olhos</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-normal text-sm text-black">Reviu seus stories mais que 3 vezes</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">Quem não te esquece</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-normal text-sm text-black">Diz que superou mas visitou seu perfil 3x hoje</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">Quem não te tira da boca</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-normal text-sm text-black">Seus seguidores que mais te mencionaram</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">Quem tá te querendo</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-normal text-sm text-black">Quem passou mais tempo vendo seu perfil</p>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full">
            <button
              onClick={handleSubmit}
              className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-900/90 h-10 px-4 py-2 text-xl font-bold flex bg-red-500 rounded-2xl w-full !py-[40px]"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeiraEtapa;