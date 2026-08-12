import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all stakeholders
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM stakeholders ORDER BY created_at DESC');
        
        // Map access_level to access to match frontend expectations
        const formattedRows = rows.map(row => ({
            ...row,
            access: row.access_level
        }));
        
        res.json(formattedRows);
    } catch (error) {
        console.error('Error fetching stakeholders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST new stakeholder
router.post('/', async (req, res) => {
    try {
        const { name, role, department, email, access, avatar } = req.body;
        
        // Basic validation
        if (!name || !role || !email) {
            return res.status(400).json({ error: 'Name, role, and email are required' });
        }

        const query = `
            INSERT INTO stakeholders (name, role, department, email, access_level, avatar)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        // Default avatar logic if not provided
        const finalAvatar = avatar || name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const finalDept = department || 'General';
        
        const [result] = await db.query(query, [name, role, finalDept, email, access, finalAvatar]);
        
        res.status(201).json({ 
            id: result.insertId,
            name, 
            role, 
            dept: finalDept, 
            email, 
            access, 
            avatar: finalAvatar 
        });
    } catch (error) {
        console.error('Error adding stakeholder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
