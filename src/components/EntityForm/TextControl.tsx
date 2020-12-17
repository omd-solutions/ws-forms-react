import FormControl from "./FormControl";
import {FormField} from "./FormField"
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import React, {ReactNode, useState} from "react";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class TextControl implements FormControl<string> {

    render(field: FormField, value: string, valueSetter: (value: string, error?: boolean) => void): ReactNode {

        const masked = field.masked !== undefined && field.masked;
        const [maskedMode, setMaskedMode] = useState(masked);

        const isValid = (str: string): boolean => {
            return field.validationRegex === undefined ||
                str === undefined ||
                str === null ||
                str.match(new RegExp(field.validationRegex)) !== null;
        };

        const valueValid = isValid(value);

        const endAdornment = masked ? (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setMaskedMode(!maskedMode)}
                >
                    {maskedMode ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        ) : undefined;

        return (
            <TextField id={'control-' + field.fieldName}
                       fullWidth
                       type={maskedMode ? 'password' : 'text'}
                       error={!valueValid}
                       helperText={valueValid ? undefined : field.validationMessage}
                       label={field.caption}
                       value={value ? value : ''}
                       InputProps={{ endAdornment: endAdornment }}
                       onChange={event => valueSetter(event.target.value, !isValid(event.target.value))}/>
        );
    }

}

export default TextControl;