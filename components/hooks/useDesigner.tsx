import React, { useContext } from 'react'
import { DesignerContent } from '../context/DesignerContext';

export const useDesigner = () => {
    const context = useContext(DesignerContent);

    if (!context) {
        throw new Error("useDesigner must be withing a DesignerContext")
    }

  return context
}
