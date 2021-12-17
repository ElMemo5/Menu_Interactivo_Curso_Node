//Menu interactivo con Inquirer

const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.red} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.red} Listar Tareas Completas`
            },
            {
                value: '4',
                name: `${'4.'.red} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.red} Completar Tareas`
            },
            {
                value: '6',
                name: `${'6.'.red} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${ 'Enter'.red} para continuar\n`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listTareasBorrar = async ( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i +1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.red + 'Salir'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices //madamos choises a la constante {id}
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const listCheckList = async ( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i +1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked : (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices //madamos choises a la constante {id}
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listTareasBorrar,
    confirmar,
    listCheckList
}