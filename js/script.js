function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function ApiCorona(){
	$.ajax({
		url: "https://covid19.mathdro.id/api/countries/indonesia/confirmed",
	    success: function(res) {
	        $("#positif").text(formatNumber(res[0].confirmed))
	        $("#recovered").text(formatNumber(res[0].recovered))
	        $("#dead").text(formatNumber(res[0].deaths))
	        $("#active").text(formatNumber(res[0].active))
	    }
	})
}

function ApiInstagram(){
	$.ajax({
		url: "https://v1.nocodeapi.com/apitest1414/instagram/hfDFJjlXpdYWnwJk?limit=9",
	    success: function(res) {
	    	for(var i=0; i < res.data.length; i++){
				var ig = res.data[i];
				var div = $('<div class="col-sm-4 col-4" style="padding: 0px;"></div>'); 
				
				var tag = "";
				tag += "<abbr title='"+ ig.caption +"'><a href='"+ ig.permalink +"' target='_blank'><img src='"+ ig.media_url +"' width='100%' height='100%'></a></abbr>";
				let su = $('#media-ig').append(div.html(tag));
			}   	
	    }
	})
}

function ApiTrip(){
	let lokasi = $("#lokasi").text();
	let daerah = $("#daerah").text();
	console.log(lokasi, daerah)
	$.ajax({
		async: true,
		crossDomain: true,
		url: "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=id_US&currency=USD&units=km&query="+lokasi+" "+daerah+" Indonesia",
		method: "GET",
		headers: {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "a460231e1cmsh0f7f9dc0d4871a5p15f384jsn87f0d52e2034"
		},
		success : function(res){
			let idLokasi = res.data[1].result_object.location_id;
			$.ajax({
				async: true,
				crossDomain: true,
				url: "https://tripadvisor1.p.rapidapi.com/reviews/list?limit=5&currency=USD&lang=id_US&location_id="+idLokasi,
				method: "GET",
				headers: {
					"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
					"x-rapidapi-key": "a460231e1cmsh0f7f9dc0d4871a5p15f384jsn87f0d52e2034"
				},
				success : function(res){
					console.log(res)
					let review = res.data
					$.each(review, function(i, data){
						// formating tanggal
						var d = new Date(data.published_date);
						var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
						var dt = d.getUTCDate()+" "+months[d.getUTCMonth()]+" "+d.getFullYear();

						$('#review-list').append(`
							<div class="row" style="margin-top: 25px;">
								<div class="col-sm-3 col-3">
									<img src="`+data.user.avatar.small.url+`" class="img-fluid rounded-circle" alt="Responsive image" style="display: block; margin-left: auto; margin-right: auto;">
									<p class="text-center oswaldlight" style="font-size: 14px; margin-top: 5px;">`+data.user.username+`</p>
								</div>
								<div class="col-sm-9 col-9">
									<h4 style="font-size: 16px;">`+data.title+`</h4>
									<span><img src="https://static.tacdn.com/img2/ratings/traveler/ss`+data.rating+`.0.gif"></span>
									<span class="oswaldlight" style="font-size: 12px;">Reviewed `+dt+`</span>
									<p class="oswaldlight" style="font-size: 14px; margin-top: 10px;">`+data.text+`</p>
								</div>
								<div style="display: block; background: #FFFFFF; width: 90%; height: 2px; border-radius: 10px; margin-left: auto; margin-right: auto;"></div>
							</div>
						`)
					})
				}
			})
		}
	})
}
function destinasiJateng(){
	let data = [
		{
			id : 'jtg01',
			title : 'Candi Borobudur',
			city : 'Magelang',
			image : 'img/borobudur.jpg',
			description : 'Borobudur adalah sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, dan 40 km di sebelah barat laut Yogyakarta. Candi berbentuk stupa ini didirikan oleh para penganut agama Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra. Borobudur adalah candi atau kuil Buddha terbesar di dunia, sekaligus salah satu monumen Budha terbesar di dunia. Monumen ini merupakan model alam semesta dan dibangun sebagai tempat suci untuk memuliakan Buddha sekaligus berfungsi sebagai tempat ziarah untuk menuntun umat manusia beralih dari alam nafsu duniawi menuju pencerahan dan kebijaksanaan sesuai ajaran Buddha. Para peziarah masuk melalui sisi timur dan memulai ritual di dasar candi dengan berjalan melingkari bangunan suci ini searah jarum jam, sambil terus naik ke undakan berikutnya melalui tiga tingkatan ranah dalam kosmologi Buddha. Ketiga tingkatan itu adalah Kāmadhātu (ranah hawa nafsu), Rupadhatu (ranah berwujud), dan Arupadhatu (ranah tak berwujud). Dalam perjalanannya para peziarah berjalan melalui serangkaian lorong dan tangga dengan menyaksikan tak kurang dari 1.460 panel relief indah yang terukir pada dinding dan pagar langkan.Proyek pemugaran terbesar digelar pada kurun waktu 1975 hingga 1982 atas upaya Pemerintah Republik Indonesia dan UNESCO, kemudian situs bersejarah ini masuk dalam daftar Situs Warisan Dunia',
			open_gate : 'Wisatawan bisa berkunjung ke candi ini setiap hari. Taman Wisata Candi sudah dibuka mulai dari pagi hingga sore hari dari jam 08.00 sampai 16.00 WIB',
			ticket : 'Harga tiket masuk ke dalam kawasan candi dibedakan menjadi beberapa jenis. Tiket individu dan tiket rombongan sekolah (lebih murah) serta paket beberapa candi yaitu 25.000-30.000'
		},
		{
			id : 'jtg02',
			title : 'Lawang Sewu',
			city : 'Semarang',
			image : 'img/lawang.jpg',
			description : 'Gedung bersejarah di Indonesia yang berlokasi di Kota Semarang, Jawa Tengah. Gedung ini, dahulu yang merupakan kantor dari Nederlands-Indische Spoorweg Maatschappij atau NIS. Dibangun pada tahun 1904 dan selesai pada tahun 1907. Terletak di bundaran Tugu Muda yang dahulu disebut Wilhelminaplein. Masyarakat setempat menyebutnya Lawang Sewu karena bangunan tersebut memiliki pintu yang sangat banyak, meskipun kenyataannya, jumlah pintunya tidak mencapai seribu. Bangunan ini memiliki banyak jendela yang tinggi dan lebar, sehingga masyarakat sering menganggapnya sebagai pintu (lawang). Bangunan kuno dan megah berlantai dua ini setelah kemerdekaan dipakai sebagai kantor Djawatan Kereta Api Repoeblik Indonesia (DKARI) atau sekarang PT Kereta Api Indonesia. Selain itu pernah dipakai sebagai Kantor Badan Prasarana Komando Daerah Militer (Kodam IV/Diponegoro) dan Kantor Wilayah (Kanwil) Kementerian Perhubungan Jawa Tengah. Pada masa perjuangan gedung ini memiliki catatan sejarah tersendiri yaitu ketika berlangsung peristiwa Pertempuran lima hari di Semarang (14 Oktober - 19 Oktober 1945). Gedung tua ini menjadi lokasi pertempuran yang hebat antara pemuda AMKA atau Angkatan Muda Kereta Api melawan Kempetai dan Kidobutai, Jepang. Maka dari itu Pemerintah Kota Semarang dengan Surat Keputusan Walikota Nomor. 650/50/1992, memasukan Lawang Sewu sebagai salah satu dari 102 bangunan kuno atau bersejarah di Kota Semarang yang patut dilindungi',
			open_gate : 'Saat ini bangunan tua tersebut telah mengalami tahap konservasi dan revitalisasi yang dilakukan oleh Unit Pelestarian benda dan bangunan bersejarah PT Kereta Api Persero. Jam operasionalnya sendiri akan buka pada pukul 7 pagi dan akan ditutup kembali pada pukul 9 malam.',
			ticket : 'Untuk bisa masuk ke dalam anda akan di tarik harga tiket masuk Lawang Sewu sebesar 10 ribu rupiah untuk orang dewasa. Bagi anak-anak akan dikenakan biaya sebesar 5 ribu rupiah'
		},
		{
			id : 'jtg03',
			title : 'Umbul Ponggok',
			city : 'Klaten',
			image : 'img/umbul.jpg',
			description : 'Umbul Ponggok merupakan wisata air yang terletak di desa Ponggok, Klaten, Jawa Tengah. Umbul Ponggok merupakan mata air yang dimanfaatkan menjadi objek wisata, pemandian dan snorkeling. Kolam Umbul Ponggok berukuran panjang 70 m dan lebar 40 m, mata air terletak pada dasar kolam dan terus mengalirkan air sehingga kolam Umbul Ponggok cenderung jernih. Pada dasar kolam terdapat ikan dan batu-batuan sehingga kolam Umbul Ponggok kerap digunakan sebagai lokasi foto dibawah air. Dahulu Umbul Ponggok adalah mata air yang dijadikan sebuah water reservoir yang berfungsi sebagai tampungan air untuk kebutuhan operasional Pabrik Gula Ponggok dan Pabrik Gula Karanganom, selain itu untuk pengairan perkebunan tebu di wilayah Polanharjo, Karanganom, Ceper. Setelah pabrik gula tidak beroperasional lagi, keberadaan water reservoir Ponggok masih difungsikan sebagai pengairan sawah dan perkebunan sampai sekarang. Masyarakat sekitar lebih sering menyebutnya Umbul Ponggok (mata air Ponggok) karena sumber airnya memang berasal dari mata air alami yang mempunyai kualitas bagus dan untuk kebutuhan air minum warga sekitar. Seiring dengan perkembangan zaman, Umbul Ponggok merupakan objek yang memiliki potensi luar biasa, selain untuk kebutuhan seperti pengairan sawah dan air minum, dapat juga sebagai objek wisata. Pemerintah Desa Ponggok bersama masyarakat kemudian berinovasi dan berkreasi dengan mengubah umbul tersebut menjadi objek wisata yang unik dengan tema snorkeling, diving dan foto bawah air. Untuk menarik minat wisatawan maka umbul ponggok mengiklankan dirinya dengan slogan “Bunaken van Klaten“ - sensasi menyelam dalam air, menikmati keindahan bawah air dengan rasa air tawar yang segar dan dingin seperti snorkeling dan diving di Bunaken',
			open_gate : 'Umbul Ponggok sendiri buka setiap hari mulai jam 07.00 – 17.00 WIB.',
			ticket : 'Untuk masuk ke tempat wisata klaten yang satu ini, kalian perlu membayar tiket sebesar IDR 15.000 per orang.'
		},
		{
			id : 'jtg04',
			title : 'Dataran Tinggi Dieng',
			city : 'Wonosobo',
			image : 'img/dieng.jpg',
			description : 'Gambaran tentang negeri tempat bersemayamnya dewa dewi selama ini mungkin hanya bisa kita dapatkan dalam cerita dongeng saja. Namun mimpi itu akan menjadi nyata bila kita mau menyempatkan diri untuk untuk berkunjung ke Dieng yang berada di Kabupaten Wonosobo dan Banjarnegara, Jawa Tengah yang bisa dijangkau dari Jogja kurang lebih selama 3 jam perjalanan dengan menggunakan kendaraan pribadi. Nama Dieng Plateau sendiri berasal dari Bahasa Sanskerta yaitu “Di” yang berarti gunung dan “Hyang” yang berarti gunung. Namun ada pendapat lain yang mengatakan bahwa kata Dieng berasal dari Bahasa Sunda dengan kata yang sama “Di”dan “Hyang” karena pada sekitar abad ke-7 Dieng pernah berada dalam pengaruh politik Kerajaan Galuh yang ada di Jawa Barat. Keindahan alam di Dieng selalu diidentikan dengan gunung atau tempat bersemayamnya para dewa dewi. Kecantikan alam tersebut masih bisa kita saksikan sampai saat ini. Tidak hanya kecantikan pemandangan alamnya saja yang menjadi alasan kita harus berkunjung kesana, tetapi juga karena sejarah dan budayanya.',
			open_gate : 'Jam operasional dataran tinggi dieng buka 24 jam kecuali untuk kawasan wisata yang hanya buka sampai sore.',
			ticket : 'Untuk memasuki kawasan wisata Dataran Tinggi Dieng pengunjung dikenakan biaya tiket 10 ribu rupiah. Harga tiket ini belum termasuk tiket-tiket aktivitas, situs-situs yang terdapat di sekitar kawasan wisata Dieng dari harga 5 ribu sampai 10 ribu rupiah'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jateng.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})
}
var app = new Vue({
  el: '#form1',
  data: function () {
    return {
    email : "",
    emailBlured : false,
    valid : false,
    submitted : false,
    password:"",
    passwordBlured:false
    }
  },

  methods:{

    validate : function(){
this.emailBlured = true;
this.passwordBlured = true;
if( this.validEmail(this.email) && this.validPassword(this.password)){
this.valid = true;
}
},

validEmail : function(email) {
   
var re = /(.+)@(.+){2,}\.(.+){2,}/;
if(re.test(email.toLowerCase())){
  return true;
}

},

validPassword : function(password) {
   if (password.length > 7) {
    return true;
   }
},

submit : function(){
this.validate();
if(this.valid){
this.submitted = true;
}
}
  }
});

$(document).ready(function(){
	ApiCorona();
	ApiInstagram();
	ApiTrip();
})