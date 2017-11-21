function WeatherWidget($widget)
{
	this.update = function()
	{
		$(".results", $widget).hide();
		$(".loading", $widget).show();
		var posPromise = getPos();
		
		posPromise.then(function(data) {
			var lat = data.coords.latitude;
			var lon = data.coords.longitude;
			$("#latitude").val(lat);
			$("#longitude").val(lon);
			getWeatherReport(lat + "," + lon);
		})
		.fail(function(error) {
			
		});
	};

	function getWeatherReport(c) 
	{
		$.ajax
		({
			url: "https://api.weather.gov/points/" + c + "/forecast/hourly",
			datatype: "json"
		})
		.done(function(data) {
			populateWeather(data);
		})
			.fail(function(jqXHR, textStatus, errorThrown) {
				//showError("ERROR");
		});
	}
	
	function populateWeather(data)
	{
		$(".conditions>span").each(function(i, e)
		{
			var $span = $(this);
			var field = $span.data("field");
			$(this).text(data.properties.periods[0][field]);
		});
		
		$(".results header img", $widget).attr("src",
			data.properties.periods[0].icon);

		$(".loading", $widget).fadeOut(function ()
		{
			$(".results", $widget).fadeIn();
		});
	}
	
	
	var getPos = function() {
		var data = $.Deferred();
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(data.resolve, data.reject);
		} else {
			data.reject({
				error: "Error getting geolocation"
			});
		}
		
		return data.promise();
	};
}