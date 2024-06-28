import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      {children}
    </main>
  );
};

export default LoginLayout;
