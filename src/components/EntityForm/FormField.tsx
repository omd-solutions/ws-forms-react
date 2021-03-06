export class FormField {

    fieldName: string;
    caption: string;
    columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    controlType: string;

    idField?: string;
    displayField?: string;
    values?: any [];

    validationRegex?: string;
    validationMessage?: string;
    masked?: boolean;
}