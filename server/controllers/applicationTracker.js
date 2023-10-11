import { query } from '../mysql/connection';

const showApplications = (req,res) => {
    const user_id = req.params.user_id;

    const sql = "SELECT * FROM applications WHERE user_id = ?;";

    query(sql,user_id,(err,data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
};

const showApplication = (req,res) => {
    const user_id = req.params.user_id;
    const application_id = req.params.application_id;

    const sql = "SELECT * FROM applications WHERE user_id =? AND application_id =?";

    query(sql, [user_id,application_id],(err,data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
};

const createApplication = (req,res) => {
    const sql = "INSERT INTO applications (`user_id`,`company_name`,`position_title`,`work_location`,`requested_experience`,`requested_education`) VALUES(?)"

    const values = [
        req.body.user_id,
        req.body.company_name,
        req.body.position_title,
        req.body.work_location,
        req.body.requested_experience,
        req.body.requested_education
     ]

    query(sql,[values], (err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const updateApplication = (req,res) => {
    const sql = "UPDATE applications SET company_name = ?, position_title = ?, work_location = ?, requested_experience = ?, requested_education = ?  WHERE user_id = ? AND application_id =?"
    const user_id = req.params.user_id;
    const application_id = req.params.application_id

    const values = [
        req.body.company_name,
        req.body.position_title,
        req.body.work_location,
        req.body.requested_experience,
        req.body.requested_education
    ]
    query(sql, [...values,user_id,application_id], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const deleteApplication = (req, res) => {
    const deleteSQL = "DELETE FROM applications WHERE application_id = ?;";
    const alterSQL = "ALTER TABLE applications AUTO_INCREMENT = ?;";

    let application_id = req.params.application_id;
    application_id = parseInt(application_id,10);

  
    // First, execute the DELETE statement
    query(deleteSQL, [application_id], (deleteErr, deleteResult) => {
      if (deleteErr) return res.json(deleteErr);
  
      // Then, execute the ALTER TABLE statement
        query(alterSQL, [application_id], (alterErr, alterResult) => {
            if (alterErr) return res.json(alterErr);
  
        // Both queries have completed successfully
            return res.json({ deleteResult, alterResult });
      });
    });
  };

export default {
    showApplications,
    showApplication,
    createApplication,
    updateApplication,
    deleteApplication
}