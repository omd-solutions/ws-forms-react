import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {EntityConfig} from "./EntityConfig";
import EntityForm from "./EntityForm";
import {action} from "@storybook/addon-actions";

const entityConfig: EntityConfig = {
    name: "Employee",
    sectionType: "PANELS",
    panels: [
        {
            caption: "Personal Details",
            fields: [
                {
                    fieldName: "firstName",
                    caption: "First Name",
                    columns: 6,
                    controlType: "TEXT"
                },
                {
                    fieldName: "lastName",
                    caption: "Last Name",
                    columns: 6,
                    controlType: "TEXT"
                },
                {
                    fieldName: "address",
                    caption: "Address",
                    columns: 12,
                    controlType: "TEXT"
                },
                {
                    fieldName: "country",
                    caption: "Country",
                    columns: 6,
                    controlType: "SELECT",
                    idField: 'id',
                    displayField: "name",
                    values: [
                        {
                            id: 'uk',
                            name: 'United Kingdom'
                        },
                        {
                            id: 'us',
                            name: 'United States'
                        },
                        {
                            id: 'france',
                            name: 'France'
                        }
                    ]
                },
                {
                    fieldName: "dob",
                    caption: "Date of Birth",
                    columns: 6,
                    controlType: "DATE"
                }
            ]
        },
        {
            caption: "Performance",
            fields: [
                {
                    fieldName: "lastReview",
                    caption: "Last Review",
                    columns: 12,
                    controlType: "DATE_TIME"
                }
            ]
        }
    ]
};

const entities: any = {
    "Oliver Dennis": {
        firstName: 'Oliver',
        lastName: 'Dennis',
        address: '3 Overdale Place',
        country: {
            id: 'uk',
            name: 'United Kingdom'
        },
        dob: new Date('1983-03-02T00:00:00'),
        lastReview: new Date('2014-08-18T21:11:54')
    },
    "Emily Hancock": {
        firstName: 'Emily',
        lastName: 'Hancock',
        address: 'Foxdales Farm',
        country: {
            id: 'france',
            name: 'France'
        },
        dob: new Date('1999-07-17T00:00:00'),
        lastReview: new Date('2015-04-12T19:10:20')
    }
};

const loadEntity = (argValue: string): any => {
    return entities[argValue];
};

export default {
    component: EntityForm,
    title: "Entity Form",
    argTypes: {
        object: {
            control: {
                type: "select",
                options: [
                    "Oliver Dennis",
                    "Emily Hancock"
                ]
            }
        }
    }
} as Meta;

const Template: Story = ({object}) => {
    let entity = loadEntity(object);
    entity = entity ? entity : {};
    return (<EntityForm object={entity} entity={entityConfig} onEntityChange={action('entity-changed')} />);
}

export const Default = Template.bind({});