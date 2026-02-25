
import React from 'react';
import './game.css';
export function Duck(props){
    const [x, setX] = React.useState(0);
    const [rot, setRot] = React.useState(0);
    const left = React.useRef(props.left);
    React.useEffect(() => {
        const interval = setInterval(() =>{
            setX(prevX => {
                if(props.left == 1){
                    if(prevX > 100 * props.left || prevX < -60){
                        left.current *= -1;
                    }
                } else{
                     if(prevX < -100 || prevX > 50){
                        left.current *= -1;
                    }
                }
                
                return (prevX + 2 * left.current);
            });
        }, 10);
        return () => clearInterval(interval);      
    }, [left]);
    return(
        <img src="../duck-placeholder.jpg" height="100" width="100" style={{
            transform: `translateX(${x}vw) rotate(${x}deg)`,
            transition: 'transform 0.3s ease'
        }}/>
    )
}