import pool from "../mysql/connection.js";
const con = await pool.getConnection();

export const logUuid = async (req, res) => {
    try {
        const uuid = req.body.parcel;
        console.log("Successfully retrieved:" + uuid)
        const [rows] = await con.execute(
            'SELECT * FROM users WHERE id = ?',
            [uuid]
        );

        if (rows.length === 0) {
            const query = `
                INSERT INTO users (id)
                VALUES (?)
            `
            await con.execute(query, [uuid]);
            return res.status(200).send("User Created")
        } else {
            return res.send("Welcome back");
        }

        
        
        
    } catch (err) {
        console.error(err + "UUID failed to send");

    } 
}


export const getUserId = async (req, res) => {
    const uuid = req.body.parcel;
    return res.status(200).json({user_id: uuid});
}



