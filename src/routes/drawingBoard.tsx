import { FC, useEffect, useRef, useState } from 'react';

import art1 from './../assets/brush/art_1.png'
import art2 from './../assets/brush/art_2.png'
import art3 from './../assets/brush/art_3.png'
import art4 from './../assets/brush/art_4.png'
import art5 from './../assets/brush/art_5.png'
import art6 from './../assets/brush/art_6.png'
import art7 from './../assets/brush/art_7.png'
import art8 from './../assets/brush/art_8.png'
import art9 from './../assets/brush/art_9.png'
import art10 from './../assets/brush/art_10.png'
import art11 from './../assets/brush/art_11.png'
import art12 from './../assets/brush/art_12.png'
import art13 from './../assets/brush/art_13.png'
import art14 from './../assets/brush/art_14.png'
import art15 from './../assets/brush/art_15.png'

const loadImage = (path: string): HTMLImageElement => {
    const image = new Image;
    image.src = path

    return image
}

interface DrawingBoardProps {
    width: number;
    height: number;
}

export const DrawingBoard:FC<DrawingBoardProps> = ({ width, height }) => {
    const images: HTMLImageElement[] = [
        art1, art2, art3, art4, art5, art6, art7, art8, art9, art10, art11, art12, art13, art14, art15
    ].map((value, _index) => loadImage(value))

    return <Canvas 
        width={width} height={height} images={images}
    />
}

interface CanvasProps {
    width: number;
    height: number;
    images: HTMLImageElement[];
}

type Coordinate = {
    x: number;
    y: number;
};

const Canvas:FC<CanvasProps> = ({ width, height, images}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [index, setIndex] = useState(0);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop};
    };

    const getTouchCoordinates = (event: TouchEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.touches[0].pageX - canvas.offsetLeft, y: event.touches[0].pageY - canvas.offsetTop};
    };

    const onMove = (event: MouseEvent) => {
        const mousePosition = getCoordinates(event);
        if(!mousePosition){
            return
        }

        draw(mousePosition)
    }

    const onTouch = (event: TouchEvent) => {
        event.preventDefault();
        const touchPosition = getTouchCoordinates(event);

        if(!touchPosition){
            return
        }

        draw(touchPosition)
    }

    const draw = (coordinate: Coordinate) => {
        const image = images[index]

        if (!canvasRef.current || !image.complete ) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context && coordinate) {
            const max_length = canvas.width / 8
            const ratio = Math.min(max_length / image.width, max_length / image.height);
            const centerShift_x = coordinate.x - (image.width*ratio) / 2;
            const centerShift_y = coordinate.y - (image.height*ratio) / 2;  
            context.drawImage(
                image, 
                0,
                0, 
                image.width, 
                image.height,
                centerShift_x,
                centerShift_y,
                image.width*ratio, 
                image.height*ratio
            );
        }
    }

    const onClick = (_event: MouseEvent) => {
        setIndex((index + 1) % images.length)
    }

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        const boundingReact = canvas.getBoundingClientRect()
        canvas.width = boundingReact.width * window.devicePixelRatio
        canvas.height = boundingReact.height * window.devicePixelRatio
        canvas.style.width = boundingReact.width + 'px'
        canvas.style.height = boundingReact.height + 'px'

        if (context) {
            context.scale(window.devicePixelRatio, window.devicePixelRatio)   
        }
    }, [])

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('touchmove', onTouch);
        canvas.addEventListener('click', onClick);
        return () => {
            canvas.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('touchmove', onTouch);
            canvas.removeEventListener('click', onClick);
        };
    }, [onMove, onClick]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" height={height} width={width} />;
};
