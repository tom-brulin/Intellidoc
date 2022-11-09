export function transformKeyToReadable(key: string): string {
    let readableName = key;

    readableName = readableName.replaceAll('-', ' ');
    readableName = readableName.replaceAll('_', ' ');

    readableName = capitalize(readableName);

    return readableName;
}

export function capitalize(str: string): string {
    const words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1, words[i].length);
    }
    return words.join(' ');
}