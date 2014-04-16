/*

Bitcharts.org | JavaScript

Pure JavaScript AJAX request and data format to parse to NVD3 graphic library 

Author: Maxi Cañellas twitter.com/maxi_dev - maxi.canellas [at] gmail.com

*/


var xmlhttp = new XMLHttpRequest(),
    me = this,
    exBitstamp = null,
    exBtce = null,
    exAvg = null,
    minVal = null,
    maxVal = null;

var getMin =  function(val){

      if(val != null){
        minVal = val;
      }
      return (minVal-(minVal*0.2)).toFixed(0);

    } // getMin

var getMax = function (val){

  if(val != null){
    maxVal = val;
  } 

    return (maxVal+(maxVal*0.1)).toFixed(0);
} //getMax

xmlhttp.open('GET', '/api/graphs/graphs.json', true);
xmlhttp.onreadystatechange = function() {

  if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
  {
            // Parse the JSON from data.json
            var obj = JSON.parse(xmlhttp.responseText);
            me.exBitstamp = obj.bitstamp;
            me.exBtce = obj["btc-e"];
            me.exAvg = obj.bitcoinaverage;

      function fillData(sa,sb,sc) {

            var arrBtce = [],
                arrBtcavg   = [],
                arrBitstamp     = [];

                 var now =  new Date(),
                     day = 1000*60*60*24;

              var cont = 0;
              var aux = 99999;
              var aux1 = 0;

              for (var i = now - 10*day; i < now; i+=day)
              {
                      arrBitstamp.push({x: i, y: exBitstamp[cont]});
                      arrBtce.push({x: i, y: exBtce[cont]});
                      arrBtcavg.push({x: i, y: exAvg[cont]});

                      var m = Math.min(exBitstamp[cont],exBtce[cont],exAvg[cont]);
                      var ma = Math.max(exBitstamp[cont],exBtce[cont],exAvg[cont]);

                      if(m<aux){
                        aux = m;
                      }

                      if(ma>aux1){
                        aux1 = ma;
                      }

                      cont+=1;

                      if(cont == 10){

                        getMin(aux);
                        getMax(aux1);
                      }

              } // for
                  // JSON format return for NVD3 graphic library
                  return [
                      {
                        values: arrBtce,
                        area: true,
                        disabled: sa,
                        key: 'BTC-e',
                        color: '#FFFFFF'
                      },
                      {
                        values: arrBtcavg,
                        area: true,
                        disabled: sb,
                        key: 'BitconAverage',
                        color: '#4885D5'
                      },
                      {
                        values: arrBitstamp,
                        area: true,
                        disabled: sc,
                        key: 'BitStamp',
                        color: '#B3F292'
                      }

                ];
              } // fillData
