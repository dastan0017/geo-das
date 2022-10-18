import { IPath, IPoint } from "../../App"

export const generateKMLString = (points: IPoint[], paths: IPath[], fileName: string = "KML FILE") => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
    <Document>
        <name>${fileName}</name>
        <Folder>
            <name>${fileName}</name>
            <open>1</open>
            <!-- POINT TEMPLATE -->
            ${points.map((point, idx) =>
        `<Style id="point_style_${idx}">
                <IconStyle>
                    <Icon>
                        <href>${point.icon}</href>
                    </Icon>
                </IconStyle>
            </Style>
            <Placemark> <!-- ID needs to be unique -->
                <name>${point.name}</name>
                <description>${point.description}</description>
                <styleUrl>#point_style_${idx}</styleUrl>

                <Point>
                    <coordinates>${point.longitude},${point.latitude},0</coordinates>
                </Point>
            </Placemark>`)}
            

            <!-- PATH TEMPLATE -->
            ${paths.map((path, idx) => {
            // KML file reads color with this format (AABBGGRR) not as usual (RRGGBB)
            const alpha = "ff"
            let color: string = path.lineColor.replace("#", "");
            color = alpha + color.substring(4, 6) + color.substring(2, 4) + color.substring(0, 2);
            console.log("kml Color: ", color)

            return `<Style id="path_style_${idx}">
                    <LineStyle>
                        <color>${color}</color>
                        <width>${path.lineWidth}</width>
                    </LineStyle>
                    <PolyStyle>
                        <color>7f00ff00</color>
                    </PolyStyle>
                </Style>
                <Placemark>
                    <name>${path.name}</name>
                    <description>${path.description}</description>
                    <styleUrl>#path_style_${idx}</styleUrl>

                    <LineString>
                        <extrude>1</extrude>
                        <tessellate>1</tessellate>
                        <coordinates> 74.65704993050124,42.65249314001015,0 74.65849202708142,42.65235746027895,0 74.65936081887294,42.65234086345829,0 74.65996319241982,42.65231916423107,0 74.66139658334727,42.65228603279965,0 </coordinates>
                    </LineString>
                </Placemark>`
        })}
        </Folder>    
    </Document>
    </kml>
    `
}