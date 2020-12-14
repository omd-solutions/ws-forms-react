import FormControl from "./FormControl";
import {FormField} from "./FormField"
import React, {ReactNode} from "react";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const styles = {
    container: {
        display: 'flex',
        width: '100%'
    },
    divider: {
        width: '16px'
    }
};

class DateTimeControl implements FormControl<Date> {

    render(field: FormField, value: Date, valueSetter: (value: Date) => void): ReactNode {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={styles.container}>
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
                    <div style={styles.divider}/>
                    <KeyboardTimePicker
                        id={'control-time-' + field.fieldName}
                        margin="normal"
                        label=" "
                        value={value}
                        onChange={valueSetter}
                        KeyboardButtonProps={{
                            'aria-label': 'change time for ' + field.caption,
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
        );
    }

}

export default DateTimeControl;