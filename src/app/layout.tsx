import '@/styles/normalize.scss';
import '@/styles/globals.scss';

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
                    {children}
                </div>

                <script src="https://unpkg.com/phosphor-icons"></script>
            </body>
        </html>
    );
}