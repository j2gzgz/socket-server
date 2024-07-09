import { Socket } from 'socket.io';
import sockectIo  from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


// Mejor con patron singleton
export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket, io: sockectIo.Server) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}


export const desconectar = (cliente: Socket, io: sockectIo.Server) => {
    
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());

    });
} 

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: sockectIo.Server ) => {
    
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });

} 

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: sockectIo.Server) => {
    
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function  ) => {
        // console.log('configurar usuario', payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        
        io.emit('usuarios-activos', usuariosConectados.getLista());

        // envia esta respuesta al cliente
        callback( {
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

    });
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: sockectIo.Server) => {
    
    cliente.on('obtener-usuarios', () => {       
        
        // el to es para enviarselo a alguien en particular, si se omite el to se envia a todo el mundo
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());

    });
}