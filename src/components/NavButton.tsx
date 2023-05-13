// React imports
import React from 'react'
import { Icon } from './utilities/Icon';

// Properties
export type props = {
    title: string;
    date: string;
    active?: boolean;
    addButton?: boolean;
    onClick?: () => void;
}

// Component
export const NavButton: React.FC<props> = ({ title, date, active, addButton, onClick }) => {

    // Date to string (DD.MM.YYYY) with double digits
    const dateToString = (date: string) => {
        const d = new Date(parseInt(date) * 1000)
        const day = d.getDate().toString().padStart(2, '0')
        const month = (d.getMonth() + 1).toString().padStart(2, '0')
        const year = d.getFullYear().toString()
        return `${day}.${month}.${year}`
    }

    if (!addButton) {
      return (
        <div onClick={onClick} className={`min-h-[62.4px] ${active ? 'bg-zinc-700' : 'bg-zinc-800'} hover:bg-zinc-700/50 hover:scale-[0.975] p-2 rounded-xl overflow-hidden flex items-center gap-1.5 cursor-pointer transition-all duration-300`}>
          <img src={"/vite.svg"} className={"w-12 aspect-square object-contain p-1.5 bg-orange-500 rounded-md"} />
          <div>
            <p className={"cursor-pointer"}>{ title }</p>
            <p className={"cursor-pointer text-sm -mt-1 text-zinc-400"}>{`Erstellt am ${dateToString(date)}`}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div onClick={onClick} className={`min-h-[68px] border-2 border-zinc-700/50 border-dashed hover:scale-[0.975] p-2 rounded-xl overflow-hidden flex items-center gap-1.5 cursor-pointer transition-all duration-300`}>
          <div className={"w-12 aspect-square rounded-md flex bg-zinc-700/50 justify-center items-center"}>
            <Icon name={"add"} type={"line"} className={"w-8"} />
          </div>
          <div>
            <p className={"cursor-pointer"}>Ablage hinzufügen</p>
          </div>
        </div>
      )
    }
}