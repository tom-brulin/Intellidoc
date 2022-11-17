import fs from 'fs';
import { join } from 'path';
import { Category } from '../models/category';
import { Page } from '../models/page';
import { SubCategory } from '../models/sub-category';
import parseMD from 'parse-md';
import { FileUtils } from '../utils/file-utils';

export class DocumentationService {

    private static DOCS_PATH = join(process.cwd(), 'docs');

    public async getCategories(): Promise<Category[]> {
        const categories: Category[] = [];
        const categoryDirectories = await fs.promises.readdir(DocumentationService.DOCS_PATH, { withFileTypes: true });

        for (const categoryDirectory of categoryDirectories) {
            if (!categoryDirectory.isDirectory()) {
                continue;
            }

            const category = new Category(categoryDirectory.name);

            if (await FileUtils.exists(join(DocumentationService.DOCS_PATH, categoryDirectory.name, 'index.md'))) {
                const fileContent = await fs.promises.readFile(join(DocumentationService.DOCS_PATH, categoryDirectory.name, 'index.md'), 'utf8');
                const { metadata }: any = parseMD(fileContent);
                category.name = metadata.name || category.name;
                category.icon = metadata.icon || category.icon;
                category.index = metadata.index || category.index;
            }

            category.subCategories = await this.getSubCategories(category);

            categories.push(category);
        }

        categories.sort((a, b) => a.index - b.index);
        return categories;
    }    

    public async getSubCategories(category: Category): Promise<SubCategory[]> {
        const subCategories: SubCategory[] = [];
        const subCategoryDirectories = await fs.promises.readdir(join(DocumentationService.DOCS_PATH, category.key), { withFileTypes: true });

        for (const subCategoryDirectory of subCategoryDirectories) {
            if (!subCategoryDirectory.isDirectory()) {
                continue;
            }

            const subCategory = new SubCategory(subCategoryDirectory.name, category);

            if (await FileUtils.exists(join(DocumentationService.DOCS_PATH, category.key, subCategoryDirectory.name, 'index.md'))) {
                const fileContent = await fs.promises.readFile(join(DocumentationService.DOCS_PATH, category.key, subCategoryDirectory.name, 'index.md'), 'utf8');
                const { metadata }: any = parseMD(fileContent);
                subCategory.name = metadata.name || subCategory.name;
                subCategory.index = metadata.index || subCategory.index;
            }

            subCategory.pages = await this.getPages(category, subCategory);

            subCategories.push(subCategory);
        }

        subCategories.sort((a, b) => a.index - b.index);
        return subCategories;
    }

    public async getPages(category: Category, subCategory: SubCategory): Promise<Page[]> {
        const pages: Page[] = [];
        const pageFiles = await fs.promises.readdir(join(DocumentationService.DOCS_PATH, category.key, subCategory.key), { withFileTypes: true });

        for (const pageFile of pageFiles) {
            if (!pageFile.isFile() || pageFile.name === 'index.md') {
                continue;
            }

            const page = new Page(pageFile.name.replace('.md', ''), subCategory);

            if (await FileUtils.exists(join(DocumentationService.DOCS_PATH, category.key, subCategory.key, pageFile.name))) {
                const fileContent = await fs.promises.readFile(join(DocumentationService.DOCS_PATH, category.key, subCategory.key, pageFile.name), 'utf8');
                const { metadata }: any = parseMD(fileContent);
                page.name = metadata.name || page.name;
                page.index = metadata.index || page.index;
            }

            pages.push(page);
        }

        pages.sort((a, b) => a.index - b.index);
        return pages;
    }
    
}