import jwt from 'jsonwebtoken'

export const autenticar = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' })

    try {
        const decoded = jwt.verify(token, process.env.SEGREDO_JWT)
        req.usuarioId = decoded.id
        next()
    } catch {
        res.status(401).json({ mensagem: 'Token inválido' })
    }
}
