'use client'

import { useDataContext } from "@/context/DataContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules'; // Importação correta do Autoplay
import { toast } from "sonner";
interface Account {
  username: string;
  full_name: string;
  profile_pic_base64: string;
}

interface ApiResponse {
  count: number;
  items: Account[];
}

export default function SextaEtapa({ onNextStep }: { onNextStep: () => void }) {
const { ip, ig, data: data2 } = useDataContext();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lockedIndices, setLockedIndices] = useState<number[]>([]);

  const maskUsername = (username: string) => {
    const visibleLength = 3; // Mostra os primeiros 3 caracteres
    const maskedLength = username.length - visibleLength;
    const maskedPart = '*'.repeat(maskedLength);
    return `${username.slice(0, visibleLength)}${maskedPart}`;
  };

  // Lista de mensagens com placeholders para variação
  const messageTemplates = [
    "@{username} tirou um print do último stories seu.",
    "@{username} compartilhou seu perfil com ********",
    "@{username} acabou de visitar seu perfil.",
    "@{username} mencionou você em uma conversa privada.",
    "@{username} curtiu seu post recente.",
  ];

  // Função para selecionar uma mensagem aleatória e formatar com o nome de usuário
  const getRandomMessage = (username: string) => {
    const randomIndex = Math.floor(Math.random() * messageTemplates.length);
    return messageTemplates[randomIndex].replace("{username}", maskUsername(username));
  };

  // Função para exibir o alerta com Sonner
  const showAlert = (username: string) => {
    const message = getRandomMessage(username);
    toast.success(message);
  };

  useEffect(() => {

    let interval: NodeJS.Timeout | undefined; // Definir a variável 'interval' aqui

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/instagram/similar-accounts?username_or_id_or_url=${ig}`);
        setData(response.data);

        // Selecionar dois índices aleatórios
        const randomIndices = getRandomIndices(5, 2); // 5 itens, 2 aleatórios
        setLockedIndices(randomIndices);

        let currentIndex = 0;
        interval = setInterval(() => {
          if (currentIndex < response.data.items.length) {
            showAlert(response.data.items[currentIndex].username);
            currentIndex += 1;
          } else {
            clearInterval(interval); // Para de exibir alerts após todos serem mostrados
          }
        }, 6000); // Intervalo de 3 segundos

      } catch (error) {
        console.error('Erro ao buscar contas similares:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (interval) clearInterval(interval); // Limpa o intervalo se o componente for desmontado ou etapa for mudada
    };

  }, []);

  if (loading) {
    return <h1>Carregando...</h1>; // Corrigido para retornar o JSX enquanto carrega
  }

  if (!data || !data.items) {
    return <h1>Nenhum dado encontrado</h1>;
  }

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
              style={{ transform: "translateX(-10%)" }}
            ></div>
          </div>
          <h1 className="text-black text-4xl mt-[120px] text-center font-nunito font-medium">
            Prévia
          </h1>
          <div className="items-center rounded-full border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent flex p-[5px] py-[10px] mt-[30px] text-center font-nunito text-base px-[15px] hover:bg-red-100 bg-yellow-100 text-yellow-800 w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle-alert mr-[8px]"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            Não saia dessa página.
          </div>
          <p className="font-inter text-center text-sm mt-[30px] px-[20px] text-black">
            Liberamos apenas UMA PRÉVIA por aparelho.
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-big-down-dash mt-[20px]  text-black"
          >
            <path d="M15 5H9"></path>
            <path d="M15 9v3h4l-7 7-7-7h4V9z"></path>
          </svg>

          <div className="grid mt-[40px] gap-[10px] font-nunito grid-cols-2">
            {/* First Box */}
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] pb-[10px] px-[15px]">
                <div className="p-3 h-[120px] flex flex-col justify-center">
                  <svg
                    className="CircularProgressbar font-bold text-center !text-base"
                    viewBox="0 0 100 100"
                    data-test-id="CircularProgressbar"
                  >
                    <path
                      className="CircularProgressbar-trail"
                      d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                      strokeWidth="8"
                      fillOpacity="0"
                      style={{
                        stroke: "rgb(214, 214, 214)",
                        strokeDasharray: "289.027px, 289.027px",
                        strokeDashoffset: "0px",
                      }}
                    ></path>
                    <path
                      className="CircularProgressbar-path"
                      d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                      strokeWidth="8"
                      fillOpacity="0"
                      style={{
                        stroke: "rgb(239, 68, 68)",
                        strokeDasharray: "289.027px, 289.027px",
                        strokeDashoffset: "199.428px",
                      }}
                    ></path>
                    <text
                      className="CircularProgressbar-text"
                      x="50"
                      y="50"
                      style={{ fill: "rgb(0, 0, 0)", fontSize: "20px" }}
                    >
                    </text>
                  </svg>
                </div>
              </div>
              <div className="p-6 pt-0 text-center px-[13px] pb-[15px]">
                <p className="font-nunito text-sm text-black">
                  31% dos seus seguidores apresentam sinais de interesse amoroso
                </p>
              </div>
            </div>

            {/* Second Box */}
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="space-y-1.5 p-6 py-[15px] flex flex-col items-center pb-[10px] px-[15px]">
                <div className="bar w-[40px] h-[110px] mb-[10px] flex flex-col justify-end rounded-lg bg-zinc-100">
                  <small className="font-nunito font-bold text-xs mb-[5px] text-blue-500 text-center">
                    60%
                  </small>
                  <div
                    className="w-full bg-blue-400 rounded-t-none rounded-lg"
                    style={{ height: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito text-sm text-black">
                  Você é bem vista(o) por 60% dos seus seguidores
                </p>
              </div>
            </div>

            {/* Third Box */}
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] pb-[8px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">
                  15 pessoas
                </h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] !pb-[20px]">
                <p className="font-nunito text-sm text-black">
                  visitaram seu perfil nos últimos dias
                </p>
              </div>
            </div>

            {/* Fourth Box */}
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] pb-[8px] px-[10px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">
                  5 conversas
                </h3>
              </div>
              <div className="p-6 pt-0 text-center px-[10px] !pb-[20px]">
                <p className="font-nunito text-sm text-black">
                  contêm seu nome, 3 positivas e 2 negativas
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-black text-2xl mt-[50px] text-center font-nunito font-medium">
            Prints recuperados
            <br />
            de pessoas que te conhecem:
          </h3>

          <div className="text-center flex flex-col items-center text-black mt-4 text-sm gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check inline-block mr-[5px] text-center"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              Entre seus seguidores
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check inline-block mr-[5px] text-center"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              Amigas(os) de seus seguidores
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check inline-block mr-[5px] text-center"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              Fingem ser seus amigos
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check inline-block mr-[5px] text-center"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              Não te seguem mas stalkeiam você
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check inline-block mr-[5px] text-center"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              Moram em <strong>{ip.city}</strong>
            </span>
          </div>

          <div className="print bg-[#000] rounded-2xl relative h-[240px] mt-[40px] w-full">
            <div className="itens space-x-3 flex items-end absolute z-[4] left-[4%] top-[35%]">
              <div
                className="min-h-[25px] mb-[8px] min-w-[25px] rounded-full"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: "url('/profile-new.png')",
                }}
              ></div>
              <div className="messages select-none pointer-events-none space-y-[3px] pr-[20px]">
                <div className="bg-[#262626] text-[14px] w-fit rounded-tr-3xl rounded-bl-[4px] rounded-br-3xl rounded-tl-3xl px-[14px] py-[8px] text-[#eee]">
                  <span>
                    {data2.data.full_name} do <span className="blur-sm">dados ocultos</span>
                  </span>
                </div>
                <div className="bg-[#262626] text-[14px] w-fit rounded-tr-3xl rounded-tl-[4px] rounded-bl-[4px] rounded-br-3xl px-[14px] py-[8px] text-[#eee]">
                  <span>sabe quem é?</span>
                </div>
                <div className="bg-[#262626] text-[14px] w-fit overflow-clip rounded-tr-3xl rounded-bl-3xl rounded-br-3xl rounded-tl-[4px] px-[14px] py-[8px] text-[#eee]">
                  <span className="blur-sm">são dados ocultos, apenas no relatório</span>
                </div>
              </div>
            </div>
            <div
              className="absolute z-[2] rounded-2xl h-full w-full"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url('/print-message-new.png')",
              }}
            ></div>

            <div
              className="absolute z-[1] scale-[85%] opacity-70 -top-[35px] rounded-2xl h-full w-full"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url('/print-message-new.png')",
              }}
            ></div>
          </div>

          <p className="font-inter text-red-500 text-center text-sm mt-[20px] px-[20px]">VEJA OS PRINTS <strong>SEM CENSURA</strong><br />NO RELATÓRIO COMPLETO</p>

          <h3 className="text-black text-2xl mt-[50px] text-center font-nunito font-medium">🔞 Conteúdo impróprio</h3>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground mt-[15px] bg-red-500 hover:bg-red-500">Possível interesse amoroso</div>
          <p className="font-inter text-black text-center text-sm mt-[20px] px-[20px]">Nossa inteligência artificial detectou<br />conversas <strong className="text-base">SOBRE VOCÊ</strong> contendo possíveis conteúdos impróprios/sexuais</p>

          <div className="print bg-[#000] rounded-2xl relative h-[240px] mt-[40px] w-full">
            <div className="itens space-x-3 flex items-end absolute z-[4] left-[4%] top-[35%]">
              <div
                className="min-h-[25px] mb-[8px] min-w-[25px] rounded-full"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: "url('/profile2.png')",
                }}
              ></div>
              <div className="messages select-none pointer-events-none space-y-[3px] pr-[20px]">
                <div className="bg-[#262626] text-[14px] w-fit rounded-tr-3xl rounded-bl-[4px] rounded-br-3xl rounded-tl-3xl px-[14px] py-[8px] text-[#eee]">
                  vei
                </div>
                <div className="bg-[#262626] text-[14px] w-fit rounded-tr-3xl rounded-tl-[4px] rounded-bl-[4px] rounded-br-3xl px-[14px] py-[8px] text-[#eee]">
                  <span>
                    to achando {data2.data.full_name} muito <span className="blur-sm">dados ocultos</span>
                  </span>
                </div>
                <div className="bg-[#262626] text-[14px] w-fit overflow-clip rounded-tr-3xl rounded-bl-3xl rounded-br-3xl rounded-tl-[4px] px-[14px] py-[8px] text-[#eee]">
                  <span>pqp</span>
                </div>
              </div>
            </div>
            <div
              className="absolute z-[2] rounded-2xl h-full w-full"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url('/print-message-2.png')",
              }}
            ></div>
            <div
              className="absolute z-[1] scale-[85%] opacity-70 -top-[35px] rounded-2xl h-full w-full"
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url('/print-message-2.png')",
              }}
            ></div>
          </div>

          <p className="text-black font-inter text-center text-sm mt-[30px] px-[20px]">...e mais <strong className="text-xl">7</strong> menções e prints</p>
          <p className="font-inter text-red-500 text-center text-sm mt-[20px] px-[20px]">VEJA OS PRINTS <strong>SEM CENSURA</strong><br />NO RELATÓRIO COMPLETO</p>
          <a href="#footer" className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-900/90 h-10 px-4 py-2 font-nunito cursor-pointer text-lg font-medium flex bg-red-500 mt-[30px] rounded-2xl w-full !py-[30px]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye mr-[10px]"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg> Revelar perseguidores</a>

          <h3 className="text-black text-2xl mt-[50px] text-center font-nunito font-medium ">Reviram seus stories<br />entre 1 e 4 vezes:</h3>

          <div className="mt-[30px] w-full">
            <div className="relative w-full">
              <div className="overflow-hidden">
                <div className="flex -ml-4">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    autoplay={{ delay: 1000, disableOnInteraction: false }} // Configuração para autoplay
                    loop={true} // Ativa o looping infinito
                    modules={[Autoplay]} // Apenas o Autoplay é necessário aqui
                  >
                    {data.items.slice(0, 5).map((item: Account, index: number) => (
                      <SwiperSlide key={index}>
                        {lockedIndices.includes(index) ? (
                          // Slide bloqueado com cadeado
                          <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm w-full min-h-[250px]">
                            <div
                              className="w-full !rounded-t-lg min-h-[250px] !h-[280px] flex items-center justify-center"
                              style={{
                                backgroundImage: `url(${item.profile_pic_base64})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                filter: 'blur(5px)', // Aplica o blur no slide bloqueado
                              }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-700"
                              >
                                <path d="M12 17h.01"></path>
                                <path d="M9 10v-2a3 3 0 1 1 6 0v2"></path>
                                <rect x="4" y="10" width="16" height="10" rx="2"></rect>
                              </svg>
                            </div>
                          </div>
                        ) : (
                          // Slide normal com nome e usuário
                          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full min-h-[250px]">
                            <div className="flex flex-col space-y-1.5 p-6 !p-[0px] !rounded-t-xl">
                              <div
                                className="w-full !rounded-t-lg min-h-[200px] !h-[200px]"
                                style={{
                                  backgroundImage: `url(${item.profile_pic_base64})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center center',
                                }}
                              ></div>
                            </div>
                            <div className="p-6 text-center flex flex-col items-center px-[13px] pt-[15px] pb-[15px]">
                              <h4 className="font-nunito text-base text-black font-medium break-all !text-wrap">
                                {item.full_name}
                              </h4>
                              <small className="text-center text-sm text-gray-900 mt-4 flex break-all font-nunito font-medium">
                                @{item.username}
                              </small>
                            </div>
                          </div>
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <p className="font-nunito text-xl text-red-500 italic mt-8 font-semibold">... e mais <strong className="text-2xl">11</strong></p>

          <h3 className="text-black text-2xl mt-[50px] text-center font-nunito font-medium ">Visitaram seu perfil essa semana de 2 a 7 vezes:</h3>
          <div className="mt-[30px] w-full">
            <div className="relative w-full">
              <div className="overflow-hidden">
                <div className="flex -ml-4">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    autoplay={{ delay: 1400, disableOnInteraction: false }} // Configuração para autoplay
                    loop={true} // Ativa o looping infinito
                    modules={[Autoplay]} // Apenas o Autoplay é necessário aqui
                  >
                    {data.items.slice(10, 15).map((item: Account, index: number) => (
                      <SwiperSlide key={index}>
                        {lockedIndices.includes(index) ? (
                          // Slide bloqueado com cadeado
                          <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm w-full min-h-[250px]">
                            <div
                              className="w-full !rounded-t-lg min-h-[250px] !h-[280px] flex items-center justify-center"
                              style={{
                                backgroundImage: `url(${item.profile_pic_base64})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                filter: 'blur(5px)', // Aplica o blur no slide bloqueado
                              }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-700"
                              >
                                <path d="M12 17h.01"></path>
                                <path d="M9 10v-2a3 3 0 1 1 6 0v2"></path>
                                <rect x="4" y="10" width="16" height="10" rx="2"></rect>
                              </svg>
                            </div>
                          </div>
                        ) : (
                          // Slide normal com nome e usuário
                          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full min-h-[250px]">
                            <div className="flex flex-col space-y-1.5 p-6 !p-[0px] !rounded-t-xl">
                              <div
                                className="w-full !rounded-t-lg min-h-[200px] !h-[200px]"
                                style={{
                                  backgroundImage: `url(${item.profile_pic_base64})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center center',
                                }}
                              ></div>
                            </div>
                            <div className="p-6 text-center flex flex-col items-center px-[13px] pt-[15px] pb-[15px]">
                              <h4 className="font-nunito text-base text-black font-medium break-all !text-wrap">
                                {item.full_name}
                              </h4>
                              <small className="text-center text-sm text-gray-900 mt-4 flex break-all font-nunito font-medium">
                                @{item.username}
                              </small>
                            </div>
                          </div>
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>

          <p className="font-nunito text-xl text-red-500 italic mt-8 font-semibold">... e mais <strong className="text-2xl">15</strong></p>


          <h3 id="footer" className="text-black text-2xl mt-[50px] text-center font-nunito font-medium ">Os viciados em você:</h3>

          <div className="grid w-full mt-[30px] gap-[10px] grid-cols-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
              <div className="flex flex-col space-y-1.5 p-6 pt-2 pb-0 !rounded-t-xl">
                <h1 className="text-[50px] text-center">🔒</h1>
              </div>
              <div className="p-6 text-center flex flex-col items-center px-[13px] pt-[15px] pb-[20px]">
                <h4 className="font-nunito font-medium  !text-wrap text-xl text-black">[SECRETO]</h4>
                <p className="text-sm text-center mt-2  font-nunito text-black">Visitou seu perfil<br /><strong>12 vezes ontem</strong></p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
              <div className="flex flex-col space-y-1.5 p-6 pt-2 pb-0 !rounded-t-xl">
                <h1 className="text-[50px] text-center">🔒</h1>
              </div>
              <div className="p-6 text-center flex flex-col items-center px-[13px] pt-[15px] pb-[20px]">
                <h4 className="font-nunito font-medium !text-wrap text-xl text-black">[SECRETO]</h4>
                <p className="text-sm text-center mt-2  font-nunito text-black">Visitou seu perfil<br />de madrugada</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
              <div className="flex flex-col space-y-1.5 p-6 pt-2 pb-0 !rounded-t-xl">
                <h1 className="text-[50px] text-center">🔒</h1>
              </div>
              <div className="p-6 text-center flex flex-col items-center px-[13px] pt-[15px] pb-[20px]">
                <h4 className="font-nunito font-medium break-all !text-wrap text-xl text-black">[SECRETO]</h4>
                <p className="text-sm text-center mt-2  font-nunito text-black">Colocou <strong>apenas você nos melhores amigos</strong></p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
              <div className="flex flex-col space-y-1.5 p-6 pt-2 pb-0 !rounded-t-xl">
                <h1 className="text-[50px] text-center">🔒</h1>
              </div>
              <div className="p-6 text-center flex flex-col items-center px-[13px] pt-[15px] pb-[20px]">
                <h4 className="font-nunito font-medium break-all !text-wrap text-xl text-black">[SECRETO]</h4>
                <p className="text-sm text-center mt-2  font-nunito text-black">Entrou na DM de vocês hoje</p>
              </div>
            </div>
          </div>
          <p className="font-inter flex items-center justify-center text-black text-sm mt-[30px] px-[20px]">E mais...</p>

          <div className="mt-[60px] w-full">
            <button
              onClick={() => onNextStep()}
              className="items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-900/90 h-10 px-4 py-2 font-nunito text-xl font-bold flex bg-red-500 rounded-2xl w-full !py-[40px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye mr-[10px]">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Ver relatório completo
            </button>

            <p className="font-nunito text-xl text-red-500 italic mt-8 text-center font-medium">Disponível por tempo limitado</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function getRandomIndices(totalItems: number, numberOfIndices: number): number[] {
  const indices: any = [];
  while (indices.length < numberOfIndices) {
    const randomIndex = Math.floor(Math.random() * totalItems);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}
