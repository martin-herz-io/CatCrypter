// React imports
import React, { useEffect, useState } from 'react'
import { Icon } from './utilities/Icon';
import { EditPassword } from './modals/EditPassword';
import { DeletePassword } from './modals/DeletePassword';

// Properties
export type props = {
    index: number;
    i: {
        title: string;
        username: string;
        password: string;
    },
    passwordList: { title: string; username: string; password: string; }[];
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.ReactNode>;
    toggleModal: () => void;
}

// Component
export const PasswordItem: React.FC<props> = ({ index, i, passwordList, setPasswordList, setModalState, setModalContent, toggleModal }) => {

    // Hidden password
    const hidenPassword = i.password.replace(/./g, "•")

    // Switch between password and hidden password
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(!showPassword)

    // Switch between password and hidden password on click
    const [password, setPassword] = useState(hidenPassword)
    const [viewIcon, setViewIcon] = useState("eye")
    const togglePasswordOnClick = () => {
        if (showPassword) {
            setPassword(hidenPassword)
            setViewIcon("eye")
        } else {
            setPassword(i.password)
            setViewIcon("eye-off")
        }
        togglePassword()
    }

    // Copy password or username to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className={"w-[36rem] mx-auto px-4 py-2 bg-zinc-800/50 border-2 border-zinc-800 rounded-xl relative"}>
            <p className={"font-semibold text-xl opacity-60 cursor-default"}>{ i.title }</p>
                  
            <div className={"mt-2 flex gap-8"}>
                <div>
                    <p className={"opacity-60 font-light cursor-default"}>Anmelde-ID: </p>
                    <p className={"opacity-60 font-light cursor-default"}>Passwort: </p>
                </div>

                <div>
                    <div className={"flex gap-1 items-center"}>
                        <p className={""}>{i.username}</p>
                        <button onClick={() => {copyToClipboard(i.username)}}><Icon name={"copy"} className={"w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"} /></button>
                    </div>
                      
                    <div className={"flex gap-1 items-center"}>
                        <p className={""}>{password}</p>
                        <button onClick={() => {copyToClipboard(i.password)}}><Icon name={"copy"} className={"w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"} /></button>
                        <button onClick={togglePasswordOnClick}><Icon name={viewIcon} className={"w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"} /></button>
                    </div>
                </div>
            </div>

            <div className={"absolute top-2 right-2 flex gap-2"}>
                <button onClick={() => {setModalContent(<EditPassword i={i} index={index} passwordList={passwordList} setPasswordList={setPasswordList} setModalState={setModalState} />); toggleModal()}}><Icon name={"cog"} className={"w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"} /></button>
                <button onClick={() => {setModalContent(<DeletePassword title={i.title} index={index} passwordList={passwordList} setPasswordList={setPasswordList} setModalState={setModalState} />); toggleModal()}}><Icon name={"trash"} className={"w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"} /></button>
            </div>
        </div>
    )

}