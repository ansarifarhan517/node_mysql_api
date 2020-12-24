
const express = require('express');
const mysql = require('mysql');
const router = express.Router();


router.get('/', (req, res) => {
    const query = 'SELECT * FROM posts;';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: '',
        database: 'mysql_node_farhan'
    });
    connection.connect();
    connection.query(query, (error, results) => {
        if (error) throw error
        res.json(results);

    })

    connection.end();
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM posts WHERE id = ?;`;
    const connection = mysql.createConnection('mysql://root:@localhost/mysql_node_farhan?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');
    connection.connect();
    connection.query(query, [id], (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
    connection.end();
});

router.post('/', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    if (!title || !body) {
        res.status(400).json();
    }

    const query = `INSERT INTO posts SET ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysql_node_farhan'
    });
    connection.connect();
    connection.query(query, req.body, (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        // const location = req.protocol + '://' + req.get('host') + req.originalUrl + '/' +results.insertId;
        // res.setHeader('Location', location);
        res.status(201).json();
    });
    connection.end();
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body;
    const body = req.body;
    // if (id !== +req.body.id) {
    //     res.status(400).json();
    // }
    // if (!title || !body) {
    //     res.status(400).json();
    // }

    const query = `UPDATE posts SET title = ?, body = ? WHERE id = ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysql_node_farhan'
    });
    connection.connect();
    connection.query(query, [title, body, id], (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        // if (results.affectedRows === 0) {
        //     res.status(404).json();
        // } else {
            res.json(req.body);
        // }
    });
    connection.end();
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM posts WHERE id = ?';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysql_node_farhan'
    })
    connection.connect();
    connection.query(query, [id], (error, results) => {
        if (error) throw error
        res.status(200).json();
    });

});


module.exports = router;