import { StringUtils } from "../utils/string-utils";
import { SubCategory } from "./sub-category";

export class Page {
    key: string;
    parent: SubCategory;
    name: string;
    index: number;

    constructor(key: string, parent: SubCategory, name?: string, index?: number) {
        this.key = key;
        this.parent = parent;
        this.name = name || StringUtils.transformKeyToReadable(key);
        this.index = index || 9999;
    }
}