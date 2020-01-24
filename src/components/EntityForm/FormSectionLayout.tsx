import React from "react";
import {FormSection} from "./FormSection";
import {Grid} from "@material-ui/core";
import {FormField} from "./FormField";
import TextControl from "./TextControl";
import FormControl from "./FormControl";
import SelectControl from "./SelectControl";

type Props = {
    sectionConfig: FormSection,
    entity: any | undefined,
    onEntityChange: (formField: FormField, value: any) => void
}

function FormSectionLayout(props: Props) {

    const ControlTypeMap: any = {
        "TEXT": TextControl,
        "SELECT": SelectControl
    };

    const renderField = (formField: FormField): React.ReactNode => {
        let control: FormControl<any> = new ControlTypeMap[formField.controlType]();
        return control.render(formField, props.entity[formField.fieldName], value => props.onEntityChange(formField, value));
    };

    let sectionFields = props.sectionConfig.fields.map(formField => (
        <Grid key={'field-' + formField.fieldName} xs={formField.columns} style={{padding: '6px', boxSizing: 'border-box'}} >
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