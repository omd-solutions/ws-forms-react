import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {FormField} from "./FormField";
import FormPanelLayout from "./FormPanelLayout";
import {FormPanel} from "./FormPanel";
import {FormTab} from "./FormTab";

type Props = {
    tabConfig: FormTab,
    entity: any | undefined,
    onEntityChange: (formField: FormField, value: any, error: boolean) => void
}

const styles = {
    panel: {
        padding: '16px',
        marginTop: '8px',
        marginBottom: '8px'
    }
};

export default function PanelForm(props: Props) {

    const panels = props.tabConfig.panels.map((panel: FormPanel, idx: number) => {
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
                    <FormPanelLayout panelConfig={panel} entity={props.entity}
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