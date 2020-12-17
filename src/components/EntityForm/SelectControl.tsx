import {FormField} from "./FormField"
import React, {ReactNode} from "react";
import {MenuItem, TextField} from "@material-ui/core";
import FormControl from "./FormControl";

class SelectControl implements FormControl<any> {


    render(field: FormField, value: any, valueSetter: (value: any, error?: boolean) => void): ReactNode {
        let values = field.values ? field.values : [];
        let controlValue = value && field.idField ? value[field.idField] : value;
        controlValue = controlValue ? controlValue : '';
        return (
            <TextField id={'control-' + field.fieldName}
                       select
                       fullWidth
                       label={field.caption}
                       value={controlValue}
                       onChange={event => {
                           let newValue = event.target.value;
                           if (field.idField) {
                               let idField = field.idField;
                               newValue = values.find(val => val[idField] === event.target.value);
                           }
                           valueSetter(newValue);
                       }}>
                {values.map(val => (
                    <MenuItem value={field.idField ? val[field.idField] : val}>
                        {field.displayField ? val[field.displayField] : val}
                    </MenuItem>
                ))}
            </TextField>
        );
    }

}

export default SelectControl;