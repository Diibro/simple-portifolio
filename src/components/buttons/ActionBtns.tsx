import { IButton } from "@/common/Interfaces";
import React from "react";


export const LineActionBtn: React.FC<IButton> = ({title, type="button"}) => {
     return (
          <div className="w-auto relative h-auto p-0 m-0">
               <button type={type} className="bg-white rounded-[10px] text-main-secondary border-main-secondary hover:text-white hover:bg-main-secondary border-[1.5px] py-2 px-4 text-sm transition-all">{title}</button>
          </div>
     )
}

export const FilledActionBtn: React.FC<IButton> = ({title, type="button"}) => {
     return (
          <div className="w-auto h-auto">
               <button type={type} className="bg-main-secondary rounded-[10px] text-white border-main-secondary hover:text-main-secondary hover:bg-white border-[1.5px] py-2 px-4 text-sm transition-all">{title}</button>
          </div>
     )
}