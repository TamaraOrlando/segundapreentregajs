
// Definimos variable global y le damos la bienvenida al usuario
let colocarEdad = prompt("Hola, bienvenido/a a Tasty Vape Liquids. Por favor, ingrese su edad para poder acceder al sitio:");

// Función para verificar la edad del usuario
function verificarEdad() {
    let edad = parseInt(colocarEdad);

    while (isNaN(edad) || edad < 18) {
        if (isNaN(edad)) {
            alert("Número inválido. Por favor, ingrese un número válido para su edad.");
        } else {
            alert("Lo siento, usted es menor de edad, no puede ingresar. Llame a un adulto e inténtelo nuevamente.");
        }
        // Si el usuario coloca un número inválido o es menor a 18 años, se repite el ciclo
        colocarEdad = prompt("Por favor, ingrese su edad nuevamente para poder acceder al sitio:");
        edad = parseInt(colocarEdad);
    }
    alert("Bienvenido/a, puede acceder al sitio. Presione aceptar para continuar.");
}

// Llamamos a la función verificarEdad
verificarEdad();

// Función para pedir el nombre al usuario
function obtenerNombreUsuario() {
    let nombreIngresado = prompt("Por favor, ingrese su nombre para brindarle una mejor atención:");

    // Validamos el nombre ingresado
    while (nombreIngresado === null || !isNaN(parseFloat(nombreIngresado)) || nombreIngresado.trim().length < 3) {
        if (nombreIngresado === null) {
            nombreIngresado = prompt("El nombre ingresado no es válido. Por favor, ingrese su nombre completo nuevamente:");
        }
        else if (!isNaN(parseFloat(nombreIngresado))) {
            nombreIngresado = prompt("El nombre ingresado no es válido. No utilice números. Por favor, ingrese su nombre completo nuevamente:");
        }
        else {
            nombreIngresado = prompt("El nombre " + nombreIngresado + " es demasiado corto. Por favor, ingrese su nombre completo nuevamente:");
        }
    }

    // Mostramos mensaje de bienvenida con el nombre ingresado
    alert("Bienvenido/a " + nombreIngresado + " a ¡Tasty Vape Liquids! Presione aceptar para continuar.");

    // Devolvemos el nombre ingresado para su uso posterior
    return nombreIngresado;
}

// Llamamos a la función para obtener el nombre del usuario y guardarlo en una variable
let nombreUsuario = obtenerNombreUsuario();


// Definimos la clase Producto para representar los productos disponibles
class Producto {
    constructor(nombre, sabores, precios) {
        this.nombre = nombre;
        this.sabores = sabores;
        this.precios = precios;
    }
}

// Creamos instancias de productos y los almacenamos en el array opciones
const opciones = [
    new Producto("Frutales y cool", ["Menta", "Melón", "Frutilla"], [4499.99, 8999.99].map(precio => Math.ceil(precio))),
    new Producto("Tabaquiles y bebidas alcohólicas", ["Tabaco", "Bayley's"], [4499.99, 8999.99].map(precio => Math.ceil(precio))),
    new Producto("Postres", ["Lemon Pie", "Milk Oreo"], [4499.99, 8999.99].map(precio => Math.ceil(precio))),
];


// Inicializamos variable para el carrito
let carrito = [];

// Función que muestra las opciones disponibles para elegir
function mostrarOpciones() {
    let opcionesTexto = "Contamos con los sabores más ricos para su vapeo. Las opciones disponibles son:\n";
    for (const index in opciones) {
        opcionesTexto += `${parseInt(index) + 1} - ${opciones[index].nombre}\n`;
    }
    return opcionesTexto;
}

// Función para que el usuario elija una opción, sabor y presentación
function elegirOpcionYSabor() {
    let opcionIndex;
    do {
        opcionIndex = parseInt(prompt(mostrarOpciones() + "Elija la opción, en números, de la categoría a la que quiere acceder (1, 2 o 3):")) - 1;
    } while (isNaN(opcionIndex) || opcionIndex < 0 || opcionIndex >= opciones.length);

    let saborIndex;
    do {
        saborIndex = parseInt(prompt(`Elija el sabor ingresando el número correspondiente (1, 2 o 3):\n${opciones[opcionIndex].sabores.map((sabor, index) => `${index + 1} - ${sabor}`).join("\n")}\n`)) - 1;
    } while (isNaN(saborIndex) || saborIndex < 0 || saborIndex >= opciones[opcionIndex].sabores.length);

    let presentacionIndex;
    do {
        presentacionIndex = parseInt(prompt("Elija la presentación ingresando el número correspondiente (1 o 2):\n1 - Botella de 30ml - $4500\n2 - Botella de 60ml - $9000")) - 1;
    } while (isNaN(presentacionIndex) || presentacionIndex < 0 || presentacionIndex > 1);

    const nuevoProducto = {
        opcion: opciones[opcionIndex].nombre,
        sabor: opciones[opcionIndex].sabores[saborIndex],
        presentacion: presentacionIndex === 0 ? "30ml" : "60ml",
        precio: opciones[opcionIndex].precios[presentacionIndex],
    };
    carrito.push(nuevoProducto);
    return carrito;
}

