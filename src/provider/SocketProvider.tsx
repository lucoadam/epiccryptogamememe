import React, { useEffect, useState, FC, ComponentType } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the type for the context value
interface ISocketContext {
    socket: Socket | null;
}

const SocketContext = React.createContext<ISocketContext>({
    socket: null,
});

// Define the type for the HOC
export function socketConnect<T>(Component: ComponentType<T & ISocketContext>) {
    // eslint-disable-next-line react/display-name
    return (props: T) => (
        <SocketContext.Consumer>
            {({ socket }) => <Component {...props} socket={socket} />}
        </SocketContext.Consumer>
    );
}

// Define the type for the SocketProvider props
interface SocketProviderProps {
    children: React.ReactNode;
}

const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (socket) return;
        const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
            autoConnect: false,
        });
        // newSocket.connect();
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            newSocket.close();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
