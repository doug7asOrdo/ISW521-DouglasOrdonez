# HTTP/2 — El protocolo que transformó la web moderna

**Curso:** Programación en Ambiente Web  
**Universidad:** Universidad Técnica Nacional (UTN)

---

## Descripción 

HTTP/2 (RFC 7540, 2015) es la segunda versión del protocolo de transferencia de hipertexto. Resuelve las limitaciones estructurales de HTTP/1.1 mediante cuatro mecanismos centrales:

- **Binary Framing:** divide los mensajes en frames binarios identificados con un Stream ID, reemplazando el formato de texto plano.
- **Multiplexing:** permite múltiples streams simultáneos sobre una sola conexión TCP, eliminando el Head-of-Line Blocking a nivel HTTP.
- **HPACK:** compresión de headers mediante tabla estática (61 entradas predefinidas), tabla dinámica y codificación Huffman — reduce hasta ~30% el overhead repetitivo.
- **Server Push:** el servidor puede enviar recursos al cliente antes de que este los solicite.

HTTP/2 no modifica la semántica HTTP: métodos, status codes y headers son idénticos a HTTP/1.1. Solo cambia la capa de transporte.

---

## Demostración práctica

La demo utiliza el sitio [campus.utn.ac.cr](https://campus.utn.ac.cr) y las DevTools de Chrome para observar HTTP/2 en funcionamiento real.

### Requisitos

- Google Chrome (cualquier versión reciente)
- Conexión a internet

### Pasos para ejecutar la demo

1. **Abrir el sitio y las DevTools**  
   Ingresar a `https://campus.utn.ac.cr` en Chrome. Presionar `F12` para abrir DevTools y dirigirse a la pestaña **Network**. Recargar la página con `Ctrl+Shift+R`.

2. **Activar la columna Protocol**  
   Hacer click derecho sobre la cabecera de columnas del panel Network - activar **Preserve log** y **"Protocol"**. Cada recurso ahora muestra `h2` o `http/1.1`.

3. **Verificar h2 en los recursos**  
   Confirmar que los recursos principales (JS, CSS, imágenes) aparecen como `h2`. Si alguno muestra `http/1.1`, ese recurso proviene de un servidor externo que no tiene HTTP/2 habilitado.

4. **Inspeccionar pseudo-headers**  
   Hacer click en cualquier recurso `h2` - pestaña **Headers**. Los pseudo-headers de HTTP/2 aparecen en minúsculas: `:method`, `:path`, `:scheme`, `:authority`. Estos son evidencia del formato binario del protocolo.

5. **Ver el multiplexing en el Waterfall**  
   Activar la vista **Waterfall** en el panel Network. Observá cómo múltiples recursos se descargan en paralelo sobre una sola conexión TCP — eso es el multiplexing de HTTP/2 en acción.

6. **Simular red lenta con Throttling**  
   En Network, desplegá **"No throttling"** - seleccioná **Slow 3G**. Recargá la página. El multiplexing sigue activo: todos los recursos bajan en paralelo incluso con alta latencia, a diferencia de HTTP/1.1.

---

## Integrantes

Nombre     
-
Douglas Ordoñez  
Alejandro Gómez  
Justin Castillo  