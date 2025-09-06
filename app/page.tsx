import { AuroraText } from "@/components/magicui/aurora-text";
import { Highlighter } from "@/components/magicui/highlighter";
import { Pointer } from "@/components/magicui/pointer";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  return (
    <div className="bg-gray-950 min-h-screen  w-full">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="pt-16 flex flex-col items-center ">
          <Button className="bg-transparent group rounded-full border-2  border-white text-white mb-8 hover:bg-transparent  hover:border-indigo-600 hover:text-indigo-600  transition-all duration-300">
            See What's New |{" "}
            <span className="text-indigo-500 group-hover:text-white">
              AI Diagram
            </span>
          </Button>
          <h2 className=" text-indigo-600 font-extrabold text-5xl text-center tracking-wide leading-12 ">
            <AuroraText colors={["#84cc16", "#2563eb"]}>
              Documents & Diagrams
            </AuroraText>{" "}
            <br />
            <strong className="text-gray-300 text-5xl font-semibold tracking-normal">
              for engineering teams.{" "}
            </strong>
          </h2>
          <p className="text-lg leading-6 text-white/40 font-normal text-center  mt-8 tracking-tight">
            All-in-one{" "}
            <Highlighter action="underline" color="#FF9800">
              markdown editor , collborative canvas,
            </Highlighter>{" "}
            and{" "}
            <Highlighter color="#2563eb">
              {" "}
              <span className="ml-1 text-gray-950 font-bold text-xl px-2">
                Diagram-As-Code Builder{" "}
              </span>
            </Highlighter>
          </p>
          <RainbowButton
            variant={"outline"}
            size={"lg"}
            className=" mt-10 text-base font-medium "
          >
            Learn More
          </RainbowButton>
        </div>
      </div>
      <Pointer className="fill-blue-500" />
    </div>
  );
};

export default Home;
