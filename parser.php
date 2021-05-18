<?php
define("IS_CORE", true);
require_once("core.php");
require_once(dirname(__FILE__).DIRECTORY_SEPARATOR."core.php");

db::close();

$startTime = time();
echo PHP_EOL.PHP_EOL."Start: ".date("d-m-Y H:i:s", $startTime).PHP_EOL.PHP_EOL;

$sitelink = "https://marcjacobs.kiev.ua/";
$links = array();
$info = array();

$pages = array("https://marcjacobs.kiev.ua/handbags.html", "https://marcjacobs.kiev.ua/handbags.html?start=20", "https://marcjacobs.kiev.ua/handbags.html?start=40", "https://marcjacobs.kiev.ua/handbags.html?start=60");

function getsLinks() {
	global $links, $pages;
	for($s=0;$s<sizeof($pages);$s++) {
		$link = $pages[$s];
		$pr = new Parser($link);
		$pr = $pr->get();
		$url = trim(parser_video($pr, '<table class="jshop list_product">', '</table><table class="jshop_pagination">'));
		preg_match_all('#<div class="image_block">.*?<a href="(.+?)">.*?src="(.+?)" alt="(.+?)"#is', $url, $name);
		for($i=0;$i<sizeof($name[1]);$i++) {
			$links[] = array("image" => $name[2][$i], "url" => "https://marcjacobs.kiev.ua".$name[1][$i], "title" => $name[3][$i]);
		}
	}
	getInfo($links);
}

function getInfo() {
	global $links, $info;
	for ($i=0;$i<sizeof($links);$i++) {
		$link = $links[$i]['url'];
		$pr = new Parser($link);
		$pr = $pr->get();

		/*IMAGE*/
		$imgname = explode("/", $links[$i]['image']);
		$imgname = end($imgname);
		$img = file_get_contents($links[$i]['image']);
		file_put_contents(PATH_UPLOADS."product".DS.$imgname, $img);
		$img_href = PATH_UPLOADS."product".DS.$imgname;
		$img_href = str_replace(array(ROOT_PATH, DS), array("", "/"), $img_href);
		$info[$i]['img'] = $img_href;

		/*NAME*/
		$info[$i]['name'] = $links[$i]['title'];

		/*PRICE*/
		$price = trim(parser_video($pr ,'<span id="block_price">', '</span>'));
		$price = preg_replace("/\D/", "", $price);
		$price = floatval($price);
		$info[$i]['price'] = $price;

		/*DESCR*/
		preg_match('#Описание.*?</div>(.+?)</div>#is', $pr, $descr);
		$descr = trim($descr[1]);
		$info[$i]['descr'] = $descr;

		/*GALLERY*/
		$gallery = parser_video($pr , "<span id='list_product_image_middle'>", '</span>');
		preg_match_all('#<img.*?src = "(.+?)".*?#is', $gallery, $gallery);
		$gallery = $gallery[1];
		$galarr = array();
		for ($n=0;$n<sizeof($gallery);$n++) { 
			$imgname = explode("/", $gallery[$n]);
			$imgname = end($imgname);
			$img = file_get_contents($gallery[$n]);
			file_put_contents(PATH_UPLOADS."product".DS.$imgname, $img);
			$img_href = PATH_UPLOADS."product".DS.$imgname;
			$img_href = str_replace(array(ROOT_PATH, DS), array("", "/"), $img_href);
			$galarr[] = $img_href;

		}
		$info[$i]['gallery'] = serialize($galarr);

		/*CODE*/
		$code = parser_video($pr , '<span id="product_code">', '</span>');
		$info[$i]['code'] = $code;
	}
	db::init();
	insetDb();

}

function insetDb() {
	global $info;
	$del = '<p>Вы можете оплатить наложенным платежем после осмотра товара в отделении Новой Почты или на карту Приват Банка.</p>';
	db::query("TRUNCATE TABLE {{tovary}}");
	for($i=0;$i<sizeof($info);$i++) {
		db::doquery("INSERT INTO {{tovary}} SET `tNazvanie` = ".db::escape($info[$i]['name']).", `tCena` = ".db::escape($info[$i]['price']).", `tArtikul` = ".db::escape($info[$i]['code']).", `tOpisanie_tovara` = ".db::escape($info[$i]['descr']).", `tSposoby_oplaty` = ".db::escape($del).", `tGallereya` = ".db::escape($info[$i]['gallery']).", `tIzobrazhenie` = ".db::escape($info[$i]['img'])." ", true);
		if(($i%10)==1) {
			sleep(1);
		}
	}
}

getsLinks();
$endTime = time();
echo PHP_EOL.PHP_EOL."End: ".date("d-m-Y H:i:s", $endTime).PHP_EOL;
echo PHP_EOL.PHP_EOL."Time: ".timespan($endTime-$startTime, "").PHP_EOL.PHP_EOL;
/*

		$pr = new Parser("http://www.shopjp.ru".$all[1]);
		$pr = $pr->get();
		*/