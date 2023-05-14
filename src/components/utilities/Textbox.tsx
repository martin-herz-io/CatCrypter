// React imports
import React, { useEffect, useState } from 'react'

// Properties: Textbox
export type Props = {
    value?: string;
    placeholder?: string;
    type?: string;
    onValueChange?: (val: string) => void;
}

// Component: Textbox
export const Textbox: React.FC<Props> = (
    {
        value = "",
        placeholder = "",
        type = "text",
        onValueChange = () => {}
    }
) => {

    // Value state
    const [inputValue, setInputValue] = useState(value)

    // Update value state
    useEffect(() => {
        onValueChange(inputValue)
    }, [inputValue, onValueChange])

    
    return <input type={type} placeholder={placeholder} className={"textbox"} value={inputValue} onChange={e => setInputValue(e.target.value)} />
}