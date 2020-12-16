import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {FormField} from "./FormField";
import {EntityConfig} from "./EntityConfig";
import FormSectionLayout from "./FormSectionLayout";
import {FormPanel} from "./FormPanel";

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

export default function PanelForm(props: Props) {

    const panels = props.entityConfig.panels.map((panel: FormPanel, idx: number) => {
            let sectionHeading = null;
            if ("NO_PANEL" !== panel.caption) {
                sectionHeading = (
                    <Typography
                        component="h4"
                        variant="h4"
                        gutterBottom>
                        {panel.caption}
                    </Typography>
                );
            }
            return (
                <Paper style={styles.panel} key={'panel-' + idx}>
                    {sectionHeading}
                    <FormSectionLayout sectionConfig={panel} entity={props.entity}
                                       onEntityChange={props.onEntityChange}/>
                </Paper>
            )
        }
    );

    return (
        <div>
            {panels}
        </div>
    );
}