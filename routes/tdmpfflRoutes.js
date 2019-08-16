const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/history", (request, response, next) => {
  pool.query("SELECT * FROM tdmpffl_history", (err, res) => {
    if (err) return next(err);
    let history = res.rows;
    let updatedHistory = [];
    let i;
    for (i = 0; i < history.length; i++) {
      let totalGames = history[i].wins + history[i].losses + history[i].ties;
      let winPct = history[i].wins / totalGames;
      updatedHistory.push({ ...history[i], winPct });
    }
    response.json(
      updatedHistory.sort(function(a, b) {
        return b.winPct - a.winPct;
      })
    );
  });
});

module.exports = router;
