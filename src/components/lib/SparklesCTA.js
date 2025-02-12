"use client"
import { useTheme } from "next-themes";
import { SparklesCore } from "@/components/ui/sparkles";

const SparklesCTA = ({title}) => {
  const {theme} = useTheme();
  return ( 
    <div className="h-[40rem] z-20 w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
    <h1 className="text-7xl lg:text-9xl font-bold text-center relative z-20">
      {title}
    </h1>
    <div className="w-[40rem] h-40 relative">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* Core component */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor={theme === "dark"? "#ffffff": "#000000"}
      />

      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  </div>
   );
}
 
export default SparklesCTA;