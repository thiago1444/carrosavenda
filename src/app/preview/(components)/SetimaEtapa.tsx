'use client'

import { useEffect, useState } from "react";

export default function SetimaEtapa() {

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    // Atualiza o tempo a cada segundo
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval); // Para o contador quando chegar a zero
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

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
            className="relative overflow-hidden rounded-full bg-red-100 w-full h-[10px] mt-[30px]"
          >
            <div
              data-state="indeterminate"
              data-max="100"
              className="h-full w-full flex-1 bg-red-500 transition-all"
              style={{ transform: 'translateX(0%)' }}
            ></div>
          </div>
          <img alt="" loading="lazy" width="200" height="200" decoding="async" data-nimg="1" className="w-full px-[20px] mt-[40px] "
            src="/1.webp" />
          <h1 className="text-black text-2xl -mt-[10px] text-center font-nunito font-medium">
            🔒 Desbloquear Relatório Completo
          </h1>
          <p className="font-nunito text-xl mt-5 text-black">Você vai ter acesso à:</p>
          <div className="grid mt-[30px] gap-[10px] font-nunito grid-cols-2">
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">🔎 Replay dos stories</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito font-medium text-gray-800 text-sm">As pessoas que viram e reviram seus stories</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">🔎 Rastreio de visitas</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito font-medium text-gray-800 text-sm">Saiba quem está entrando no seu perfil</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">🔎 Rastreio de menções</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito font-medium text-gray-800 text-sm">Saiba quem são os seguidores que mais falam de você</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">🔎 Quem fica te olhando</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito font-medium text-gray-800 text-sm">
                  Veja quem tirou PRINTS do seu perfil e stories
                </p>
              </div>
            </div>
          </div>
          <p className="font-nunito text-xl mt-5 text-black mt-8 font-bold">E muito mais...</p>
          <p className="font-nunito text-lg mt-7 text-center text-black">
            Nosso sistema de relatórios é o único sistema verdadeiramente funcional do mercado.
          </p>
          <p className="font-nunito text-lg mt-7 text-center text-black">
            Poderíamos cobrar o quanto você já gastou em saídas, roupas e jantares que nunca deram em nada.
          </p>
          <p className="font-nunito text-xl mt-10 font-extrabold text-red-500">Onde você só se decepcionou.</p>
          <div className="divider w-[50px] h-[6px] bg-zinc-900 rounded-full mt-[60px]"></div>
          <p className="font-nunito text-lg mt-7 text-center text-black">Mas não vamos fazer isso,</p>
          <h1 className="text-black text-3xl mt-[20px] text-center font-nunito font-medium">
            Queremos que você tenha um alvo
          </h1>
          <p className="font-nunito text-lg mt-7 text-center text-black">
            Estamos aqui te entregando a única coisa que ainda falta para você, uma direção.
          </p>
          <p className="font-nunito text-lg mt-7 text-center text-black">
            Não adianta ficar se humilhando por alguém que não te quer,{' '}
            <strong>essa é a sua chance de ter certeza.</strong>
          </p>
          <div className="items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent flex py-[10px] mt-[50px] font-nunito px-[25px] font-normal text-base bg-amber-100 hover:bg-amber-100 text-amber-800 w-fit">
            Oferta por tempo limitado:&nbsp;<div>{formatTime(timeLeft)}</div>
          </div>
          <div className="border bg-card text-card-foreground shadow-sm rounded-xl justify-between w-full flex items-start px-[20px] mt-[50px] py-[25px]">
            <div>
              <div className="flex flex-col">
                <span className="text-2xl mr-2 font-nunito">🔓</span>
                <h3 className="text-black mt-1 text-2xl text-center font-nunito font-bold">Relatório<br />Completo</h3>
              </div>
            </div>
            <div className="flex-col flex items-end">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#18181B] text-primary-foreground hover:bg-[#343438] mb-3">
                50% off
              </div>
              <small className="text-right text-base font-nunito text-zinc-500">de R$ 94 por:</small>
              <h2 className="text-black text-right text-4xl mt-1 font-nunito font-extrabold">R$ 47,00</h2>
              <small className="text-right font-nunito text-base text-zinc-500">à vista</small>
            </div>
          </div>
          <div className="grid mt-[10px] gap-[10px] font-nunito grid-cols-2">
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] pb-[10px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">Acesso vitalício</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito font-medium text-gray-800 text-sm">Sem mensalidades, pagamento único</p>
              </div>
            </div>
            <div className="border bg-card text-card-foreground shadow-sm rounded-xl">
              <div className="flex flex-col space-y-1.5 p-6 py-[15px] pb-[10px] px-[15px]">
                <h3 className="tracking-tight text-center text-xl font-medium text-black">+ Bônus</h3>
              </div>
              <div className="p-6 pt-0 text-center px-[15px] pb-[15px]">
                <p className="font-nunito font-medium text-gray-800 text-sm">Ebook: Manual da conquista e reconquista</p>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full">
            <a
              className="items-center font-semibold justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-950/90 h-10 px-4 font-nunito py-[40px] text-xl font-bold flex bg-red-500 rounded-2xl w-full"
              href="https://pay.onlinepag.com/checkout/1208f884-ddac-4020-b483-0cbad4d19fe1"
            >
              Eu quero o relatório completo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}