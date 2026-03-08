"use client";

import React, { ReactNode } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

interface FullPageWrapperProps {
    children: ReactNode;
    onSectionChange?: (index: number) => void;
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children, onSectionChange }) => {
    return (
        <ReactFullpage
            licenseKey={"OPEN-SOURCE-GPLV3-LICENSE"}
            scrollingSpeed={1000}
            navigation={true}
            slidesNavigation={true}
            controlArrows={true}
            responsiveWidth={1024} // Enables native scrolling on tablets and mobile
            credits={{ enabled: false, label: "", position: "right" }}
            onLeave={(origin, destination) => {
                if (onSectionChange) onSectionChange(destination.index);
            }}
            render={({ state, fullpageApi }: { state: any; fullpageApi: any }) => {
                return (
                    <ReactFullpage.Wrapper>
                        {children}
                    </ReactFullpage.Wrapper>
                );
            }}
        />
    );
};

export const Section: React.FC<{ children: ReactNode; id?: string; className?: string }> = ({
    children,
    id,
    className = ""
}) => (
    <div className={`section fp-auto-height-responsive bg-background text-foreground ${className}`} id={id}>
        <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 md:py-24 md:p-8 text-center relative w-full">
            {children}
        </div>
    </div>
);

export const Slide: React.FC<{ children: ReactNode; className?: string }> = ({
    children,
    className = ""
}) => (
    <div className={`slide fp-auto-height-responsive bg-background text-foreground ${className}`}>
        <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 md:py-24 md:p-8 text-center relative w-full">
            {children}
        </div>
    </div>
);

export default FullPageWrapper;
