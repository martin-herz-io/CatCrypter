// React imports
import { dialog } from '@tauri-apps/api'
import React, { useEffect, useState } from 'react'
import { Icon } from './Icon';

// Properties: Textbox
export type Props = {
    value?: string;
    placeholder?: string;
    type?: string;
    filters?: { name: string; extensions: string[] }[];
    onValueChange?: (val: string) => void;
}

// Component: Textbox
export const Fileselector: React.FC<Props> = (
    {
        value = "",
        placeholder = "",
        type = "open",
        filters = [],
        onValueChange = () => {}
    }
) => {

    // Value state
    const [inputValue, setInputValue] = useState<string>(value)

    // Update value state
    useEffect(() => {
        onValueChange(inputValue)
    }, [inputValue, onValueChange])

    // Open file dialog
    const openDialog = async () => {
        if (type === 'open') {
            try {
                const result = await dialog.open({
                    multiple: false,
                    directory: false,
                    filters: filters
                })
                if (result && result.length > 0) {
                    const path = result.toString()
                    setInputValue(path)
                }
            } catch (error) {
                console.error('Fehler beim Öffnen des Dateiauswahldialogs:', error)
            }
        }

        if (type === 'save') {
            try {
                const result = await dialog.save({
                    defaultPath: 'C:\\Users\\User\\Desktop\\Neue Ablage.ccp',
                    filters: filters
                })
                if (result && result.length > 0) {
                    const path = result.toString()
                    setInputValue(path)
                }
            } catch (error) {
                console.error('Fehler beim Öffnen des Dateiauswahldialogs:', error)
            }
        }
    }
    
    return (
        <div className="flex flex-row gap-4">
            <input type={"text"} placeholder={placeholder} className={"textbox min-w-[calc(100%-52px-1rem)]"} value={inputValue} onChange={e => setInputValue(e.target.value)} />
            
            <button onClick={openDialog} className={"button"}><Icon name={"folder-open"} /></button>
        </div>
    )
}