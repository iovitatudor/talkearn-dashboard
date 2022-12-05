import { io } from "socket.io-client";

class SocketIoService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://127.0.0.1:5000');

    return this.socket;
    // console.log(this.socket);
    // const random = new Date();
    // this.socket.emit('messageToServer', random);
    // this.socket.on('messageToClient', (mes) => {
    //   console.log(mes);
    // });
  }
}

export default new SocketIoService();