const { API, serialize, db } = require("./core-node-js/core");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const md5 = (data) => {
	return crypto.createHash('md5').update(data).digest("hex")
}

function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  return API({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {

    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
}

const parseItem = (url, cat) => {
	return new Promise((resp, rej) => {
		API.get(url).then(d => {
			const $ = cheerio.load(d.data)
			let tIzobrazhenie = ''
			const tGallereya = []
			$(".pdpw-carousal .swiper-wrapper picture.image").each((i, item) => {
				const imageSet = $(item).find("source").attr("srcset").split(",").map(item => item.trim().split(" ")[0])
				const fileName = md5(imageSet[1])+".jpg";
				downloadFile(imageSet[1], path.join(path.dirname(__dirname), "uploads", "parser", fileName))
				tGallereya.push("uploads/parser/"+fileName)
			});
			const obj = {
				tNazvanie: $("h2.product-name").text().trim().replace(new RegExp("\n", "g"), " "),
				tCena: parseFloat($('[itemprop="price"]').attr("content")).toFixed(0),
				tIzobrazhenie: tGallereya[0],
				tGallereya: serialize(tGallereya),
				tSposoby_oplaty: '<p>Бесплатная доставка осуществляется курьером по Киеву в день заказа или Новой почтой по Украине. Оплата наличными/ на карту Приват Банка/ или наложенным платежом при получении Вашего заказа.<br /> В другие страны отправка осуществляется по полной оплате стоимости заказа и доставки.</p>',
				tKategoriya: cat,
				tOpisanie_tovara: 'Стильная сумка через плечо Snapshot Small Camera Bag отличается элегантностью в миниатюре.<br />Ее уникальный и легко узнаваемый дизайн в виде фотокамеры придает ей особый стритстайл-образ.<br />Каждая деталь в этой сумке является ее достоинством: знаменитый логотип в виде двойной J, символизирующий имя Marc Jacobs, контрастный широкий ремешок через плечо, двойная застежка-молния. <br />Компактная, но просторная внутри, Snapshot вмещает в себя все - от вашего кошелька и косметики до ключей и мобильного телефона. <br />Многообразная цветовая гамма в прохладных и теплых тонах, позволит вам выбрать свою, полюбившуюся модель. <br />Возьмите Snapshot Small Camera Bag с собой на прогулку или в путешествие, и получайте максимальные впечатления от жизни!',
				tHarakteristiki: 'Стильная сумка через плечо Snapshot Small Camera Bag отличается элегантностью в миниатюре.<br />Ее уникальный и легко узнаваемый дизайн в виде фотокамеры придает ей особый стритстайл-образ.<br />Каждая деталь в этой сумке является ее достоинством: знаменитый логотип в виде двойной J, символизирующий имя Marc Jacobs, контрастный широкий ремешок через плечо, двойная застежка-молния. <br />Компактная, но просторная внутри, Snapshot вмещает в себя все - от вашего кошелька и косметики до ключей и мобильного телефона. <br />Многообразная цветовая гамма в прохладных и теплых тонах, позволит вам выбрать свою, полюбившуюся модель. <br />Возьмите Snapshot Small Camera Bag с собой на прогулку или в путешествие, и получайте максимальные впечатления от жизни!',
			}
			resp(obj)
		}).catch(rej);
	})
}

;(async () => {
	db.dbDefault()
	await db.openDB();

	const links = [
		'https://www.marcjacobs.com/default/the-snapshot/191267907314.html', 'https://www.marcjacobs.com/default/the-snapshot/191267909356.html', 'https://www.marcjacobs.com/default/the-snapshot/191267912493.html', 'https://www.marcjacobs.com/default/the-snapshot/191267909363.html'
	]

	/*const data1 = await API.get("https://www.marcjacobs.com/default/the-marc-jacobs/the-bag-collections/the-box-bag-collection/")
	const $1 = cheerio.load(data1.data)
	$1(".product-grid a.lockup-card").each((i, item) => {
		links.push("https://www.marcjacobs.com"+$1(item).attr("href"));
	});
	const data2 = await API.get("https://www.marcjacobs.com/default/the-marc-jacobs/the-bag-collections/the-j-link-collection/")
	const $2 = cheerio.load(data2.data)
	$2(".product-grid a.lockup-card").each((i, item) => {
		links.push("https://www.marcjacobs.com"+$2(item).attr("href"));
	});*/
	const datas = await Promise.all(links.map(link => parseItem(link, 1)))
	datas.map(item => {
		let list = []
		Object.keys(item).forEach(key => {
			list.push(key+"="+db.escapeCardinal(item[key]))
		})
		db.doqueryDB("INSERT INTO {{tovary}} SET "+list.join(","))
	})
	db.closeConnect()
	// console.log('links', links)
	// parseItem("https://www.marcjacobs.com/default/the-snapshot/191267907314.html")
	// parseItem("https://www.marcjacobs.com/default/the-snapshot/191267907314.html", 2)
})()