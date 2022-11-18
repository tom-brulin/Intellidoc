import Link from "next/link"
import { Page } from "../../models/page"
import { SubCategory } from "../../models/sub-category"
import cx from "classnames"

type Props = {
    subCategory: SubCategory
    currentPage: Page
}

export default function SidebarSubCategory({
    subCategory,
    currentPage
}: Props) {
    return (
        <li className="mt-12 lg:mt-8">
            <h5 className="mb-8 lg:mb-3 font-semibold text-slate-200">{subCategory.name}</h5>

            <ul className="space-y-6 lg:space-y-2 border-l border-slate-800">
                {
                    subCategory.pages.map((page, index) => (
                        <li key={index} data-active={currentPage === page}>
                            <Link href={page.getLink()} className={cx('block border-l pl-4 -ml-px border-transparent hover:border-slate-500 text-slate-400 hover:text-slate-300', { 'font-semibold hover:border-current hover:text-sky-400 border-current text-sky-400': page === currentPage })}>
                                {page.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}