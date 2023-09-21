// React imports
import React, { useState } from 'react'
import { Icon } from '../utilities/Icon';
import { OpenTray } from './OpenTray';
import { CreateTray } from './CreateTray';

// Properties: Textbox
export type Props = {
    trayList: { title: string; logo?: string; color?: string; date: string; location: string; }[];
    setTrayList: React.Dispatch<React.SetStateAction<{ title: string; logo?: string; color?: string; date: string; location: string; }[]>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    t: (key: string) => string;
}

// Component: Textbox
export const SelectCreateOpenTray: React.FC<Props> = (
    {
        trayList,
        setTrayList,
        setModalState,
        setModalContent,
        t
    }
) => {

    const switchModal = (modal: string) => {
        switch (modal) {
            case 'open':
                setModalContent(<OpenTray t={t} trayList={trayList} setTrayList={setTrayList} setModalState={setModalState} />)
                setModalState(true)
                break;

            case 'create':
                setModalContent(<CreateTray t={t} trayList={trayList} setTrayList={setTrayList} setModalState={setModalState} />)
                setModalState(true)
                break;

            default:
                setModalState(false)
        }
    }

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('addTray')}</p>
            </div>
            <div className={"w-full flex gap-4 max-w-[228.08px]"}>
                
                <button onClick={() => {switchModal('open')}} className={"group w-1/2 flex flex-col justify-center items-center bg-zinc-900/50 hover:bg-zinc-900 p-4 rounded-xl hover:scale-[1.025] transition-all duration-300"}>
                    <Icon name={"folder-open"} className={"w-12 opacity-60 group-hover:opacity-100 transition-all duration-300"} />

                    <p className="mt-2 opacity-60 group-hover:opacity-100 transition-all duration-300">{t('open')}</p>
                </button>

                <button onClick={() => {switchModal('create')}} className={"group w-1/2 flex flex-col justify-center items-center bg-zinc-900/50 hover:bg-zinc-900 p-4 rounded-xl hover:scale-[1.025] transition-all duration-300"}>
                    <Icon name={"create"} className={"w-12 opacity-60 group-hover:opacity-100 transition-all duration-300"} />

                    <p className="mt-2 opacity-60 group-hover:opacity-100 transition-all duration-300">{t('create')}</p>
                </button>

            </div>
        </div>
    )
}