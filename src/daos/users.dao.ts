import { PoolClient } from 'pg';
import { connectionPool } from '.';

export async function findAllUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM arrest_dev.users;');
        console.log(result.rows);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}

export async function findUsernameAndPassword(username: string, password: string){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM arrest_dev.users as use
        INNER JOIN arrest_dev.role as rol ON (use.role = rol.id)
        WHERE username = $1 AND password = $2`;
        const result = await client.query(queryString, [username, password]);
        const user = result.rows[0];
        if (user) {
            const convertedUser = convertSqlUser(user);
            convertedUser.role = convertSqlRole(user);
            return convertedUser;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}