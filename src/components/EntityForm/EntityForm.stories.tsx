import React from 'react';
import {storiesOf} from '@storybook/react';
import {EntityConfig} from "./EntityConfig";
import EntityForm from "./EntityForm";
import {action} from "@storybook/addon-actions";

const entityConfig: EntityConfig = {
    name: "Employee",
    sectionType: "PANELS",
    sections: [
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

const entityExample: any = {
    firstName: 'Oliver',
    lastName: 'Dennis',
    address: '3 Overdale Place',
    country: {
        id: 'uk',
        name: 'United Kingdom'
    },
    dob: new Date('1983-03-02T00:00:00'),
    lastReview: new Date('2014-08-18T21:11:54')
};

storiesOf("EntityForm", module)
    .add("Panels", () => <EntityForm entity={entityConfig} object={entityExample} onEntityChange={action('entity-changed')} />)
    ;