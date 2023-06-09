import { createContext, useState, useEffect } from "react";

export const QueueContext = createContext();

export const QueueProvider = ({children}) => {
    const [queue, setQueue] = useState([]);

    const enqueue = (item) =>{
        setQueue((prevQueue)=>[...prevQueue, item]);
    };

    const dequeue = () => {
        setQueue((prevQueue)=>{
            const [, ...newQueue] = prevQueue;
            return newQueue;
        });
    };

    const value = {
        queue,
        enqueue,
        dequeue
    };

    return <QueueProvider.Provider value={value}>{children}</QueueProvider.Provider>;
};

