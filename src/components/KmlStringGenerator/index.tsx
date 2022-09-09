export const generateKMLString = (points: [number, number][], paths: [number, number][]) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
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
        ${points.map((point, idx) =>
        `<Placemark id="${idx}"> <!-- ID needs to be unique -->
            <name>${idx + 1}</name>				  <!-- Name is optional -->
            <styleUrl>#styles</styleUrl>

            <Point>
                <coordinates>${point[0]}, ${point[1]}</coordinates>
            </Point>
        </Placemark>`)}
        
    
    
        <!-- PATH TEMPLATE -->
        <Placemark id="path">
            <name>PATH</name>
            <LookAt>
                <longitude>${paths[0][0]}</longitude> <!-- GOES FROM POINT'S LOCATION -->
                <latitude>${paths[0][1]}</latitude>   <!-- GOES FROM POINT'S LOCATION -->
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
                    ${paths.map((path, idx) => `${path[0]}, ${path[1]}, 700`)}  
                </coordinates>
            </LineString>
        </Placemark>
    </Document>
    </kml>
    `
}