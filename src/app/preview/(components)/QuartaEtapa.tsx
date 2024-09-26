import { useDataContext } from "@/context/DataContext"

export default function QuartaEtapa({ onNextStep, onPrevStep }: { onNextStep: () => void, onPrevStep: () => void }) {

  const { data, ig } = useDataContext()
  
  return (
    <div className="w-full mx-auto max-w-[450px]">
      <div className="w-full !bg-white flex flex-col min-h-[100vh] flex-1">
        <div className="light flex flex-col items-center pb-[100px] px-[30px]">
          {/* Progress bar */}
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
              style={{ transform: 'translateX(-40%)' }}
            ></div>
          </div>

          {/* Profile picture */}
          <div className="px-[20px] w-full flex flex-col items-center">
            <div className="w-[260px] h-[260px] rounded-full !bg-zinc-800 flex flex-col items-center justify-center mt-[80px]">
              <div
                className="border-4 border-white min-w-[250px] w-[250px] !min-h-[250px] !h-[250px] rounded-full"
                style={{
                  backgroundImage:
                    `url(https://phosphor.ivanenko.workers.dev/?url=${data.data.profile_pic_url_hd})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  width: '250px',
                  height: '250px',
                  borderRadius: '250px',
                }}
              ></div>
            </div>
          </div>

          {/* Username */}
          <div className="items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 flex p-[5px] text-sm px-[15px] bg-blue-100 text-blue-700 w-fit mt-[30px]">
            @{ig}
          </div>

          {/* Greeting */}
          <h1 className="text-black text-3xl mt-[20px] text-center font-nunito font-medium">
            Olá, {data.data.full_name}
          </h1>
          <p className="font-nunito text-xl mt-4 text-black">Podemos prosseguir?</p>

          {/* Continue button */}
          <div className="mt-10 w-full">
            <button onClick={() => onNextStep()} className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-900/90 h-10 px-4 py-2 font-nunito font-medium flex bg-red-500 rounded-2xl w-full text-base !py-[30px]">
              Continuar, o perfil está correto
            </button>
          </div>

          {/* Correction button */}
          <div className="mt-5 w-full flex flex-col items-center">
            <button onClick={() => onPrevStep()} className=" bg-gray-100 items-center text-black font-normal justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 font-nunito font-bold px-[40px] flex rounded-2xl text-base !py-[30px]">
              Não, quero corrigir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}