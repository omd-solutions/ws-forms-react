import {FormField} from "./FormField"
import React, {ReactNode} from "react";
import {FormControl as MatFormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import FormControl from "./FormControl";

class SelectControl implements FormControl<any> {


    render(field: FormField, value: any, valueSetter: (value: any) => void): ReactNode {
        let values = field.values ? field.values : [];
        return (
            <MatFormControl fullWidth>
                <InputLabel id={'control-label-' + field.fieldName}>{field.caption}</InputLabel>
                <Select id={'control-' + field.fieldName}
                        labelId={'control-label-' + field.fieldName}
                        value={value && field.idField ? value[field.idField] : value}
                        onChange={event => {
                            let newValue = event.target.value;
                            if(field.idField) {
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
                </Select>
            </MatFormControl>
        );
    }

}

export default SelectControl;