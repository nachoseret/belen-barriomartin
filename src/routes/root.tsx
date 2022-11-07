import { Outlet } from "react-router-dom"
import { FC } from 'react'
import { DrawingBoard } from "./drawingBoard"

export const Root:FC = () => {
    return (
        <div className="relative">
            <div className="h-12 flex justify-start p-5 space-x-10 bg-transparent absolute">
                <a href="" className="font-semibold text-2xl">Barrio Martin</a>
                <a href="info" className="font-light text-2xl">Info</a>
            </div>
            <div id="content absolute">
                <DrawingBoard 
                    width={window.innerWidth} height={window.innerHeight}
                />
            </div>
        </div>
    )
}
