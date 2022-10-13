export const listarClientes = (req, res) => {
    const clientes = [
        {
            id: 1,
            nombre: 'jose carlos',
        },
        {
            id: 2,
            nombre: 'antonira',
        },
        {
            id: 3,
            nombre: 'jhonatan',
        },
        {
            id: 4,
            nombre: 'sandra',
        },
    ];

    //? respuesta
    res.status(200).json(clientes);
};
