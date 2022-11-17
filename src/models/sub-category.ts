import { StringUtils } from "../utils/string-utils";
import { Page } from "./page";

export class SubCategory {
    key: string;
    name: string;
    index: number;
    pages: Page[];

    constructor(key: string, name?: string, index?: number) {
        this.key = key;
        this.name = name || StringUtils.transformKeyToReadable(key);
        this.index = index || 9999;
        this.pages = [];
    }
}