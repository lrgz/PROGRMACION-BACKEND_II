const socket = io()


socket.on('products', data =>{
    const div = document.querySelector('#products')
    let products = ''
    data.docs.forEach( product => {
        products += `
        <li class="flex justify-between">
            <div>
                <p class="font-semibold text-lg">${product.title}</p>
                <p class="font-bold text-xl text-green-600 text-justify">$ ${product.price}</p>
                <p class="max-w-lg my-2">${product.description}</p>
                <p class="">Id: ${product.id}</p>
                <p class="">Code: ${product.code}</p>                
                <p class="">Stock: ${product.stock}</p>
                <p class="">Category: ${product.category}</p>
                <p class="">Status: ${product.status}</p>
                <p class="max-w-lg">Nº OF Thumbnails : ${product.thumbnails.length}</p>
                <button id="${product.id}" class="mt-3 bg-red-700 hover:bg-red-500 text-white font-medium uppercase py-1 px-2 rounded cursor-pointer deleteButton">Delete</button>
            </div>
            <div class="grid grid-cols-3">
                ${product.thumbnails.map(thumbnail => {
                    return `<img class="h-40" src="${thumbnail}" alt="Product image">`
                }).join('')}
            </div>
        </li>
        <hr class="my-5 border-gray-600">`
    } )
    div.innerHTML = products

    
    const deleteButtons = document.querySelectorAll('.deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener("click", e => {
            const productId = e.target.id
            socket.emit('deleteProduct', Number(productId))
        })
    })
})


const form = document.querySelector('#form')
form.addEventListener('submit', e => {
    e.preventDefault()

    const textareaValues = form.elements.thumbnails.value
    const array = textareaValues.split(",")
    const thumbnails = array.map( element => {
        return element.trim()
    } )

    const product = {
        title: form.elements.title.value,
        description: form.elements.description.value,
        code: form.elements.code.value,
        price: form.elements.price.value,
        stock: form.elements.stock.value,
        category: form.elements.category.value,
        thumbnails: thumbnails,
        status:true
    }

    if(product.title && product.description && product.code && product.price && product.stock && product.category && product.thumbnails){
        socket.emit('addProduct', product)
    }

    form.reset()
})