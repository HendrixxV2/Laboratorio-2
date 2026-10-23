import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Cliente Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Cliente n8n (Axios)
const n8nClient = axios.create({
  baseURL: process.env.N8N_WEBHOOK_URL,
  headers: { 'Content-Type': 'application/json' }
});

// --- RUTAS ---

// 1. Obtener Inventario (Lectura directa a Supabase para mayor velocidad en el Dashboard)
app.get('/api/insumos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('insumos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Procesar Venta (Envía la acción a n8n)
app.post('/api/venta', async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const response = await n8nClient.post('', {
      accion: 'procesar_venta',
      productoId,
      cantidad
    });
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      // Si n8n devuelve 409 (Sin stock), lo propagamos
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Error conectando con n8n' });
    }
  }
});

// 3. Análisis de IA (Envía la acción a n8n)
app.post('/api/analisis-ia', async (req, res) => {
  try {
    const response = await n8nClient.post('', {
      accion: 'analisis_ia_stock'
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo análisis de IA' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`☕ Servidor Backend corriendo en http://localhost:${PORT}`);
});