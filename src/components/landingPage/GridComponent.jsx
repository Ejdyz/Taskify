import { GridPattern } from "@/components/ui/grid-pattern";
import { Button } from "@heroui/button";
import SignInModal from "../lib/SignInModal"

const GridComponent = () => {
  return(
    <>
      <div className="md:h-[10dvh] h-[5dvh] relative flex size-full items-center justify-center rounded-lg -mt-52 p-48">
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className={"[mask-image:linear-gradient(to_top_left,rgba(10,10,10,0.5),transparent,transparent)] "}
          />
      </div>

      <div className="md:h-[20dvh] h-[10dvh] relative flex size-full items-center justify-center rounded-lg py-48">
        <div className="text-center mx-auto z-30">
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Todo List That Will <span className="text-primary">Change</span> Your Life.</h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Effortless productivity, seamless experience. Get things done your way, simple, and beautifully. Try it now!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
          <SignInModal color="primary" size="lg">Get Started!</SignInModal> 
          </div>
        </div>
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className={"[mask-image:linear-gradient(to_bottom_right,transparent,rgba(10,10,10,0.5),transparent)] "}
        />
      </div>
      <div className="md:h-[10dvh] h-[5dvh] relative flex size-full items-center justify-center rounded-lg p-48">
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className={"[mask-image:linear-gradient(to_bottom_right,rgba(10,10,10,0.5),transparent,transparent)] "}
        />
      </div>
    </>
  ) 
}
export default GridComponent;