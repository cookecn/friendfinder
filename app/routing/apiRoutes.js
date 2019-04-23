//a GET route with the url '/api/friends'
//this will show JSON to all friends

//a POST route '/api/friends/
//this will take in incoming survey results, also used to handle compatability logic.


var friendsList = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function(req, res) {
        
        console.log(req.body.scores);
        var newFriendScores = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;

        for(var i = 0; i < friendsList.length; i++) {
            var scoresDiff = 0;
            for (var j = 0; j < newFriendScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newFriendScores[j])));
            }
            scoresArray.push(scoresDiff);
        }

        for (var i = 0; i < scoresArray.length; i++) {
            if(scoresArray[i] <= scoresArray[bestMatch]){
                bestMatch = i;
            }
        }

        var bestFriend = friendsList[bestMatch];
        res.json(bestFriend);

        friendsList.push(req.body);
    });
};