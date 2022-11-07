import { Outlet } from "react-router-dom"
import { FC } from 'react'
import { DrawingBoard } from "./drawingBoard"

export const Root:FC = () => {
    return (
        <div>
            <div className="absolute p-5 flex justify-start space-x-10 z-20">
                <a href="" className="font-semibold text-2xl">Barrio Martin</a>
                <a href="info" className="font-light text-2xl">Info</a>
            </div>
            <DrawingBoard 
                width={window.innerWidth} height={window.innerHeight}
            />
        </div>
    )
}
