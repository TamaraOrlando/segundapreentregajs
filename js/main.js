
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
            const precioEliminado = carrito[productoAEliminar - 1].precio;
            carrito.splice(productoAEliminar - 1, 1);
            alert("Producto eliminado del carrito.");
            break; // Sale del bucle al eliminar el producto
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

// Función principal que muestra el menú y gestiona las opciones
function mostrarMenuPrincipal() {
    do {
        let montoTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
        let opcion = prompt(`Monto total hasta el momento: $${montoTotal}.\n¿Qué desea hacer? Ingrese el número correspondiente a la acción que desea realizar (1, 2 , 3 o 4):\n1. Agregar productos\n2. Eliminar productos\n3. Ir al carrito\n4. Ir al sitio`);

        switch (opcion) {
            case "1":
                elegirOpcionYSabor();
                break;
            case "2":
                eliminarProducto();
                break;
            case "3":
                if (montoTotal === 0) {
                    alert("Usted no posee productos en el carrito. Pulse aceptar para volver al menú principal.");
                    continue; // Vuelve al inicio del bucle do-while

                } else {
                    let opcionesElegidas = carrito.map((producto) => `${producto.opcion} - ${producto.sabor} - ${producto.presentacion} - $${producto.precio}`).join('\n');
                    const confirmacionCompra = confirm(`Opciones elegidas:\n${opcionesElegidas}\n\nEl monto total de su carrito es: $${montoTotal}.\n¿Desea comprar el carrito? Pulse aceptar para acceder al sitio y finalizar su compra, o cancelar para volver al menú principal.`);
                    if (confirmacionCompra) {
                        irAlSitio();
                        return false; // Detiene la ejecución de main
                    }
                }
                break;
            case "4":
                irAlSitio();
                return false; // Detiene la ejecución de main
            default:
                alert("Por favor, seleccione una opción válida.");
                break;
        }
        // Verifica condición de salida del bucle
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

    // Prompt para pedir comentario al usuario
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

    // Después de este alert, se interrumpe la ejecución de código
    alert(`¡Gracias ${nombreUsuario}! Lo tendremos en cuenta.`);
}

// Llamamos a la función principal para iniciar el programa
main();
