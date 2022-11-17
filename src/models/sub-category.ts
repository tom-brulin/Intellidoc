import { StringUtils } from "../utils/string-utils";
import { Category } from "./category";
import { Page } from "./page";

export class SubCategory {
    key: string;
    parent: Category;
    name: string;
    index: number;
    pages: Page[];

    constructor(key: string, parent: Category, name?: string, index?: number) {
        this.key = key;
        this.parent = parent;
        this.name = name || StringUtils.transformKeyToReadable(key);
        this.index = index || 9999;
        this.pages = [];
    }
}