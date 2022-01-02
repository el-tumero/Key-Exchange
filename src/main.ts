import diffieHelman from './diffieHelman'
import Peer from 'peerjs';
import * as crypto from "crypto-js";

// const message = document.querySelector('#message')
const msgBox = document.querySelector('#msgBox')
const connectBtn = document.querySelector('#connectBtn')
const sendBtn = document.querySelector('#sendBtn')


const privKeyDisp = document.querySelector('#privKeyDisp')
const pubKeyDisp = document.querySelector('#pubKeyDisp')

const private_key = localStorage.getItem('privateKey') as string
const public_key = localStorage.getItem('publicKey') as string

let conversation_key:string = ''

const peer = new Peer(public_key, {
    secure: true, 
    'port': 443,
    'host': 'peerserverchat.herokuapp.com',
    'path': '/chat'
}); 

privKeyDisp!.textContent = private_key
pubKeyDisp!.textContent = public_key

//const key_btn = document.querySelector('#key')

const nHashed:string = "0x2dd3ca6fa7de9a07cda570c7e802450a7522c8296f73f8795cc7be468a01206373aefc4eae5b062293b3b7b9a2480d52152501a8d0b900f5562a42a3db8487ac"
const gen:number = 3

// key_btn!.addEventListener('click', e=>{ //if possibly null need !
//     const result = diffieHelman(private_key, nHashed, gen)
//     console.log(result)
// })



connectBtn!.addEventListener('click', e =>{
    let receiver_id = (<HTMLInputElement>document.querySelector('#receiver')).value;
    const conn = peer.connect(receiver_id);
        conn.on('open', () => {
            const dh:string = 'dh' + diffieHelman(private_key, nHashed, gen)
            conn.send(dh);
            
    });

})



function sendMessage(){
    let msg_notencrypted = (<HTMLInputElement>document.querySelector('#message')).value;
    const para = document.createElement("p")
    const text = document.createTextNode('you: ' + msg_notencrypted)
    para.appendChild(text)
    msgBox?.appendChild(para)
    if (conversation_key.length > 0){
    let receiver_id = (<HTMLInputElement>document.querySelector('#receiver')).value;
    const conn = peer.connect(receiver_id);
    
    conn.on('open', () => {
        const message = crypto.AES.encrypt(msg_notencrypted, conversation_key).toString()
        let msg_input = (<HTMLInputElement>document.querySelector('#message'))
        msg_input.value = ''
        conn.send(message);
    });
    }
    else{
        console.log('No conversation key found!')
    }
}

sendBtn!.addEventListener('click', e => {
    sendMessage()

})

document.addEventListener('keydown', e => {
    if(e.key == 'Enter'){
        sendMessage()
    } 
})

peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      // Will print 'hi!'
      //console.log(data);
      if(data[0] === 'd' && data[1] === 'h'){
        //console.log(data)
        conversation_key = diffieHelman(private_key, nHashed, data.substring(2))
        console.log(conversation_key)
      }
      else{
        const message = crypto.AES.decrypt(data, conversation_key)
        const decrypted_msg = message.toString(crypto.enc.Utf8)
          
        const para = document.createElement("p")
        const text = document.createTextNode('friend : ' + decrypted_msg)
        para.appendChild(text)
        msgBox?.appendChild(para)

          //console.log()
      }
    });





    // if (conversation_key.length > 0){
    //     crypto.AES.encrypt()
    // }
    // 
  });


