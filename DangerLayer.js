/**
 * Created by gagaus on 8/3/16.
 */

 define(['./worldwind.min'],
 function (WorldWind) {

     "use strict";
     var shapeConfigurationCallback = function (attributes, record) {
        var configuration = {};
        configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

        if (record.isPointType()) { // Configure point-based features (cities, in this example)
            configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

            configuration.attributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);

            if (attributes.values.pop_max) {
                var population = attributes.values.pop_max;
                configuration.attributes.imageScale = 0.01 * Math.log(population);
            }
        } else if (record.isPolygonType()) { // Configure polygon-based features (countries, in this example).
            configuration.attributes = new WorldWind.ShapeAttributes(null);

            // Fill the polygon with a random pastel color.
            configuration.attributes.interiorColor = new WorldWind.Color(
                0.375 + 0.5 * Math.random(), // RED
                0.375 + 0.5 * Math.random(), // GREEN
                0.375 + 0.5 * Math.random(), // BLUE
                1.0);

            // Paint the outline in a darker variant of the interior color.
            configuration.attributes.outlineColor = new WorldWind.Color(
                0.5 * configuration.attributes.interiorColor.red,
                0.5 * configuration.attributes.interiorColor.green,
                0.5 * configuration.attributes.interiorColor.blue,
                1.0);
        }

        return configuration;
    };

     function DangerLayer() {
         var shapefileLibrary = "https://worldwind.arc.nasa.gov/web/examples/data/shapefiles/naturalearth";

         var worldLayer = new WorldWind.RenderableLayer("Countries");
         var worldShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp");
         worldShapefile.load(null, shapeConfigurationCallback, worldLayer);

         //wwd.addLayer(worldLayer);
         return worldLayer;
     }


     return DangerLayer;

     // var TectonicPlateLayer = function () {
     //     WorldWind.RenderableLayer.call(this, "Blue Marble Image");
     //
     //     var surfaceImage = new WorldWind.SurfaceImage(WorldWind.Sector.FULL_SPHERE,
     //        './images/wms_plate_boundaries.png');
     //
     //     this.addRenderable(surfaceImage);
     //
     //     this.pickEnabled = false;
     //     this.minActiveAltitude = 3e6;
     // };
     //
     // TectonicPlateLayer.prototype = Object.create(WorldWind.RenderableLayer.prototype);
     //
     // return TectonicPlateLayer;
 });
