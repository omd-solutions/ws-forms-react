import React, {useEffect, useState} from "react";
import {EntityConfig} from "./EntityConfig";
import PanelForm from "./PanelForm";
import {FormField} from "./FormField";

export type Props = {
    entity: string | EntityConfig,
    object: any | undefined,
    onEntityChange: (updatedObject: any) => void,
}

const FormTypeMap: any = {
    "PANELS": PanelForm,
    "TABS": PanelForm
};

export default function EntityForm(props: Props) {

    const [entityConfig, setEntityConfig] = useState(new EntityConfig());

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
        if (props.object) {
            let fieldValues = {};
            entityConfig.sections.forEach(section => {
                section.fields.forEach(formField => {
                    if (props.object[formField.fieldName]) {
                        fieldValues[formField.fieldName] = formField.idField ? props.object[formField.fieldName][formField.idField] : props.object[formField.fieldName]
                    }
                });
            });
            fetchFieldOptions(fieldValues);
        }
    }, [props.object]);

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
            newEntityConfig.sections.forEach(section => {
                section.fields.forEach(field => {
                    if (json[field.fieldName]) {
                        field.values = json[field.fieldName];
                    }
                });
            });
            setEntityConfig(newEntityConfig);
        });
    };

    const renderSections = () => {
        return FormTypeMap[entityConfig.sectionType]({
            entity: props.object,
            entityConfig: entityConfig,
            onEntityChange: handleEntityChange
        });
    };

    if (!entityConfig.name) {
        return null;
    }
    return (
        <div>
            {renderSections()}
        </div>
    );
}