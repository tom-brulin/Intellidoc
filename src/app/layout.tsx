import '@/styles/normalize.scss';
import '@/styles/globals.scss';
import Sidebar from './(components)/Sidebar';

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
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                        <Sidebar />
                    </div>
                </div>

                <script src="https://unpkg.com/phosphor-icons"></script>
            </body>
        </html>
    );
}