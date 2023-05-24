const express = require('express');
const client = require('../db');
const router = express.Router();

const taskColumns = 'id, name, is_completed AS "isCompleted"'

router.get('/', async (req, res) => {
    const tasks = await client.query(`SELECT ${taskColumns} FROM tasks`);
    res.send(tasks.rows);
});

router.put('/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const body = req.body;
    const query = buildUpdateTaskQuery(body, taskId);
    if (query) {
        await client.query(query);
    }
    res.send({...req.body, taskId: taskId});
});

router.delete('/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const query = `DELETE FROM tasks WHERE id = ${taskId}`;
    client.query(query);
});

router.post('/', async (req, res) => {
    const query = `
        INSERT INTO tasks(name) 
        VALUES (${req.body.name}) 
        RETURNING tasks.id, tasks.name, tasks.is_completed`


});

function buildUpdateTaskQuery(body, taskId) {
    const isCompleted = body.isCompleted;
    const name = body.name;

    let paramsToSet = [];
    if (isCompleted !== undefined) {
        paramsToSet.push(`is_completed = ${isCompleted}`);
    }
    if (name !== undefined) {
        paramsToSet.push(`name = ${name}`);
    }
    return paramsToSet.length === 0
        ? ""
        : `UPDATE tasks SET ${paramsToSet.join(" AND ")} WHERE id = ${taskId}`
}

module.exports = router;