import FormControl from "./FormControl";
import {FormField} from "./FormField"
import {TextField} from "@material-ui/core";
import React, {ReactNode} from "react";

class TextControl implements FormControl<string> {

    render(field: FormField, value: string, valueSetter: (value: string, error?: boolean) => void): ReactNode {

        const isValid = (str: string): boolean => {
            return field.validationRegex === undefined ||
                str === undefined ||
                str === null ||
                str.match(new RegExp(field.validationRegex)) !== null;
        };

        const valueValid = isValid(value);

        return (
            <TextField id={'control-' + field.fieldName}
                       fullWidth
                       error={!valueValid}
                       helperText={valueValid ? undefined : field.validationMessage}
                       label={field.caption}
                       value={value ? value : ''}
                       onChange={event => valueSetter(event.target.value, !isValid(event.target.value))}/>
        );
    }

}

export default TextControl;