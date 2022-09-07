export const fileSaver = (fileName: string, body: string) => {
	var a = window.document.createElement("a");
	a.href = window.URL.createObjectURL(new Blob([body], {type: "text/xml"}));
	a.download = `${fileName}.kml`;

	// Append anchor to body.
	document.body.appendChild(a);
	a.click();

	// Remove anchor from body
	document.body.removeChild(a);
};

export const someString = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>KML TEMPLATE</name>
	<gx:CascadingStyle kml:id="style_highlight_mode">
		<Style>
			<IconStyle>
				<scale>1.2</scale>
				<Icon>
					<href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
				</Icon>
				<hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
			</IconStyle>
			<LabelStyle>
			</LabelStyle>
			<LineStyle>
				<color>ff2dc0fb</color>
				<width>6</width>
			</LineStyle>
			<PolyStyle>
				<color>40ffffff</color>
			</PolyStyle>
			<BalloonStyle>
				<displayMode>hide</displayMode>
			</BalloonStyle>
		</Style>
	</gx:CascadingStyle>
	<gx:CascadingStyle kml:id="style_normal_mode">
		<Style>
			<IconStyle>
				<Icon>
					<href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
				</Icon>
				<hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
			</IconStyle>
			<LabelStyle>
			</LabelStyle>
			<LineStyle>
				<color>ff2dc0fb</color>
				<width>4</width>
			</LineStyle>
			<PolyStyle>
				<color>40ffffff</color>
			</PolyStyle>
			<BalloonStyle>
				<displayMode>hide</displayMode>
			</BalloonStyle>
		</Style>
	</gx:CascadingStyle>

	<StyleMap id="styles">
		<Pair>
			<key>normal</key>
			<styleUrl>#style_normal_mode</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#style_highlight_mode</styleUrl>
		</Pair>
	</StyleMap>

	<!-- POINT TEMPLATE -->
	<Placemark id="05A2A1F68C240A277CB8"> <!-- ID needs to be unique -->
		<name>AUCA</name>				  <!-- Name is optional -->
		<styleUrl>#styles</styleUrl>

		<!-- POINT COORDINATE -->
		<Point>
			<coordinates>74.62743810000001,42.8110663,0</coordinates>
		</Point>
	</Placemark>


	<!-- PATH TEMPLATE -->
	<Placemark id="path">
		<name>Go home</name>
		<LookAt>
			<longitude>74.62789211470398</longitude> <!-- GOES FROM POINT'S LOCATION -->
			<latitude>42.81110449064843</latitude>   <!-- GOES FROM POINT'S LOCATION -->
			<altitude>700</altitude>	 			 <!-- CONSTANT -->
			<heading>0</heading>
			<tilt>0</tilt>
			<gx:fovy>35</gx:fovy>
			<range>400</range>
			<altitudeMode>absolute</altitudeMode>
		</LookAt>
		<styleUrl>#styles</styleUrl>
		<LineString>
			<!-- GOES COORDINATES FROM LOOP -->
			<coordinates>
				74.62748798954559,42.81092700029017,923.1575820207075 74.62771149447013,42.81077907778397,923.5622030687312 74.62790803497792,42.81077942301533,924.0123623249019 74.62786553599956,42.81113763712694,923.2983491050325 74.62799312618728,42.81118444242114,923.2418446231356 74.62783348047972,42.81157568539635,922.127391457512 74.62821183137032,42.81167716219984,922.2697597950909 74.62836103078273,42.81183742720295,922.2726447936684 
			</coordinates>
		</LineString>
	</Placemark>
</Document>
</kml>`;

export const getPosition = () => {
	let longitude: number = 0;
	let latitude: number = 0;

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	function success(pos: any) {
		var crd = pos.coords;

		if (crd.accuracy > 30) {
			getPosition();
		}

		console.log("Ваше текущее местоположение:");
		console.log(`Широта: ${crd.latitude}`);
		console.log(`Долгота: ${crd.longitude}`);
		console.log(`Плюс-минус ${crd.accuracy} метров.`);
	}

	function error(err: any) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);

	return {longitude, latitude};
};
