import FormControl from "./FormControl";
import {FormField} from "./FormField"
import {Grid} from "@material-ui/core";
import React, {ReactNode} from "react";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class DateTimeControl implements FormControl<Date> {

    render(field: FormField, value: Date, valueSetter: (value: Date) => void): ReactNode {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
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
                    <KeyboardTimePicker
                        id={'control-time-' + field.fieldName}
                        margin="normal"
                        value={value}
                        onChange={valueSetter}
                        KeyboardButtonProps={{
                            'aria-label': 'change time for ' + field.caption,
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }

}

export default DateTimeControl;