import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tabletek'
}).promise();

// GET /tablet
app.get('/tablet', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tablet');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// GET /tablet/:id
app.get('/tablet/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [rows] = await db.query('SELECT * FROM tablet WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Tablet not found" });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /tablet
app.post('/tablet', async (req, res) => {
    let tabletData = [req.body.Brand, req.body.Model, req.body.Price, req.body.RAM, req.body.Memory, req.body.Weight]

    try {
        const [result] = await db.query('INSERT INTO tablet (Brand, Model, Price, RAM, Memory, Weight) VALUES (?, ?, ?, ?, ?, ?)', tabletData);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE /tablet/:id
app.delete('/tablet/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [result] = await db.query('DELETE FROM tablet WHERE Id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tablet not found" });
        res.status(200).json({ message: "Tablet successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT /tablet/:id
app.put('/tablet/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { Brand, Model, Price, RAM, Memory, Weight } = req.body;
    try {
        const [result] = await db.query('UPDATE tablet SET Brand = ?, Model = ?, Price = ?, RAM = ?, Memory = ?, Weight = ? WHERE Id = ?', [Brand, Model, Price, RAM, Memory, Weight, id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tablet not found" });
        res.status(200).json({ message: "Tablet successfully updated" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// lapozas
app.get('/tabletlapozas', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {        
        const countResult = await db.query('SELECT COUNT(*) as total FROM tablet');
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM tablet LIMIT ? OFFSET ?', [limit, offset]);
        const rows = temp[0];
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(`Error retrieving tablet ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});