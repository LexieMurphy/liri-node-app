require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

//var fs = require("fs");

//var request = require("request");

var spotify = new Spotify(keys.spotify);


// call spotify
var callSpotifyAPI = function(songName) {
    if (songName === undefined) {
        songName = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: songName,
            limit: 10
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("Song Name: " + songs[i].name);
                console.log("Link to Preview Song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
            }
        }
    );
};


var userCommand = function (caseData, functionData) {
    switch (caseData) {

        // use spotify api
        case "spotify-this-song":
            callSpotifyAPI(functionData);
            break;
        // use omdb api
        case "movie-this":
            callOMDBAPI(functionData);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI can't understand your nonsense!");
    }
};

var NodeResults = function (argOne, argTwo) {
    userCommand(argOne, argTwo);
};

NodeResults(process.argv[2], process.argv[3]);