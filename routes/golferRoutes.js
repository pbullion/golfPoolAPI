const { Router } = require("express");
const axios = require("axios");

const router = Router();



router.get("/tournament-field/:tournamentID", (request, response, next) => {
  let tournamentID = request.params.tournamentID;
  axios
    .get(
      `http://api.sportradar.us/golf-t2/players/wgr/2019/rankings.json?api_key=5mw47fy7qubzt6sg5q4pfud8`
    )
    .then(rankingsResponse => {
      console.log(rankingsResponse.data.players.length);
      axios
        .get(
          `http://api.sportradar.us/golf-t2/summary/pga/2019/tournaments/${tournamentID}/summary.json?api_key=5mw47fy7qubzt6sg5q4pfud8`
        )
        .then(fieldResponse => {
          let field = [];
          console.log(fieldResponse.data.field.length)
          for (let x = 0; x < fieldResponse.data.field.length; x++) {
            let player = rankingsResponse.data.players.find(obj => {
              return obj.id === fieldResponse.data.field[x].id;
            });
            if (!player) {
              console.log(fieldResponse.data.field[x]);
              field.push(fieldResponse.data.field[x]);
            }
            field.push(player);
          }
          let filteredField = field.filter(function(el) {
            return el != null;
          });
          console.log(filteredField.length);
          response.send(filteredField);
        })
        .catch(function(error) {
          // handle error
          console.log(error.message);
        });
    })
    .catch(function(error) {
      // handle error
      console.log(error.message);
    });
});

router.get("/leaderboard/:tournamentID", (request, response, next) => {
  let tournamentID = request.params.tournamentID;
  console.log(tournamentID)
  axios
    .get(
      `http://api.sportradar.us/golf-t2/leaderboard/pga/2019/tournaments/${tournamentID}/leaderboard.json?api_key=5mw47fy7qubzt6sg5q4pfud8`
    )
    .then(scoresResponse => {
      // console.log(scoresResponse.data);
      response.send(scoresResponse.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});

router.get("/schedule", (request, response, next) => {
  axios
    .get(
      `http://api.sportradar.us/golf-t2/leaderboard/pga/2019/tournaments/schedule.json?api_key=5mw47fy7qubzt6sg5q4pfud8`
    )
    .then(scheduleResponse => {
      // console.log(scheduleResponse.data);
      response.send(scheduleResponse.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});

module.exports = router;
