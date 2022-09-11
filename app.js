// Declaracion de la clase constructora Jean, con el atributo id para identificar cada producto y el atributo cart para sumar cantidades anadidas al carrito. 

class Jean {
    constructor (id,categoria, titulo, descripcion, precio,cart,img) {
        this.id = id
        this.categoria = categoria
        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
        this.cart = cart
        this.img = img
    }
}

// Declaracion de variables 

const productos = []
let carrito = []
let totalCompra = 0

// Creacion de objetos y envio de objetos a el arrego de productos. 

const jeanSlimfit = new Jean (1,"jeans","Jean Slimfit","Jean elastico slimfit color azul",100,1,"media/slimfit.webp");
const jeanRegularfit = new Jean (2,"jeans","Jean Regularfit","Jean resistente regularfit negro",120,1,"media/regularfit.webp");
const jeanWidefit = new Jean (3,"jeans","Jean Widefit","Jean comodo widefit color azul",150,1,"media/widefit.webp");

productos.push(jeanSlimfit, jeanRegularfit, jeanWidefit)

// Creacion de contenedores principales 

const cardConntenedor = document.getElementById("card-contenedor")
const facturaConntenedor = document.getElementById("factura-contenedor")

// se crean un algoritmo para mostrar los productos y un event listener con click sobre el boton agregar. 

productos.forEach((producto) => {
    const mostrarProductos = document.createElement("div")
    mostrarProductos.classList.add("card")
    mostrarProductos.innerHTML = `
        <h3 class="card-titulo">${producto.titulo}</h3>
        <img class="card-img" src=${producto.img} alt="" />
        <p class="card-descripcion">${producto.descripcion}</p>
        <p class="card-precio">$ ${producto.precio}</p>
        <button id="${producto.id}" class="btn-card">Agregar</button>
    `
    cardConntenedor.appendChild(mostrarProductos)

    const agregar = document.getElementById(producto.id)

    agregar.addEventListener("click", () => {
    agregarCarrito(producto.id)
    })
})

// se crea una funcion para agregar los productos al carrito y evitar duplicados. 

const agregarCarrito = (productoId) => {
    let productoSeleccionado = productos.find((p) => p.id === productoId)
    if (carrito.find((p)=> p.id === productoSeleccionado.id)){
        productoSeleccionado.cart = productoSeleccionado.cart + 1
        totalCompra = totalCompra + productoSeleccionado.precio
        actualizar()
    } else {
        carrito.push(productoSeleccionado)
        totalCompra = totalCompra + productoSeleccionado.precio
        actualizar()
    }
}

// se crea una funcion para mostrar los productos seleccionados con las cantidades y evitar que se repitan cada vez que se agrega un nuevo producto. 

const actualizar = () => {
    facturaConntenedor.innerHTML = ""
    const articulosCarrito = document.createElement("h2")
    articulosCarrito.classList.add("titulos-seccion")
    articulosCarrito.innerHTML = `Articulos Seleccionados`
    facturaConntenedor.appendChild(articulosCarrito)
    carrito.forEach((producto) => {
        const div = document.createElement("div")
        div.classList.add("factura")
        div.innerHTML = `
            <h3 class="factura-titulo padd-min">${producto.titulo}</h3>
            <p id="contador" class="txt-center"> Cantidad: ${producto.cart}</p>
            <p class="txt-center">Precio: $ ${producto.precio}</p>
            `
        facturaConntenedor.appendChild(div)
    })

    // se calcula y muestra el total de la compra. 

    let impuestos = totalCompra * 0.19
    let envio = Math.floor(Math.random()*20)
    let granTotal = totalCompra + impuestos + envio
    const divtotal = document.createElement("div")
    divtotal.classList.add("total")
    divtotal.innerHTML = `
    <section class="total">
    <h2 class="titulos-seccion"> Total Compra </h2>
    <p class="txt-center padd-min"> Compra total: $ ${totalCompra} USD </p>
    <p class="txt-center padd-min"> Impuestos: $ ${impuestos} USD </p>
    <p class="txt-center padd-min"> Envio: $ ${envio} USD </p>
    <p class="txt-center padd-min bold"> Total a Pagar: $ ${granTotal} USD </p>
    </section>
    `
    facturaConntenedor.appendChild(divtotal)
}
