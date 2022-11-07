import { FC } from 'react'

import banner from './../assets/info/banner.png'
import map from './../assets/info/map.png'
import video from './../assets/info/video.mp4'

export const Info:FC = () => {
    return (
        <div className="w-screen bg-[#E7E4DD]">
            <div className="sticky top-0 p-5 flex justify-start space-x-10 z-20">
                <a href="#" className="font-semibold text-2xl">Barrio Martin</a>
                <a href="#/info" className="font-light text-2xl">Info</a>
            </div>
            <img src={banner} />
            <p className="p-5 text-2xl font-light">
                Martin es un barrio ubicado en el centro de Rosario que cuenta con una propuesta
                única para artistas de la ciudad. Con el fin de fomentar y difundir el arte local,
                Martin te invita a participar de sus propuestas brindándote el espacio perfecto
                para compartir tu arte.
            </p>
            <img src={map} />
            <p className="p-5 text-2xl font-light">
            En nuestro mapa podes encontrar nuestra red de puntos art, espacios preparados para la
            intervención, además de los puntos de mayor interés cultural del barrio.
            </p>
            <video src={video} loop autoPlay muted playsInline/>
        </div>
    )
}