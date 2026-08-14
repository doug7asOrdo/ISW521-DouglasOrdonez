/**
 * MODULE PATTERN (clásico)
 * ------------------------
 * Usa una IIFE (Immediately Invoked Function Expression) para crear
 * un scope propio. Todo lo declarado dentro es PRIVADO por defecto;
 * solo lo que se devuelve explícitamente en el "return" es PÚBLICO.
 *
 * Esto simula encapsulamiento en JavaScript (antes de que existieran
 * las clases con # privados o los módulos ES6).
 */

const CarritoDeCompras = (function () {
  // ---------- Estado privado ----------
  let items = [];
  let total = 0;

  // ---------- Funciones privadas ----------
  function calcularTotal() {
    total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    return total;
  }

  function validarItem(item) {
    return item && typeof item.precio === "number" && item.precio > 0;
  }

  // ---------- API pública ----------
  return {
    agregarItem(nombre, precio, cantidad = 1) {
      const item = { nombre, precio, cantidad };
      if (!validarItem(item)) {
        console.warn("Item inválido:", item);
        return;
      }
      items.push(item);
      calcularTotal();
    },

    eliminarItem(nombre) {
      items = items.filter((item) => item.nombre !== nombre);
      calcularTotal();
    },

    obtenerTotal() {
      return total;
    },

    listarItems() {
      // Devolvemos una copia para no exponer el arreglo privado
      return [...items];
    },
  };
})();

// ---------- Uso del módulo ----------
CarritoDeCompras.agregarItem("Teclado", 45, 1);
CarritoDeCompras.agregarItem("Mouse", 20, 2);

console.log(CarritoDeCompras.listarItems());
console.log("Total:", CarritoDeCompras.obtenerTotal());

// Intento de acceso directo al estado privado: no es posible
console.log(CarritoDeCompras.items); // undefined -> encapsulado correctamente
