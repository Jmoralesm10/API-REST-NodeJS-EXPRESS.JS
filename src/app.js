import express from "express";
import cors from "cors"; // Importa el middleware cors
import personalRoutes from './routes/Personal.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

// Configura el middleware CORS antes de las rutas
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.json());

app.use(indexRoutes);
app.use('/api', personalRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'EndPoint no encontrado'
    });
});

export default app;
