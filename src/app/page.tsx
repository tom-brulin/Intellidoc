import { redirect } from "next/navigation";
import { DocumentationService } from "../services/documentation-service";

export default async function Page() {
    const documentationService = new DocumentationService();
    const categories = await documentationService.getCategories();

    if (categories.length > 0) {
        return redirect(categories[0].getFirstPageLink());
    }

    return (
        <>
        </>
    );
  }