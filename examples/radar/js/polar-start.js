//Global variable to track state
last=0;
  
var ms;

//Config 0
var configs0 = [    
    //r:  Length of BLUE series
    {
      data: [            
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [15, 0, 0, 0, 0, 0], color: '#6a447f', strokeSize: 0, name: 'Layer1', geometry: 'AreaChart', groupId: 1},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 23, 0, 0, 0, 0], color: '#dfd075', name: 'Layer2', geometry: 'AreaChart', groupId: 2},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 45, 0, 0, 0], color: '#529560', name: 'Layer3', geometry: 'AreaChart', groupId: 3},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 0, 65, 0, 0], color: '#d59241', name: 'Layer4', geometry: 'AreaChart', groupId: 4},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 0, 0, 75, 0], color: '#c54b5a', name: 'Layer5', geometry: 'AreaChart', groupId: 5},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 0, 0, 0, 85], color: '#3ae1d0', name: 'Layer6', geometry: 'AreaChart', groupId: 6}
            //{t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [15, 23, 45, 65, 75, 85], name: 'Layer6', geometry: 'AreaChart', groupId: 0}
          ],
      
      layout: { title: '', width: 300, height: 300, margin: { left: 30, right: 30, top: -200, bottom: 00, pad: 0 }, 
        font: { family: 'Arial, sans-serif', size: 10, color: '#3ae1d0' },
        direction: 'clockwise', 
        orientation: 375, 
        span: 180,
        reverseOrder: true,
        radialAxis: { visible: false},
        barmode: 'stack', backgroundColor: '#3ae1d0', showLegend: false }
    }            
];

//Config 1 -- shift to the other side!
var configs1 = [    
    //r:  Length of BLUE series
    {
      
        data: [            
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 0, 0, 0, 15], color: '#6a447f', strokeSize: 0, name: 'Layer1', geometry: 'AreaChart', groupId: 1},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 0, 0, 23, 0], color: '#dfd075', name: 'Layer2', geometry: 'AreaChart', groupId: 2},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 0, 45, 0, 0], color: '#529560', name: 'Layer3', geometry: 'AreaChart', groupId: 3},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 0, 65, 0, 0, 0], color: '#d59241', name: 'Layer4', geometry: 'AreaChart', groupId: 4},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [0, 75, 0, 0, 0, 0], color: '#c54b5a', name: 'Layer5', geometry: 'AreaChart', groupId: 5},
            {t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [85, 0, 0, 0, 0, 0], color: '#3ae1d0', name: 'Layer6', geometry: 'AreaChart', groupId: 6}
            //{t: ['BBC', 'MSNBC', 'CBS', 'ABC', 'CNN', 'FOX'], r: [15, 23, 45, 65, 75, 85], name: 'Layer6', geometry: 'AreaChart', groupId: 0}
          ],


      
      layout: { title: '', width: 300, height: 300, margin: { left: 30, right: 30, top: -200, bottom: 00, pad: 0 }, 
        font: { family: 'Arial, sans-serif', size: 10, color: '#3ae1d0' },
        direction: 'clockwise', 
        orientation: 375, 
        span: 180,
        reverseOrder: true,
        radialAxis: { visible: false},
        barmode: 'stack', backgroundColor: '#3ae1d0', showLegend: false }
    }            
];


//Plot the first
configs0.forEach(function(_config){
    var config = {layout: {width: 300, height: 300}};
    µ.util.deepExtend(config, _config);    
    ms =micropolar.Axis().config(config).render(d3.select('#polarcontainer').append('div'));  
    

});


//Second load
setInterval(function () {
        if(last==0) {
            last=1;
        } else {
            last=0;
        }
        if(last==0) activeconfigs=configs0;
        if(last==1) activeconfigs=configs1;

        ms.removePolar();  

       
        activeconfigs.forEach(function(_config){
        var config = {layout: {width: 300, height: 300}};
        µ.util.deepExtend(config, _config);        
        var ms =micropolar.Axis().config(config).render(d3.select('#polarcontainer').append('div'));  
    
        });
    }, 1000);




