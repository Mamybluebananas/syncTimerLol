function AppViewModel() {
    var self = this;

    var region = "";
    var userName = "";
    var userId = "";
    var keyUser ="3abd01ed-f67d-4b9b-9890-b5b9976c45bb";

    // "https://community-league-of-legends.p.mashape.com/api/v1.0/EUW/summoner/retrieveInProgressSpectatorGameInfo/<Summonername>"

    self.searchInGameByName = function () {
        console.log("searchInGameByName")

        var callbackInGameByName = function (result) {
            console.log("callback searchInGameByName " +result.game.playerChampionSelections.array)

            $("#dataIngame").html('');
            $("#dataIngame").html('<table><tr><td>Nom de l invocateur</td><td>championId</td></tr></table>');
            if (result) {
                console.log("callback searchInGameByName if ")
                var obj = result.game.playerChampionSelections.array;
                console.log("callback searchInGameByName if 2 " + obj)
                for (var i = 0; i <= obj.length; i++) {
                    console.log("callback searchInGameByName for " + obj[i].summonerInternalName + " " + obj[i].championId)
                    $("#dataIngame>table").append('<tr><td>'+obj[i].summonerInternalName+'</td><td>'+obj[i].championId+'</td></tr>');
                };
            };
        };

        var httpMethod = "GET";
        var type ="summoner"
        var version = "v1.0";
        var selectBy = "retrieveInProgressSpectatorGameInfo";
        var params_arr = [];
        var optionsP ="";

        console.log("searchInGameByName " + userName)

        Utils.sendRequestCommunitylol(httpMethod, region, type, version, selectBy, userName,  null, params_arr, callbackInGameByName, optionsP)    

    }

    // /api/lol/{region}/v1.2/stats/by-summoner/{summonerId}/summary

    self.searchStatsById = function () {
        console.log("searchStatsById")

        var callbackStatsbyId = function (result) {
            console.log("searchStatsById");
            self.searchInGameByName();
        };

        var httpMethod = "GET";
        var type ="stats"
        var version = "v1.2";
        var selectBy = "by-summoner";
        var summonerId = userId +  "/summary";
        var keyUser ="3abd01ed-f67d-4b9b-9890-b5b9976c45bb";
        var params_arr = [];
        var optionsP ="";

        console.log("searchStatsById " + userName)

        Utils.sendRequest(httpMethod, region, type, version, selectBy, summonerId,  keyUser, params_arr, callbackStatsbyId, optionsP)    

    }

    // /api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent

    self.searchGameById = function () {
        console.log("searchGameById")

        var callbackLastGame = function (result) {
            console.log("callbackLastGame")
            self.searchStatsById();
        };

        var httpMethod = "GET";
        var type ="game"
        var version = "v1.3";
        var selectBy = "by-summoner";
        var summonerId = userId +  "/recent";
        var keyUser ="3abd01ed-f67d-4b9b-9890-b5b9976c45bb";
        var params_arr = [];
        var optionsP ="";

        console.log("searchSummonerByName " + userName)

        Utils.sendRequest(httpMethod, region, type, version, selectBy, summonerId,  keyUser, params_arr, callbackLastGame, optionsP)    

    }

    // /api/lol/na/v1.3/summoner/by-name/RiotSchmick?api_key=<key>  

    self.searchSummonerByName = function () {
        
        var callbackUserInfo = function (result) {
            $("#askUser").hide();
            userId = result[userName.toLowerCase()].id;
            $( "#nameUser" ).text("name : " + result[userName.toLowerCase()].name);
            $( "#idUser" ).text("id : " + userId);

            self.searchGameById();

        };

        var httpMethod = "GET";
        region  =""+  $("#inputRegion").val();
        var type ="summoner"
        var version = "v1.3";
        var selectBy = "by-name";
        userName = ""+  $("#inputUser").val();
        
        var params_arr = [];
        var optionsP ="";

        console.log("searchSummonerByName " + userName.toLowerCase())

        if(userName =="" || region==""){
            $( "#nameUser" ).text("summoner Name or region null fucking  asshole");
            console.log("summoner Name or region null fucking  asshole");
        }else{
            Utils.sendRequest(httpMethod, region, type, version, selectBy, userName,  keyUser, params_arr, callbackUserInfo, optionsP)    
        }

    }

}

