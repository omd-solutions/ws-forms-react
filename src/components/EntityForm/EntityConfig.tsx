import {FormSection} from "./FormSection";

export class EntityConfig {

    name: string;
    sectionType: string;
    sections: FormSection [] = [];
    filterFields: string [] = [];
}