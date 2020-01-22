import FormControl from "./FormControl";
import {FormField} from "./FormField"
import {TextField} from "@material-ui/core";
import React, {ReactNode} from "react";

class TextControl implements FormControl<string> {

    render(field: FormField, value: string, valueSetter: (value: string) => void): ReactNode {
        return (
            <TextField id={'control-' + field.fieldName}
                       fullWidth
                       label={field.caption}
                       value={value}
                       onChange={event => valueSetter(event.target.value)} />
        );
    }

}

export default TextControl;