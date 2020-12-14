import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {FormField} from "./FormField";
import {EntityConfig} from "./EntityConfig";
import FormSectionLayout from "./FormSectionLayout";
import {FormSection} from "./FormSection";

type Props = {
    entityConfig: EntityConfig,
    entity: any | undefined,
    onEntityChange: (formField: FormField, value: any) => void
}

const styles = {
    panel: {
        padding: '16px',
        marginTop: '8px',
        marginBottom: '8px'
    }
};

function PanelForm(props: Props) {

    return props.entityConfig.sections.map((section: FormSection, idx: number) => {
            let sectionHeading = null;
            if ("NO_SECTION" !== section.caption) {
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
                <Paper style={styles.panel} key={'section-' + idx}>
                    {sectionHeading}
                    <FormSectionLayout sectionConfig={section} entity={props.entity}
                                       onEntityChange={props.onEntityChange}/>
                </Paper>
            )
        }
    );
}

export default PanelForm;