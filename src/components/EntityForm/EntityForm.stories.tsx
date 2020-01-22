import React from 'react';
import {storiesOf} from '@storybook/react';
import {EntityConfig} from "./EntityConfig";
import EntityForm from "./EntityForm";

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
                }
            ]
        }
    ]
};

storiesOf("EntityForm", module)
    .add("Panels", () => <EntityForm entity={entityConfig} object={{}} onEntityChange={() => {}} />)
    ;