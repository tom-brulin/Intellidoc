import { transformKeyToReadable } from "../utils/string.utils";
import { Page } from "./Page";

export class SubCategory {
    key: string;
    name: string;
    index: number;
    pages: Page[];

    constructor(key: string, name?: string, index?: number) {
        this.key = key;
        this.name = name || transformKeyToReadable(key);
        this.index = index || 9999;
        this.pages = [];
    }
}