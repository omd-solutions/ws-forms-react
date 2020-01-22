import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {FormField} from "./FormField";
import {EntityConfig} from "./EntityConfig";
import FormSectionLayout from "./FormSectionLayout";

type Props = {
    entityConfig: EntityConfig,
    entity: any | undefined,
    onEntityChange: (formField: FormField, value: any) => void
}

function PanelForm(props: Props) {

    return props.entityConfig.sections.map((section, idx) => (
            <Paper key={'section-' + idx} >
                <Typography
                    component="h4"
                    variant="h4"
                    gutterBottom>
                    {section.caption}
                </Typography>
                <FormSectionLayout sectionConfig={section} entity={props.entity}
                                   onEntityChange={props.onEntityChange}/>
            </Paper>
        )
    );
}

export default PanelForm;