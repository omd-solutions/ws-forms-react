import React, {useEffect, useRef, useState} from "react";
import {EntityConfig} from "./EntityConfig";
import PanelForm from "./PanelForm";
import {FormField} from "./FormField";
import {AppBar, Box, Tab, Tabs} from "@material-ui/core";

export type Props = {
    entity: string | EntityConfig,
    object: any | undefined,
    onEntityChange: (updatedObject: any, error: boolean) => void,
}

export default function EntityForm(props: Props) {

    const [entityConfig, setEntityConfig] = useState(new EntityConfig());
    const prevObject = usePrevious(props.object);
    const [tab, setTab] = React.useState(0);

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
        entityConfig.tabs.forEach(tab => {
            tab.panels.forEach(panel => {
                panel.fields.forEach(formField => {
                    if (props.object[formField.fieldName]) {
                        fieldValues[formField.fieldName] = formField.idField ? props.object[formField.fieldName][formField.idField] : props.object[formField.fieldName]
                    }
                });
            });
        });
        return fieldValues;
    };

    const handleEntityChange = (formField: FormField, value: any, error: boolean) => {
        let updatedObject = Object.assign({}, props.object);
        updatedObject[formField.fieldName] = value;
        props.onEntityChange(updatedObject, error);
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
            newEntityConfig.tabs.forEach(tab => {
                tab.panels.forEach(panel => {
                    panel.fields.forEach(field => {
                        if (json[field.fieldName]) {
                            field.values = json[field.fieldName];
                        }
                    });
                });
                setEntityConfig(newEntityConfig);
            });
        });
    }

    if (!entityConfig.name) {
        return null;
    }

    let forms = [];
    let tabCaptions = [];

    for (let i in entityConfig.tabs) {
        forms.push((<PanelForm key={'tab-form-' + i} tabConfig={entityConfig.tabs[i]} entity={props.object}
                               onEntityChange={handleEntityChange}/>));
        tabCaptions.push(entityConfig.tabs[i].caption);
    }

    let wrapper = (
        <div>
            {forms}
        </div>
    );

    if (tabCaptions.length > 1) {
        wrapper = (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tab}
                        onChange={(event: React.ChangeEvent<{}>, newValue: number) => setTab(newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabCaptions.map((tabCaption, idx) => (
                            <Tab key={'tab-' + idx} label={tabCaption}/>
                        ))}
                    </Tabs>
                </AppBar>
                {forms.map((form, idx) => (
                    <TabPanel value={tab} index={idx}>
                        {form}
                    </TabPanel>
                ))}
            </div>
        );
    }

    return wrapper;
}

const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}