// React imports
import React, { useEffect, useState } from 'react'
import { Textbox } from '../utilities/Textbox';

// Properties: Textbox
export type Props = {
    title: string;
    index: number;
    passwordList: { title: string; username: string; password: string; }[];
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component: Textbox
export const DeletePassword: React.FC<Props> = (
    {
        title,
        index,
        passwordList,
        setPasswordList,
        setModalState
    }
) => {

    // Delete current password from list and set new list
    const deletePassword = () => {
        let newList = [...passwordList]
        newList.splice(index, 1)
        setPasswordList(newList)
        setModalState(false)
    }

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{`"${title}" löschen?`}</p>
                <p className={"opacity-60 cursor-default"}>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
            </div>
            <div className={"flex flex-row gap-4"}>
                <button onClick={deletePassword} className={"button btn-critical"}>Löschen</button>
                <button onClick={() => {setModalState(false)}} className={"button"}>Abbrechen</button>
            </div>
        </div>
    )
}