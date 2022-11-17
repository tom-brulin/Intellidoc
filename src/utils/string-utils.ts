export class StringUtils {
    public static transformKeyToReadable(key: string): string {
        let readableName = key;
    
        readableName = readableName.replaceAll('-', ' ');
        readableName = readableName.replaceAll('_', ' ');
    
        readableName = StringUtils.capitalize(readableName);
    
        return readableName;
    }

    public static capitalize(str: string): string {
        const words = str.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1, words[i].length);
        }
        return words.join(' ');
    }
}