import art1 from './../assets/brush/art_1.png'
import art2 from './../assets/brush/art_2.png'
import art3 from './../assets/brush/art_3.png'
import { FC, useEffect, useRef, useState } from 'react';

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
    const images: HTMLImageElement[] = [art1, art2, art3].map((value, _index) => loadImage(value))

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

    const onMove = (event: MouseEvent) => {
        const image = images[index]

        if (!canvasRef.current || !image.complete ) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        const mousePosition = getCoordinates(event);

        if (context && mousePosition) {
            const max_length = canvas.width / 3
            const ratio = Math.min(max_length / image.width, max_length / image.height);
            const centerShift_x = mousePosition.x - (image.width*ratio) / 2;
            const centerShift_y = mousePosition.y - (image.height*ratio) / 2;  
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
        window.addEventListener('mousemove', onMove);
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('click', onClick);
        };
    }, [onMove, onClick]);

    return <canvas ref={canvasRef} height={height} width={width} />;
};
