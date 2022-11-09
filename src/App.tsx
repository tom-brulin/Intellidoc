import React, { PropsWithChildren } from "react";
import { PageContextBuiltIn } from "vite-plugin-ssr";
import { PageContextProvider } from "./renderer/usePageContext";
import "./styles/globals.scss";

export default function App({
    children,
    pageContext
}: PropsWithChildren<{
    pageContext: PageContextBuiltIn
}>) {
    return (
        <React.StrictMode>
            <PageContextProvider pageContext={pageContext}>
                <>
                    {/* Navbar */}
                    <div className="dark dark:bg-black dark:text-white z-10 max-w-[100rem] m-auto">
						{children}
					</div>
                    {/* Footer */}
                </>
            </PageContextProvider>
        </React.StrictMode>
    );
}