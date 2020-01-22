import {FormField} from "./FormField";
import {ReactNode} from "react";

interface FormControl<T> {

    render(field: FormField, value: T, valueSetter: (value: T) => void): ReactNode;
}

export default FormControl