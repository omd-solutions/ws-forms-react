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

    return props.entityConfig.sections.map((section, idx) => {
        let sectionHeading = null;
        if("NO_SECTION" != section.caption) {
            sectionHeading = (
                <Typography
                    component="h4"
                    variant="h4"
                    gutterBottom>
                    {section.caption}
                </Typography>
            );
        }
        return (
                <Paper key={'section-' + idx} >
                    {sectionHeading}
                    <FormSectionLayout sectionConfig={section} entity={props.entity}
                                       onEntityChange={props.onEntityChange}/>
                </Paper>
            )
        }
    );
}

export default PanelForm;