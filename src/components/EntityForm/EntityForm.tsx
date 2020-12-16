import React, {useEffect, useRef, useState} from "react";
import {EntityConfig} from "./EntityConfig";
import PanelForm from "./PanelForm";
import {FormField} from "./FormField";

export type Props = {
    entity: string | EntityConfig,
    object: any | undefined,
    onEntityChange: (updatedObject: any) => void,
}

export default function EntityForm(props: Props) {

    const [entityConfig, setEntityConfig] = useState(new EntityConfig());
    const prevObject = usePrevious(props.object);

    useEffect(() => {
        if (typeof props.entity === 'string') {
            fetch('/api/forms/' + props.entity).then(resp => {
                return resp.json();
            }).then(json => {
                setEntityConfig(Object.assign(new EntityConfig(), json));
            })
        } else {
            setEntityConfig(Object.assign(new EntityConfig(), props.entity));
        }
    }, [props.entity]);

    useEffect(() => {
        let filtersChanged = false;
        if (props.object && prevObject) {
            for (let f of entityConfig.filterFields) {
                if (props.object[f] !== prevObject[f]) {
                    filtersChanged = true;
                    break;
                }
            }
        }
        if (filtersChanged) {
            fetchFieldOptions(getCurrentFieldValues());
        }
    }, [props.object]);

    const getCurrentFieldValues = (): any => {
        let fieldValues = {};
        entityConfig.panels.forEach(section => {
            section.fields.forEach(formField => {
                if (props.object[formField.fieldName]) {
                    fieldValues[formField.fieldName] = formField.idField ? props.object[formField.fieldName][formField.idField] : props.object[formField.fieldName]
                }
            });
        });
        return fieldValues;
    };

    const handleEntityChange = (formField: FormField, value: any) => {
        let updatedObject = Object.assign({}, props.object);
        updatedObject[formField.fieldName] = value;
        props.onEntityChange(updatedObject);
    };

    const fetchFieldOptions = (fieldValues: any) => {
        fetch('/api/forms/' + props.entity + '/options', {
            method: 'post',
            body: JSON.stringify(fieldValues),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            return resp.json();
        }).then(json => {
            let newEntityConfig = Object.assign(new EntityConfig(), entityConfig);
            newEntityConfig.panels.forEach(section => {
                section.fields.forEach(field => {
                    if (json[field.fieldName]) {
                        field.values = json[field.fieldName];
                    }
                });
            });
            setEntityConfig(newEntityConfig);
        });
    };

    if (!entityConfig.name) {
        return null;
    }

    return (
        <div>
            <PanelForm entity={props.object} entityConfig={entityConfig} onEntityChange={handleEntityChange} />
        </div>
    );
}

const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};