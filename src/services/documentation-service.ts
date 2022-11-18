import fs from 'fs';
import { join } from 'path';
import { Category } from '../models/category';
import { Page } from '../models/page';
import { SubCategory } from '../models/sub-category';
import parseMD from 'parse-md';
import { FileUtils } from '../utils/file-utils';

export class DocumentationService {

    public static DOCS_PATH = join(process.cwd(), 'docs');
    private static categories: Category[] = [];

    public async getCategories(): Promise<Category[]> {
        if (DocumentationService.categories.length <= 0) {
            DocumentationService.categories = await this.populateCategories();
        }

        return DocumentationService.categories;
    }

    public async getCategory(key: string): Promise<Category | undefined> {
        const categories = await this.getCategories();
        return categories.find(c => c.key === key);
    }

    public async getSubCategory(categoryKey: string, subCategoryKey: string): Promise<SubCategory | undefined> {
        const category = await this.getCategory(categoryKey);
        return category?.subCategories.find(sc => sc.key === subCategoryKey);
    }

    public async getPage(categoryKey: string, subCategoryKey: string, pageKey: string): Promise<Page | undefined> {
        const subCategory = await this.getSubCategory(categoryKey, subCategoryKey);
        return subCategory?.pages.find(p => p.key === pageKey);
    }

    private async populateCategories(): Promise<Category[]> {
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

    private async getSubCategories(category: Category): Promise<SubCategory[]> {
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

    private async getPages(category: Category, subCategory: SubCategory): Promise<Page[]> {
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