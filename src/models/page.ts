import { StringUtils } from "../utils/string-utils";

export class Page {
    key: string;
    name: string;
    index: number;

    constructor(key: string, name?: string, index?: number) {
        this.key = key;
        this.name = name || StringUtils.transformKeyToReadable(key);
        this.index = index || 9999;
    }
}