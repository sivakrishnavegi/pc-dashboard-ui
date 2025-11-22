"use client";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left brand section */}
      <div className="hidden lg:flex flex-col justify-center px-12 w-1/2 bg-primary text-primary-foreground">
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-light tracking-light">PrimeCare</h1>
          </div>
          <p className="text-md leading-relaxed opacity-90">Empowering smart inventory decisions with smart UI. </p>
        </div>
      </div>

      {/* Right form section */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
