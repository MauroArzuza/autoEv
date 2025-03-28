const readline = require("readline");
const yargs = require("yargs");
const fs = require("fs");

const argv = yargs.option("file", {
  alias: "f",
  describe: "Nombre del archivo JSON donde se guardarán los datos",
  type: "string",
  demandOption: true,
  default: "productos.json",
}).argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const preguntar = (pregunta) => {
  return new Promise((resolve) =>
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    })
  );
};

const leerArchivoJSON = (archivo) => {
  try {
    if (fs.existsSync(archivo)) {
      const data = fs.readFileSync(archivo, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error al leer el archivo:", error);
  }
  return { productos: [] }; // Si no existe o hay error, devuelve estructura vacía
};

const main = async () => {
  try {
    const producto = await preguntar("Ingresa el producto: \n");
    const precio = await preguntar("Ingresa el precio: \n");
    const cantidad = await preguntar("Ingresa la cantidad: \n");

    const datos = {
      producto,
      precio,
      cantidad,
    };

    let data = leerArchivoJSON(argv.file);

    data.productos.push(nuevoProducto);

    fs.writeFileSync(argv.file, JSON.stringify(datos, null, 2));

    console.log("----------DATOS CARGADOS-----------");
  } catch (err) {
    console.error("Ocurrió un error:", err);
  } finally {
    rl.close();
  }
};

main();
