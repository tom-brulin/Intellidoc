export default function Searchbar() {
    return (
        <div className="sticky top-0 -ml-0.5 pointer-events-none">
            <div className="h-10 bg-slate-900"></div>
            <div className="bg-slate-900 relative pointer-events-auto">
                <button type="button" className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 bg-slate-800 highlight-white/5 hover:bg-slate-700">
                    <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none">
                        <path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
                    </svg>
                    Quick search...
                    <span className="ml-auto pl-3 flex-none text-xs font-semibold">Ctrl K</span>
                </button>
            </div>
            <div className="h-8 bg-gradient-to-b from-slate-900"></div>
        </div>
    );
}