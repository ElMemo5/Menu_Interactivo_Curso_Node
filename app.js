require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArch');
//const { mostrarMenu, pausa } = require('./helpers/mensajes'); //Menu Manual
const { inquirerMenu, 
        pausa,
        leerInput,
        listTareasBorrar,
        confirmar,
        listCheckList 
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if ( tareasDB ) {
        //Establecer las tareas
        //TODO: cargarTareas
        tareas.crearTareasFromArray( tareasDB);
    }
    do {
        //Imprime el menu
        opt = await inquirerMenu();
        //console.log({opt});
        //Entra a las funciones del Menu
        switch (opt) {
            case '1':
                //Crea la tarea
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea ( desc );
                
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendienYComple(true);
            break;

            case '4':
                tareas.listarPendienYComple(false);
            break;
            
            case '5':
                const ids = await listCheckList(tareas.listaArr);
                tareas.toggleComple( ids );
                //console.log(ids);
            break;
            
            case '6':
                const id = await listTareasBorrar( tareas.listaArr );
                if ( id !== '0') {
                    const ok = await confirmar('Estas seguro??');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea Borrada');                     
                    }                    
                }                
            break;
        }

        guardarDB(tareas.listaArr);

        //if (opt !=='0') await pausa(); Solo nos sirve en el menu manual
        await pausa();

    } while( opt !== '0');
}

main();


//Manejo de tareas
/*const tarea = new Tarea('Comprar comida');
        const tareas = new Tareas();
        tareas._listado[tarea.id] = tarea;
        console.log(tareas);
        //console.log(tarea);*/