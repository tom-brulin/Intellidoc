import Markdown from "marked-react"
import Header from "../../../(components)/Header"
import { DocumentationService } from "../../../../services/documentation-service"

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
    const pageContent = await page?.getContent();

    return (
        <>
            <Header page={page} />

            <Markdown>{pageContent}</Markdown>
        </>
    )
}