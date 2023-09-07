import { pool } from '../db.js';

//Mostrar todos los empleados
export const getpersonal = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM personal')
    res.json(rows)
};

//Mostrar empleado por id
export const getpersona = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM personal where id_personal = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'El empleado no existe'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ Message: 'Algo salio mal!' })
    }
};

//Crear empleado
export const postpersonal = async (req, res) => {
    try {
        const { Nombres, Apellidos, Direccion, Telefono, Puesto, Fecha_Contratacion, Salario } = req.body
        const [rows] = await pool.query('INSERT INTO personal (Nombres,Apellidos,Direccion,Telefono,Puesto,fecha_contratacion,Salario) values (?,?,?,?,?,?,?)', [Nombres, Apellidos, Direccion, Telefono, Puesto, Fecha_Contratacion, Salario])
        res.send({
            id: rows.insertId,
            Nombres,
            Apellidos,
            Direccion,
            Telefono,
            Puesto,
            Fecha_Contratacion,
            Salario
        })
    } catch (error) {
        return res.status(500).json({ Message: 'Algo salio mal!' })
    }
};

//Actualizar empleado
export const putpersonal = async (req, res) => {
    try {
        const { id } = req.params
        const { Nombres, Apellidos, Direccion, Telefono, Puesto, Salario } = req.body
        const [result] = await pool.query('UPDATE personal SET Nombres = ?, Apellidos = ?, Direccion = ?, Telefono = ?, Puesto = ?, Salario = ? WHERE id_personal = ?', [Nombres, Apellidos, Direccion, Telefono, Puesto, Salario, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Registro no actualizado'
        })

        const [rows] = await pool.query('SELECT * FROM personal where id_personal = ?', [req.params.id])
        res.send(rows[0])
    }
    catch (error) {
        return res.status(500).json({ Message: 'Algo salio mal!' })
    }

}

//Despedir empleado
export const patchpersonal = async (req, res) => {
    try {
        const { id } = req.params
        const { Fecha_despido } = req.body
        const [result] = await pool.query('UPDATE personal SET Fecha_despido = ? WHERE id_personal = ?', [Fecha_despido, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Registro no actualizado'
        })

        const [rows] = await pool.query('SELECT * FROM personal where id_personal = ?', [req.params.id])
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({ Message: 'Algo salio mal!' })
    }

}

//Eliminar Empleado
export const deletetpersonal = async (req, res) => {

    try {
        const [result] = await pool.query('DELETE FROM personal where id_personal = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'El empleado no existe'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ Message: 'Algo salio mal!' })
    }
}