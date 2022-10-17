import Cliente from '../models/Cliente.js';

//? lista todos los clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();

        if (!clientes.length) {
            return res.status(200).json({ msg: 'No hay clientes aun' });
        }
        return res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
    }
};

//? obtener un cliente por su Id
const obtenerCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            const error = new Error('Cliente no encontrado');
            return res.status(404).json({ msg: error.message });
        }

        return res.status(200).json(cliente);
    } catch (error) {
        console.log(error);
    }
};

//? almacena un nuevo cliente
const nuevoCliente = async (req, res) => {
    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const cliente = new Cliente(req.body);

        //? guardando el cliente en la base de datos
        const clienteAlmacenado = await cliente.save();

        return res.status(200).json(clienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

//? editar un cliente
const editarCliente = async (req, res) => {
    const { id } = req.params;

    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }
    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            const error = new Error('Cliente no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        //? actualizando los datos
        const clienteActualizado = await cliente.update({
            nombre_cliente: req['body']['nombre_cliente'],
            apellido_cliente: req['body']['apellido_cliente'],
            identidad_cliente: req['body']['identidad_cliente'],
            edad: req['body']['edad'],
            telefono_cliente: req['body']['telefono_cliente'],
            correo_cliente: req['body']['correo_cliente'],
            direccion_cliente: req['body']['direccion_cliente'],
        });

        return res.status(200).json(clienteActualizado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            const error = new Error('Cliente no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        //? eliminar cliente
        const clienteEliminado = await cliente.destroy();

        return res.status(200).json(clienteEliminado);
    } catch (error) {
        console.log(error);
    }
};

export {
    listarClientes,
    obtenerCliente,
    nuevoCliente,
    editarCliente,
    eliminarCliente,
};
