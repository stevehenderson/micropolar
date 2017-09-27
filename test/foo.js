function updateGroup(gid, newdata) {

		data = newdata.data;

		data.forEach(function(d, i) {
                d.t = Array.isArray(d.t[0]) ? d.t : [ d.t ];
                d.r = Array.isArray(d.r[0]) ? d.r : [ d.r ];
            });

		var axisConfig = config.layout;
		//remove the old group
		var node = null;
	    var svg = d3.select("svg.chart-root");
	    
		svg.select("g.geometry-group").selectAll("g").remove();
        var geometryConfigs = [];

        var extent;
        var isStacked = false;
            var dataWithGroupId = data.map(function(d, i) {
                isStacked = isStacked || typeof d.groupId !== "undefined";
                return d;
            });
            
            var dataYStack = [];
            if (isStacked) {
                var grouped = d3.nest().key(function(d, i) {
                    return typeof d.groupId !== "undefined" ? d.groupId : "unstacked";
                }).entries(dataWithGroupId);
                var stacked = grouped.map(function(d, i) {
                    if (d.key === "unstacked") {
                        return d.values;
                    } else {
                        var prevArray = d.values[0].r.map(function(d, i) {
                            return 0;
                        });
                        d.values.forEach(function(d, i, a) {
                            d.yStack = [ prevArray ];
                            dataYStack.push(prevArray);
                            prevArray = µ.util.sumArrays(d.r, prevArray);
                        });
                        return d.values;
                    }
                });
                data = d3.merge(stacked);
            }
            data.forEach(function(d, i) {
                d.t = Array.isArray(d.t[0]) ? d.t : [ d.t ];
                d.r = Array.isArray(d.r[0]) ? d.r : [ d.r ];
            });
            if (isStacked) {
                var highestStackedValue = d3.max(µ.util.sumArrays(µ.util.arrayLast(data).r[0], µ.util.arrayLast(dataYStack)));
                extent = [ 0, highestStackedValue ];
                extent = [0,100];
            } else {
                extent = d3.extent(µ.util.flattenArray(data.map(function(d, i) {
                    return d.r;
                })));
            }
            if (axisConfig.radialAxis.domain !== µ.DATAEXTENT) {
                extent[0] = 0;
            }

        radialScale = d3.scale.linear().domain(axisConfig.radialAxis.domain !== µ.DATAEXTENT && axisConfig.radialAxis.domain ? axisConfig.radialAxis.domain : extent).range([ 0, radius ]);

	    /*

	    tgtLabel = "#arc" + gid;
	    var outerBandContainer = svg.select("g.geometry-group");
	    var node = outerBandContainer.selectAll(tgtLabel);    
	    if(node.type=="undefined") {
	        console.log("updateGroup couldn't hook :" + tgtLabel)
	    } else {
	    	node.remove();
	    }

	    //Now -- replot
	    var geometryConfigs = [];
 		var hasGeometry = svg.select("g.geometry-group").selectAll("g").size() > 0;
        var geometryContainer = svg.select("g.geometry-group").selectAll("g.geometry").data(data);
        
            geometryContainer.enter().append("g").attr({
                "class": function(d, i) {
                    return "geometry geometry" + i;
                }
            });

*/
		var geometryContainer = svg.select("g.geometry-group").selectAll("g.geometry").data(data);
            geometryContainer.enter().append("g").attr({
                "class": function(d, i) {
                    return "geometry geometry" + i;
                }
            });

        //Prepare configuration for arcs
        geometryContainer.exit().remove();

	    data.forEach(function(d, i) {
	        var geometryConfig = {};
	        geometryConfig.radialScale = radialScale;
	        geometryConfig.angularScale = angularScale;
	        geometryConfig.container = geometryContainer.filter(function(dB, iB) {
	            return iB === i;
	        });
	        geometryConfig.geometry = d.geometry;
	        geometryConfig.orientation = axisConfig.orientation;
	        geometryConfig.direction = axisConfig.direction;
	        geometryConfig.index = i;
	        geometryConfigs.push({                        
	            data: d,
	            geometryConfig: geometryConfig
	        });
	    });

	    //We now have a bunch of geometry configs
	    var geometryConfigsGrouped = d3.nest().key(function(d, i) {
	        return typeof d.data.groupId !== "undefined" || "unstacked";
	    }).entries(geometryConfigs);

	    var geometryConfigsGrouped2 = [];
	    geometryConfigsGrouped.forEach(function(d, i) {
	        if (d.key === "unstacked") {
	            geometryConfigsGrouped2 = geometryConfigsGrouped2.concat(d.values.map(function(d, i) {
	                return [ d ];
	            }));
	        } else {
	            geometryConfigsGrouped2.push(d.values);
	        }
	    });

	    //Plot the arc configurations
	    geometryConfigsGrouped2.forEach(function(d, i) {
	        var geometry;
	        if (Array.isArray(d)) {
	            geometry = d[0].geometryConfig.geometry;
	        } else {
	            geometry = d.geometryConfig.geometry;
	        }
	        var finalGeometryConfig = d.map(function(dB, iB) {
	            return µ.util.deepExtend(µ[geometry].defaultConfig(), dB);
	        });
	        µ[geometry]().config(finalGeometryConfig)();
	    });

	}
