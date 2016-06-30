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
    var markers = ko.observableArray();

    // Behaviors
    initMap = function () {
        geocoder = new google.maps.Geocoder();
        self.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38.806, lng: -77.053 },
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
                generateInfoWindow(site, map, marker);
            });
            markers.push(marker);
        }
    }

    ko.bindingHandlers.yourBindingName = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever any observables/computeds that are accessed change
            // Update the DOM element based on the supplied values here.
        }
    };

    ko.bindingHandlers.updateMarkers = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            clearInfoWindow();
            for (var i = 0; i < markers().length; i++) {
                let marker = markers()[i]
                let markerInFilteredSites = false;
                for (var j = 0; j < vm.filteredSites().length; j++) {
                    site = vm.filteredSites()[j];
                    if (marker.title === site.name) {
                        markerInFilteredSites = true;
                    };
                };
                if (markerInFilteredSites) {
                    if (marker.map !== map) marker.setMap(map);
                } else {
                    if (marker.map === map) marker.setMap(null);
                };
            }
        }
    };

    function clearInfoWindow() {
        if (infoWindow) {
            infoWindow.close();
        };
    };

    function generateInfoWindow(site, map, marker) {
        clearInfoWindow();
        infoWindow = new google.maps.InfoWindow({
            content: '<strong>' + site.name + '</strong>' + '<p>' + site.description + '</p>'
        });
        infoWindow.open(map, marker);
    };

    function bounce(marker, numberOfBounces) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            // The BOUNCE animation lasts 700ms, so calculate duration and then use setTimeout()
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () { marker.setAnimation(null); }, 700 * numberOfBounces);
        }
    }

    //Knockout Functionality
    var ViewModel = function () {
        // Data
        var self = this;
        self.searchString = ko.observable("");
        //site pulled from Frommer's at http://www.frommers.com/destinations/alexandria-va/623095
        //descriptions pulled form the Extraordinary Alexandria tourism site at http://www.visitalexandriava.com/things-to-do/historic-attractions-and-museums/?filter%5Bcategories.catid%5D=65&filter%5Bcategories.subcatid%5D%5B%24in%5D%5B0%5D=389&filter%5Brecid%5D%5B%24nin%5D%5B0%5D=2785&filter%5Brecid%5D%5B%24nin%5D%5B1%5D=2816&filter%5Bsortby%5D=rank%3D1%26sortcompany%3D1&options%5Blimit%5D=16&options%5Bskip%5D=0&options%5BloadMore%5D=false&options%5Bsort%5D%5Brank%5D=1&options%5Bsort%5D%5Bsortcompany%5D=1
        self.sites = ko.observableArray([
            new Site("Ramsay House and Visitor's Center", "221 King St, Alexandria, VA 22314", 38.804628, -77.042357, "Alexandria’s Visitor's Center was originally the home of William Ramsay, one of the three original Scottish settlers that settled the area in November 1748 and petitioned the House of Burgesses to establish a town."),
            new Site("Carlyle House", "121 N Fairfax St, Alexandria, VA 22314", 38.805228, -77.042012, "A Georgian Palladian manor house built in 1753 by merchant and city founder John Carlyle. Here, five royal governors and General Braddock met to discuss funding of the French and Indian War. Daily tours, youth programs, special events, exhibits and lectures offer visitors a chance to experience eighteenth century life through the eyes of one man and his family as he made the journey from English citizen to American patriot. The story of Carlyle House parallels the early history of Alexandria, colonial Virginia, and America and is brought to life through costumed interpreters, guides and fun family programs. Tues.-Sat. 10 a.m.-4 p.m.; Sun. noon-4 p.m. (tours on the hour and half hour, last tour at 4)."),
            new Site("Gadsby's Tavern Museum", "134 N Royal St, Alexandria, VA 22314", 38.805554, -77.043619, "Discover Alexandria’s five-star hotel of the 18th century! The Museum consists of the c. 1785 tavern and the 1792 City Tavern and Hotel. Both were constructed by John Wise but made famous by tavernkeeper John Gadsby. His establishment was the center of political, business, and social life in Alexandria and in the new federal city of Washington, D.C. The City Tavern’s Ballroom was the location of George Washington’s Birthnight Ball in 1798 and 1799, as well as Thomas Jefferson’s Inaugural Banquet in 1801. The museum offers tours, programs and special events. Apr.-Oct.: Sun. & Mon. 1-5 p.m., Tues.-Sat. 10 a.m.-5 p.m.; Nov.-March.: Wed.-Sat. 11 a.m.-4 p.m., Sun. 1-4 p.m"),
            new Site("Spite House", "523 Queen St, Alexandria, VA 22314", 38.807307, -77.045064, "The Spite House was built by John Hollensbury in 1830 to keep horse drawn wagons and loiterers out of his alley. At seven feet wide and 25 feet deep, the home is 325 square feet over two floors."),
            new Site("Revolutionary War Cobblestones", "607 Princess St, Alexandria, VA 22314", 38.808553, -77.045503, "The 600 block of Princess Street retains the historic Revolutionary War cobblestone streets that once lined much of Old Town. Local folklore says the cobblestones were brought from England in ships as ballast and were laid by captured Hessians, the German mercenaries hired to fight for the British during the Revolutionary War."),
            new Site("Robert E. Lee's Boyhood Home", "607 Oronoco Street, Alexandria, Virginia 22314", 38.809808, -77.045208, "Robert E. Lee left this home that he loved so well to enter West Point. After Appomattox he returned and climbed the wall to see if the snowballs were in bloom. George Washington dined here when it was the home of William Fitzhugh, Lee’s kinsman and his wife’s grandfather. Lafayette visited here in 1824."),
            new Site("Lee-Fendall House", "614 Oronoco St, Alexandria, VA 22314", 38.809437, -77.045725, 'The Lee-Fendall House is a historic house museum and garden located in Old Town Alexandria, Virginia. Since its construction in 1785 the house has served as home to thirty-seven members of the Lee family (1785–1903), hundreds of convalescing Union soldiers (1863–1865), the prominent Downham family (1903–1937), and powerful labor leader John L. Lewis (1937–1969).'),
            new Site("Lloyd House", "220 N Washington St, Alexandria, VA 22314", 38.807214, -77.046751, "Constructed around 1796-1797, Lloyd House is one of the best examples of Alexandria’s late eighteenth-century Georgian style, and one of five buildings of the Georgian style remaining in the city. Lloyd House is particularly important to the streetscape of Washington Street, part of the George Washington Memorial Parkway."),
            new Site("Christ Church", "118 North Washington St, Alexandria, Virginia 22314", 38.806271, -77.047460, "This beautiful English country-style church was built between 1767-1773 and was attended by George Washington & Robert E. Lee. Tours available Mon.-Sat. 9 a.m.-4 p.m.; Sun. 2-4 p.m., with Sun. morning and evening worship services."),
            new Site("Friendship Firehouse", "107 S Alfred St, Alexandria, VA 22314", 38.804955, -77.049491, "Established in 1774, the Friendship Fire Company was the first volunteer fire company in Alexandria. The current firehouse was built in 1855 and now houses historic firefighting equipment and exhibits. Sat. and Sun. 1-4 p.m."),
            new Site("Lyceum", "201 S Washington St, Alexandria, VA 22314", 38.803759, -77.047537, "The 1839 Greek Revival building serves as the City's history museum. An ongoing exhibition tells the story of Alexandria, once one of the busiest ports in America. Archaeological finds, old photographs, maps, original art works and a wide variety of historic artifacts provide the visitor with a picture of the City's past. Changing exhibitions explore special themes, people, places or events within Alexandria's history. Mon.-Sat. 10 a.m.-5 p.m., Sun. 1-5 p.m."),
            new Site("Appomattox Statue", "201 S Washington St, Alexandria, VA 22314", 38.803911, -77.047210, "Appomattox is a bronze statue created by sculptor M. Caspar Buberl and commissioned and erected by the Robert E. Lee camp of the United Confederate Veterans in 1889. The form of the soldier was designed by John Adams Elder and shows a lone Confederate viewing the aftermath of the battle of Appomattox Court House, where Gen. Robert E. Lee ultimately surrendered to Union general Ulysses S. Grant. The soldier is facing south, the direction which the soldiers from Alexandria would have marched to meet their Union foes in battle in 1861, and also the direction of the former CSA."),
            new Site("Alexandria Market House & City Hall", "301 King St, Alexandria, VA 22314", 38.805406, -77.042894, "The Alexandria City Hall also known as the Alexandria Market House & City Hall, in Alexandria, Virginia, is a building built in 1871 and designed by Adolph Cluss. It was listed on the U.S. National Register of Historic Places in 1984. The original city hall was something of a complex, containing the Masonic Lodge, court facility, and both the principal police and fire stations of Alexandria. Market stalls were once situated on the first floors of the west and north wings and in the courtyard which are absent today. A new building was constructed in 1817 but after an extensive fire in 1871 it was rebuilt as a replica of the former building."),
            new Site("Stabler-Leadbeater Apothecary", "107 S Fairfax St, Alexandria, VA 22314", 38.804238, -77.042773, "The Stabler-Leadbeater Apothecary Museum was a family business founded in 1792 and operated in this location from 1805 until 1933.  It represents one of Alexandria's oldest continuously run businesses that combined retailing, wholesaling, and manufacturing. The museum boasts a vast collection of herbal botanicals, handblown glass, and medical equipment.  It also has a spectacular collection of archival materials, including journals, letters and diaries, prescription and formula books, ledgers, orders and invoices. The names of famous customers appear in these documents, including Martha Washington, Nelly Custis and Robert E. Lee."),
            new Site("Old Presbyterian Meeting House", "323 S Fairfax St, Alexandria, VA 22314", 38.801352, -77.043419, "Erected in 1775, the Old Presbyterian Meeting House was the place of worship of the Scottish merchants that founded Alexandria. The Burial Ground adjoining the Church is the final resting place of many patriots of the Revolutionary War, including the Tomb of an Unknown Soldier of the American Revolution, John Carlyle, founder and first overseer of Alexandria; Dr. James Craik, Physician General of the Continental Army and close friend of George Washington, and William Hunter, Jr., mayor of Alexandria and founder of the St. Andrew's Society."),
            new Site("Gentry Row", "212 Prince St, Alexandria, VA 22314", 38.803181, -77.042304, "Gentry Row has many historic home that were once owned by prominent figures as William Fairfax, one of Alexandria's founding trustees, and Dr. James Craik, surgeon-general during the American Revolution as well as George Washington's personal physician."),
            new Site("Athenaeum", "201 Prince St, Alexandria, VA 22314", 38.803438, -77.041821, "A Greek Revival building built in 1851, it was home to the Bank of the Old Dominion, where Robert E. Lee did his banking. During the Civil War occupation of Alexandria, Federal troops commandeered the building, which they used as Commissary Headquarters for the Union Army. After the Battle of Bull Run/First Manassas, the building served as a triage facility for wounded Union soldiers. One of the few remaining examples of neo-classical Greek revival architecture in historic Alexandria, the Athenaeum is on both the Virginia Trust and National Register of Historic Places. Today it is an art gallery and home of the Northern Virginia Fine Arts Association. Open  Thurs.-Sun. noon-4 p.m. Closed major holidays."),
            new Site("Captain's Row", "115 Prince St, Alexandria, VA 22314", 38.803433, -77.041098, "Captain’s Row is a line of homes once heavily inhabited by sea captains in the days when Alexandria was a major commercial port and clipper ships and brigs lined the Potomac waterfront. The homes were mostly rebuilt in 1827 after a fire. The street retains the historic Revolutionary War cobblestone streets that once lined much of Old Town. Local folklore says the cobblestones were brought from England in ships as ballast and were laid by captured Hessians, the German mercenaries hired to fight for the British during the Revolutionary War."),
            new Site("Alexandria Black History Museum", "115 Prince St, Alexandria, VA 22314", 38.812054, -77.048045, "Originally the segregated library for Alexandria's African American residents, the museum documents the local and national history, culture and contributions of Black America. Tues.-Sat. 10 a.m.-4 p.m. The Museum's permanent exhibition, Securing the Blessings of Liberty, seeks to document how the area African Americans survived slavery, helped to destroy it and eventually helped shape the community that we know today."),
            new Site("Torpedo Factory", "105 N Union St, Alexandria, VA 22314", 38.804892, -77.039802, "The Torpedo Factory Art Center was once a torpedo factory!<br>The U.S. Naval Torpedo Station opened in 1919 and operated for five years before becoming munitions storage. With the onset of WWII, t produced Mark III and Mark IV torpedoes. By the war's end, it was converted to government storage until the City of Alexandria bought it in 1969. In 1974, a group of visionary artists proposed to renovate part of the neglected factory into usable studio spaces. One of the country's earliest examples of creative reuse of industrial space, the Torpedo Factory Art Center became a catalyst for the revitalization of the Potomac riverfront and the historic preservation of Old Town Alexandria as a thriving visitor destination. Today, it continues to be a prototype for other visual arts organizations around the world."),
        ]);

        //This filter implementation is based on Ryan Niemeyer's Array Filtering section found at http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
        self.filteredSites = ko.computed(function () {
            if (self.searchString() === "") {
                return self.sites();
            } else if (self.searchString() !== "") {
                var filter = self.searchString().toLowerCase();
                return ko.utils.arrayFilter(self.sites(), function (site) {
                    var siteNoCase = site.name.toLowerCase();
                    return siteNoCase.includes(filter);
                });
            };
        });


        // Behavior
        self.selectSite = function (site) {
            //I want to find the marker.title element in self.markers() that matches
            var selectedSite = jQuery.grep(markers(), function (marker) {
                return (marker.title === site.name);
            });
            bounce(selectedSite[0], 2);
            generateInfoWindow(site, map, selectedSite[0]);
        };
    }; //endViewModel

    var vm = new ViewModel;
    ko.applyBindings(vm);
});