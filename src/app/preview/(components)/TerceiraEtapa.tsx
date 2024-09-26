'use client'

import { useDataContext } from "@/context/DataContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TerceiraEtapa({ onNextStep }: { onNextStep: () => void }) {
  const { setData, ig } = useDataContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/instagram/info?username_or_id_or_url=${ig}`);

        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(progressInterval);
        }
        return Math.min(prevProgress + 5, 90);
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
    };
  }, [setData]);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      setTimeout(() => {
        onNextStep();
      }, 500);
    }
  }, [loading, onNextStep]);

  return (
    <div className="w-full mx-auto max-w-[450px]">
      <div className="w-full !bg-white flex flex-col min-h-[100vh] flex-1">
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
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-[100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader-circle animate-spin text-zinc-300"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          <h1 className="text-black text-2xl mt-[40px] text-center font-nunito font-medium ">
            {loading ? 'Analisando...' : 'Análise Concluída!'}
          </h1>
          <p className="font-nunito text-xl text-center font-regular mt-4 text-black">
            {loading
              ? 'Estamos capturando as informações do seu perfil, aguarde alguns segundos.'
              : 'Análise finalizada, prossiga.'}
          </p>
          <div className="flex flex-col items-center w-full mt-10">
            <label className="text-sm font-sm leading-none text-left mr-auto mb-[10px] text-black">
              {loading ? 'Carregando...' : 'Concluído!'}
            </label>
            <div className="w-full flex flex-col">
              <div className="flex flex-row justify-between mb-[5px]">
                <small className="text-right flex font-nunito font-semibold text-black">
                  {progress}%
                </small>
              </div>
              <div
                aria-valuemax={100}
                aria-valuemin={0}
                role="progressbar"
                className="relative h-4 w-full overflow-hidden rounded-full bg-red-100"
                style={{ height: '12px', transition: 'width 1s linear' }}
              >
                <div
                  className="h-full w-full flex-1 bg-red-500 transition-all"
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                ></div>
              </div>
            </div>
          </div>
          <p className="font-nunito mt-10 font-semibold text-black">Analisando seu perfil 🔎</p>
        </div>
      </div>
    </div>
  );
}
