// Make a new map in #map
var main = Map('map', {
    api: 'http://a.tiles.mapbox.com/v3/integral.map-asmf5yqy.jsonp',
    zoomRange: [6, 11],
    features: [
        'zoombox',
        'zoompan',
        'legend',
        'share'
    ]
}, App);
    
// Set up layer switch
main.layers({
    'afg-journalists': {
        api: 'http://a.tiles.mapbox.com/v3/internews.afg-journalists.jsonp',
        toggle: true
    },
    'afg-media-outlets': {
        api: 'http://a.tiles.mapbox.com/v3/internews.afg-media-outlets.jsonp',
        toggle: true
    },
    'afg-security-2011': {
        api: 'http://a.tiles.mapbox.com/v3/internews.afg-security-2011.jsonp',
        toggle: true
    },
    'afg-safety-index': {
        api: 'http://a.tiles.mapbox.com/v3/internews.afg-safety-index.jsonp',
        toggle: true
    }
});

function App() {
    var m = MM_map,
        filter = 'total',
        annuals = [];

    mapbox.converters.googledocs('0ApRKQU2Gi7CrdHBObkhYTEdLUGxvZjF3bXo3REppU0E', 'od5', function(features) {

        $('#map').removeClass('loading');

        // List years with data
        _.each(features[0].properties, function(value, key) {
            var match = key.match(/^sum([0-9]{4})$/);
            if (match) annuals.push({ year: match[1] });
        });

        // Add year filter links
        var years = _.pluck(annuals, 'year'),
            allYears = [];
        for (var i = years[0]; i <= years[years.length - 1]; i++) {
            if (!(_.include(years, i.toString()))) {
                annuals.push({ year: i.toString(), hasData: false });
            }
        }
        annuals = _(annuals).sortBy(function(n) { return n.year; });
        _.map(annuals, yearList);
        App.annuals = annuals;
        
        // Set site title
        $('h1 a span').text(annuals[0].year + '-' + annuals[annuals.length - 1].year);

        App.ml = mmg()
            .factory(factory)
            .features(features);

        m.addLayer(App.ml);
        m.setCenter(m.center());

        $.ajax({
            url: 'https://spreadsheets.google.com/feeds/list/0ApRKQU2Gi7CrdHBObkhYTEdLUGxvZjF3bXo3REppU0E/ocl/public/values?alt=json-in-script',
            dataType: 'jsonp',
            success: buildTable
        });
    });

    // Build markers
    var formatter = {};
    function factory(x) {
        var year = (filter.match(/^sum([0-9]{4})$/)) ? filter.match(/^sum([0-9]{4})$/)[1] : false;

        var d = document.createElement('div'),
            marker = document.createElement('div');

        var total = x.properties[filter];
        var bgoffset = 0, size = 0;
        
        // Classification scale
        if (total > 0 && total <=5) {
            bgoffset = -300;
            size = 15;
        }
        if (total > 5 && total <=14) {
            bgoffset = -200;
            size = 30;
        }
        if (total > 14 && total <=30) {
            bgoffset = -100;
            size = 45;
        }
        if (total > 25) {
            bgoffset = 0;
            size = 60;
        }

        marker.setAttribute('class', 'marker');
        marker.setAttribute('style', 
            'width: ' + size + 'px; ' +
            'height: ' + size + 'px; ' +
            'left: ' + size / -2 + 'px; ' +
            'top: ' + size / -2 + 'px; ' +
            'line-height: ' + size + 'px; ' +
            'background-position: ' + bgoffset + 'px 100%'
        );
        marker.innerHTML = (total > 0) ? total : '';
    
        // Tooltip
        // check for the highlight year state, pull data from x
        formatter[x.properties.provname] = function() {
            var marker = '',
                markerOffset = 0,
                markerLocation = '',
                shortYears = [],
                filters = [];

            if (year) {
                markerLocation = (parseInt((year + '').substr((year + '').length - 2), 10) - 1);
        
                if (year === annuals[0].year) {
                    markerOffset = 6;
                } else if (year === annuals[annuals.length - 1].year) {
                    markerOffset = (x.properties[filter].length === 2) ? -8 : -5;
                }

                if (parseInt(x.properties[filter], 10) > 30) {
                    markerOffset += ':-4';
                }

                marker = '|o,FFFFFF,0,' + 
                    markerLocation + ',20,,:' + 
                    markerOffset + '|t<%=' + filter + '%>,282828,0,' + 
                    markerLocation + ',12,,hv:0:0';
            }

            _.each(App.annuals, function(val) { 
                shortYears.push(val.year.slice(-2));
                if (x.properties['sum' + val.year]) {
                    filters.push('<%= sum' + val.year + '%>');
                } else {
                    filters.push('0');
                }
            });
            var shortYear = shortYears.join('|');
            filters = filters.join(',');

            return '<div class="wax-tooltip"><div class="int_total">' +
                '<h2>Province: <%= provname %></h2>' +
                '<p>Incidents of Violence: <strong><%= ' + filter + '%></strong></p>' +
                '<div class="int_chart">' +
                    '<p>Incidents Over Time:</p>' +
                    '<div style="background: ' +
                        'url(http://chart.apis.google.com/chart?' + 
                            'chf=bg,s,ffffff00' +
                            '&chxs=0,cccccc,11.5,0,l,cccccc|1,cccccc,11.5,0,l,cccccc' +
                            '&chxl=0:|0|10|20|30|1:|' + shortYear + 
                            '&chxr=0,0,30' +
                            '&chxt=y,x&chm=B,ef4e4e88,0,0,0' + marker + 
                            '&chbh=a,0,18' +
                            '&chs=340x175' +
                            '&cht=lc' +
                            '&chco=ef4e4e' +
                            '&chds=0,30' +
                            '&chd=t:' + filters +
                            '&chxtc=0,-350' +
                            '&chg=0,6.66667,1,.5&chma=0,0,10,0' +
                        '); width: 340px; height: 175px;">' +
                    '</div>' +
                '</div>' +
                '<hr>' +
                '<div class="int_extras">' +
                    '<h2>Province Details</h2>' +
                    '<p>Population: <strong><%= population %></strong></p>' +
                    '<p>Adult Literacy: <strong><%= adultliteracy %>%</strong></p>' +
                    '<p>NATO Lead Nation: <strong><%= regionalcommand %></strong></p>' +
                '</div>' +
            '</div></div>';
        };

        marker.onmouseover = function() {
            $('.wax-tooltip').remove();
            $('body').append(_.template(formatter[x.properties.provname](), x.properties));
        };
        marker.onmouseout = function() {
            $('.wax-tooltip').remove();
        };
        marker.onclick = function() {
            try {
                filterProvince(
                    x.properties.provname
                        .toLowerCase()
                        .replace(/^\s\s*/, '')
                        .replace(/\s\s*$/, ''),
                    year
                );
            } catch(e) {
                return false;
            }
        };
        try {
            marker.addEventListener('touchstart', function() {
                $('.wax-tooltip').remove();
                $('body').append(_.template(formatter[x.properties.provname](), x.properties));
                try {
                    filterProvince(
                        x.properties.provname
                            .toLowerCase()
                            .replace(/^\s\s*/, '')
                            .replace(/\s\s*$/, ''),
                        year
                    );
                } catch(e) {
                    return false;
                }
            });
            document.getElementById('map').addEventListener('touchmove', function() {
                $('.wax-tooltip').remove();
            });
        } catch(e) {
        }
        marker.style.pointerEvents = 'all';
        d.appendChild(marker);
        d.style.position = 'absolute';
        return d;
    }

    //Province filter
    function filterProvince(province, year) {
        if (year) {
            var cnt = 1;
            $('<h2 class="ovheader">' + year + ' Overview: ' + province + '</h2>').replaceAll('.ovheader');
            $('tr.vjdata.'+year).addClass('hider');
            $('tr.vjdata.'+year).each(function (i) {
                if ($(this).hasClass(province)) {
                    $(this).removeClass('hider');
                    cnt++;
                    if (cnt%2 === 0) {
                        $(this).css('background-color', '#353535');
                    } else {
                        $(this).css('background-color', '#282828');
                    }
                }
            });
        }
    }

    function yearList(item) {

        // Year Selection
        var hasData = item.hasData === false ? 'no-data' : 'data';
        $('<li class="' + hasData + '"><a href="' + item.year + '">' + item.year + '</a></li>').appendTo('ul.annuals').click(function (e) {
            var year = item.year;

            $('.wax-tooltip').remove();

            if ($(this).hasClass('active')) {
                return false;
            } else {
                var activePoints = 'jv-afg-' + item.year;
                e.preventDefault();
                if (item.hasData === false) return;
                $('ul.annuals li.active, ul.annuals li a.active').removeClass('active');
                $(this).addClass('active');
                var selectedOverlay = $('ul#overlay-select li.active a').attr('id');

                // Populate table data
                $('<h2 class="ovheader">' + item.year + ' Overview</h2>').replaceAll('.ovheader');
                $('#table-wrapper table').removeClass('hider');
                $('tr.vjdata').addClass('hider');
                $('#table-wrapper tr.' + item.year).removeClass('hider');
                $('#table-wrapper tr.' + item.year + ':even').css('background-color', '#353535');

                // let the tablesorter know we made a update
                $('#table-wrapper table').trigger('update');
                $('tr.vjdata.'+year).each(function (i) {
                    if (i%2 === 0) {
                        $(this).css('background-color', '#353535');
                    } else {
                        $(this).css('background-color', '#282828');
                    }
                });

                var layers = ['afghanistan-hillshades',
                selectedOverlay, 'afghanistan-english-borders', 'jv-afg-' + item.year];
                var cleanLayers = _.compact(layers);

                layers = cleanLayers.join(',');

                filter = 'sum' + item.year;
                App.ml.factory(factory);
            }
        });
    }

    $('li.all-data a').click(function (e) {
        e.preventDefault();
        var year = 0,
            selectedOverlay = $('ul#overlay-select li.active a').attr('id'),
            layers = [
                'afghanistan-hillshades',
                selectedOverlay,
                'afghanistan-english-borders',
                'jv-afg-total'
            ],
            cleanLayers = _.compact(layers),
            activePoints = 'jv-afg-total';

        $('ul.annuals li').removeClass('active');
        layers = cleanLayers.join(',');

        $(this).parent().addClass('active');
        $('#table-wrapper table').addClass('hider');
        $('.ovheader').addClass('hider');

        filter = 'total';
        App.ml.factory(factory);
    });

    function buildTable(data) {

        $('.loading').removeClass('loading');

        //Build yearly data table
        $.each(data.feed.entry, function (key, val) {
            var content = '<tr class="vjdata ' + val.gsx$year.$t + ' ' + val.gsx$month.$t + ' ' + val.gsx$incidentprovince.$t.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '') + ' hider"><td>' + val.gsx$date.$t + '</td><td>' + val.gsx$gender.$t + '</td><td>' + val.gsx$occupation.$t + '</td><td>' + val.gsx$organization.$t + '</td><td>' + val.gsx$incidenttype.$t + '</td><td>' + val.gsx$incidentprovince.$t + '</td><td>' + val.gsx$incidentreason.$t + '</td><td class="last">' + val.gsx$suspectedattacker.$t + '</td></tr>';
            $('#table-wrapper table tbody').append(content);
        });

        var gender = _(data.feed.entry).chain().map(function (val) {
            return val.gsx$gender.$t;
        }).flatten().reduce(function (counts, word) {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {}).value();

        var incidentsPerGender = _(data.feed.entry).chain().map(function (val) {
            // Calculate the value of gender against incident type
            return val.gsx$gender.$t + val.gsx$incidenttype.$t;
        }).flatten().reduce(function (counts, word) {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {}).value();

        //Big Numbers
        $('#bnTotal').html($('tr').size() - 1);

        var yearValues = _(_.range(
            parseInt(App.annuals[0].year, 10),
            parseInt(App.annuals[App.annuals.length - 1].year, 10) + 1
        )).map(function (m, i) {
            return {
                name: m,
                value: $('tr.' + m).size()
            };
        });

        var highYear = _(yearValues).max(function (m) {
            return m.value;
        });

        var monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        var monthValues = _(monthNames).map(function (m, i) {
            return {
                name: m,
                value: $('tr.' + (i + 1)).size()
            };
        });

        var highMonth = _(monthValues).max(function (m) {
            return m.value;
        });

        var highProvince = _.chain(data.feed.entry)
            .groupBy(function(province) {
                return province.gsx$incidentprovince.$t
                    .toLowerCase()
                    .replace(/^\s\s*/, '')
                    .replace(/\s\s*$/, '');
            })
            .map(function (val, key) {
                return {
                    name: key,
                    value: $('tr.' + key).size()
                };
            })
            .max(function (m) {
                return m.value;
            }).value();

        var highOrganizations = _.chain(data.feed.entry)
            .groupBy(function(organization) {
                return organization.gsx$organization.$t
                    .replace(/^\s\s*/, '')
                    .replace(/\s\s*$/, '');
            })
            .map(function(val, key) {
                return {
                    name: key,
                    value: val.length
                };
            })
            .sortBy(function(organization) {
                return organization.value;
            })
            .last(5).value().reverse();

        $('#bnMonth').html(highMonth.name   + ' (' + highMonth.value    + ')');
        $('#bnYear').html(highYear.name     + ' (' + highYear.value     + ')');
        $('#bnProv').html(highProvince.name + ' (' + highProvince.value + ')');
        _.each(highOrganizations, function(organization) {
            $('#bnOrgs').append(
                '<li class="smallnum">' + organization.name + ' (' + organization.value + ')</li>'
            );
        });

        // Graphs
        var shortYear = [];
        _.each(App.annuals, function(val) {
            shortYear.push(val.year.slice(-2));
        });
        shortYear = shortYear.join('|');

        var incidentPerYear = '<img src="http://chart.apis.google.com/chart?' +
            'chxl=0:|0|20|40|60|80|1:|' + shortYear + 
            '&chxs=0,282828|1,282828' +
            '&chxr=0,0,80' +
            '&chxt=y,x' +
            '&chm=N*fs*,282828,0,-1,13,,h::4' +
            '&chbh=a,0,21' +
            '&chs=430x225' +
            '&cht=bvg' +
            '&chco=ef4e4e' +
            '&chds=0,80' +
            '&chd=t:' + _.pluck(yearValues, 'value').join(',') + 
            '&chg=0,25,5,0" ' +
            'width="430" ' +
            'height="225" ' +
            'alt="Image of Yearly Incidents of Violence Against Journalists" />';

        $('#yearly-chart h6 span').text(
            ', ' + App.annuals[0].year + '-' + App.annuals[App.annuals.length - 1].year
        );
        $('#incident-per-year').html(incidentPerYear);

        var incidentVsGender = '<img src="http://chart.apis.google.com/chart?' +
            'chxs=0,282828|1,282828' +
            '&chxt=y' +
            '&chbh=a,8' +
            '&chs=430x225' +
            '&cht=bvs' +
            '&chco=EF4E4E,63aece' +
            '&chg=0,14.26,5,0' +
            '&chds=0,140' +
            '&chxr=0,0,140' +
            '&chbh=21,54' +
            '&chm=N*fs*,ffffff,0,-1,13,,h::-14|N*fs*,282828,1,-1,13,,h::4' + 
            '&chd=t:' + 
                incidentsPerGender.MaleThreatened + ',' + 
                incidentsPerGender.MaleBeaten + ',' + 
                incidentsPerGender.MaleArrested + ',' + 
                incidentsPerGender.MaleKilled + ',' + 
                incidentsPerGender.MaleKidnapped + ',' + 
                incidentsPerGender.MaleInjured + '|' + 
                incidentsPerGender.FemaleThreatened + ',' + 
                incidentsPerGender.FemaleBeaten + ',' + 
                incidentsPerGender.FemaleArrested + ',' + 
                incidentsPerGender.FemaleKilled + ',' + 
                incidentsPerGender.FemaleKidnapped + ',' + 0 + 
            '&chdl=Male&nbsp;(' + gender.Male + ')|Female&nbsp;(' + gender.Female + ')' +
            '&chdlp=t' +
            '&chdls=282828,12" ' +
            'width="430" ' +
            'height="225" ' +
            'alt="Type of Incident v.Gender" />';

        $('#incident-v-gender').html(incidentVsGender);
    }
}

/*$(function () {

    $.tablesorter.defaults.widgets = ['zebra'];
    $('#table-wrapper table').tablesorter();

    //Feedback
    $('#feedback a.feedback').click(function (e) {
        e.preventDefault();
        $(this).next('.contents').slideToggle(1);
    });

    //Modal Popup box for data
    $('#header a.notes').bind('click', openModal);

    function openModal() {
        $('#overlay, #modal').fadeIn('fast');
        return false;
    }

    if (location.hash === '#notes') {
        openModal();
    }

    $('#modal a[href$=#close]').click(function (e) {
        e.preventDefault();
        $('#overlay, #modal').fadeOut(1);
    });
});*/