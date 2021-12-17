const Tarea = require('./tarea');

 class Tareas {

    //{ 'uuid-1234567-2: {id:12, desc: asd, completadoEN} }
    _listado = {};

    get listaArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor() {
        this._listado = {}; 
    }

    borrarTarea( id = '' ) {
        if (this._listado[id]) {
            delete this._listado[id];
        }


    }

    crearTareasFromArray( tareas = []) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea ( desc = '') { 

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() { 
        console.log();
        this.listaArr.forEach( (tarea, i) => {
            
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendienYComple( completadas = true) {
        console.log();
        let cont = 0;
        this.listaArr.forEach( (tarea) => {
            
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            : 'Pendiente'.red;
            if ( completadas){                
                if ( completadoEn ) {
                    cont += 1;
                    console.log(`${(cont + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if ( !completadoEn ) {
                    cont += 1;
                    console.log(`${(cont + '.').red} ${desc} :: ${completadoEn}`);
                }
            }
        });
    }

    toggleComple ( ids = []) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toString()
            }
        });

        this.listaArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
 }

 module.exports = Tareas;