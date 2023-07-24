const socket = io()
let userEmail = ''

Swal.fire({
    title: 'Tell us your email',
    input: 'email',
    inputPlaceholder: 'Enter your email address',
    inputValidator: (value) => {
        return !value && 'The email is required to chat'
    },
    allowOutsideClick: false,
    onOpen: (modal) => {
        modal.querySelector('input').focus()
    },
    preConfirm: (value) => {
        if (/\S+@\S+\.\S+/.test(value)) {
            return value.trim()
        } else {
            Swal.showValidationMessage('Please enter a valid email address')
            return false
        }
    }
}).then(result => {
    userEmail = result.value
    socket.emit('authenticated', userEmail)
})


const input  = document.getElementById('text')
const log = document.getElementById('messages')
const date = new Date()

input.addEventListener('keyup',evt=>{
    if(evt.key === "Enter"){
        socket.emit('message', {email: userEmail, message: input.value, createdAt: date})
        input.value= ""
    }
})

socket.on('log', data =>{
    let logs=''
    data.logs.forEach(log =>{
        logs += `<li class="w-100 bg-gray-200 py-2 px-1 rounded my-2 flex justify-between items-center"><p class="block">${log.email} says: ${log.content}</p> <span class="block text-sm text-gray-400">${log.createdAt}</span></li>`
    })
    log.innerHTML=logs
})