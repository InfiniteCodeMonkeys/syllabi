// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import NextHead from "../ui/atoms/Head";
import { ReactFlowProvider } from "reactflow";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ReactFlowProvider>
        <NextHead />
        <Component {...pageProps} />
      </ReactFlowProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
