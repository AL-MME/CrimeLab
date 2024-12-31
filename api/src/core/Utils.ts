// Liste de fonctions utilitaires

export function isNull(value: any): boolean {
    return value === null || value === undefined;
}

export function isNotNull(value: any): boolean {
    return !isNull(value);
}

export function isObjectId(value: any): boolean {
    return value.match(/^[0-9a-fA-F]{24}$/) !== null;
}