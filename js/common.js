$(document).ready(function() {
		
			var chartTitle;

			var options = {
				chart: {
					renderTo:'container',
					type:[],
					width: 650
								
				},
				credits: {
					enable: false,
					style: {
						display: 'none'
						}
					},
				title: {
					text: null,				
				
					style:{
							font:'Times'
						},
						
				 	useHTML:true	
				},
				xAxis: {
					categories: []
				},
				yAxis: {
					title: {
						text: 'number of hits'		
					}
				},
				series: []				
			};
			
			
			$.get('data/data.xml', function(xml) {
				// Split the lines
				
				var $xml = $(xml);
			
				//alert("data in file: " + xml);
						
				
				$xml.find('chartType').each(function(i, chartType){					
				options.chart.type.push($(chartType).text());				
			
				});
				
				
				$xml.find('chartTitle').each(function(i, chartTitle) {
					chartTitle = $(this).text();			
					$('#graphtitle').append(chartTitle);
				});
				
				
				
				$xml.find('month name').each(function(i, category){					
						options.xAxis.categories.push($(category).text());
				});
				
				
				$xml.find('press').each(function(i, series) {
					var seriesOptions = {
						name: $(series).find('name').text(),
						data: []
					};

					// push data points
					$(series).find('data').each(function(i, point) {
						seriesOptions.data.push(
							parseInt($(point).text()));
					});

					// add it to the options
					options.series.push(seriesOptions);
				
				});						
				
				var chart = new Highcharts.Chart(options);
			}); 	
	
});