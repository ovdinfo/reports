var osm = new modLayer(new MM.Template('http://a.tile.openstreetmap.org/{Z}/{X}/{Y}.png?cors=true'), greenFilter);
var map = mapbox.map('map',osm);
    map.addLayer(mapbox.layer().id('integral.map-asmf5yqy'));



mapbox.converters.googledocs('0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc', 'odb', function(features) {
  var markerLayer = mapbox.markers.layer().factory(factory).features(features);
  map.addLayer(markerLayer);
});


	/*			var heatmapLayer = L.TileLayer.heatMap({
					radius: 20,
					opacity: 50,
					gradient: {
						0.45: "rgb(0,0,255)",
						0.55: "rgb(0,255,255)",
						0.65: "rgb(0,255,0)",
						0.95: "yellow",
						1.0: "rgb(255,0,0)"
					}
				});
				
		var testData={
    		data: [{"id":1,"properties":{"id":1,"Name":"2-ОП Химки","lon":"37.458302","Address":"г. Химки, ул. Кудрявцева, д. 4","value":11,"lat":"55.898392"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.458302,55.898392]}},{"id":2,"properties":{"id":2,"Name":"Академический","lon":"37.583939","Address":"Москва, Большая Черёмушкинская улица, дом 26, корпус 4","value":43,"lat":"55.681549"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.583939,55.681549]}},{"id":3,"properties":{"id":3,"Name":"Алексеевский","lon":"37.64352","Address":"Москва, Новоалексеевская улица, дом 10, строение 1","value":85,"lat":"55.80835"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.64352,55.80835]}},{"id":4,"properties":{"id":4,"Name":"Арбат","lon":"37.588791","Address":"Москва, Кривоарбатский переулок, дом 14, строение 1","value":111,"lat":"55.74765"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.588791,55.74765]}},{"id":5,"properties":{"id":5,"Name":"Аэропорт","lon":"37.537071","Address":"Москва, улица Черняховского, дом 10","value":60,"lat":"55.805019"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.537071,55.805019]}},{"id":6,"properties":{"id":6,"Name":"Бабушкинское ","lon":"37.661541","Address":"Москва, Енисейская улица, дом 23","value":9,"lat":"55.871189"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.661541,55.871189]}},{"id":7,"properties":{"id":7,"Name":"Басманное","lon":"37.666721","Address":"Москва, Новая Басманная улица, 33","value":372,"lat":"55.769699"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.666721,55.769699]}},{"id":8,"properties":{"id":8,"Name":"Беговой","lon":"37.567539","Address":"Москва, Скаковая улица, дом 18 А","value":23,"lat":"55.78088"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.567539,55.78088]}},{"id":9,"properties":{"id":9,"Name":"Бибирево ","lon":"37.60194","Address":"Москва, Мурановская улица, дом 15 Б","value":19,"lat":"55.89465"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.60194,55.89465]}},{"id":10,"properties":{"id":10,"Name":"Бутырское","lon":"37.589142","Address":"Москва, улица Руставели, дом 6 А","value":12,"lat":"55.811352"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.589142,55.811352]}},{"id":11,"properties":{"id":11,"Name":"Вешняки","lon":"37.808971","Address":"Москва, улица Красный Казанец, дом 7 А","value":21,"lat":"55.721161"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.808971,55.721161]}},{"id":12,"properties":{"id":12,"Name":"Войковский","lon":"37.501049","Address":"Москва, Старопетровский проезд, дом 2","value":73,"lat":"55.82156"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.501049,55.82156]}},{"id":13,"properties":{"id":13,"Name":"Восточное Дегунино","lon":"37.566021","Address":"Москва, Дубнинская улица, дом 18 А","value":35,"lat":"55.868851"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.566021,55.868851]}},{"id":14,"properties":{"id":14,"Name":"Гагаринское","lon":"37.55682","Address":"Москва, улица Фотиевой, дом 9","value":14,"lat":"55.69743"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.55682,55.69743]}},{"id":15,"properties":{"id":15,"Name":"Головинский","lon":"37.499592","Address":"Москва, улица Лавочкина, дом 3","value":46,"lat":"55.850842"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.499592,55.850842]}},{"id":16,"properties":{"id":16,"Name":"Головинский военкомат","lon":"37.509232","Address":"Москва, улица Алабяна, 5","value":1,"lat":"55.80217"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.509232,55.80217]}},{"id":17,"properties":{"id":17,"Name":"Даниловский","lon":"37.654862","Address":"Москва, Автозаводская улица, дом 15","value":29,"lat":"55.704311"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.654862,55.704311]}},{"id":18,"properties":{"id":18,"Name":"Донское ","lon":"37.608765","Address":"Москва, Севастопольский проспект, д. 3/10","value":10,"lat":"55.693511"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.608765,55.693511]}},{"id":19,"properties":{"id":19,"Name":"Дорогомилово","lon":"37.528671","Address":"Москва, Кульнева ул., д.14","value":64,"lat":"55.742722"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.528671,55.742722]}},{"id":20,"properties":{"id":20,"Name":"Железнодорожный","lon":"37.97258","Address":"Керамическая улица, 20, г. Железнодорожный","value":2,"lat":"55.747051"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.97258,55.747051]}},{"id":21,"properties":{"id":21,"Name":"Замоскворечье","lon":"37.628342","Address":"Москва, Пятницкая улица, 49, строение 1","value":240,"lat":"55.736301"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.628342,55.736301]}},{"id":22,"properties":{"id":22,"Name":"Западное Дегунино ","lon":"37.51339","Address":"Москва, Путейская улица, дом 5","value":13,"lat":"55.869331"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.51339,55.869331]}},{"id":23,"properties":{"id":23,"Name":"Зюзино","lon":"37.592499","Address":"Москва, микрорайон Северное Чертаново, дом 4 А","value":3,"lat":"55.64019"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.592499,55.64019]}},{"id":24,"properties":{"id":24,"Name":"Ивановское","lon":"37.865836","Address":"реутов, улица Молостовых, дом 8 с А","value":23,"lat":"55.7638"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.865836,55.7638]}},{"id":25,"properties":{"id":25,"Name":"Китай-город","lon":"37.62435","Address":"Москва, улица Ильинка, 3","value":129,"lat":"55.75442"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.62435,55.75442]}},{"id":26,"properties":{"id":26,"Name":"Коптево","lon":"37.523998","Address":"Москва, Соболевский проезд, дом 22","value":60,"lat":"55.834129"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.523998,55.834129]}},{"id":27,"properties":{"id":27,"Name":"Красносельское","lon":"37.656792","Address":"Москва, Новорязанская улица, дом 10","value":162,"lat":"55.771912"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.656792,55.771912]}},{"id":28,"properties":{"id":28,"Name":"Кузьминки ","lon":"37.781252","Address":"Москва, Волгоградский проспект, дом 122","value":26,"lat":"55.703036"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.781252,55.703036]}},{"id":29,"properties":{"id":29,"Name":"Кунцево","lon":"37.407429","Address":"Москва, улица Ивана Франко, дом 43, строение 1","value":45,"lat":"55.728642"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.407429,55.728642]}},{"id":30,"properties":{"id":30,"Name":"Лефортово","lon":"37.680382","Address":"Москва, Самокатная улица, дом 3/8, строение 3","value":25,"lat":"55.757111"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.680382,55.757111]}},{"id":31,"properties":{"id":31,"Name":"Лианозово ","lon":"37.552471","Address":"Москва, Псковская улица, дом 8","value":49,"lat":"55.90255"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.552471,55.90255]}},{"id":32,"properties":{"id":32,"Name":"Линейное отделение полиции на Ленинградском вокзале","lon":"37.65565","Address":"Москва, Комсомольская площадь, 3","value":2,"lat":"55.775506"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.65565,55.775506]}},{"id":33,"properties":{"id":33,"Name":"Линейное отделение полиции на метрополитене на станции Белорусская","lon":"37.58318","Address":"Тверская Застава, 3, город Москва","value":2,"lat":"55.775631"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.58318,55.775631]}},{"id":34,"properties":{"id":34,"Name":"Линейное отделение полиции на метрополитене на станции Курская","lon":"37.65847","Address":"Москва, улица Земляной Вал, 29","value":1,"lat":"55.758942"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.65847,55.758942]}},{"id":35,"properties":{"id":35,"Name":"Линейное отделение полиции на метрополитене на станции Новослободская","lon":"37.63311","Address":"Москва, проспект Мира, 38","value":2,"lat":"55.779671"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.63311,55.779671]}},{"id":36,"properties":{"id":36,"Name":"Линейное отделение полиции на метрополитене на станции Октябрьская","lon":"37.611481","Address":"Москва, Ленинский проспект, 2 с Б","value":4,"lat":"55.728691"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.611481,55.728691]}},{"id":37,"properties":{"id":37,"Name":"Линейное отделение полиции на метрополитене на станции Проспект Вернадского","lon":"37.50557","Address":"Москва, проспект Вернадского, 14","value":1,"lat":"55.676441"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.50557,55.676441]}},{"id":38,"properties":{"id":38,"Name":"Линейное отделение полиции на метрополитене на станции Пушкинская","lon":"37.60582","Address":"Пушкинская площадь, Москва","value":1,"lat":"55.765949"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.60582,55.765949]}},{"id":39,"properties":{"id":39,"Name":"Линейное отделение полиции на метрополитене на станции Чистые пруды","lon":"22.4381","Address":"Линейное отделение полиции на метрополитене на станции Чистые пруды","value":3,"lat":"54.4586"},"type":"Feature","geometry":{"type":"Point","coordinates":[22.4381,54.4586]}},{"id":40,"properties":{"id":40,"Name":"Линейное отделение полиции на Ярославском вокзале","lon":"37.655338","Address":"Москва, Комсомольская площадь, 2","value":10,"lat":"55.774841"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.655338,55.774841]}},{"id":41,"properties":{"id":41,"Name":"Линейный отдел полиции на метрополитене на станции Комсомольская","lon":"37.65565","Address":"Москва, Комсомольская площадь, 3","value":9,"lat":"55.775506"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.65565,55.775506]}},{"id":42,"properties":{"id":42,"Name":"Линейный отдел полиции на метрополитене на станции метро Алтуфьево","lon":"37.589298","Address":"Москва, Алтуфьевское шоссе, 86 строение а","value":1,"lat":"55.897121"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.589298,55.897121]}},{"id":44,"properties":{"id":44,"Name":"Линейный отдел полиции на метрополитене на станции метро Сокольники","lon":"37.67868","Address":"Москва, Сокольническая площадь","value":1,"lat":"55.790245"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.67868,55.790245]}},{"id":45,"properties":{"id":45,"Name":"Линейный отдел полиции на метрополитене на станции Площадь Революции","lon":"37.623032","Address":"Москва, Никольская улица, 8 к 1","value":4,"lat":"55.757561"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.623032,55.757561]}},{"id":46,"properties":{"id":46,"Name":"Ломоносовский","lon":"37.541809","Address":"Москва, улица Панфёрова, дом 6","value":12,"lat":"55.682652"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.541809,55.682652]}},{"id":47,"properties":{"id":47,"Name":"Мещанское","lon":"37.631859","Address":"Москва, улица Сретенка, дом 11","value":252,"lat":"55.76833"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.631859,55.76833]}},{"id":48,"properties":{"id":48,"Name":"Митино ","lon":"37.343079","Address":"Москва, улица Барышиха, дом 49","value":23,"lat":"55.858009"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.343079,55.858009]}},{"id":49,"properties":{"id":49,"Name":"Москворечье-Сабурово ","lon":"37.678619","Address":"Москва, Каширское шоссе, дом 74к1с3","value":20,"lat":"55.64259"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.678619,55.64259]}},{"id":50,"properties":{"id":50,"Name":"Нагатино-Садовники ","lon":"37.638185","Address":"Москва, Каширское шоссе, дом 22, корпус 2","value":31,"lat":"55.659857"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.638185,55.659857]}},{"id":51,"properties":{"id":51,"Name":"Нагатинский Затон","lon":"37.70044","Address":"Москва, Коломенская улица, 11","value":23,"lat":"55.67981"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.70044,55.67981]}},{"id":52,"properties":{"id":52,"Name":"Нагорный","lon":"37.60672","Address":"Москва, Черноморский бульвар, дом 9","value":7,"lat":"55.644798"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.60672,55.644798]}},{"id":53,"properties":{"id":53,"Name":"Новопеределкино ","lon":"37.356338","Address":"Москва, улица Шолохова, дом 5","value":17,"lat":"55.636749"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.356338,55.636749]}},{"id":54,"properties":{"id":54,"Name":"ОВД г. Жуковский","lon":"38.110519","Address":" улица Гагарина, 8, г. Жуковский","value":34,"lat":"55.60022"},"type":"Feature","geometry":{"type":"Point","coordinates":[38.110519,55.60022]}},{"id":55,"properties":{"id":55,"Name":"ОВД г. Троицка","lon":"37.29348","Address":"Московская область, Троицк г., Лесхозная улица, 7","value":1,"lat":"55.477554"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.29348,55.477554]}},{"id":56,"properties":{"id":56,"Name":"ОВД МГУ","lon":"37.614971","Address":"Москва, Воробьевы Горы 1 корпус б","value":1,"lat":"55.75695"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.614971,55.75695]}},{"id":57,"properties":{"id":57,"Name":"","lon":"37.70467","Address":"Воробьевы Горы, МГУ, корп. Б, Москва","value":1,"lat":"55.756435"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.70467,55.756435]}},{"id":58,"properties":{"id":58,"Name":"Останкино","lon":"37.635971","Address":"Москва, проезд Ольминского, дом 1 А","value":74,"lat":"55.812908"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.635971,55.812908]}},{"id":59,"properties":{"id":59,"Name":"Отдел полиции по обслуживанию ВВЦ","lon":"37.62418","Address":"Москва, Прасковьина, 23","value":8,"lat":"55.827091"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.62418,55.827091]}},{"id":60,"properties":{"id":60,"Name":"Отделение полиции по Обслуживанию Олимпийского Комплекса Лужники","lon":"37.543242","Address":"Москва, Лужнецкая набережная, д. 24","value":7,"lat":"55.719108"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.543242,55.719108]}},{"id":61,"properties":{"id":61,"Name":"Перово ","lon":"37.785312","Address":"Москва, 3-я Владимирская улица, дом 3 с А","value":21,"lat":"55.7632"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.785312,55.7632]}},{"id":62,"properties":{"id":62,"Name":"Покровское-Стрешнево ","lon":"37.449032","Address":"Москва, улица Водников, дом 10","value":12,"lat":"55.817268"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.449032,55.817268]}},{"id":63,"properties":{"id":63,"Name":"Преображенское","lon":"37.710362","Address":"Москва, Суворовская улица, 25","value":78,"lat":"55.790428"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.710362,55.790428]}},{"id":64,"properties":{"id":64,"Name":"Пресненский","lon":"37.54211","Address":"Москва, улица Литвина-Седого, дом 3 А","value":262,"lat":"55.7607"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.54211,55.7607]}},{"id":65,"properties":{"id":65,"Name":"Раменки","lon":"37.507801","Address":"Москва, Мичуринский проспект, дом 17, корпус 2","value":44,"lat":"55.695202"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.507801,55.695202]}},{"id":66,"properties":{"id":66,"Name":"Савеловское","lon":"37.57486","Address":"Москва, 1-я Квесисская улица, дом 28","value":9,"lat":"55.793919"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.57486,55.793919]}},{"id":67,"properties":{"id":67,"Name":"Свиблово","lon":"37.642269","Address":"Москва, Игарский проезд, дом 7, строение 1","value":25,"lat":"55.857159"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.642269,55.857159]}},{"id":68,"properties":{"id":68,"Name":"Северное Бутово ","lon":"37.57119","Address":"Москва, Ратная улица, дом 14 с Б","value":18,"lat":"55.575989"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.57119,55.575989]}},{"id":69,"properties":{"id":69,"Name":"Северное Измайлово","lon":"37.788719","Address":"Москва, 5-я Парковая улица, дом 60 А","value":69,"lat":"55.806679"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.788719,55.806679]}},{"id":71,"properties":{"id":71,"Name":"Северное Медведково","lon":"37.655239","Address":"Москва, Широкая улица, дом 3","value":15,"lat":"55.88942"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.655239,55.88942]}},{"id":72,"properties":{"id":72,"Name":"Соколиная Гора","lon":"37.73328","Address":"Москва, Мироновская улица, дом 11","value":26,"lat":"55.785339"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.73328,55.785339]}},{"id":73,"properties":{"id":73,"Name":"Сокольники","lon":"37.675831","Address":"Москва, Маленковская улица, дом 42, строение 1","value":42,"lat":"55.786598"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.675831,55.786598]}},{"id":74,"properties":{"id":74,"Name":"Солнцево ","lon":"37.4114","Address":"Москва, Волынская улица, дом 10 с А","value":26,"lat":"55.64328"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.4114,55.64328]}},{"id":75,"properties":{"id":75,"Name":"Строгино","lon":"37.394669","Address":"Москва, улица Твардовского, дом 7","value":25,"lat":"55.794659"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.394669,55.794659]}},{"id":76,"properties":{"id":76,"Name":"Таганское","lon":"37.681721","Address":"Москва, Ведерников переулок, дом 9, строение 1","value":259,"lat":"55.734612"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.681721,55.734612]}},{"id":77,"properties":{"id":77,"Name":"Тверское","lon":"37.611328","Address":"Москва, улица Большая Дмитровка, дом 28","value":365,"lat":"55.76474"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.611328,55.76474]}},{"id":78,"properties":{"id":78,"Name":"Текстильщики","lon":"44.74396","Address":"Москва, Волжский Бульвар, корпус 11","value":28,"lat":"48.735001"},"type":"Feature","geometry":{"type":"Point","coordinates":[44.74396,48.735001]}},{"id":79,"properties":{"id":79,"Name":"Теплый Стан ","lon":"37.482368","Address":"Москва, улица Академика Бакулева, дом 16","value":28,"lat":"55.641731"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.482368,55.641731]}},{"id":80,"properties":{"id":80,"Name":"Территория посольства США","lon":"37.583641","Address":"Новинский бульвар, 19/23, г. Москва","value":1,"lat":"55.755711"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.583641,55.755711]}},{"id":81,"properties":{"id":81,"Name":"Филевский парк","lon":"37.50312","Address":"Москва, Физкультурный проезд, дом 2, строение 1","value":6,"lat":"55.746448"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.50312,55.746448]}},{"id":82,"properties":{"id":82,"Name":"Фили-Давыдково","lon":"37.678612","Address":"Москва, Рублёвское шоссе, дом 26, корпус 2","value":36,"lat":"55.64249"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.678612,55.64249]}},{"id":83,"properties":{"id":83,"Name":"Хамовники","lon":"37.56303","Address":"Москва, Усачёва улица, дом 62","value":170,"lat":"55.7253"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.56303,55.7253]}},{"id":84,"properties":{"id":84,"Name":"Хорошево-мневники","lon":"37.460869","Address":"Москва, улица Генерала Глаголева, дом 3","value":16,"lat":"55.779388"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.460869,55.779388]}},{"id":85,"properties":{"id":85,"Name":"Хорошевский","lon":"37.53949","Address":"Москва, Хорошёвское шоссе, дом 40 А","value":96,"lat":"55.7766"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.53949,55.7766]}},{"id":86,"properties":{"id":86,"Name":"Черемушки","lon":"37.563511","Address":"Москва, Новочерёмушкинская улица, дом 65, корпус 2","value":12,"lat":"55.66444"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.563511,55.66444]}},{"id":87,"properties":{"id":87,"Name":"Южное Бутово","lon":"37.543789","Address":"Москва, Южнобутовская улица, дом 3","value":21,"lat":"55.544418"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.543789,55.544418]}},{"id":88,"properties":{"id":88,"Name":"Южное Медведково","lon":"37.618221","Address":"Москва, Ясный проезд, дом 27","value":36,"lat":"55.878899"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.618221,55.878899]}},{"id":89,"properties":{"id":89,"Name":"Якиманка","lon":"37.619934","Address":"Москва, улица Большая Полянка, дом 33","value":112,"lat":"55.736151"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.619934,55.736151]}},{"id":90,"properties":{"id":90,"Name":"Ярославский","lon":"37.689541","Address":"Москва, Ярославское шоссе, дом 49","value":20,"lat":"55.859692"},"type":"Feature","geometry":{"type":"Point","coordinates":[37.689541,55.859692]}}]
    	};
    	heatmapLayer.addData(testData.data);
    	map.addTileLayer(heatmapLayer);*/

