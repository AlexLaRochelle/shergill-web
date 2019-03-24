const creds = require('./database-creds.json');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: creds.user,
    host: 'localhost',
    database: creds.database,
    password: creds.password,
    port: 5432,
});


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rows.length === 0) {
            response.status(200).json({
                isValid: false,
                id: null,
                error: "no user '" + id + "'"

            });
        } else {
            delete results.rows[0].password;
            response.status(200).json(results.rows[0])
        }
    })
};

const createUser = (request, response) => {
    const {name, email} = request.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email} = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};

const login = (request, response) => {
    const {username, password} = request.body;


    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rows.length === 0) {
            response.status(200).json({
                isValid: false,
                id: null,
                error: "no user '" + username + "'"

            });
        } else {
            console.log(results.rows);
            const isValid = results.rows[0].password === password;

            response.status(200).json({
                isValid: isValid,
                id: results.rows[0].id,
                error: isValid ? "" : "invalid password"

            });
        }
    })
};

const getAllJobs = (request, response) => {
    pool.query('SELECT * FROM jobs ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    getAllJobs
};
