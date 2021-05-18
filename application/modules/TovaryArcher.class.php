<?php
/*
Hide: yes
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

class TovaryArcher extends modules {
	
	function __construct() {
		if(defined("IS_ADMINCP")) {
			KernelArcher::excludeField("add", "Shield", array("tSkryt_tovar", "tCvet", "tGallereya", "tOpisanie_tovara", "tHarakteristiki", "tSposoby_oplaty", "thref", "createdTime", "editedTime"));
			KernelArcher::excludeField("add", "Edit", array());
			KernelArcher::excludeField("add", "TakeDelete", array());
			KernelArcher::excludeField("add", "Show", array());
			KernelArcher::excludeField("add", "Sorting", array());
			KernelArcher::callback("Shield", "TraceOn", array(&$this, "RebuildShields"));
			KernelArcher::callback("ShieldFunc", "TovaryArcher::RebuildShield");
			KernelArcher::callback("AddModel", array(&$this, "RebuildAddModel"));
			KernelArcher::callback("Show", array(&$this, "RebuildShow"));
			KernelArcher::callback("EditModel", array(&$this, "RebuildEditModel"));
			KernelArcher::callback("TakeUpload", array(&$this, "RebuildTakeUpload"));
			KernelArcher::callback("TakeDelete", array(&$this, "RebuildTakeDelete"));
			KernelArcher::callback("TakeAddModel", array(&$this, "RebuildTakeAddModel"));
			KernelArcher::callback("TakeEditModel", array(&$this, "RebuildTakeEditModel"));
		} else {
			
		}
	}

	

	public function RebuildTakeDelete($model, $models) {
		return array("model" => $model, "models" => $models);
	}

	public function RebuildShields($table, $page, $model, $tpl) {
		if($model->loadedTable()=="cardinal_tovary") {
			$model->setAttribute('tNazvanie', 'Type', 'varchar');
$model->setAttribute('tKategoriya', 'Type', 'array');
$model->setAttribute('Teg', 'Type', 'array');
$model->setAttribute('tAtribut', 'Type', 'multiple-array');
$model->setAttribute('tIzobrazhenie', 'Type', 'image');
$model->setAttribute('tCena', 'Type', 'price');
$model->setAttribute('tSkidka', 'Type', 'int');
$model->setAttribute('tCvet', 'Type', 'varchar');
$model->setAttribute('tGallereya', 'Type', 'fileArray');
$model->setAttribute('tOpisanie_tovara', 'Type', 'longtext');
$model->setAttribute('tHarakteristiki', 'Type', 'longtext');
$model->setAttribute('tSposoby_oplaty', 'Type', 'longtext');
$model->setAttribute('tPoziciya', 'Type', 'int');
$model->setAttribute('thref', 'Type', 'link');
		}
		return array($table, $page, $model, $tpl);
	}

	public function RebuildShow($table, $tpl, $model) {
		if($model->loadedTable()=="cardinal_tovary") {
			$model->SetTable($table);
		}
		return array($table, $tpl, $model);
	}

	private static $cache = array();
	public static function RebuildShield($row) {
		if(isset($row['tKategoriya'])) { $db = self::init_db(); $find = false; if(!isset(self::$cache['kategorii']) || !is_array(self::$cache['kategorii']) || sizeof(self::$cache['kategorii'])==0) { self::$cache['kategorii'] = array(); $db->doquery("SELECT `kId`, `kKategoriya` FROM {{kategorii}}", true); while($rows = $db->fetch_assoc()) { self::$cache['kategorii'][$rows['kId']] = $rows['kKategoriya']; } } if(isset(self::$cache['kategorii']) && isset(self::$cache['kategorii'][$row['tKategoriya']])) { $find = true; $row['tKategoriya'] = self::$cache['kategorii'][$row['tKategoriya']]; } if($find===false) { $row['tKategoriya'] = "{L_\"Не найдено\"}"; } }
if(isset($row['Teg'])) { $db = self::init_db(); $find = false; if(!isset(self::$cache['Tegi']) || !is_array(self::$cache['Tegi']) || sizeof(self::$cache['Tegi'])==0) { self::$cache['Tegi'] = array(); $db->doquery("SELECT `TId`, `Teg_name` FROM {{Tegi}}", true); while($rows = $db->fetch_assoc()) { self::$cache['Tegi'][$rows['TId']] = $rows['Teg_name']; } } if(isset(self::$cache['Tegi']) && isset(self::$cache['Tegi'][$row['Teg']])) { $find = true; $row['Teg'] = self::$cache['Tegi'][$row['Teg']]; } if($find===false) { $row['Teg'] = "{L_\"Не найдено\"}"; } }
if(isset($row['tAtribut'])) { $db = self::init_db(); $find = false; if(!isset(self::$cache['atributy']) || !is_array(self::$cache['atributy']) || sizeof(self::$cache['atributy'])==0) { self::$cache['atributy'] = array(); $db->doquery("SELECT `aId`, `aAtribut` FROM {{atributy}}", true); while($rows = $db->fetch_assoc()) { self::$cache['atributy'][$rows['aId']] = $rows['aAtribut']; } } if(isset(self::$cache['atributy'])) { $row['tAtribut'] = explode(",", $row['tAtribut']); $arr = array(); for($i=0;$i<sizeof($row['tAtribut']);$i++) { if(isset(self::$cache['atributy'][$row['tAtribut'][$i]])) { $find = true; $arr[] = self::$cache['atributy'][$row['tAtribut'][$i]]; } } } if($find===false) { $row['tAtribut'] = "{L_\"Не найдено\"}"; } else { $row['tAtribut'] = implode(",", $arr); } }
if(isset($row['tIzobrazhenie']) && strpos($row['tIzobrazhenie'], "<img")===false) { $row['tIzobrazhenie'] = "<img src=\"{C_default_http_local}".$row['tIzobrazhenie']."\" style=\"max-width:200px\">"; }
		return array($row);
	}

	public function RebuildTakeUpload($model, $field, $id, $file, $path, $type = "", $i = -1) {
		return array($model, $field, $id, $file, $path, $type, "fileName" => $id.($i>=0 ? "_".$i : ""));
	}

	public static function RebuildEditModel($model, &$exc = array()) {
		if($model->loadedTable()=="cardinal_tovary") {
			$model->setAttribute('tNazvanie', 'default', '');
$model->setAttribute('tNazvanie', 'height', 'auto');
$model->setAttribute('tNazvanie', 'Type', 'varchar');
$model->setAttribute('tKategoriya', 'default', '');
$model->setAttribute('tKategoriya', 'height', 'auto');
if(property_exists($model, "tKategoriya")) { $model->setAttribute("tKategoriya", "Type", "array"); $category = array(); $db = self::init_db(); $db->doquery("SELECT * FROM {{kategorii}}", true); $default = ""; while($row = $db->fetch_assoc()) { if($model->tKategoriya == $row['kId']) { $default = $row['kKategoriya']; } $category[$row['kId']] = $row['kKategoriya']; } $category['default'] = $default; $model->tKategoriya = $category; }
$model->setAttribute('Teg', 'default', '');
$model->setAttribute('Teg', 'height', 'auto');
if(property_exists($model, "Teg")) { $model->setAttribute("Teg", "Type", "array"); $category = array(); $db = self::init_db(); $db->doquery("SELECT * FROM {{Tegi}}", true); $default = ""; while($row = $db->fetch_assoc()) { if($model->Teg == $row['TId']) { $default = $row['Teg_name']; } $category[$row['TId']] = $row['Teg_name']; } $category['default'] = $default; $model->Teg = $category; }
$model->setAttribute('tAtribut', 'default', '');
$model->setAttribute('tAtribut', 'height', 'auto');
if(property_exists($model, "tAtribut")) { $model->setAttribute("tAtribut", "Type", "multiple-array"); $model->tAtribut = explode(",", $model->tAtribut); $default = array(); $category = array(); $db = self::init_db(); $db->doquery("SELECT * FROM {{atributy}}", true); while($row = $db->fetch_assoc()) { if(in_array($row['aId'], $model->tAtribut)) { $default[] = $row['aId']; } $category[$row['aId']] = array("".$row['aId'] => $row['aAtribut']); } $category['default'] = $default; $model->tAtribut = $category; }
$model->setAttribute('tAtribut', 'Type', 'multiple-array');
$model->setAttribute('tIzobrazhenie', 'default', '');
$model->setAttribute('tIzobrazhenie', 'height', 'auto');
$model->setAttribute('tIzobrazhenie', 'Type', 'image');
$model->setAttribute('tCena', 'default', '');
$model->setAttribute('tCena', 'height', 'auto');
$model->setAttribute('tCena', 'Type', 'price');
$model->setAttribute('tSkidka', 'default', '');
$model->setAttribute('tSkidka', 'height', 'auto');
$model->setAttribute('tSkidka', 'Type', 'int');
$model->setAttribute('tSkryt_tovar', 'default', '');
$model->setAttribute('tSkryt_tovar', 'height', 'auto');
$model->setAttribute('tSkryt_tovar', 'Type', 'enum');
$model->setAttribute('tCvet', 'default', '');
$model->setAttribute('tCvet', 'height', 'auto');
$model->setAttribute('tCvet', 'Type', 'varchar');
$model->setAttribute('tGallereya', 'default', '');
$model->setAttribute('tGallereya', 'height', 'auto');
$model->setAttribute('tGallereya', 'Type', 'fileArray');
$model->setAttribute('tOpisanie_tovara', 'default', '');
$model->setAttribute('tOpisanie_tovara', 'height', 'auto');
$model->setAttribute('tOpisanie_tovara', 'Type', 'longtext');
$model->setAttribute('tHarakteristiki', 'default', '');
$model->setAttribute('tHarakteristiki', 'height', 'auto');
$model->setAttribute('tHarakteristiki', 'Type', 'longtext');
$model->setAttribute('tSposoby_oplaty', 'default', '');
$model->setAttribute('tSposoby_oplaty', 'height', 'auto');
$model->setAttribute('tSposoby_oplaty', 'Type', 'longtext');
$model->setAttribute('tPoziciya', 'default', '');
$model->setAttribute('tPoziciya', 'height', 'auto');
$model->setAttribute('tPoziciya', 'Type', 'int');
$model->setAttribute('thref', 'default', '');
$model->setAttribute('thref', 'height', 'auto');
$model->setAttribute('thref', 'Type', 'link');
		}
		return array($model);
	}

	function RebuildAddModel($model, &$exc = array()) {
		if($model->loadedTable()=="cardinal_tovary") {
			$model->setAttribute('tNazvanie', 'default', '');
$model->setAttribute('tNazvanie', 'height', 'auto');
$model->setAttribute('tNazvanie', 'Type', 'varchar');
$model->setAttribute('tKategoriya', 'default', '');
$model->setAttribute('tKategoriya', 'height', 'auto');
if(property_exists($model, "tKategoriya")) { $model->setAttribute("tKategoriya", "Type", "array"); $category = array(); $db = self::init_db(); $db->doquery("SELECT * FROM {{kategorii}}", true); $default = ""; while($row = $db->fetch_assoc()) { if($model->tKategoriya == $row['kId']) { $default = $row['kKategoriya']; } $category[$row['kId']] = $row['kKategoriya']; } $category['default'] = $default; $model->tKategoriya = $category; }
$model->setAttribute('Teg', 'default', '');
$model->setAttribute('Teg', 'height', 'auto');
if(property_exists($model, "Teg")) { $model->setAttribute("Teg", "Type", "array"); $category = array(); $db = self::init_db(); $db->doquery("SELECT * FROM {{Tegi}}", true); $default = ""; while($row = $db->fetch_assoc()) { if($model->Teg == $row['TId']) { $default = $row['Teg_name']; } $category[$row['TId']] = $row['Teg_name']; } $category['default'] = $default; $model->Teg = $category; }
$model->setAttribute('tAtribut', 'default', '');
$model->setAttribute('tAtribut', 'height', 'auto');
if(property_exists($model, "tAtribut")) { $model->setAttribute("tAtribut", "Type", "multiple-array"); $model->tAtribut = explode(",", $model->tAtribut); $default = array(); $category = array(); $db = self::init_db(); $db->doquery("SELECT * FROM {{atributy}}", true); while($row = $db->fetch_assoc()) { if(in_array($row['aId'], $model->tAtribut)) { $default[] = $row['aId']; } $category[$row['aId']] = array("".$row['aId'] => $row['aAtribut']); } $category['default'] = $default; $model->tAtribut = $category; }
$model->setAttribute('tAtribut', 'Type', 'multiple-array');
$model->setAttribute('tIzobrazhenie', 'default', '');
$model->setAttribute('tIzobrazhenie', 'height', 'auto');
$model->setAttribute('tIzobrazhenie', 'Type', 'image');
$model->setAttribute('tCena', 'default', '');
$model->setAttribute('tCena', 'height', 'auto');
$model->setAttribute('tCena', 'Type', 'price');
$model->setAttribute('tSkidka', 'default', '');
$model->setAttribute('tSkidka', 'height', 'auto');
$model->setAttribute('tSkidka', 'Type', 'int');
$model->setAttribute('tSkryt_tovar', 'default', '');
$model->setAttribute('tSkryt_tovar', 'height', 'auto');
$model->setAttribute('tSkryt_tovar', 'Type', 'enum');
$model->setAttribute('tCvet', 'default', '');
$model->setAttribute('tCvet', 'height', 'auto');
$model->setAttribute('tCvet', 'Type', 'varchar');
$model->setAttribute('tGallereya', 'default', '');
$model->setAttribute('tGallereya', 'height', 'auto');
$model->setAttribute('tGallereya', 'Type', 'fileArray');
$model->setAttribute('tOpisanie_tovara', 'default', '');
$model->setAttribute('tOpisanie_tovara', 'height', 'auto');
$model->setAttribute('tOpisanie_tovara', 'Type', 'longtext');
$model->setAttribute('tHarakteristiki', 'default', '');
$model->setAttribute('tHarakteristiki', 'height', 'auto');
$model->setAttribute('tHarakteristiki', 'Type', 'longtext');
$model->setAttribute('tSposoby_oplaty', 'default', '');
$model->setAttribute('tSposoby_oplaty', 'height', 'auto');
$model->setAttribute('tSposoby_oplaty', 'Type', 'longtext');
$model->setAttribute('tPoziciya', 'default', '');
$model->setAttribute('tPoziciya', 'height', 'auto');
$model->setAttribute('tPoziciya', 'Type', 'int');
$model->setAttribute('thref', 'default', '');
$model->setAttribute('thref', 'height', 'auto');
$model->setAttribute('thref', 'Type', 'link');
		}
		return array($model);
	}

	function RebuildTakeAddModel($model, $id, $countCall) {
		if($model->loadedTable()=="cardinal_tovary") {
			$model->setAttribute('tNazvanie', 'Type', 'varchar');
if(property_exists($model, "tKategoriya") && isset($_POST['tKategoriya'])) { $model->tKategoriya = $_POST['tKategoriya']; $db = self::init_db(); $db->doquery("SELECT * FROM {{kategorii}}", true); while($row = $db->fetch_assoc()) { if($model->tKategoriya == $row['kKategoriya']) { $model->tKategoriya = $row['kId']; } } }
if(property_exists($model, "Teg") && isset($_POST['Teg'])) { $model->Teg = $_POST['Teg']; $db = self::init_db(); $db->doquery("SELECT * FROM {{Tegi}}", true); while($row = $db->fetch_assoc()) { if($model->Teg == $row['Teg_name']) { $model->Teg = $row['TId']; } } }
if(property_exists($model, "tAtribut") && isset($_POST['tAtribut'])) { $model->tAtribut = $_POST['tAtribut']; }
$model->setAttribute('tIzobrazhenie', 'Type', 'image');
$model->setAttribute('tCena', 'Type', 'price');
$model->setAttribute('tSkidka', 'Type', 'int');
$model->setAttribute('tSkryt_tovar', 'Type', 'enum');
$model->setAttribute('tCvet', 'Type', 'varchar');
$model->setAttribute('tGallereya', 'Type', 'fileArray');
$model->setAttribute('tOpisanie_tovara', 'Type', 'longtext');
$model->setAttribute('tHarakteristiki', 'Type', 'longtext');
$model->setAttribute('tSposoby_oplaty', 'Type', 'longtext');
$model->setAttribute('tPoziciya', 'Type', 'int');
$model->setAttribute('thref', 'Type', 'link');
		}
		return array($model, $id, $countCall);
	}

	function RebuildTakeEditModel($model, $id, $countCall) {
		if($model->loadedTable()=="cardinal_tovary") {
			$model->setAttribute('tNazvanie', 'Type', 'varchar');
if(property_exists($model, "tKategoriya") && isset($_POST['tKategoriya'])) { $model->tKategoriya = $_POST['tKategoriya']; $db = self::init_db(); $db->doquery("SELECT * FROM {{kategorii}}", true); while($row = $db->fetch_assoc()) { if($model->tKategoriya == $row['kKategoriya']) { $model->tKategoriya = $row['kId']; } } }
if(property_exists($model, "Teg") && isset($_POST['Teg'])) { $model->Teg = $_POST['Teg']; $db = self::init_db(); $db->doquery("SELECT * FROM {{Tegi}}", true); while($row = $db->fetch_assoc()) { if($model->Teg == $row['Teg_name']) { $model->Teg = $row['TId']; } } }
if(property_exists($model, "tAtribut") && isset($_POST['tAtribut'])) { $model->tAtribut = $_POST['tAtribut']; }
$model->setAttribute('tIzobrazhenie', 'Type', 'image');
$model->setAttribute('tCena', 'Type', 'price');
$model->setAttribute('tSkidka', 'Type', 'int');
$model->setAttribute('tSkryt_tovar', 'Type', 'enum');
$model->setAttribute('tCvet', 'Type', 'varchar');
$model->setAttribute('tGallereya', 'Type', 'fileArray');
$model->setAttribute('tOpisanie_tovara', 'Type', 'longtext');
$model->setAttribute('tHarakteristiki', 'Type', 'longtext');
$model->setAttribute('tSposoby_oplaty', 'Type', 'longtext');
$model->setAttribute('tPoziciya', 'Type', 'int');
$model->setAttribute('thref', 'Type', 'link');
		}
		return array($model, $id, $countCall);
	}
	
}