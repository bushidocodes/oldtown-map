//Custom Classes
$(document).ready(function () {

    class Site {
        constructor(name, address, lat, lng, description) {
            var self = this;
            self.name = name;
            self.address = address;
            self.lat = lat;
            self.lng = lng;
            self.description = description;
        };
    };
    var infoWindow = null;

    // Behaviors
    initMap = function () {
        geocoder = new google.maps.Geocoder();
        self.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38.805, lng: -77.05 },
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        for (var i = 0; i < vm.sites().length; i++) {
            let site = vm.sites()[i];
            let marker = new google.maps.Marker({
                position: { lat: site.lat, lng: site.lng },
                map: map,
                title: site.name
            });
            marker.addListener('click', function () {
                generateInfoWindow(site,map,marker);
            });
        }
    }

    generateInfoWindow = function(site, map, marker) {
        if (infoWindow) {
            infoWindow.close();
        };
        infoWindow = new google.maps.InfoWindow({
            content: '<strong>' + site.name + '</strong>' + '<p>'+ site.description +'</p>'
        });
        infoWindow.open(map, marker);
    };

    //Knockout Functionality
    var ViewModel = function () {
        // Data
        var self = this;
        //site pulled from Frommer's at http://www.frommers.com/destinations/alexandria-va/623095
        self.sites = ko.observableArray([
            new Site("Ramsay House", "221 King St, Alexandria, VA 22314", 38.804628, -77.042357, ""),
            new Site("Carlyle House", "121 N Fairfax St, Alexandria, VA 22314", 38.805228, -77.042012, ""),
            new Site("Gadsby's Tavern", "134 N Royal St, Alexandria, VA 22314", 38.805554, -77.043619, "GW ate here"),
            new Site("Spite House", "523 Queen St, Alexandria, VA 22314", 38.807307, -77.045064, ""),
            new Site("Revolutionary War Cobblestones", "607 Princess St, Alexandria, VA 22314", 38.808553, -77.045503, ""),
            new Site("Robert E. Lee's Boyhood Home", "607 Oronoco Street, Alexandria, Virginia 22314", 38.809808, -77.045208, ""),
            new Site("Lee-Fendall House", "614 Oronoco St, Alexandria, VA 22314", 38.809437, -77.045725, ""),
            new Site("Lloyd House", "220 N Washington St, Alexandria, VA 22314", 38.807214, -77.046751, ""),
            new Site("Christ Church", "118 North Washington St, Alexandria, Virginia 22314", 38.806271, -77.047460, ""),
            new Site("Friendship Firehouse", "107 S Alfred St, Alexandria, VA 22314", 38.804955, -77.049491, ""),
            new Site("The Lyceum", "201 S Washington St, Alexandria, VA 22314", 38.803759, -77.047537, ""),
            new Site("Appomattox Statue", "201 S Washington St, Alexandria, VA 22314", 38.803911, -77.047210, ""),
            new Site("Market Square", "301 King St, Alexandria, VA 22314", 38.805406, -77.042894, ""),
            new Site("Stabler-Leadbeater Apothecary", "107 S Fairfax St, Alexandria, VA 22314", 38.804238, -77.042773, ""),
            new Site("Old Presbyterian Meeting House", "323 S Fairfax St, Alexandria, VA 22314", 38.801352, -77.043419, ""),
            new Site("Gentry Row", "212 Prince St, Alexandria, VA 22314", 38.803181, -77.042304, ""),
            new Site("The Athenaeum", "201 Prince St, Alexandria, VA 22314", 38.803438, -77.041821, ""),
            new Site("Captain's Row", "115 Prince St, Alexandria, VA 22314", 38.803433, -77.041098, ""),
            new Site("Torpedo Factory", "105 N Union St, Alexandria, VA 22314", 38.804892, -77.039802, ""),
        ]);
    };
    var vm = new ViewModel;

    ko.applyBindings(vm);

});