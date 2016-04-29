$(document).ready(function(){


  var map = L.map('map').setView([35.216173, -78.936768], 7);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


      var districtStyle = {
          "color": "#ff7800",
          "weight": 2,
          "opacity": 0.65
      };

      var newStyle = {
        "color":"blue",
        "weight": 2
      };

      function onEachFeature(feature, layer) {
        layer.setStyle(districtStyle);


      };

      makeDistricts();
      styleDistricts();

      function makeDistricts(){

        L.geoJson(geojsonFeatures, {
            onEachFeature: onEachFeature
          }).addTo(map);
      }; //make

      function styleDistricts(){
        L.geoJson(geojsonFeatures, {
        style: function(feature) {

          switch (feature.properties.District) {
              case 3: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 4: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 5: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 13: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 14: return {"color": "#dd0eb7",
                "weight": 0,
                "fillOpacity": 1};
              case 16: return {"color": "#607dde",
                "weight": 0,
                "fillOpacity": 1};
              case 20: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 21: return {"color": "#50cd7c",
                "weight": 0,
                "fillOpacity": 1};
              case 22: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 23: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 28: return {"color": "#ec8c97",
                "weight": 0,
                "fillOpacity": 1};
              case 32: return {"color": "#41ea55",
                "weight": 0,
                "fillOpacity": 1};
              case 37: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 38: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 40: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              case 49: return {"color": "blue",
                "weight": 0,
                "opacity": 0.65};
              default: return {
                "color": "red",
                "weight": 0,
                "opacity": 0.65 };
            }
          }
        }).addTo(map);
      }; //style

      // Disable drag and zoom handlers.
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.keyboard.disable();

      // Disable tap handler, if present.
      if (map.tap) map.tap.disable();


});
