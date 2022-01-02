import generateKeypair from './keypair'
import words from './words.json'

const createBtn = document.querySelector('#createBtn')
const importBtn = document.querySelector('#importBtn')
const createCtn = document.querySelector('#createCtn')
const pubk = document.querySelector('#pubk')
const seed = document.querySelector('#seed')


importBtn!.addEventListener('click', e => {
    let mnemonicInput = (<HTMLInputElement>document.querySelector('#mnemonicInp')).value;
    mnemonicInput = mnemonicInput.replace(/\s+/g, '')
    const keypair:Array<string> = generateKeypair(mnemonicInput)
    localStorage.setItem('privateKey', keypair[0])
    localStorage.setItem('publicKey', keypair[1]);
    alert('Account imported!')
    //console.log(keypair[0], keypair[1])
})

createBtn!.addEventListener('click', e => {
    let mnemonicArr:Array<string> = []
    const randNumb:Array<number> = Array.from({length: 12}, () => Math.floor(Math.random() * 45))
    randNumb.forEach(index => {
        mnemonicArr.push(words[index])
    })

    const mnemonic:string = mnemonicArr.join("")
    const mnemonicDisplay:string = mnemonicArr.join(" ")
    // console.log(mnemonic)

    const keypair:Array<string> = generateKeypair(mnemonic)
    //console.log(mnemonicDisplay, result[0], result[1])
    
    createCtn!.setAttribute('style', 'display: inline;')
    seed!.textContent = mnemonicDisplay
    pubk!.textContent = keypair[1]

    //console.log(keypair[0])

    localStorage.setItem('privateKey', keypair[0])
    localStorage.setItem('publicKey', keypair[1]);
    
})


