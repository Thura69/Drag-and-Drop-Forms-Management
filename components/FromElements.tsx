import { ReactElement } from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";

export type ElementsType =
    | "TextField"
    | "TitleField"
    | "SubTitleField"
    | "ParagraphField"
    | "SeparatorField"
    | "SpacerField"
    ;

export type FormElement = {
    validate(element: FormElementInstance , value: string |null): unknown;
    type: ElementsType;

    construct: (id: string) => FormElementInstance,
    
    designerBtnElement: {
        icon: React.ElementType,
        label:string
    }
    designerComponent: React.FC<{
    elementInstance : FormElementInstance
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance,
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean,
        defaultValue?:string
    }>;
    propertiesComponent: React.FC<{
    elementInstance : FormElementInstance
    }>;
};

export type FormElementInstance = {
    id: string,
    type: ElementsType,
    extraAttribute?:Record<string,any>
}

export type SubmitFunction = (key: string, value: string) => void;

type FormElementsType = {
    [key in ElementsType] : FormElement
}
export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField:SpacerFieldFormElement
    
};
