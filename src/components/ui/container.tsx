import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`max-w-[1400px] mx-auto px-4 md:px-8 xl:px-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
