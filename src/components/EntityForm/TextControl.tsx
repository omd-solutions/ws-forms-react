import FormControl from "./FormControl";
import {FormField} from "./FormField"
import {TextField} from "@material-ui/core";
import React, {ReactNode} from "react";

class TextControl implements FormControl<string> {

    render(field: FormField, value: string, valueSetter: (value: string) => void): ReactNode {

        const isInvalid =
            field.validationRegex !== undefined &&
            value !== undefined && value !== null &&
            value.match(new RegExp(field.validationRegex)) === null;

        return (
            <TextField id={'control-' + field.fieldName}
                       fullWidth
                       error={isInvalid}
                       helperText={isInvalid ? field.validationMessage : undefined}
                       label={field.caption}
                       value={value ? value : ''}
                       onChange={event => valueSetter(event.target.value)}/>
        );
    }

}

export default TextControl;