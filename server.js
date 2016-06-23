// se crea un servidor http automaticamente
//var io = require('socket.io')(8080);
var io = require('socket.io')(process.env.PORT);

// recibe un objeto socket cada que un cliente se conectta
io.on('connection', function (objSocket) {
	
	// al conectarse se detona un evento  onSaludo
	io.emit("onSaludo", "Hola te acabas de conectar a un servidor node.js");
	
	// cada segundo emite el tiempo actual del servidor, esto en cuanto se conecta un cliente
	setInterval( function(){
		var d = new Date();
		io.emit("onTiempo", d.toLocaleTimeString());
	} , 1000)
	
	// se recibe un evento onPlatica conteniendo un objeto
	objSocket.on('onEnviarMensaje', function (objDatos) {
		io.emit("onRecibirMensaje", objDatos);
	});
	
	// se recibe un evento onMensaje conteniendo un mensaje
	objSocket.on('onAviso', function (aviso) {
		io.emit("onAviso", aviso);
	});	

	// se termina una conexion 
	objSocket.on('disconnect', function () {
		io.emit('user disconnected');
	});
 
});
