import * as crypto from "crypto-js";

// const keypair1 = document.querySelector('#keypair1')
// const keypair2 = document.querySelector('#keypair2')

// const mnemonic1:string ="helpful nervous obscene unequal sparkle heavenly class suffer roll stormy rural sincere"
// const mnemonic2:string ="yell unbecoming talented woozy abounding extra-small suggestion first haircut lean board defiant"


function generateKeypair(mnemonic:string):Array<string>{
    const privateHash = crypto.SHA256(mnemonic)
    const privateHashStr:string = "0x" + privateHash.toString(crypto.enc.Hex)
    const publicHash = crypto.SHA256(privateHashStr)
    const publicHashStr = "0x" + publicHash.toString(crypto.enc.Hex)
    return [privateHashStr, publicHashStr]
}

export default generateKeypair;

// keypair1!.addEventListener('click', e=>{
//     const keypair:Array<string> = generateKeypair(mnemonic1)
//     localStorage.setItem('privateKey', keypair[0])
//     localStorage.setItem('publicKey', keypair[1]);
//     // console.log(keypair)
// })

// keypair2!.addEventListener('click', e=>{
//     const keypair:Array<string> = generateKeypair(mnemonic2)
//     localStorage.setItem('privateKey', keypair[0])
//     localStorage.setItem('publicKey', keypair[1]);
//     //console.log(keypair)
// })