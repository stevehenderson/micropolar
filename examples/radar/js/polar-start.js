
  
var configs = [    
    //r:  Length of BLUE series
    {
      data: [

            //{t: ['FOX', 'CNN', 'CBS', 'ABC', 'MSNBC', 'PBS', 'CSPAN', 'BBC'], r: [50, 29, 29, 37, 60, 39, 18, 9], name: 'Layer0', geometry: 'AreaChart', groupId: 0},    
            //{t: ['FOX', 'CNN', 'CBS', 'ABC', 'MSNBC', 'PBS', 'CSPAN', 'BBC'], r: [82, 30, 40, 51, 33, 88, 74, 56], name: 'Layer1', geometry: 'AreaChart', groupId: 0},
            //{t: ['FOX', 'CNN', 'CBS', 'ABC', 'MSNBC', 'PBS', 'CSPAN', 'BBC'], r: [85, 68, 61, 56, 98, 6, 53, 42], name: 'Layer2', geometry: 'AreaChart', groupId: 0},
            //{t: ['FOX', 'CNN', 'CBS', 'ABC', 'MSNBC', 'PBS', 'CSPAN', 'BBC'], r: [22, 45, 20, 53, 93, 99, 46, 27], name: 'Layer3', geometry: 'AreaChart', groupId: 0},
            {t: ['FOX', 'CNN', 'CBS', 'ABC', 'MSNBC', 'BBC'], r: [85, 43, 90, 37, 48, 31], name: 'Layer4', geometry: 'AreaChart', groupId: 0}

          ],
      
      layout: { title: 'Polar Area Chart', width: 300, height: 300, margin: { left: 30, right: 30, top: 00, bottom: 00, pad: 0 }, 
        font: { family: 'Arial, sans-serif', size: 10, color: 'orange' },
        direction: 'clockwise', 
        orientation: 375, 
        span: 180,
        reverseOrder: true,
        radialAxis: { visible: false},
        barmode: 'stack', backgroundColor: '#3ae1d0', showLegend: false }
    }            
];

configs.forEach(function(_config){
    var config = {layout: {width: 300, height: 300}};
    µ.util.deepExtend(config, _config);
    console.log(JSON.stringify(µ.adapter.plotly().convert(config, true)));
    var ms =micropolar.Axis().config(config).render(d3.select('#polarcontainer').append('div'));
    var ms =micropolar.Axis().config(config).render(d3.select('#polarcontainer2').append('div'));

});

