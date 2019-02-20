export namespace Utils {
    export function toPascalCase(text: string): string {
        const camelText = toCamelCase(text);

        return camelText[0].toUpperCase() + camelText.slice(1);
    }

    export function toCamelCase(text: string): string {
        if(!text){
            return '';
        }
        text = text.replace(text[0], text[0].toLowerCase());
        return text.replace(/([a-z])-([a-z])/ig, (matches, g1, g2) => `${g1}${g2.toUpperCase()}`);
    }
}