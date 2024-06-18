//remember if we do seperate socket.io logic we will esentially create a 
//different socket connection(id) every time we create socket logic so 
// the idea is to create one connection and share that connection with 
// every component that needs socket.io. We do this by sharing state which
//means using rtkq or rtk; but storing socket.io in rtk while using rtkq
//goes against the middleware rules since you can't store things 
//that are serializable while using rtkq
//Since you cannot store socket.io directly in the store while using rtkq
//we must create our own client logic, store it in state and share the 
//state globally to all the components that need socket.io; 

import { useState, useEffect, createContext, useContext } from 'react'
import io from "socket.io-client"
import { useSelector } from 'react-redux'

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const userInfo = useSelector(state => state.auth.userInfo)
    
    useEffect(() => {
        if (userInfo){
            const socket = io("http://localhost:5000", {
                query: {
                    userId: userInfo._id
                }
            })
            setSocket(socket)
            socket.on("onlineUser", (data) => {
                setOnlineUsers(data)
            })
            return () => socket.disconnect()
        } else{
            if (socket){
                socket.disconnect()
                setSocket(null)
            }
        }
    }, [userInfo])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider