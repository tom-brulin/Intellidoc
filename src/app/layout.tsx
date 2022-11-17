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
            <body className="bg-slate-900 text-slate-400">
                {children}
            </body>
        </html>
    );
}