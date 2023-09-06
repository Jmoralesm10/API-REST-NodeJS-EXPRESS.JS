import {pool} from '../db.js';

//Mostrar todos los empleados
export const getpersonal = async (req, res) => {
const [rows] = await pool.query('SELECT * FROM personal')
res.json(rows)
};

//Mostrar empleado por id
export const getpersona = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM personal where id_personal = ?', [req.params.id])

    if (rows.length <= 0) return res.status(404).json({
        message: 'El empleado no existe'
    })

    res.json(rows[0])
};

//Crear empleado
export const postpersonal = async (req, res) => 
{
const {Nombres, Apellidos, Direccion, Telefono, Puesto, Fecha_Contratacion, Salario} = req.body
const [rows] = await pool.query('INSERT INTO personal (Nombres,Apellidos,Direccion,Telefono,Puesto,fecha_contratacion,Salario) values (?,?,?,?,?,?,?)',[Nombres, Apellidos, Direccion, Telefono, Puesto, Fecha_Contratacion, Salario])
res.send({id: rows.insertId,
        Nombres, 
        Apellidos, 
        Direccion, 
        Telefono, 
        Puesto, 
        Fecha_Contratacion, 
        Salario})
};

//Actualizar empleado
export const putpersonal = (req, res) => {

}

//Eliminar Empleado
export const deletetpersonal = async (req, res) => {
    const [result] = await pool.query('DELETE FROM personal where id_personal = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'El empleado no existe'
    })

    res.sendStatus(204)
}