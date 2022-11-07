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
            <div className="absolute bottom-0 w-screen p-5 flex items-center justify-center z-20">
                <p className="text-sm font-light">
                    Sacá un screenshot y mandánoslo a nuestro Instagram 
                    (<a className="font-semibold" href="https://www.instagram.com/barriomartin.ros/" target="_blank">@barriomartin.ros</a>)
                </p>
            </div>
        </div>
    )
}
