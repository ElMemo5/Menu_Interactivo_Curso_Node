const { v4 : uudiv4} = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    //se va ejecutar cuando creamos una nueva instancia en nuestra tarea
    constructor ( desc ) {

        this.id = uudiv4();
        this.desc = desc;
        this.completadoEn = null

    }


}

module.exports = Tarea;