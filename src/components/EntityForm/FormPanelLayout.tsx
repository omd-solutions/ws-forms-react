import React from "react";
import {FormPanel} from "./FormPanel";
import {Grid} from "@material-ui/core";
import {FormField} from "./FormField";
import TextControl from "./TextControl";
import FormControl from "./FormControl";
import SelectControl from "./SelectControl";
import DateControl from "./DateControl";
import DateTimeControl from "./DateTimeControl";

type Props = {
    panelConfig: FormPanel,
    entity: any | undefined,
    onEntityChange: (formField: FormField, value: any, error: boolean) => void
}

function FormPanelLayout(props: Props) {

    const ControlTypeMap: any = {
        "TEXT": TextControl,
        "SELECT": SelectControl,
        "DATE": DateControl,
        "DATE_TIME": DateTimeControl
    };

    const renderField = (formField: FormField): React.ReactNode => {
        let control: FormControl<any> = new ControlTypeMap[formField.controlType]();
        return control.render(formField, props.entity[formField.fieldName],
            (value: any, error?: boolean) => props.onEntityChange(formField, value, error === undefined ? false : error));
    };

    let panelFields = props.panelConfig.fields.map((formField: FormField) => (
        <Grid item key={'field-' + formField.fieldName} xs={formField.columns} style={{padding: '6px', boxSizing: 'border-box'}} >
            {renderField(formField)}
        </Grid>
    ));

    return (
        <Grid container>
            {panelFields}
        </Grid>
    );
}

export default FormPanelLayout;