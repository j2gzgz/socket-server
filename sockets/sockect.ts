import { Socket } from 'socket.io';
import sockectIo  from 'socket.io';



export const desconectar = (cliente: Socket) => {
    
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

    });
} 


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: sockectIo.Server ) => {
    
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });




} 