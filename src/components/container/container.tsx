import { cn } from "@/lib/utils";

type ChildrenProps = { children: React.ReactNode; className?: string };

type CombinedContainerProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export const InnerContainer = ({ children, className }: ChildrenProps) => {
  return (
    <section
      className={cn(
        "flex  rounded-3xl  px-3 py-4 flex-col w-[97%] overflow-y-auto h-full max-h-full  2xl:mt-0 min-h-[70vh]",
        className
      )}
    >
      {children}
    </section>
  );
};

export const OuterContainer = ({ children }: ChildrenProps) => {
  return (
    <div className="flex hide-scrollbar flex-col w-full justify-center min-h-[83vh] max-h-full">
      {children}
    </div>
  );
};

export const CombinedContainer = ({
  children,
  className,
}: CombinedContainerProps) => {
  return (
    <OuterContainer>
      <InnerContainer className={className}>{children}</InnerContainer>
    </OuterContainer>
  );
};
