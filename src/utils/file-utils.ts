import fs from 'fs';

export class FileUtils {
    public static async exists (path: string): Promise<boolean> {  
        try {
            await fs.promises.access(path)
            return true
        } catch {
            return false
        }
    }
}