// Función para eliminar un producto del carrito
function eliminarProducto() {
    if (carrito.length === 0) {
        alert("Usted no posee productos en el carrito.");
        return;
    }

    let productoAEliminar;
    do {
        productoAEliminar = parseInt(prompt(`Ingrese el número del producto que desea eliminar:\n${listarProductosCarrito()}`));
        if (!isNaN(productoAEliminar) && productoAEliminar >= 1 && productoAEliminar <= carrito.length) {
            carrito.splice(productoAEliminar - 1, 1);
            alert("Producto eliminado del carrito.");
            break; 
        } else {
            alert("Por favor, ingrese un número válido.");
        }
    } while (true);
}

function listarProductosCarrito() {
    let lista = "";
    let contador = 1;
    for (const producto of carrito) {
        lista += `${contador}. ${producto.opcion} - ${producto.sabor} - ${producto.presentacion} - $${producto.precio}\n`;
        contador++;
    }
    return lista;
}


// Función para buscar un producto por su nombre
function buscarProductoPorNombre() {
    let productoEncontrado;
    let nombre;

    do {
        nombre = prompt("Ingrese el nombre del producto que desea buscar. Utilice palabras como: 'Frutales', 'Tabaquiles', 'Bebidas' o 'Postres'. Pulse cancelar si desea volver al menú principal.");
        
        if (nombre === null) {
            mostrarMenuPrincipal();
            return null;
        }

        nombre = nombre.toLowerCase().trim();

        if (nombre !== "") {
            // Busca el producto por nombre o por palabras clave
            productoEncontrado = opciones.find(producto =>
                producto.nombre.toLowerCase() === nombre ||
                ((nombre === "fruta" || nombre === "frutal" || nombre === "frutales") && producto.nombre.toLowerCase().includes("frutales y cool")) ||
                ((nombre === "tabaco" || nombre === "tabaquil" || nombre === "tabaquiles" || nombre === "bebida" || nombre === "bebidas" || nombre === "alcohol") && producto.nombre.toLowerCase().includes("tabaquiles y bebidas alcohólicas")) ||
                ((nombre === "dulce" || nombre === "dulces" || nombre === "postre" || nombre === "postres") && producto.nombre.toLowerCase().includes("postres"))
            );

            if (!productoEncontrado) {
                alert("No se encontró ningún producto con ese nombre. Por favor, intente nuevamente utilizando palabras como: 'Frutales', 'Tabaquiles', 'Bebidas' o 'Postres'.");
            }
        }
    } while (!productoEncontrado);

    return productoEncontrado;
}


// Función para filtrar productos por categoría y precio
function filtrarProductosPorCategoria(categoria, filtroPrecio) {

    // Filtra productos por categoría
    let productosFiltrados = opciones.filter(producto =>
        producto.nombre.toLowerCase().includes(categoria.toLowerCase())
    );

    // Filtra productos por precio
    let productosFiltradosPorPrecio = productosFiltrados.map(producto => {
        let preciosFiltrados = producto.precios.filter(precio => precio <= filtroPrecio);

        if (preciosFiltrados.length > 0) {
            let preciosConPresentacion = preciosFiltrados.map(precio => `${precio} - frasco de ${precio >= 9000 ? 60 : 30}ml`);

            if (filtroPrecio >= 9000 && !preciosFiltrados.some(precio => precio < 9000)) {
                preciosConPresentacion.unshift(`4500 - frasco de 30ml`);
            }

            return {
                ...producto,
                precios: preciosConPresentacion
            };
        } else {
            return null;
        }
    });

    let productosFiltradosFinal = productosFiltradosPorPrecio.filter(Boolean);

    return productosFiltradosFinal;
}


// Función para solicitar un comentario al usuario
function solicitarComentario() {
    let comentario;
    do {
        comentario = prompt("Antes de seguir navegando por el sitio, le pedimos que nos deje un comentario acerca de los sabores que le gustaría que incorporáramos a nuestros productos.\nEjemplo: sabor Flan, sabor Ananá, etc.");
        if (comentario && comentario.trim() !== "") {
            if (!isNaN(comentario) || comentario.length < 3) {
                alert("El comentario debe tener al menos 3 letras y no debe contener números. Por favor, inténtelo de nuevo.");
            } else {
                break;
            }
        } else {
            alert("Por favor, ingrese un comentario válido.");
        }
    } while (true);
}


// Declaramos variable para finalizar la ejecución del código
let irAlSitioYFinalizar = false;


