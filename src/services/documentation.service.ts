import fs from 'fs';
import { join } from 'path';
import { Category } from '../models/Category';
import parseMD from 'parse-md';
import { SubCategory } from '../models/SubCategory';
import { Page } from '../models/Page';

export class DocumentationService {

    public static DOCS_PATH = join(process.cwd(), 'docs');

    getCategories(): Category[] {
        const categories: Category[] = [];
        const categoryDirectories = fs.readdirSync(DocumentationService.DOCS_PATH, { withFileTypes: true });

        for (const categoryDirectory of categoryDirectories) {
            if (!categoryDirectory.isDirectory()) {
                continue;
            }

            const category = new Category(categoryDirectory.name);

            if (fs.existsSync(join(DocumentationService.DOCS_PATH, categoryDirectory.name, 'index.md'))) {
                const { metadata }: any = parseMD(fs.readFileSync(join(DocumentationService.DOCS_PATH, categoryDirectory.name, 'index.md'), 'utf8'));
                category.name = metadata.name || category.name;
                category.icon = metadata.icon || category.icon;
                category.index = metadata.index || category.index;
            }

            category.subCategories = this.getSubCategories(category.name);

            categories.push(category);
        }

        categories.sort((a, b) => a.index - b.index);
        return categories;
    }    

    getSubCategories(category: string): SubCategory[] {
        const subCategories: SubCategory[] = [];
        const subCategoryDirectories = fs.readdirSync(join(DocumentationService.DOCS_PATH, category), { withFileTypes: true });

        for (const subCategoryDirectory of subCategoryDirectories) {
            if (!subCategoryDirectory.isDirectory()) {
                continue;
            }

            const subCategory = new SubCategory(subCategoryDirectory.name);

            if (fs.existsSync(join(DocumentationService.DOCS_PATH, category, subCategoryDirectory.name, 'index.md'))) {
                const { metadata }: any = parseMD(fs.readFileSync(join(DocumentationService.DOCS_PATH, category, subCategoryDirectory.name, 'index.md'), 'utf8'));
                subCategory.name = metadata.name || subCategory.name;
                subCategory.index = metadata.index || subCategory.index;
            }

            subCategory.pages = this.getPages(category, subCategoryDirectory.name);

            subCategories.push(subCategory);
        }

        subCategories.sort((a, b) => a.index - b.index);
        return subCategories;
    }

    getPages(category: string, subCategory: string): Page[] {
        const pages: Page[] = [];
        const pageFiles = fs.readdirSync(join(DocumentationService.DOCS_PATH, category, subCategory), { withFileTypes: true });

        for (const pageFile of pageFiles) {
            if (!pageFile.isFile() || pageFile.name === 'index.md') {
                continue;
            }

            const page = new Page(pageFile.name.replace('.md', ''));

            if (fs.existsSync(join(DocumentationService.DOCS_PATH, category, subCategory, pageFile.name))) {
                const { metadata }: any = parseMD(fs.readFileSync(join(DocumentationService.DOCS_PATH, category, subCategory, pageFile.name), 'utf8'));
                page.name = metadata.name || page.name;
                page.index = metadata.index || page.index;
            }

            pages.push(page);
        }

        pages.sort((a, b) => a.index - b.index);
        return pages;
    }
    
}