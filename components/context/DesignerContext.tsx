'use client'

import { ReactNode, createContext, useState } from "react";
import { FormElementInstance } from "../FromElements"

type DesignerContentType = {
    elements: FormElementInstance[],
    addElements: (index: number, element: FormElementInstance) => void,
    removeElements:(id:string)=>void
};


export const DesignerContent = createContext<DesignerContentType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {

    const [elements, setElements] = useState<FormElementInstance[]>([]);
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


    return <DesignerContent.Provider
        value={{elements,addElements,removeElements}}
        >{children}</DesignerContent.Provider>
}