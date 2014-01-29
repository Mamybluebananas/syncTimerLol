
var Utils = {


  sendRequest: function(httpMethod, region, type, version, selectBy, userName,  keyUser, paramsArr, cb, optionsP) {

	var options;
	//console.log("*************** optionsP " + JSON.stringify(optionsP));
	
	if(optionsP == undefined || optionsP == null || optionsP == '' ){
    	options = {};
    }else{
    	options = optionsP;
    }

    var domain = "prod.api.pvp.net/api/lol/";
    var api_method = region + "/"  + version + "/" + type + "/";

    if (selectBy != undefined || selectBy != null || selectBy != "" ){
    	api_method += selectBy + "/";
    }


    if (userName != undefined || userName != null || userName != "" ){
    	api_method += userName;
    }

    var api_key = keyUser;


    if (api_key != null) {
      paramsArr.push("api_key=" + api_key);
    }

    var paramsTxt = paramsArr.join("&");
    var url = "https://" + domain + api_method +"?" + paramsTxt;

    url = encodeURI(url);
    console.log('url ' + url);

	var request = $.ajax({
 		type: httpMethod,
 		url: url,
  		data: options
	})

	request.done(function( data ) {
		console.log("*************** Ajax sendRequest success " + JSON.stringify(data));
    cb(data);
	});
 
	request.fail(function( jqXHR, textStatus ) {
  		console.log("*************** Ajax sendRequest fail " + JSON.stringify(textStatus));
  		console.log("*************** Ajax sendRequest fail " + JSON.stringify(jqXHR));
	});
  },


 sendRequestCommunitylol: function(httpMethod, region, type, version, selectBy, userName,  keyUser, paramsArr, cb, optionsP) {

  var options;
  //console.log("*************** optionsP " + JSON.stringify(optionsP));

  //"X-Mashape-Authorization": "nBYSwOGfOSfWbPo6j0DerwQYeqD8u6oi"
  //https://community-league-of-legends.p.mashape.com/api/
  //v1.0/EUW/summoner/getAllPublicSummonerDataByAccount/31358563



  if(optionsP == undefined || optionsP == null || optionsP == '' ){
      options = {};
    }else{
      options = optionsP;
    }

    var domain = "community-league-of-legends.p.mashape.com/api/";
    var api_method = version + "/"  + region + "/" + type + "/";

    if (selectBy != undefined || selectBy != null || selectBy != "" ){
      api_method += selectBy + "/";
    }


    if (userName != undefined || userName != null || userName != "" ){
      api_method += userName;
    }

    var api_key = keyUser;


    if (api_key != null) {
      paramsArr.push("api_key=" + api_key);
    }

    var paramsTxt = paramsArr.join("&");
    var url = "https://" + domain + api_method +"?" + paramsTxt;

    url = encodeURI(url);
    console.log('url ' + url);

  var request = $.ajax({
    type: httpMethod,
    url: url,
    beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Authorization', 'nBYSwOGfOSfWbPo6j0DerwQYeqD8u6oi');},
    data: options
  })

  request.done(function( data ) {
    console.log("*************** Ajax sendRequest success " + JSON.stringify(data));
    cb(data);
  });
 
  request.fail(function( jqXHR, textStatus ) {
      console.log("*************** Ajax sendRequest fail " + JSON.stringify(textStatus));
      //console.log("*************** Ajax sendRequest fail " + JSON.stringify(jqXHR));
  });
  }

};
