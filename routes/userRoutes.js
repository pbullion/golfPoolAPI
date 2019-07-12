const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/userSelections", (request, response, next) => {
  pool.query("SELECT * FROM golf_user_selections", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.post("/userSelections", (request, response, next) => {
  const {
    first_name,
    last_name,
    email,
    tournament_id,
    tier1,
    tier2a,
    tier2b,
    tier3,
    tier4
  } = request.body;

  let tier1Name = tier1.first_name + " " + tier1.last_name;
  let tier2aName = tier2a.first_name + " " + tier2a.last_name;
  let tier2bName = tier2b.first_name + " " + tier2b.last_name;
  let tier3Name = tier3.first_name + " " + tier3.last_name;
  let tier4Name = tier4.first_name + " " + tier4.last_name;

  pool.query(
    "INSERT INTO golf_user_selections(first_name, last_name, email, tournament_id, tier1_id, tier2a_id, tier2b_id, tier3_id, tier4_id, tier1_name, tier2a_name, tier2b_name, tier3_name, tier4_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
    [
      first_name,
      last_name,
      email,
      tournament_id,
      tier1.id,
      tier2a.id,
      tier2b.id,
      tier3.id,
      tier4.id,
      tier1Name,
      tier2aName,
      tier2bName,
      tier3Name,
      tier4Name,
    ],
    (err, res) => {
      console.log(err);
      console.log(res);
      if (err) return next(err);
      response.send("good to go");
    }
  );
});

module.exports = router;
