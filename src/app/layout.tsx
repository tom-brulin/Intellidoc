import '@/styles/normalize.scss';
import '@/styles/globals.scss';
import Sidebar from './(components)/Sidebar';
import { Suspense } from 'react';

type Props = {
    children: React.ReactNode
}

export default function RootLayout({ 
    children 
}: Props) {
    return (
        <html lang="en">
            <body className="antialiased bg-slate-900 text-slate-400">
                <div className="overflow-hidden">
                    <div className="flex max-w-[80rem] mx-auto px-4 sm:px-6 md:px-8">
                        <Suspense fallback={<span>Loading</span>}>
                            {/* @ts-expect-error Server Component */}
                            <Sidebar />
                        </Suspense>
                        <main className="w-full z-20 pt-10 xl:max-w-none">
                            {children}
                        </main>
                    </div>
                </div>

                <script src="https://unpkg.com/phosphor-icons"></script>
            </body>
        </html>
    );
}