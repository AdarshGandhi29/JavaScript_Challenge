'use strict';

const express = require('express');
const { users: startingUsers } = require('./arrayTasks');

const app = express();
app.use(express.json());

// quick log middleware
app.use((req, res, next) => {
    const t0 = Date.now();
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} in ${Date.now() - t0}ms`);
    });
    next();
});

let users = startingUsers.map(u => ({ ...u })); 
let nextId = Math.max(...users.map(u => u.id)) + 1;

// validate incoming user data
function validateUser(body, allowPartial = false) {
    const clean = {};

    // name
    if (!allowPartial || body.name !== undefined) {
        if (typeof body.name !== 'string' || !body.name.trim()) {
            return { error: 'Name is required and must be a string' };
        }
        clean.name = body.name.trim();
    }

    // country
    if (!allowPartial || body.country !== undefined) {
        if (typeof body.country !== 'string' || !body.country.trim()) {
            return { error: 'Country is required and must be a string' };
        }
        clean.country = body.country.trim();
    }

    // age
    if (!allowPartial || body.age !== undefined) {
        const ageNum = Number(body.age);
        if (!Number.isInteger(ageNum) || ageNum < 0 || ageNum > 120) {
            return { error: 'Age must be a valid integer between 0 and 120' };
        }
        clean.age = ageNum;
    }

    return { value: clean };
}

// root endpoint
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// list all
app.get('/users', (req, res) => {
    res.json(users);
});

// get one
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// add new
app.post('/users', (req, res) => {
    const { value, error } = validateUser(req.body);
    if (error) return res.status(400).json({ error });

    let id = req.body.id ? parseInt(req.body.id, 10) : nextId++;
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });
    if (users.some(u => u.id === id)) return res.status(400).json({ error: 'Id already exists' });

    const newGuy = { id, ...value };
    users.push(newGuy);
    res.status(201).json(newGuy);
});

// edit user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });

    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    const { value, error } = validateUser(req.body, true);
    if (error) return res.status(400).json({ error });

    users[idx] = { ...users[idx], ...value };
    res.json(users[idx]);
});

// remove user
app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    const gone = users.splice(idx, 1)[0];
    res.json(gone);
});

// search by country
app.get('/search', (req, res) => {
    const c = req.query.country;
    if (!c || typeof c !== 'string') {
        return res.status(400).json({ error: 'country query required' });
    }
    const matches = users.filter(u => u.country.toLowerCase() === c.trim().toLowerCase());
    res.json(matches);
});

// final catch-all error handler
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});


