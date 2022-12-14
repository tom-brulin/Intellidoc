import { Page } from "../../models/page";
import { DocumentationService } from "../../services/documentation-service";
import Searchbar from "./Searchbar"
import SidebarCategory from "./SidebarCategory";
import SidebarSubCategory from "./SidebarSubCategory";

type Props = {
    currentPage: Page
}

export default async function Sidebar({
    currentPage
}: Props) {
    const documentationService = new DocumentationService();
    const categories = await documentationService.getCategories();

    return (
        <div className="hidden lg:block z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
            <nav className="lg:text-sm lg:leading-6 relative">
                <Searchbar />
                
                <ul>
                    {categories.map((category, index) => (
                        <SidebarCategory key={index} category={category} currentPage={currentPage} />
                    ))}

                    {
                        currentPage.parent.parent.subCategories.map((subCategory, index) => (
                            <SidebarSubCategory key={index} subCategory={subCategory} currentPage={currentPage} />
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
}