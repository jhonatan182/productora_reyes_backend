export const listarClientes = (req, res) => {
    if (Object.keys(req.boby).includes('')) {
        return res.json({ msg: 'Todos los campos son obligatorios' });
    }
};
