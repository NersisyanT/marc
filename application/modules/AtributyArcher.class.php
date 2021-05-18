<?php
/*
Hide: yes
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

class AtributyArcher extends modules {
	
	function __construct() {
		if(defined("IS_ADMINCP")) {
			KernelArcher::excludeField("add", "Shield", array("createdTime", "editedTime"));
			KernelArcher::excludeField("add", "Edit", array());
			KernelArcher::excludeField("add", "TakeDelete", array());
			KernelArcher::excludeField("add", "Show", array());
			KernelArcher::excludeField("add", "Sorting", array());
			KernelArcher::callback("Shield", "TraceOn", array(&$this, "RebuildShields"));
			KernelArcher::callback("ShieldFunc", "AtributyArcher::RebuildShield");
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
		if($model->loadedTable()=="cardinal_atributy") {
			$model->setAttribute('aAtribut', 'Type', 'varchar');
		}
		return array($table, $page, $model, $tpl);
	}

	public function RebuildShow($table, $tpl, $model) {
		if($model->loadedTable()=="cardinal_atributy") {
			$model->SetTable($table);
		}
		return array($table, $tpl, $model);
	}

	private static $cache = array();
	public static function RebuildShield($row) {
		
		return array($row);
	}

	public function RebuildTakeUpload($model, $field, $id, $file, $path, $type = "", $i = -1) {
		return array($model, $field, $id, $file, $path, $type, "fileName" => $id.($i>=0 ? "_".$i : ""));
	}

	public static function RebuildEditModel($model, &$exc = array()) {
		if($model->loadedTable()=="cardinal_atributy") {
			$model->setAttribute('aAtribut', 'default', '');
$model->setAttribute('aAtribut', 'height', 'auto');
$model->setAttribute('aAtribut', 'Type', 'varchar');
		}
		return array($model);
	}

	function RebuildAddModel($model, &$exc = array()) {
		if($model->loadedTable()=="cardinal_atributy") {
			$model->setAttribute('aAtribut', 'default', '');
$model->setAttribute('aAtribut', 'height', 'auto');
$model->setAttribute('aAtribut', 'Type', 'varchar');
		}
		return array($model);
	}

	function RebuildTakeAddModel($model, $id, $countCall) {
		if($model->loadedTable()=="cardinal_atributy") {
			$model->setAttribute('aAtribut', 'Type', 'varchar');
		}
		return array($model, $id, $countCall);
	}

	function RebuildTakeEditModel($model, $id, $countCall) {
		if($model->loadedTable()=="cardinal_atributy") {
			$model->setAttribute('aAtribut', 'Type', 'varchar');
		}
		return array($model, $id, $countCall);
	}
	
}