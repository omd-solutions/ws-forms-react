import FormControl from "./FormControl";
import {FormField} from "./FormField"
import React, {ReactNode} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class DateControl implements FormControl<Date> {

    render(field: FormField, value: Date, valueSetter: (value: Date) => void): ReactNode {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={'control-date-' + field.fieldName}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label={field.caption}
                    value={value}
                    onChange={valueSetter}
                    KeyboardButtonProps={{
                        'aria-label': 'change date for ' + field.caption,
                    }}
                />
            </MuiPickersUtilsProvider>
        );
    }

}

export default DateControl;