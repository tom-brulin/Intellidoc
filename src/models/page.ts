import { StringUtils } from "../utils/string-utils";
import { SubCategory } from "./sub-category";
import { join } from 'path';
import fs from 'fs';
import { DocumentationService } from "../services/documentation-service";
import parseMD from "parse-md";

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

    getLink(): string {
        return `/${this.parent.parent.key}/${this.parent.key}/${this.key}`;
    }

    async getContent(): Promise<string> {
        const fileContent = await fs.promises.readFile(join(DocumentationService.DOCS_PATH, this.parent.parent.key, this.parent.key, `${this.key}.md`), 'utf8');
        const { content } = parseMD(fileContent);
        return content;
    }
}