var formatter = {};
function factory(f) {
    // Define a new factory function. This takes a GeoJSON object
    // as its input and returns an element - in this case an image -
    // that represents the point.
        //console.log(f);
        
        var d = document.createElement('div'),
            marker = document.createElement('div');
            
        var total = parseInt(f.properties.value);
        var bgoffset = 0, size = 0;
        
        // Classification scale
        if (total > 0 && total <=50) {
            bgoffset = -362;
            size = 20;
        }
        if (total > 50 && total <=100) {
            bgoffset = -324;
            size = 22;
        }
        if (total > 100 && total <=150) {
            bgoffset = -276;
            size = 32;
        }
        if (total > 150 && total <=200) {
            bgoffset = -218;
            size = 42;
        }
        if (total > 200 && total <=250) {
            bgoffset = -151;
            size = 52;
        }
        if (total > 250 && total <=300) {
            bgoffset = -80;
            size = 57;
        }
        if (total > 300) {
            bgoffset = 0;
            size = 62;
        }
        marker.className = 'marker';
        marker.setAttribute('style', 
            'width: ' + size + 'px; ' +
            'height: ' + size + 'px; ' +
            'left: ' + size / -2 + 'px; ' +
            'top: ' + size / -2 + 'px; ' +
            'line-height: ' + size + 'px; ' +
            'background-position: ' + bgoffset + 'px 100%;'
        );
        formatter[f.properties.id] = function() {
        return '<div class="wax-tooltip"><div class="int_total">' +
                '<h2>ОВД: <%= name %></h2>' +
                '<p>Адрес: <i><%= address %></i></p>' +
                '<p>Общее количество задержанных: <strong><%= value %></strong></p>' +
            '</div></div>';
        };
        marker.innerHTML = (total > 0) ? total : '';
        marker.onmouseover = function() {
            $('.wax-tooltip').remove();
            $('body').append(_.template(formatter[f.properties.id](), f.properties));
        };
        marker.onmouseout = function() {
            $('.wax-tooltip').remove();
        };
        marker.style.pointerEvents = 'all';
        d.appendChild(marker);
        d.style.position = 'absolute';
        return d;
};

map.centerzoom({ lat: 55.7512419, lon: 37.6184217 }, 11);
map.ui.zoomer.add();
map.ui.zoombox.add();
map.ui.fullscreen.add();
map.interaction.auto();