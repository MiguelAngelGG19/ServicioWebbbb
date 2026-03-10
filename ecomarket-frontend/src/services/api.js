// En un código limpio, el componente solo dice "traeme los datos", no le importa si es axios o fetch
const datos = await obtenerProductosService(); 
setProductos(datos);