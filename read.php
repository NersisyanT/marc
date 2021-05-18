<?php
define("IS_CORE", true);
require_once(dirname(__FILE__).DIRECTORY_SEPARATOR."core.php");

$startTime = time();
echo PHP_EOL.PHP_EOL."Start: ".date("d-m-Y H:i:s", $startTime).PHP_EOL.PHP_EOL;
file_put_contents(dirname(__FILE__).DS."log.txt", PHP_EOL.PHP_EOL."Start: ".date("d-m-Y H:i:s", $startTime).PHP_EOL.PHP_EOL, FILE_APPEND);

$file = file_get_contents(ROOT_PATH."links.txt");
$file = json_decode($file, true);
$file = array_reverse($file);

$startcat = db::doquery("SELECT `cId` FROM {{category}} ORDER BY `cId` DESC LIMIT 1");
$startcat = $startcat['cId'];


$category = array();
// foreach($file as $link => $catname) {
for($i=0;$i<sizeof($file);$i++) {
	$category[$file[$i]['cat']] = ToTranslit($file[$i]['cat']);
}
// db::query("TRUNCATE TABLE {{category}}");
// db::query("TRUNCATE TABLE {{products}}");
$categorys = array_keys($category);
$sql = "";
$catId = array();
for($i=0;$i<sizeof($categorys);$i++) {
	$startcat++;
	$catId[$categorys[$i]] = ($startcat);
	$sql .= "REPLACE INTO {{category}} SET `cId` = ".($startcat).", `cNameRu` = ".db::escape($categorys[$i]).", `cAltName` = ".db::escape($category[$categorys[$i]])."".PHP_EOL;
}
$existsProducts = array();
// foreach($file as $link => $catname) {
for($i=0;$i<sizeof($file);$i++) {
	echo ".";
	file_put_contents(dirname(__FILE__).DS."log.txt", ".", FILE_APPEND);
	$pr = new Parser($file[$i]['link']);
	$all = $pr->get();
	$title = trim(str_replace("&quot;", "", parser_video($all, '<div class="name-type bot-border">', '</div>')));
	if(isset($existsProducts[$title])) {
		continue;
	}
	$img = parser_video($all, '<span class="image"><a href="', '"><img');
	$img = "http://japanline.jp/".$img;
	$descr = parser_video($all, '<div id="productDescription" class="description biggerText"><strong>Описание товара</strong>', '</div>');
	// if (strpos($all, '<div id="productDescription" class="description biggerText"><strong>Описание товара</strong>')!==false) {
	// 	$descr = parser_video($all, '<div class="changeDescription"', '<div class="changePropertiesGroup">');
	// 	$descr_st = strpos($descr, "'>");
	// 	$descr = substr($descr, $descr_st+2);
	// 	$descr_st = strpos($descr, "</div>");
	// 	$descr = substr($descr, 0, $descr_st);
	// }
	$price = parser_video($all, 'USD<br />~', 'руб.');
	$price = str_replace(" ", "", $price);
	$price = str_replace(",", "", $price);
	$price = floatval($price);
	$oldprice = 0;
	// $oldprice = parser_video($all, '<s class="discount">', 'руб.');
	// $oldprice = str_replace(" ", "", $oldprice);
	// $oldprice = floatval($oldprice);
	// preg_match('#<td class="name"><span>Вес уп\./кг\.</span></td>(.*?)</td>#is', $all, $weight);
	$weight = parser_video($all, 'li><strong>Усреднённый вес в почтовой упаковке : </strong>', 'гр');
	$weight = floatval(str_replace(",", "", $weight));
	$manufacture = parser_video($descr, 'Производитель:', '<br>');
	$manufacture = substr(trim($manufacture), 0, -1);
	// preg_match('#<td class="name"><span>Производитель</span></td>(.*?)</td>#is', $all, $manufacture);
	// $manufacture = trim(str_replace("<td>", "", $manufacture[1]));
	$character = "Страна: Япония."." Производитель:".$manufacture;
	$imgname = explode("/", $img);
	$imgname = end($imgname);
	$img = file_get_contents($img);
	file_put_contents(PATH_UPLOADS."new".DS.$imgname, $img);
	$img_href = PATH_UPLOADS."new".DS.$imgname;
	$sql .= "INSERT INTO {{products}} SET `pNameRu` = ".db::escape($title).", `pAltName` = ".db::escape(ToTranslit($title)).", `pTovarRu` = ".db::escape($descr).", `pDescrRu` = ".db::escape($descr).", `pCharactersRu` = ".db::escape($character).", `pPrice` = ".db::escape($price).", `pOldPrice` = ".db::escape($oldprice).", `pSize` = ".db::escape($weight).", `pCount` = 9999 , `pImg` = ".db::escape(str_replace(array(ROOT_PATH, DS), array("", "/"), $img_href)).", `pCatId` = ".$catId[$file[$i]['cat']].", `pManufact` = ".db::escape($manufacture)." , `href` = ".db::escape($file[$i]['link'])."".PHP_EOL;
	$existsProducts[$title] = true;
}

file_put_contents(ROOT_PATH."sqls.txt", $sql);
$endTime = time();
echo PHP_EOL.PHP_EOL."End: ".date("d-m-Y H:i:s", $endTime).PHP_EOL;
file_put_contents(dirname(__FILE__).DS."log.txt", PHP_EOL.PHP_EOL."End: ".date("d-m-Y H:i:s", $endTime).PHP_EOL, FILE_APPEND);
echo PHP_EOL.PHP_EOL."Time: ".timespan($endTime-$startTime, "").PHP_EOL.PHP_EOL;
file_put_contents(dirname(__FILE__).DS."log.txt", PHP_EOL.PHP_EOL."Time: ".timespan($endTime-$startTime, "").PHP_EOL.PHP_EOL, FILE_APPEND);