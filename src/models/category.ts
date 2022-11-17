import { StringUtils } from "../utils/string-utils";
import { SubCategory } from "./sub-category";

export class Category {
    key: string;
    name: string;
    icon: string;
    index: number;
    subCategories: SubCategory[];

    constructor(key: string, name?: string, icon?: string, index?: number) {
        this.key = key;
        this.name = name || StringUtils.transformKeyToReadable(key);
        this.icon = icon || 'Cube';
        this.index = index || 9999;
        this.subCategories = [];
    }

    getFirstPageLink(): string {
        const firstSubCategory = this.subCategories.length > 0 ? this.subCategories[0] : null;

        if (firstSubCategory) {
            const firstPage = firstSubCategory.pages.length > 0 ? firstSubCategory.pages[0] : null;

            return firstPage ? `/${this.key}/${firstSubCategory.key}/${firstPage.key}` : '/';
        } else {
            return '/';
        }
    }

}