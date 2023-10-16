import pool from "../mysql/connection.js";
const con = await pool.getConnection();

export const logUuid = async (req, res) => {
    try {
        const uuid = req.body.parcel;
        console.log("Successfully retrieved:" + uuid)
        return res.send('UUID Received' + uuid);
    } catch (err) {
        console.error(err + "UUID failed to send");

    } 
}




