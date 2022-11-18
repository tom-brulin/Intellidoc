import Markdown from "marked-react"
import { Suspense } from "react"
import Header from "../../../(components)/Header"
import Loading from "../../../(components)/Loading"
import { DocumentationService } from "../../../../services/documentation-service"
import Sidebar from "../../../(components)/Sidebar"
import { redirect } from "next/navigation"

type Props = {
    params: {
        category: string
        subCategory: string
        page: string
    }
}

export default async function Page({ params }: Props) {
    const documentationService = new DocumentationService();
    const page = await documentationService.getPage(params.category, params.subCategory, params.page);

    if (!page) {
        return redirect('/');
    }

    const pageContent = await page.getContent();

    return (
        <div className="flex max-w-[80rem] mx-auto px-4 sm:px-6 md:px-8">
            <Suspense fallback={<Loading />}>
                {/* @ts-expect-error Server Component */}
                <Sidebar currentPage={page} />
            </Suspense>
            <main className="w-full z-20 pt-10 xl:max-w-none">
                <Header page={page} />
                <Markdown>{pageContent}</Markdown>
            </main>
        </div>
    )
}