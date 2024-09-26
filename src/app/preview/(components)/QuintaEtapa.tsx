'use client';

import { useDataContext } from "@/context/DataContext";
import { useEffect, useState } from "react";

export default function QuintaEtapa({ onNextStep }: { onNextStep: () => void }) {
  const { ip, setIp } = useDataContext();
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [statuses, setStatuses] = useState([
    { label: "Carregando informações...", progress: 22 },
    { label: "Carregando seguidores...", progress: 68 },
    { label: "Carregando visitas ao perfil...", progress: 42 },
    { label: "Carregando prints...", progress: 60 },
    { label: "Carregando últimos stories...", progress: 36 },
  ]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Função para buscar o IP e cidade
  useEffect(() => {
    const getIp = async () => {
      try {
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await response.json();
        setIp(data);
      } catch (error) {
        console.error("Erro ao buscar o IP e cidade", error);
      } finally {
        setLoading(false); // Carregamento finalizado
      }
    };
    getIp();
  }, []);

  const messages = ip
    ? [
      `5 perfis fakes criados em ${ip.city} te seguem`,
      "3 pessoas compartilharam seu perfil com amigos",
      "Mais de 3 pessoas visitaram seu perfil nos últimos dias",
    ]
    : [];

  useEffect(() => {
    const intervals = statuses.map((_, index) => {
      return setInterval(() => {
        setStatuses((prevStatuses) =>
          prevStatuses.map((status, i) =>
            i === index && status.progress < 100
              ? { ...status, progress: Math.min(status.progress + Math.random() * 5, 100) }
              : status
          )
        );
      }, getRandomTime());
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      const messageInterval = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          setVisible(true);
        }, 500);
      }, 3000);

      return () => clearInterval(messageInterval);
    }
  }, [loading, messages]);

  useEffect(() => {
    const allCompleted = statuses.every(status => status.progress >= 100);
    if (allCompleted) {
      onNextStep();
    }
  }, [statuses, onNextStep]);

  return (
    <div className="w-full mx-auto max-w-[450px]">
      <div className="w-full bg-white flex flex-col min-h-[100vh] flex-1">
        <div className="light flex flex-col items-center pb-[100px] px-[30px]">
          <div className="relative overflow-hidden rounded-full bg-red-100 w-full h-[10px] px-[20px] mt-[30px]">
            <div
              className="h-full w-full flex-1 bg-red-500 transition-all"
              style={{ transform: "translateX(-10%)" }}
            ></div>
          </div>
          <div className="flex flex-col items-center mt-[50px]">
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
              className="lucide lucide-loader-circle animate-spin text-zinc-300 "
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            <h1 className="text-black text-2xl mt-[30px] text-center font-nunito font-bold ">
              Processando dados
            </h1>
            <div className="mt-[20px] min-h-[80px] px-[20px]">
              {loading ? (
                <span className="text-red-500 font-nunito text-center font-bold text-xl">
                  Carregando localização...
                </span>
              ) : (
                <span
                  className={`text-red-500 flex items-center justify-center font-nunito text-center font-bold text-xl transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {messages[currentMessageIndex]}
                </span>
              )}
            </div>
            <div className="mt-[20px] px-[10px]">
              <p className="font-nunito text-zinc-800 text-center text-base font-medium mt-8">
                Nossos programadores criaram essa ferramenta que libera o acesso
                à informações OCULTAS do seu perfil.
              </p>
              <p className="font-nunito text-zinc-900 text-center text-base font-medium mt-8">
                <strong>Vamos revelar elas agora.</strong>
              </p>
            </div>
          </div>

          {statuses.map((status, index) => (
            <ProgressBar
              key={index}
              label={status.label}
              progress={status.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ProgressBar = ({ label, progress }: { label: string, progress: number }) => {
  return (
    <div className="w-full flex flex-col mt-5">
      <div className="flex flex-row justify-between mb-[5px]">
        <label className="text-sm text-black leading-none flex">
          {label}
        </label>
        <small className="text-right flex font-nunito font-semibold text-zinc-400">
          {Math.floor(progress)}%
        </small>
      </div>
      <div
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        className="relative h-4 w-full overflow-hidden rounded-full bg-red-100"
        style={{ height: "12px", transition: "width 1s linear" }}
      >
        <div
          className="h-full w-full flex-1 bg-red-500 transition-all"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        ></div>
      </div>
    </div>
  );
};

const getRandomTime = () => Math.floor(Math.random() * 1000) + 500; // Time between 500ms and 1500ms