// Función principal que muestra el menú y gestiona las opciones
function mostrarMenuPrincipal() {
    do {
        if (irAlSitioYFinalizar) {
            return false;
        }

        let montoTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
        let opcion = prompt(`Monto total hasta el momento: $${montoTotal}.\n¿Qué desea hacer? Ingrese el número correspondiente a la acción que desea realizar (1, 2 , 3, 4, 5 o 6):\n1. Agregar productos\n2. Eliminar productos\n3. Buscar producto por nombre\n4. Filtrar productos por categoría\n5. Ir al carrito\n6. Ir al sitio`);

        switch (opcion) {
            case "1":
                elegirOpcionYSabor();
                break;

            case "2":
                eliminarProducto();
                break;

            case "3":
                let productoEncontrado = buscarProductoPorNombre();

                if (productoEncontrado === null) {
                } else {
                    alert(`Producto encontrado:\nNombre: ${productoEncontrado.nombre}, Sabores: ${productoEncontrado.sabores.join(", ")}, Precios: $${productoEncontrado.precios.join(", ")}`);
                }
                break;

            case "4":
                let categoriaProducto;
                let continuar = true; 
                do {
                    categoriaProducto = prompt("Ingrese la categoría del producto que desea filtrar, utilizando palabras como 'Frutales y cool', 'Tabaquiles y bebidas alcoholicas' o 'Postres'. Pulse cancelar si desea volver al menú principal.");
                    if (categoriaProducto === null) {
                        mostrarMenuPrincipal(); 
                        return;
                    }
                    categoriaProducto = categoriaProducto.trim().toLowerCase();
                    if (!["frutales y cool", "tabaquiles y bebidas alcoholicas", "postres"].includes(categoriaProducto)) {
                        alert("Por favor, utilice palabras como 'Frutales y cool', 'Tabaquiles y bebidas alcoholicas' o 'Postres'.");
                    } else {
                        continuar = false;
                    }
                } while (continuar);

                let filtroPrecio;
                do {
                    filtroPrecio = parseInt(prompt("Ingrese el precio máximo que desea aplicar como filtro, utilizando sólo números:"));
                    if (filtroPrecio === null) {
                        mostrarMenuPrincipal(); 
                        return;
                    }
                    if (isNaN(filtroPrecio)) {
                        alert("Por favor, ingrese un número válido para el precio máximo.");
                    } else if (filtroPrecio < 4500) {
                        alert("El monto mínimo es de $4500. Por favor, vuelva a ingresar el precio máximo.");
                    }
                } while (isNaN(filtroPrecio) || filtroPrecio < 4500);

                let productosFiltrados = filtrarProductosPorCategoria(categoriaProducto, filtroPrecio);

                if (productosFiltrados.length > 0) {
                    let mensaje = "Productos encontrados:\n";
                    productosFiltrados.forEach(producto => {
                        let preciosConPresentacion = producto.precios.join(", ");
                        mensaje += `Nombre: ${producto.nombre}, Sabores: ${producto.sabores.join(", ")}, Precios: $${preciosConPresentacion}\n`;
                    });
                    alert(mensaje);
                } else {
                    alert("No se encontraron productos que cumplan con los criterios de filtrado.");
                }
                break;

            case "5":
                if (montoTotal === 0) {
                    alert("Usted no posee productos en el carrito. Pulse aceptar para volver al menú principal.");
                    continue; 
                } else {
                    let opcionesElegidas = carrito.map((producto) => `${producto.opcion} - ${producto.sabor} - ${producto.presentacion} - $${producto.precio}`).join('\n');
                    const confirmacionCompra = confirm(`Opciones elegidas:\n${opcionesElegidas}\n\nEl monto total de su carrito es: $${montoTotal}.\n¿Desea comprar el carrito? Pulse aceptar para acceder al sitio y finalizar su compra, o cancelar para volver al menú principal.`);
                    if (confirmacionCompra) {
                        irAlSitioYFinalizar = true;
                        irAlSitio();
                        solicitarComentario();
                        return false; 
                    }
                }
                break;

            case "6":
                irAlSitioYFinalizar = true;
                irAlSitio();
                solicitarComentario();
                return false;

            default:
                alert("Por favor, seleccione una opción válida.");
                break;
        }
        
    } while (true);
}


// Función que muestra un mensaje y redirecciona al sitio web
function irAlSitio() {
    alert("Lo redireccionaremos al sitio web. ¡Qué disfrute nuestro contenido!");
}

// Función principal que inicia el programa
function main() {
    let primeraCompra = true;
    let continuarEjecucion = true;

    // Bucle principal que permite realizar acciones en el carrito
    while (continuarEjecucion) {
        if (!primeraCompra) {
            carrito = [];
        }

        elegirOpcionYSabor();
        continuarEjecucion = mostrarMenuPrincipal();
        primeraCompra = false;
    }

    alert(`¡Gracias ${nombreUsuario}! Lo tendremos en cuenta.`);
}

// Llamamos a la función principal para iniciar el programa
main();
