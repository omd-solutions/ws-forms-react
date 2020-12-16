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
    sectionConfig: FormPanel,
    entity: any | undefined,
    onEntityChange: (formField: FormField, value: any) => void
}

function FormSectionLayout(props: Props) {

    const ControlTypeMap: any = {
        "TEXT": TextControl,
        "SELECT": SelectControl,
        "DATE": DateControl,
        "DATE_TIME": DateTimeControl
    };

    const renderField = (formField: FormField): React.ReactNode => {
        let control: FormControl<any> = new ControlTypeMap[formField.controlType]();
        return control.render(formField, props.entity[formField.fieldName], value => props.onEntityChange(formField, value));
    };

    let sectionFields = props.sectionConfig.fields.map((formField: FormField) => (
        <Grid item key={'field-' + formField.fieldName} xs={formField.columns} style={{padding: '6px', boxSizing: 'border-box'}} >
            {renderField(formField)}
        </Grid>
    ));

    return (
        <Grid container>
            {sectionFields}
        </Grid>
    );
}

export default FormSectionLayout;