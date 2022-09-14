export const generateKMLString = (points: [number, number][], paths: [number, number, number][]) => {
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
        <Style id="yellowLineGreenPoly">
            <LineStyle>
                <color>7f00ffff</color>
                <width>4</width>
            </LineStyle>
            <PolyStyle>
                <color>7f00ff00</color>
            </PolyStyle>
        </Style> 
        <Placemark>
            <name>Линия вдоль земной поверхности</name>
            <description>Прозрачная зеленая стена с желтыми краями</description>
            <styleUrl>#yellowLineGreenPoly</styleUrl>
            <LineString>
                <extrude>1</extrude>
                <tessellate>1</tessellate>
                <altitudeMode>absolute</altitudeMode>
                <coordinates> ${paths.map((path, idx) => `${path[0]},${path[1]},${path[2]}\n `).join("")} </coordinates>
            </LineString> 
        </Placemark>
    </Document>
    </kml>
    `
}