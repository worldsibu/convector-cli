export namespace Utils {
    export function toPascalCase(text: string): string {
        const camelText = toCamelCase(text);

        return camelText[0].toUpperCase() + camelText.slice(1);
    }

    export function toCamelCase(text: string): string {
        return text.replace(/([a-z])-([a-z])/ig, (matches, g1, g2) => `${g1}${g2.toUpperCase()}`);
    }
}