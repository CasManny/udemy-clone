import Header from "@/components/Header";
import InstructorSidebar from "@/components/InstructorSidebar";
import React, { ReactNode } from "react";

const InstructorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="h-[100vh] flex flex-col">
        <div className="flex-1 flex">
          <InstructorSidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLayout;
