/*

Bitcharts.org | AngularJS Controllers

AngularJS AJAX requests and methods for Bitcharts.org graphics, calculator and widgets.

Author: Maxi Cañellas twitter.com/maxi_dev - maxi.canellas [at] gmail.com

*/

// Inicializo la APP; sin dependencias
var bitchartsApp = angular.module("bitchartsApp", []);

function calcCtrl ($scope, $http, $filter)
{

	$http({method: 'POST', url: '/sources/sources.json'}).success(function(data)
	{
		$scope.values = data; // response data

		$scope.getSourceValue = function(){

			if ($scope.source == "bitcoinaverage.com") {

				return $scope.values.bitcoinaverage["last"]

			} else if ($scope.source == "bitstamp.net"){

				return $scope.values.bitstamp["last"]

			} else if ($scope.source == "btc-e.com"){

				return $scope.values["btc-e"]["last"]

			} else {

			 	return -1
			};

		} // getSource

		$scope.getCurrency = function () {

			if ($scope.cur == "ARS") {

				return $scope.values.geeklab["blue"]

			} else if ($scope.cur == "USD"){

				return 1

			} else {

				return -1;
			};

		} // getCurrency

		$scope.getDolarBlue = function (){

			return $scope.values.geeklab["blue"];
		} // getDolarBlue

		$scope.getTimestamp = function(){

			return $scope.values.timestamp
		} // getTimestamp

		$scope.getPercent = function(){

			return $scope.percent;
		} // getPercent

		$scope.getOperation = function(){

			return $scope.percentOperation;
		} // getOperation

		$scope.setPercent = function(get_sour, get_cur, cant){

			var source     = get_sour;
			var currency   = get_cur;
			var cantidad   = cant;
			var cant_final = cantidad*currency*source;

			if ($scope.percentOperation == "+") {

				return cant_final + (cant_final*$scope.percent)/100

			} else{

				return cant_final - (cant_final*$scope.percent)/100
			};

		} // SetPercent

		$scope.setBtnStatus = function (){

			if($scope.cantidad == 0)
			{
				return "disabled"

			} else{

				return "enabled"
			} // else if

		} // setBtnStatus

		$scope.setDivColor = function (){

			if($scope.percent != 0){

				if ($scope.percentOperation == "+"){

					return "#5CB85C";

				} else {

					return "#D9534F"
				} // cierra if 2

			}else{

				return "#FFFFFF";

			} // cierra if principal

		} // setDivColor

		$scope.fixSharePercent = function(){

			if($scope.percent == 0){

				return "";

			} else{

				if ($scope.percentOperation == "+"){

					return "(más " + $scope.percent + "%)";
				}
				else{
					return "(menos " + $scope.percent + "%)";
				}
			}

		} // fixSharePercent


		$scope.shareFacebookUI = function(final_val, share_percent){

			var final = final_val;
			var  source;
			var  percent_op;
			$filter('currency');


			if($scope.percent == 0){

				FB.ui(
					  {
					    method: 'feed',
					    name: $scope.cantidad + " BTC = " +  $filter('currency')(final_val) + " " + $scope.cur,
					    link: 'http://bitcharts.org/',
					    picture: 'http://bitcharts.org/img/fb10.png',
					    caption: "Fuente: " + $scope.source + " | "  + "Dólar: " + $scope.values.geeklab["blue"],
					    description: "Hacé tu cálculo en http://bitcharts.org"
					  }); // FB.UI

			}else{


					if ($scope.percentOperation == "+"){

					percent_op = "(más " + $scope.percent + "%)";

					}else{

					percent_op = "(menos " + $scope.percent + "%)";
					}

				FB.ui(
					  {
					    method: 'feed',
					    name: $scope.cantidad + " BTC " + percent_op + " = " + $filter('currency')(final_val) + "" + $scope.cur,
					    link: 'http://bitcharts.org/',
					    picture: 'http://bitcharts.org/img/fb10.png',
					    caption: "Fuente: " + $scope.source + " | "  + "Dólar: " + $scope.values.geeklab["blue"],
					    description: "Hacé tu cálculo en http://bitcharts.org"
					  }); // FB.UI

			} // else

		} // shareFacebookUI method

	});//  /success()

} /* fin calcCtrl */

function mcapCtrl ($scope, $http)
{

	$http({method: 'POST', url: '/api/marketcap/marketcap.json'}).success(function(data)
	{
		$scope.info = data; // response data

		$scope.getTimestamp = function(){

			return $scope.info.timestamp;
		} // getTimestamp()

		$scope.getCurName = function(pos){

			return $scope.info.currencies[pos][0];
		} // getCurName()

		$scope.getMarketCap = function (pos) {

			return $scope.info.currencies[pos][1]
		} // getMarketCap()

		$scope.getPrice = function (pos){
			return $scope.info.currencies[pos][2]

		} // getPrice()

		$scope.getPercent = function(pos){

			return $scope.info.currencies[pos][3]
		} // getPercent()

		$scope.getPercentChange = function(pos){

			return $scope.info.currencies[pos][4]
		} // getPercentChange

		$scope.setLabelColor = function (pos){

			if ($scope.info.currencies[pos][4] == "positive"){

				return "color-green"

			} else if($scope.info.currencies[pos][4] == "negative"){

				return "color-red"
			}

		} //setLabelColor

	});//  success()


} /* fin mcapCtrl */

function bchainCtrl ($scope, $http)
{

	$http({method: 'POST', url: '/sources/stats.json'}).success(function(data)
	{

		$scope.blockchain = data; // response data

		$scope.getDifficulty = function(){

		return $scope.blockchain["difficulty"];

		} //getDifficulty

		$scope.getHashRate = function (){
			return $scope.blockchain["hash_rate"];
		} //getHashRate


		$scope.getTotalBitcoins = function (){

			return $scope.blockchain["totalbc"]/100000000;

		} //getTotalBitcoins

		$scope.getBlockTotals = function() {
			return $scope.blockchain["n_blocks_total"];
		} //getBlockTotals

		$scope.getTimestamp = function(){
			return $scope.blockchain["timestamp"]
		} //getTimestamp


	});//  success()


} // bchainCtrl



function footerCtrl ($scope,$http) {

	$http({method: 'POST', url: '/sources/sources.json'}).success(function(data)
	{
		$scope.va = data; // response data

		$scope.getValue = function(){

			return $scope.va.bitcoinaverage["last"]

		} //getValue


		$scope.setCoffeeValueBtc = function(){

			var btcPrice = $scope.va.bitcoinaverage["last"]
			var dolar = $scope.va.geeklab["blue"]
			var cafe = 1.52

			return (cafe/btcPrice).toFixed(4);
		} // setCoffeeValueBtc

		$scope.setCoffeeValueArs = function(){

			var btcPrice = $scope.va.bitcoinaverage["last"]
			var dolar = $scope.va.geeklab["blue"]
			var cafe = 1.52

			return (cafe*dolar).toFixed(2);
		} //setCoffeeValueArs

	});// success

} // footerCtrl
