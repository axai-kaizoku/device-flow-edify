"use client";

import { LoadingButton } from "@/components/buttons/Button";
import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { notifyAIAgents } from "@/server/orgActions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const AiAgentsMain = () => {
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("ai-agents-notify");
    setHasNotified(status === "1");
  }, []);

  const mutation = useMutation({
    mutationFn: () => notifyAIAgents(),
    onSuccess: () => {
      toast.success("Success! You'll be notified soon 🎉");
      localStorage.setItem("ai-agents-notify", "1");
      setHasNotified(true);
    },
  });

  return (
    <section className="w-full min-h-[78vh] h-fit relative  overflow-hidden">
      <div className="flex flex-col gap-4 sticky top-0 z-50 mb-4  items-center justify-center p-3 rounded-[10px] border border-[#0000001A] bg-white w-full h-full">
        <NeonGradientCard
          borderRadius={30}
          borderSize={0.01}
          className="size-36 flex items-center justify-center text-center bg-black"
        >
          <span className="pointer-events-none z-10 flex items-center justify-center w-full h-full text-white text-center text-7xl font-gilroyBold leading-none tracking-tighter text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            AI{" "}
          </span>
        </NeonGradientCard>
        <h1 className="text-xl mt-20 font-gilroyBold text-center">
          AI Agents are cooking
        </h1>
        <p className="text-center text-black/50 font-gilroyMedium">
          We're rolling out all agents shortly—get
          <br /> ready for the full experience.
        </p>

        <LoadingButton
          disabled={hasNotified}
          loading={mutation.isPending}
          onClick={() => mutation.mutate()}
          variant={hasNotified ? "outline" : "primary"}
          className="w-fit rounded-lg disabled:opacity-100"
        >
          {hasNotified ? "Notified" : "Notify me"}
        </LoadingButton>
      </div>
    </section>
  );
};

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
  thirdColor: string;
}

interface NeonGradientCardProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode;

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number;

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number;

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' ... }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps;

  [key: string]: any;
}

const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#3AC2FC",
    secondColor: "#FD3F6B",
    thirdColor: "#FBAA32",
  },
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--neon-third-color": neonColors.thirdColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-width": `${dimensions.width + borderSize * 2.2}px`,
          "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
          "--before-blur": `${dimensions.width / 2}px`, // Increased blur strength
          "--after-blur": `${dimensions.width / 2.3}px`, // Increased blur strength
          "--gradient-extend": "0.01%", // Extend the gradient beyond the container
        } as CSSProperties
      }
      className={cn(
        "relative z-10 size-full rounded-[var(--border-radius)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-[#101010] p-6",
          "before:absolute before:-left-[calc(var(--gradient-extend)+var(--border-size))] before:-top-[calc(var(--gradient-extend)+var(--border-size))] before:-z-10 before:block",
          "before:h-[calc(var(--pseudo-element-height)+var(--gradient-extend)*0)] before:w-[calc(var(--pseudo-element-width)+var(--gradient-extend)*)] before:rounded-[var(--border-radius)] before:blur-[var(--before-blur)] before:content-['']",
          "before:bg-[conic-gradient(from_0deg_at_50%_50%,var(--neon-first-color)_0deg,var(--neon-second-color)_120deg,var(--neon-third-color)_240deg,var(--neon-first-color)_360deg)]",
          "before:animate-spin-slow",
          "after:absolute after:-left-[calc(var(--gradient-extend)+var(--border-size))] after:-top-[calc(var(--gradient-extend)+var(--border-size))] after:-z-10 after:block",
          "after:h-[calc(var(--pseudo-element-height)+var(--gradient-extend)*0.001)] after:w-[calc(var(--pseudo-element-width)+var(--gradient-extend)*0)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-['']",
          "after:bg-[conic-gradient(from_0deg_at_50%_50%,var(--neon-first-color)_0deg,var(--neon-second-color)_120deg,var(--neon-third-color)_240deg,var(--neon-first-color)_360deg)]",
          "after:animate-spin-slow-reverse",
          "flex justify-center items-center w-full h-full"
        )}
      >
        {children}
      </div>

      {/* Define the animations in the style tag */}
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .before\:animate-spin-slow::before {
          animation: spin-slow 4s linear infinite;
        }
        .after\:animate-spin-slow-reverse::after {
          animation: spin-slow-reverse 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export { NeonGradientCard };
