'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { FormElementInstance } from "../FromElements"

type DesignerContentType = {
    elements: FormElementInstance[],
    addElements: (index: number, element: FormElementInstance) => void,
    setElements:Dispatch<SetStateAction<FormElementInstance[]>>
    removeElements: (id: string) => void,
    updateElements:(id:string,element:FormElementInstance)=>void,
    selectedElement: FormElementInstance | null,
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
};


export const DesignerContent = createContext<DesignerContentType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {

    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement,setSelectedElement] = useState<FormElementInstance | null>(null)

    const addElements = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElement = [...prev];
            newElement.splice(index, 0, element);
            return newElement;
        })
    };

    const removeElements = (id: string) => {
        setElements((prev)=>prev.filter(element => element.id !== id))
    }

    const updateElements = (id: string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex((el) => el.id === id);
            newElements[index] = element;
            return newElements;
        })
    };




    return <DesignerContent.Provider
        value={{elements,addElements,removeElements,selectedElement,setSelectedElement,updateElements,setElements}}
        >{children}</DesignerContent.Provider>
}