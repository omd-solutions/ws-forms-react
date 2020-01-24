import React, {useEffect, useState} from "react";
import {EntityConfig} from "./EntityConfig";
import PanelForm from "./PanelForm";
import {FormField} from "./FormField";

type Props = {
    entity: string | EntityConfig,
    object: any | undefined,
    onEntityChange: (updatedObject: any) => void,
}

const FormTypeMap: any = {
    "PANELS": PanelForm,
    "TABS": PanelForm
};

function EntityForm(props: Props) {

    const [entityConfig, setEntityConfig] = useState(new EntityConfig());

    useEffect(() => {
        if(typeof props.entity === 'string') {
            fetch('/api/forms?entity=' + props.entity).then(resp => {
                return resp.json();
            }).then(json => {
                setEntityConfig(json);
            })
        } else {
            setEntityConfig(props.entity);
        }
    }, [props.entity]);

    const handleEntityChange = (formField: FormField, value: any) => {
        let updatedObject = Object.assign({}, props.object);
        updatedObject[formField.fieldName] = value;
        props.onEntityChange(updatedObject);
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

export default EntityForm