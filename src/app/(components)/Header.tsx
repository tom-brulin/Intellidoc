import { Page } from "../../models/page"

type Props = {
    page: Page
}

export default function Header({
    page
}: Props) {
    return (
        <header id="header" className="mb-10 md:flex md:items-start">
            <div className="flex-auto max-w-4xl">
                <p className="mb-4 text-sm leading-6 font-semibold text-sky-400">{page.parent?.parent?.name}</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-200">{page.parent?.name}</h1>
                <p className="mt-4 text-lg text-slate-400">{page.name}</p>
            </div>
        </header>
    )
}