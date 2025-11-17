import Image from "next/image";
import ConsoleBox from "./Components/ConsoleBox";

export default function Home() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateCode = () => {
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters[Math.floor(Math.random() * characters.length)];
    }
    return code;
  };

  const randomCode1 = generateCode();
  const randomCode2 = generateCode();



  return (
    <div className="relative min-h-screen font-sans ">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/background.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top section */}
      <div className="w-full flex flex-row justify-between items-center px-4 mt-2">

        {/* Left: Logo + Title + Line + Complete */}
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-4">
            <img src="/images/logo.svg" alt="Lumon logo" className="w-20 h-20" />
            <h1 className="text-[#0CECF7] font-semibold">Dranesville</h1>
          </div>

          {/* line + complete box */}
          <div className="flex flex-row items-end mt-[-20px]">
            <div className="w-3/12 h-[1px] bg-[#0CECF7] rounded-full"></div>
            <div className="w-30 h-8 rounded-full flex items-center justify-center border-[1px] border-[#0CECF7] ml-[-15px]">
              <p className="text-[13px] text-[#0CECF7]">33% Complete</p>
            </div>
          </div>
        </div>

        {/* Right: random codes */}
        <div className="flex flex-row items-center gap-2">
          <p className="text-[#0CECF7] text-[12px]">{randomCode1}</p>
          <p className="text-[#BBE9C7] text-[12px]">{randomCode2}</p>
        </div>
      </div>

      {/* console */}
      <div className="mt-10 px-4">
        <ConsoleBox />
      </div>
    </div>
  );
}