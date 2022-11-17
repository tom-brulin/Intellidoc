type Props = {
    text: string
    icon: string
}

export default function SidebarCategory({
    text,
    icon
}: Props) {
    const iconClass = `ph-${icon.toLowerCase()}`;

    return (
        <li>
            <a href="#" className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-400 hover:text-slate-300">
                <div className="mr-4 h-6 w-6 flex justify-center items-center rounded-md ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 ring-0 shadow-none group-hover:highlight-white/10 group-hover:shadow-slate-700 group-hover:bg-indigo-500 bg-slate-800 highlight-white/5">
                    <i className={iconClass}></i>
                </div>
                {text}
            </a>
        </li>
    );
}