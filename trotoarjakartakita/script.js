$(document).ready(function() {
    $(".pkl-cluster, .parkir-cluster").hide();
    /*
     * Display per month or per day
     * set period to :
     * - "DAY" -> per day
     * - "MONTH" -> per month
     * - "HARI"
     */
    var period = "HARI";
    Date.prototype.format = function(mask, utc) {
        return dateFormat(this, mask, utc);
    };
    // globalvariable
    var dataMap;
    var heat;
    var marker = [];
    var heatmapmarker = [];
    var datapopulation = [];
    var neighborhood = [];
    var kml
    var totpel = [0, 0, 0, 0];
    var totpkl = [0, 0, 0, 0];
    var totparkir = [0, 0, 0, 0];
    var totkem = [0, 0, 0, 0];
    var seninpel = 10;
    var seninpkl = 46;
    var seninliar = 30;
    var selasapel = 10;
    var selasapkl = 54;
    var selasaliar = 28;
    var rabupel = 13;
    var rabupkl = 38;
    var rabuliar = 46;
    var kamispel = 10;
    var kamispkl = 29;
    var kamisliar = 21;
    var jumatpel = 9;
    var jumatpkl = 58;
    var jumatliar = 34;
    var sbtpel = 10;
    var sbtpkl = 37;
    var sbtliar = 31;
    var sunpel = 12;
    var sunpkl = 24;
    var sunliar = 23;
    // draw statistic
    function drawstat() {
        Highcharts.setOptions({
            colors: ['#f59630', '#72af26', '#38a9db', '#d53e2a', '#FFFF00', '#696969', '#ADD8E6', '#3CB371']
        });
        // FIRST PIE CHART POPULATION
        Highcharts.chart('population_chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Jumlah Laporan Setiap Atribut Pelanggaran, Oktober 2017 s.d. Januari 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Persentase',
                colorByPoint: true,
                data: datapopulation
            }]
        });
        // SECOND PIE CHART
        Highcharts.chart('neighborhood_chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Jumlah Laporan per Kecamatan, Oktober 2017 s.d. Januari 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Persentase',
                colorByPoint: true,
                data: neighborhood
            }]
        });
        // THIRD STACK CHART
        Highcharts.chart('stack_total_chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total Laporan, Oktober 2017 s.d. Januari 2018'
            },
            xAxis: {
                categories: ['Oktober 2017', 'November 2017', 'Desember 2017', 'Januari 2018']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Laporan'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'Motor',
                data: totpel
            }, {
                name: 'Pedagang Kaki Lima',
                data: totpkl
            }, {
                name: 'Parkir Liar',
                data: totparkir
            }, {
                name: 'Kemacetan',
                data: totkem
            }]
        });
    }
    //Fourth Heatmap Chart
    Highcharts.chart('heatmapchart', {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1
        },
        title: {
            text: 'Heatmap Laporan per Hari (Oktober 2017 s.d. Januari 2018)'
        },
        xAxis: {
            categories: ['Motor', 'Kaki Lima Liar', 'Parkir Liar']
        },
        yAxis: {
            categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            title: null
        },
        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> dilaporkan terjadi sebanyak <br><b>' + this.point.value + '</b> kali pada hari <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
        series: [{
            name: 'Heatmap pelaporan',
            borderWidth: 1,
            data: [
                [0, 0, seninpel],
                [0, 1, selasapel],
                [0, 2, rabupel],
                [0, 3, kamispel],
                [0, 4, jumatpel],
                [0, 5, sbtpel],
                [0, 6, sunpel],
                [1, 0, seninpkl],
                [1, 1, selasapkl],
                [1, 2, rabupkl],
                [1, 3, kamispkl],
                [1, 4, jumatpkl],
                [1, 5, sbtpkl],
                [1, 6, sunpkl],
                [2, 0, seninliar],
                [2, 1, selasaliar],
                [2, 2, rabuliar],
                [2, 3, kamisliar],
                [2, 4, jumatliar],
                [2, 5, sbtliar],
                [2, 6, sunliar]
            ],
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]
    });
    //FIFTH PARALLEL COORDINATES CHART
    $.getJSON('pcpfix.json', function(data) {
        Highcharts.chart('parallelchart', {
            chart: {
                type: 'spline',
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 2
                }
            },
            title: {
                text: 'Pola Pelanggaran (Oktober 2017 s.d. Januari 2018)'
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0
                            }
                        }
                    },
                    events: {
                        mouseOver: function() {
                            this.group.toFront();
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' + '{series.name}: <b>{point.formattedValue}</b><br/>'
            },
            xAxis: {
                categories: ['Kategori Pelaporan', 'Lokasi', 'Hari', 'Jam', 'Status'],
                offset: 10
            },
            yAxis: [{
                categories: ['Kaki Lima Liar', 'Parkir Liar', 'Motor']
            }, {
                categories: ['Kampung Bali', 'Kemayoran', 'Cideng', 'Gunung Sahari Selatan', 'Kebon Melati', 'Cempaka Putih Timur'
                , 'Gelora', 'Cikini', 'Johar Baru', 'Sumur Batu', 'Pegangsaan', 'Kebon Kacang', 'Pasar Baru', 'Kebon Sirih', 'Gondangdia'
                , 'Mangga Dua Selatan', 'Karet Tengsin', 'Kebon Kelapa', 'Bendungan Hilir', 'Petojo Selatan', 'Kenari', 'Menteng'
                , 'Gunung Sahari Utara', 'Petojo Utara', 'Paseban', 'Kampung Rawa', 'Kebon Kosong', 'Petamburan', 'Rawasari'
                , 'Utan Panjang', 'Senen', 'Gambir', 'Harapan Mulya', 'Serdang', 'Cempaka Putih Barat', 'Galur', 'Kartini'
                , 'Kramat', 'Duri Pulo', 'Bungur', 'Tanah Tinggi']
            }, 	{
                categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
            },  {
                categories: ['0-6', '6-12', '12-18', '18-24']
            },	{
                categories: ['Completed', 'Wait', 'Process']
            }],
            colors: ['rgba(11, 200, 200, 0.1)'],
            series: data.map(function(set, i) {
                return {
                    name: 'Laporan Pelanggaran ' + i,
                    data: set,
                    shadow: false
                };
            })
        });
    });
    //FIFTH-B-MOTOR PARALLEL COORDINATES CHART
    $.getJSON('pcp-motor.json', function(data) {
        Highcharts.chart('parallelchart2', {
            chart: {
                type: 'spline',
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 1
                }
            },
            title: {
                text: 'Pola Pelanggaran Kendaraan Bermotor (Oktober 2017 s.d. Januari 2018)'
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0
                            }
                        }
                    },
                    events: {
                        mouseOver: function() {
                            this.group.toFront();
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' + '{series.name}: <b>{point.formattedValue}</b><br/>'
            },
            xAxis: {
                categories: ['Kategori Pelaporan', 'Lokasi', 'Hari', 'Jam', 'Status'],
                offset: 10
            },
            yAxis: [{
                categories: ['Motor']
            }, {
                categories: ['Kampung Bali', 'Kemayoran', 'Cideng', 'Gunung Sahari Selatan', 'Kebon Melati', 'Cempaka Putih Timur'
                , 'Gelora', 'Cikini', 'Johar Baru', 'Sumur Batu', 'Pegangsaan', 'Kebon Kacang', 'Pasar Baru', 'Kebon Sirih', 'Gondangdia'
                , 'Mangga Dua Selatan', 'Karet Tengsin', 'Kebon Kelapa', 'Bendungan Hilir', 'Petojo Selatan', 'Kenari', 'Menteng'
                , 'Gunung Sahari Utara', 'Petojo Utara', 'Paseban', 'Kampung Rawa', 'Kebon Kosong', 'Petamburan', 'Rawasari'
                , 'Utan Panjang', 'Senen', 'Gambir', 'Harapan Mulya', 'Serdang', 'Cempaka Putih Barat', 'Galur', 'Kartini'
                , 'Kramat', 'Duri Pulo', 'Bungur', 'Tanah Tinggi']
            }, 	{
                categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
            },  {
                categories: ['0-6', '6-12', '12-18', '18-24']
            },	{
                categories: ['Completed', 'Wait', 'Process']
            }],
            colors: ['rgb(255, 128, 0.1)'],
            series: data.map(function(set, i) {
                return {
                    name: 'Laporan Pelanggaran ' + i,
                    data: set,
                    shadow: false
                };
            })
        });
    });
    //FIFTH-C-PKL PARALLEL COORDINATES CHART
    $.getJSON('pcp-pkl.json', function(data) {
        Highcharts.chart('parallelchart3', {
            chart: {
                type: 'spline',
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 1
                }
            },
            title: {
                text: 'Pola Pelanggaran Kaki Lima Liar (Oktober 2017 s.d. Januari 2018)'
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0
                            }
                        }
                    },
                    events: {
                        mouseOver: function() {
                            this.group.toFront();
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' + '{series.name}: <b>{point.formattedValue}</b><br/>'
            },
            xAxis: {
                categories: ['Kategori Pelaporan', 'Lokasi', 'Hari', 'Jam', 'Status'],
                offset: 10
            },
            yAxis: [{
                categories: ['Kaki Lima Liar']
            }, {
                categories: ['Kampung Bali', 'Kemayoran', 'Cideng', 'Gunung Sahari Selatan', 'Kebon Melati', 'Cempaka Putih Timur'
                , 'Gelora', 'Cikini', 'Johar Baru', 'Sumur Batu', 'Pegangsaan', 'Kebon Kacang', 'Pasar Baru', 'Kebon Sirih', 'Gondangdia'
                , 'Mangga Dua Selatan', 'Karet Tengsin', 'Kebon Kelapa', 'Bendungan Hilir', 'Petojo Selatan', 'Kenari', 'Menteng'
                , 'Gunung Sahari Utara', 'Petojo Utara', 'Paseban', 'Kampung Rawa', 'Kebon Kosong', 'Petamburan', 'Rawasari'
                , 'Utan Panjang', 'Senen', 'Gambir', 'Harapan Mulya', 'Serdang', 'Cempaka Putih Barat', 'Galur', 'Kartini'
                , 'Kramat', 'Duri Pulo', 'Bungur', 'Tanah Tinggi']
            }, 	{
                categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
            },  {
                categories: ['0-6', '6-12', '12-18', '18-24']
            },	{
                categories: ['Completed', 'Wait', 'Process']
            }],
            colors: ['rgb(64, 255, 0.1)'],
            series: data.map(function(set, i) {
                return {
                    name: 'Laporan Pelanggaran ' + i,
                    data: set,
                    shadow: false
                };
            })
        });
    });
    //FIFTH-D-PARKIRLIAR PARALLEL COORDINATES CHART
    $.getJSON('pcp-parkir.json', function(data) {
        Highcharts.chart('parallelchart4', {
            chart: {
                type: 'spline',
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 1
                }
            },
            title: {
                text: 'Pola Pelanggaran Parkir Liar (Oktober 2017 s.d. Januari 2018)'
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0
                            }
                        }
                    },
                    events: {
                        mouseOver: function() {
                            this.group.toFront();
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' + '{series.name}: <b>{point.formattedValue}</b><br/>'
            },
            xAxis: {
                categories: ['Kategori Pelaporan', 'Lokasi', 'Hari', 'Jam', 'Status'],
                offset: 10
            },
            yAxis: [{
                categories: ['Parkir Liar']
            }, {
                categories: ['Kampung Bali', 'Kemayoran', 'Cideng', 'Gunung Sahari Selatan', 'Kebon Melati', 'Cempaka Putih Timur'
                , 'Gelora', 'Cikini', 'Johar Baru', 'Sumur Batu', 'Pegangsaan', 'Kebon Kacang', 'Pasar Baru', 'Kebon Sirih', 'Gondangdia'
                , 'Mangga Dua Selatan', 'Karet Tengsin', 'Kebon Kelapa', 'Bendungan Hilir', 'Petojo Selatan', 'Kenari', 'Menteng'
                , 'Gunung Sahari Utara', 'Petojo Utara', 'Paseban', 'Kampung Rawa', 'Kebon Kosong', 'Petamburan', 'Rawasari'
                , 'Utan Panjang', 'Senen', 'Gambir', 'Harapan Mulya', 'Serdang', 'Cempaka Putih Barat', 'Galur', 'Kartini'
                , 'Kramat', 'Duri Pulo', 'Bungur', 'Tanah Tinggi']
            }, 	{
                categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
            },  {
                categories: ['0-6', '6-12', '12-18', '18-24']
            },	{
                categories: ['Completed', 'Wait', 'Process']
            }],
            colors: ['rgb(0.1, 191, 255)'],
            series: data.map(function(set, i) {
                return {
                    name: 'Laporan Pelanggaran ' + i,
                    data: set,
                    shadow: false
                };
            })
        });
    });
    // MAP init
    var CartoDB = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }),
        Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/									tile/{z}/{y}/{x}', {
            id: 'MapID',
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        OpenMapSurfer_Roads = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
            id: 'MapID',
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
    var map = L.map('map', {
        center: [-6.174, 106.8450],
        zoom: 13,
        // layers: OpenMapSurfer_Roads,
        layers: CartoDB,
        timeDimension: true,
        timeDimensionOptions: {
            timeInterval: (period == "HARI" ? "2018-04-01/2018-04-07" : "2017-10-01/2018-02-01"),
            period: (period == "MONTH" ? "P1M" : "P1D"),
            currentTime: Date.parse("2017-10-01T00:00:00Z")
        },
    });
    var baseLayers = {
        "<span style='color: gray'>OpenMapSurfer-Roads</span>": OpenMapSurfer_Roads,
        "<span style='color: gray'>CartoDB Dark-Label</span>": CartoDB
    };
    var overlays = {
        "<span style='color: gray'>Esri World Imagery</span>": Esri_WorldImagery
    };
    // Add a layer control element to the map
    layerControl = L.control.layers(baseLayers, overlays, {
        position: 'topleft'
    });
    layerControl.addTo(map);
    L.Control.TimeDimensionCustom = L.Control.TimeDimension.extend({
        _getDisplayDateFormat: function(date) {
            if (period == "DAY") return date.format("dd mmmm yyyy");
            else if (period == "HARI") return date.format("dddd");
            else return date.format("mmmm yyyy");
        }
    });
    var timeDimensionControl = new L.Control.TimeDimensionCustom({
        // autoPlay: true,
        playerOptions: {
            // buffer: 10,
            transitionTime: 500,
            // loop: true,
        },
        loopButton: true,
        // playReverseButton: true,
    });
    // map.addControl(this.timeDimensionControl);
    timeDimensionControl.addTo(map);
    map.timeDimension.on('timeload', function(data) {
        // console.log(Date.parse(data.time))
        hari = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        tgl = new Date(data.time)
        month = tgl.getMonth()
        day = tgl.getDate()
        if (period == "DAY") load_data(filter_data(dataMap, month, day))
        else if (period == "HARI") load_data(filter_data_by_day(dataMap, hari[tgl.getDay()]))
        else load_data(filter_data(dataMap, month))
        heat.setLatLngs(heatmapmarker)
    });
    // END MAP INITIATION
    // marker init
    var kemacetan = L.AwesomeMarkers.icon({
        icon: 'ban',
        markerColor: 'red',
        prefix: 'fa',
    });
    var cctv = L.AwesomeMarkers.icon({
        icon: 'video-camera',
        markerColor: 'black',
        prefix: 'fa',
    });
    var pelanggaran = L.AwesomeMarkers.icon({
        icon: 'motorcycle',
        markerColor: 'orange',
        prefix: 'fa',
    });
    var pkl = L.AwesomeMarkers.icon({
        icon: 'cart-arrow-down',
        markerColor: 'green',
        prefix: 'fa',
    });
    var parkir = L.AwesomeMarkers.icon({
        icon: 'product-hunt',
        markerColor: 'blue',
        prefix: 'fa',
    });
    var pelanggaran_nontl = L.AwesomeMarkers.icon({
        icon: 'motorcycle',
        markerColor: 'orange',
        iconColor: 'black',
        prefix: 'fa',
    });
    var pkl_nontl = L.AwesomeMarkers.icon({
        icon: 'cart-arrow-down',
        markerColor: 'green',
        iconColor: 'black',
        prefix: 'fa',
    });
    var parkir_nontl = L.AwesomeMarkers.icon({
        icon: 'product-hunt',
        markerColor: 'blue',
        iconColor: 'black',
        prefix: 'fa',
    });
    // end marker init
    function load_data(data) {
        heatmapmarker = []
        // dataMap = data;
        var intensity = 0;

        // LOOP Marker
        //var markerspkl = L.markerClusterGroup({
            //iconCreateFunction: function(cl) {
                //return new L.DivIcon({html:'<div><span>'+ cl.getChildCount() +'</span></div>', className: "pkl-cluster marker-cluster marker-cluster-large"})
            //},
            //maxClusterRadius: 100,
        //});
        //var markersparkir = L.markerClusterGroup({
            //iconCreateFunction: function(cl) {
                //return new L.DivIcon({html:'<div><span>'+ cl.getChildCount() +'</span></div>', className: "parkir-cluster marker-cluster marker-cluster-large"})
            //},
            //maxClusterRadius: 100,
        //});
        //map.addLayer(markerspkl)
        //map.addLayer(markersparkir)
        
        var forChartMotor = 0;
        var forChartPkl = 0;
        var forChartParkir = 0;
        var menteng = 0;
        var tabn = 0;
        var gambir = 0;
        var senen = 0;
        var cpkputih = 0;
        var johar = 0;
        var kemayoran = 0;
        var swhbsr = 0;
        $.each(data, function(i, d) {
            if (d.Kategori == "Kaki Lima Liar") {
                if (d['Status laporan'] == 'complete') {
                    icn = pkl;
                } else {
                    icn = pkl_nontl;
                }
                marker[i] = L.marker([d.Lat, d.Lng], {
                    icon: icn
                }).addTo(map);
                $(marker[i]._icon).addClass('pkl');
                $(marker[i]._shadow).addClass('pkl');
                //markerspkl.addLayer(marker[i])

                intensity = 20000;
                forChartPkl++;
                let splitvar = d["Tanggal lapor"].split('/');
                if (splitvar[1] == "10") {
                    totpkl[0] = totpkl[0] + 1;
                }
                if (splitvar[1] == "11") {
                    totpkl[1] = totpkl[1] + 1;
                }
                if (splitvar[1] == "12") {
                    totpkl[2] = totpkl[2] + 1;
                }
                if (splitvar[1] == "01") {
                    totpkl[3] = totpkl[3] + 1;
                }
            } else if (d.Kategori == "CCTV") {
                icn = cctv;
                marker[i] = L.marker([d.Lat, d.Lng], {
                    icon: icn
                }).addTo(map);
                $(marker[i]._icon).addClass('cctv');
                $(marker[i]._shadow).addClass('cctv');
                intensity = 2;
            } else if (d.Kategori == "Parkir Liar") {
                if (d['Status laporan'] == 'complete') {
                    icn = parkir;
                } else {
                    icn = parkir_nontl;
                }
                marker[i] = L.marker([d.Lat, d.Lng], {
                    icon: icn
                }).addTo(map);
                $(marker[i]._icon).addClass('parkir');
                $(marker[i]._shadow).addClass('parkir');
                intensity = 20000;
                //markersparkir.addLayer(marker[i])

                forChartParkir++;
                let splitvar = d["Tanggal lapor"].split('/');
                if (splitvar[1] == "10") {
                    totparkir[0] = totparkir[0] + 1;
                }
                if (splitvar[1] == "11") {
                    totparkir[1] = totparkir[1] + 1;
                }
                if (splitvar[1] == "12") {
                    totparkir[2] = totparkir[2] + 1;
                }
                if (splitvar[1] == "01") {
                    totparkir[3] = totparkir[3] + 1;
                }
            } else if (d.Kategori == "Pelanggaran") {
                if (d['Status laporan'] == 'complete') {
                    icn = pelanggaran;
                } else {
                    icn = pelanggaran_nontl;
                }
                marker[i] = L.marker([d.Lat, d.Lng], {
                    icon: icn
                }).addTo(map);
                $(marker[i]._icon).addClass('motor');
                $(marker[i]._shadow).addClass('motor');
                intensity = 10000;
                forChartMotor++;
                // console.log(d["Tanggal lapor"]);
                let splitvar = d["Tanggal lapor"].split('/');
                if (splitvar[1] == "10") {
                    totpel[0] = totpel[0] + 1;
                }
                if (splitvar[1] == "11") {
                    totpel[1] = totpel[1] + 1;
                }
                if (splitvar[1] == "12") {
                    totpel[2] = totpel[2] + 1;
                }
                if (splitvar[1] == "01") {
                    totpel[3] = totpel[3] + 1;
                }
            } else if (d.Kategori == "Kemacetan") {
                icn = kemacetan;
                marker[i] = L.marker([d.Lat, d.Lng], {
                    icon: icn
                }).addTo(map);
                $(marker[i]._icon).addClass('kemacetan');
                $(marker[i]._shadow).addClass('kemacetan');
                intensity = 20000;
                let splitvar = d["Tanggal lapor"].split('/');
                if (splitvar[1] == "10") {
                    totkem[0] = totkem[0] + 1;
                }
                if (splitvar[1] == "11") {
                    totkem[1] = totkem[1] + 1;
                }
                if (splitvar[1] == "12") {
                    totkem[2] = totkem[2] + 1;
                }
                if (splitvar[1] == "01") {
                    totkem[3] = totkem[3] + 1;
                }
            }
            $(marker[i]._icon).addClass('selectedMarker');
            $(marker[i]._shadow).addClass('selectedMarker');
            marker[i].bindPopup('<div class="popup"><img src="' + d["Foto Laporan"] + '"><table class="descpop"><tr><td><b>No.</b></td><td>:</td><td>' + d["Nomor laporan"] + '</td></tr><tr><td><b>Tanggal Lapor</b></td><td>:</td><td>' + d["Tanggal lapor"] + '</td></tr><tr><td><b>Keterangan</b></td><td>:</td><td>' + d["Keterangan Laporan"] + '</td></tr><tr><td><b>Status</b></td><td>:</td><td>' + d["Status laporan"] + '</td></tr><tr><td><b>Tanggal TL</b></td><td>:</td><td>' + d["Tanggal ditindaklanjuti"] + '</td></tr></table></div>');
            // set value for heatmap
            if (d.Kategori != 'Kemacetan') {
                heatmapmarker.push([d.Lat, d.Lng, intensity]); // lat, lng, intensity
            }
        });
        $.each(data, function(i, d) {
            if (d.Kecamatan == "Gambir") {
                gambir++;
            } else if (d.Kecamatan == "Tanah Abang") {
                tabn++;
            } else if (d.Kecamatan == "Menteng") {
                menteng++;
            } else if (d.Kecamatan == "Senen") {
                senen++;
            } else if (d.Kecamatan == "Cempaka Putih") {
                cpkputih++;
            } else if (d.Kecamatan == "Johar Baru") {
                johar++;
            } else if (d.Kecamatan == "Kemayoran") {
                kemayoran++;
            } else if (d.Kecamatan == "Sawah Besar") {
                swhbsr++;
            }
        });
        // set population data
        datapopulation = [{
            'name': 'Motor',
            'y': forChartMotor
        }, {
            'name': 'PKL',
            'y': forChartPkl
        }, {
            'name': 'Parkir Liar',
            'y': forChartParkir
        }];
        //set neighborhood population data
        neighborhood = [{
            'name': 'Kemayoran',
            'y': kemayoran
        }, {
            'name': 'Tanah Abang',
            'y': tabn
        }, {
            'name': 'Gambir',
            'y': gambir
        }, {
            'name': 'Menteng',
            'y': menteng
        }, {
            'name': 'Sawah Besar',
            'y': swhbsr
        }, {
            'name': 'Cempaka Putih',
            'y': cpkputih
        }, {
            'name': 'Senen',
            'y': senen
        }, {
            'name': 'Johar Baru',
            'y': johar
        }];
        // console.log(heatmapmarker)
        // console.log(data)
    }
    // Initial Data
    // call data CSV
    d3.csv('pelanggaran3.csv', function(data) {
        dataMap = data
        data.sort(function(a, b) {
            return a["Tanggal lapor"] - b["Tanggal lapor"]
        });
        // console.log(data)
        // console.log(map)
        load_data(data)
        // add Heatmap into the map
        heat = L.heatLayer(heatmapmarker, {
            radius: 9
        }).addTo(map);
    })

    function filter_data(data, month, day = null) {
        return data.filter(function(d) {
            t = d["Tanggal lapor"].split("/");
            if (day == null) {
                return t[1] == ((month + 1) < 10 ? "0" + (month + 1) : month + 1);
            } else {
                return (t[1] == ((month + 1) < 10 ? "0" + (month + 1) : month + 1) && t[0] == ((day) < 10 ? "0" + (day) : day));
            }
        });
    }
    function filter_data_by_day(data, day) {
        return data.filter(function(d) {
            t = d["Day"];
            return t == day;
            
        });
    }
	//KML Validated model
	var customTA = L.geoJson(null, {
		style: function(feature) {
		return { 
		weight: 0.75,
		color: '#1E90FF',
		fillOpacity: 0.3,
		fillColor: '#00FF7F'
		};
		}
		});
	var runLayer = omnivore.kml('pedestrian2.kml', null, customTA);
	var hhh= runLayer.addTo(map);
	console.log(hhh);
	$(runLayer).addClass('shapefiles');

	// KML Pedestrian
	var customTA = L.geoJson(null, {
		style: function(feature) {
		return { 
		weight: 4,
		color: '#D2691E',
		fillOpacity: 1,
		fillColor: '#FF6347'
		};
		}
		});
	var wilayah = omnivore.kml('yaoke.kml', null, customTA);
	wilayah.addTo(map);

    // show/hide right panel
    $('#showhidepanel').on('click', function() {
        $('.rightbar').toggle('slow');
    });
    // toggle hide all marker
    $('#toggleicon').on('click', function() {
        var checkdataattrb = $('#checkall').attr('data-attrib');
        if (checkdataattrb == 1) { //maka matikan
            $('#checkall').attr('class', 'fa fa-circle-o');
            $('#checkall').attr('data-attrib', 0);
            $('.selectedMarker').hide('slow');
            $('.checktype').prop('checked', false);
        } else {
            $('#checkall').attr('class', 'fa fa-check-circle-o');
            $('#checkall').attr('data-attrib', 1);
            $('.selectedMarker').show('slow');
            $('.checktype').prop('checked', true);
        }
    })
    // check to show marker
    $('.checktype').on('change', function() {
        var data = $(this).attr('id');
        var status = $('#' + data + ':checkbox:checked').length;
        if (status == 1) {
            $('.' + data).show(300);
        } else {
            $('.' + data).hide(300);
        }
    })
    // check to show/hide heatmap	
    $('.showhideheatmap').on('change', function() {
        var data = $(this).attr('id');
        var status = $('#' + data + ':checkbox:checked').length;
        if (status == 1) {
            $('.leaflet-heatmap-layer').fadeIn(300);
        } else {
            $('.leaflet-heatmap-layer').fadeOut(300);
        }
    })
    // check to show/hide statistik
    $('.statistik').on('change', function() {
        var data = $(this).attr('id');
        var status = $('#' + data + ':checkbox:checked').length;
        if (status == 1) {
            $('#statistik_modal').modal('show');
            drawstat();
        } else {
            $('#statistik_modal').modal('hide');
        }
    })
    //check to show/hide pcp
    $('.statistik2').on('change', function() {
        var data = $(this).attr('id');
        var status = $('#' + data + ':checkbox:checked').length;
        if (status == 1) {
            $('#statistik_modal2').modal('show');
            drawstat();
        } else {
            $('#statistik_modal2').modal('hide');
        }
    })
    //check to show/hide kml
		$('.showshapefile').on('change',function(){
			var data = $(this).attr('id');
			var status = $('#'+data+':checkbox:checked').length;
			if(status == 1){
				$('.leaflet-zoom-animated g').show(300);
			}else{
				$('.leaflet-zoom-animated g').hide(300);
			}
		})
})