<?php

class KernelArcher {
	
	private $selectTable = "";
	private static $callbackFunc = array();
	private $localModel = false;
	private static $excl = array();
	public static $editModel = array();
	private $countCall = array();
	public static $sortBy = array();
	public static $orderBy = false;
	public static $disabledQuickEditor = true;
	public static $quickEdit = array();
	public static $quickEditNew = array();
	
	function __construct($table, $model = false) {
		$this->selectTable = $table;
		if(is_object($model)) {
			$this->localModel = $model;
		}
	}

	public static function addQuickEdit($fields, $table = "default") {
		if(!is_array($fields)) {
			$fields = array($fields);
		}
		if(!isset($quickEditNew[$table])) {
			self::$quickEditNew[$table] = array();
		}
		self::$quickEditNew[$table] = array_merge($fields, self::$quickEditNew[$table]);
	}

	public static function getCallback() {
		return self::$callbackFunc;
	}
	
	public static function callback($page, $name, $call = "") {
		if(!empty($call)) {
			if(!isset(self::$callbackFunc[$page])) {
				self::$callbackFunc[$page] = array();
			}
			if(!isset(self::$callbackFunc[$page][$name])) {
				self::$callbackFunc[$page][$name] = array();
			}
			self::$callbackFunc[$page][$name][] = $call;
		} else {
			self::$callbackFunc[$page][] = $name;
		}
	}

	public static function excludeField($page, $field = "", $mod = "") {
		$editMod = "edit";
		if(!empty($mod)) {
			$editMod = $page;
			$workPage = $field;
			$workField = $mod;
		} elseif(in_array($page, array("select", "get"))) {
			$editMod = $page;
			$workPage = $field;
			$workField = $mod;
		} else {
			$workPage = $page;
			$workField = $field;
		}
		$ret = false;
		switch($editMod) {
			case "add":
			case "edit":
				if(is_array($workField)) {
					$arr = array_values($workField);
					for($i=0;$i<sizeof($arr);$i++) {
						self::$excl[$workPage][$arr[$i]] = true;
					}
					$ret = true;
				} elseif(is_string($workField)) {
					self::$excl[$workPage][$workField] = true;
					$ret = true;
				} else {
					$ret = false;
				}
			break;
			case "remove":
			case "delete":
				if(isset(self::$excl[$workPage]) && isset(self::$excl[$workPage][$workField])) {
					unset(self::$excl[$workPage][$workField]);
					$ret = true;
				}
			break;
			case "clear":
				if(isset(self::$excl[$workPage]) && is_array(self::$excl[$workPage])) {
					$k = array_keys(self::$excl[$workPage]);
					for($i=0;$i<sizeof($k);$i++) {
						unset(self::$excl[$workPage][$k[$i]]);
					}
					$ret = true;
				}
			break;
			case "select":
			case "get":
				if(isset(self::$excl[$workPage]) && is_array(self::$excl[$workPage])) {
					$ret = array_keys(self::$excl[$workPage]);
				} else {
					$ret = array();
				}
			break;
		}
		return $ret;
	}
	
	function TakeAdd($model = "", $objTemplate = "", $template = "", $load = true) {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$modelName = get_class($model);
		$model->SetTable($this->selectTable);
		$model->loadTable();
		$model->SetTable($this->selectTable);
		$firstId = $model->getFirst();
		$selectId = $model->{$firstId};
		$model = execEvent("KernelArcher-TakeAddModel-Before", $model, $firstId);
		$model = execEvent("KernelArcher-TakeAddModel", $model, $firstId);
		$model = $this->callArr($model, "TakeAddModel", array($model, $firstId, "countCall" => ""));
		unset($model->{$firstId});
		$request = new Request();
		if(sizeof($request->post)==0) {
			errorHeader();
			throw new Exception("Error post data to kernal");
			die();
		}
		$list = $model->getArray(false);
		if(isset($model->pathForUpload)) {
			$uploads = $model->pathForUpload;
			unset($model->pathForUpload);
		} else {
			$uploads = str_Replace(ROOT_PATH, "", PATH_UPLOADS);
		}
		foreach($list as $k => $v) {
			$files = $request->files->get($k, "");
			$post = $request->post->get($k, "");
			$post = $this->rebuildData($post);
			$files = $this->rebuildData($files);
			if($k == 'createdTime') { $model->{'createdTime'} = time(); continue; }
			if($k == 'editedTime') { continue; }
			execEventRef("KernelArcher-TakeAddModel-Data-Before", $k, $v, $post, $files, $models);
			if(!empty($files) && ($model->getAttribute($k, "type")=="imageAccess" || $model->getAttribute($k, "type")=="fileAccess" || $model->getAttribute($k, "type")=="file" || $model->getAttribute($k, "type")=="fileArray" || $model->getAttribute($k, "type")=="image" || $model->getAttribute($k, "type")=="imageArray")) {
				$type = $files;
				if((!isset($type['error']) || is_array($type['error'])) && (!isset($type['name']) || is_array($type['name']))) {
					$viewI = 1;
					$type = Files::reArrayFiles($type);
					$types = array();
					if(is_serialized($v)) {
						$v = unserialize($v);
					}
					if(!is_Array($v)) {
						$v = array($v);
					}
					$counter = 0;
					foreach($type as $ks => $vs) {
						$upload = $this->UploadFile($model, $ks, $selectId, $vs, (is_array($uploads) && isset($uploads[$k]) ? $uploads[$k] : $uploads), $model->getAttribute($k, "allowUpload"), $viewI);
						if(!empty($upload) || !empty($v)) {
							$types[$ks] = (!$upload ? (is_array($v) ? $v[$counter] : $v) : $upload."?".time());
							$types[$ks] = str_replace(DS, "/", $types[$ks]);
							$viewI++;
						}
						$counter++;
					}
					$type = $types;
				} else {
					$upload = $this->UploadFile($model, $k, $selectId, $type, $uploads, $model->getAttribute($k, "allowUpload"));
					$type = (!$upload ? $v : $upload."?".time());
					$type = str_replace(DS, "/", $type);
				}
				$type = str_replace(DS, "/", $type);
			} else if($model->getAttribute($k, "type")=="imageAccess" || $model->getAttribute($k, "type")=="fileAccess" || $model->getAttribute($k, "type")=="file" || $model->getAttribute($k, "type")=="fileArray" || $model->getAttribute($k, "type")=="image" || $model->getAttribute($k, "type")=="imageArray" || $model->getAttribute($k, "type")=="fileArrayAccess" || $model->getAttribute($k, "type")=="imageArrayAccess") {
				if(!empty($post)) {
					$type = $post;
				} else {
					$type = $v;
				}
				$type = str_replace(DS, "/", $type);
			} else if($model->getAttribute($k, "type")=="date") {
                $post = str_replace("/", "-", $post);
				$type = strtotime((isset($post) && !empty($post) ? $post : date("Y/m/d"))." ".date("H:i:s"));
			} else if($model->getAttribute($k, "type")=="time") {
				$type = strtotime(date("Y/m/d")." ".(isset($post) && !empty($post) ? $post : date("H:i:s")));
			} else if($model->getAttribute($k, "type")=="datetime") {
                $post[0] = str_replace("/", "-", $post[0]);
				$type = strtotime((isset($post[0]) && !empty($post[0]) ? $post[0] : date("Y/m/d"))." ".(isset($post[1]) && !empty($post[1]) ? $post[1] : date("H:i:s")));
			} else if(!is_bool($post) && $post != $v) {
				$type = $post;
			} else {
				$type = $v;
			}
			execEventRef("KernelArcher-TakeAddModel-Data", $k, $type, $post, $files, $model);
			if(!is_string($type) && !is_numeric($type) && ((is_array($type) || is_object($type) ? sizeof($type)>0 : false) || (is_string($type) ? strlen($type)>0 : false))) {
				$type = serialize($type);
			}
			$type = trim($type);
			$model->{$k} = $type;
		}
		$model = execEvent("KernelArcher-TakeAddModel-After", $model, $firstId);
		$model = $this->callArr($model, "TakeAddModel", array($model, $firstId, "countCall" => ""));
		$getExclude = KernelArcher::excludeField("get", "Edit");
		for($i=0;$i<sizeof($getExclude);$i++) {
			if(isset($model->{$getExclude[$i]})) {
				unset($model->{$getExclude[$i]});
			}
		}
		$model->WhereTo($firstId, $selectId);
		unset($model->{$firstId});
		if(isset($model->pathForUpload)) {
			unset($model->pathForUpload);
		}
		cardinal::RegAction("???????????????????? ???????????? ?? ????????????. ???????????? \"".$modelName."\"");
		$model->Insert();
		execEvent("KernelArcher-TakeAddModel-Completed", $model);
		$addition = "";
		if(Arr::get($_GET, "ShowPages", false)) {
			$addition .= "&ShowPages=".Arr::get($_GET, "ShowPages");
		}
		if(Arr::get($_GET, "orderBy", false)) {
			$addition .= "&orderBy=".Arr::get($_GET, "orderBy");
		}
		if(Arr::get($_GET, "orderTo", false)) {
			$addition .= "&orderTo=".Arr::get($_GET, "orderTo");
		}
		if(Arr::get($_GET, "Where", false)) {
			$addition .= "&Where=".Arr::get($_GET, "Where");
		}
		if(Arr::get($_GET, "WhereData", false)) {
			$addition .= "&WhereData=".Arr::get($_GET, "WhereData");
		}
		$ref = Arr::get($_GET, "ref", false);
		if($ref===false) {
			$ref = "{C_default_http_local}".(defined("ADMINCP_DIRECTORY") ? "{D_ADMINCP_DIRECTORY}" : "admincp.php")."?pages=Archer&type=".Saves::SaveOld($_GET['type']).$addition;
		} else {
			$ref = htmlspecialchars_decode($ref);
		}
		call_user_func_array("Core::addInfo", array("<b>?????????????? ???????????????? ????????????</b>", "info", false, (3), true));
		if(!empty($objTemplate)) {
			if(isset($_GET['type'])) {
				location($ref);
				//location($ref, 3, false);
			}
			//$this->UnlimitedBladeWorks($objTemplate, $template, $load);
		} else if(isset($_GET['type'])) {
			location($ref);
		}
	}
	
	function Add($model = "", $objTemplate = "") {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$listOld = get_object_vars($model);
		$model->loadTable($this->selectTable);
		$listNew = get_object_vars($model);
		foreach($listNew as $k => $v) {
			if(!array_key_exists($k, $listOld)) {
				unset($model->{$k});
			}
		}
		$exc = array();
		if(isset($model->{'createdTime'})) unset($model->{'createdTime'});
		if(isset($model->{'editedTime'})) unset($model->{'editedTime'});
		$model = $this->callArr($model, "AddModel", array($model, &$exc));
		$exc = array_values($exc);
		for($i=0;$i<sizeof($exc);$i++) {
			if(isset($model->{$exc[$i]})) {
				unset($model->{$exc[$i]});
			}
		}
		$list = $model->getArray(false);
		$list = execEvent("KernelArcher-AddModel", $list, $this->selectTable);
		$this->AddBlocks("AddData", $list);
		$tpl = $this->TraceOn("Add", $model, "ArcherAdd");
		if(!empty($objTemplate)) {
			$this->UnlimitedBladeWorks($objTemplate, $tpl, false);
		}
	}
	
	function CustomAdd($model = "", $objTemplate = "") {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$listOld = get_object_vars($model);
		$model->loadTable($this->selectTable);
		$listNew = get_object_vars($model);
		foreach($listNew as $k => $v) {
			if(!array_key_exists($k, $listOld)) {
				unset($model->{$k});
			}
		}
		$exc = array();
		if(isset($model->{'createdTime'})) unset($model->{'createdTime'});
		if(isset($model->{'editedTime'})) unset($model->{'editedTime'});
		$model = $this->callArr($model, "AddModel", array($model, &$exc));
		$exc = array_values($exc);
		for($i=0;$i<sizeof($exc);$i++) {
			if(isset($model->{$exc[$i]})) {
				unset($model->{$exc[$i]});
			}
		}
		$list = $model->getArray(false);
		$list = execEvent("KernelArcher-AddModel", $list, $this->selectTable);
		$this->AddBlocks("AddData", $list);
		$tpl = $this->TraceOn("CustomAdd", $model, "ArcherAdd");
		if(!empty($objTemplate)) {
			$this->UnlimitedBladeWorks($objTemplate, $tpl, false);
		}
	}
	
	function rebuildData(&$arr) {
		if(is_array($arr)) {
			$ret = array();
			foreach($arr as $k => $v) {
				if(empty($v)) {
					$ret[$k] = "";
				} else {
					$ret[$k] = $v;
				}
			}
			$arr = $ret;
		}
		return $arr;
	}
	
	private function UploadFile($model, $key, $id, $file, $path, $type = "", $i = -1) {
		$file = $this->callArr($file, "TakeUpload", func_get_args(), array(), false);
		if(!is_array($file)
			||
			(!isset($file['key']) && !isset($file[1]))
			||
			(!isset($file['id']) && !isset($file[2]))
			||
			(!isset($file['file']) && !isset($file[3]))
			||
			(!isset($file['path']) && !isset($file[4]))
			||
			(!isset($file['type']) && !isset($file[5]))
		) {
			errorHeader();
			throw new Exception("Returned data for upload");
			die();
		}
		$key = isset($file['key']) ? $file['key'] : $file[1];
		$path = isset($file['path']) ? $file['path'] : $file[4];
		if(is_Array($path)) {
			if(isset($path[$key])) {
				$path = $path[$key];
			} elseif(isset($path["default"])) {
				$path = $path["default"];
			} else {
				$path = current($path);
			}
		}
		$fileName = isset($file['fileName']) ? $file['fileName'] : "";
		$file = isset($file['file']) ? $file['file'] : $file[3];
		if(isset($file['type'])) {
			$typeFile = $file['type'];
			$typeFile = explode("/", $typeFile);
			$typeFile = end($typeFile);
		} else {
			$typeFile = "";
		}
		if(strpos($typeFile, "+")!==false) {
			$typeFile = explode("+", $typeFile);
			$typeFile = current($typeFile);
		}
		$fileName = uniqid().$fileName;
		$path = ROOT_PATH.$path;
		Files::$switchException = true;
		//Files::$simulate = true;
		if(is_array($file)) {
			return Files::saveFile($file, $fileName.".".$typeFile, $path);
		} else {
			return false;
		}
	}
	
	function TakeEdit($model = "", $objTemplate = "", $template = "", $load = true) {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$modelName = get_class($model);
		$model->SetTable($this->selectTable);
		$models = $model->Select();
		$models->SetTable($this->selectTable);
		$firstId = $models->getFirst();
		$selectId = $models->{$firstId};
		$model = execEvent("KernelArcher-TakeEditModel-Before", $model, $firstId);
		$model = execEvent("KernelArcher-TakeEditModel", $model, $firstId);
		$models = $this->callArr($models, "TakeEditModel", array($models, $firstId, "countCall" => ""));
		unset($model->{$firstId});
		$list = $models->getArray(false);
		$request = new Request();
		if(sizeof($request->post)==0) {
			errorHeader();
			throw new Exception("Error post data to kernal");
			die();
		}
		if(isset($model->pathForUpload)) {
			$uploads = $model->pathForUpload;
			unset($model->pathForUpload);
		} else {
			$uploads = "uploads".DS;
		}
		$emptyFiles = $request->post->get("removeImg", "");
		if(strlen($emptyFiles)>0) {
			$emptyFiles = explode(",", $emptyFiles);
			$arr = array();
			for($i=0;$i<sizeof($emptyFiles);$i++) {
				$arr[$emptyFiles[$i]] = true;
			}
			$emptyFiles = $arr;
		} else {
			$emptyFiles = array();
		}
		$delArray = $request->post->get("deleteArray", array());
		$delArray = array_map(function($v) { $arr = explode(",", $v); return array_filter($arr, 'strlen'); }, ($delArray));
		foreach($list as $k => $v) {
			if($k == 'createdTime') { $model->{'createdTime'} = $models->{'createdTime'}; continue; }
			if($k == 'editedTime') { $model->{'editedTime'} = time(); continue; }
			$files = $request->files->get($k, "");
			$post = $request->post->get($k, "");
			
			$post = $this->rebuildData($post);
			$files = $this->rebuildData($files);
			/////////
			///
			if(isset($delArray[$k]) && !empty($delArray[$k])) {
				if(is_serialized($v)) {
					$v = unserialize($v);
				}
				if(!is_Array($v)) {
					$v = array($v);
				}
				for($countFilesArray=0;$countFilesArray<sizeof($delArray[$k]);$countFilesArray++) {
					if(isset($v[$delArray[$k][$countFilesArray]])) {
						unset($v[$delArray[$k][$countFilesArray]]);
					}
				}
				$v = array_values($v);
				$v = serialize($v);
			}
			execEventRef("KernelArcher-TakeEditModel-Data-Before", $k, $v, $post, $files, $models);
			///
			/////////
			if(!empty($files) && ($models->getAttribute($k, "Type")=="imageAccess" || $models->getAttribute($k, "Type")=="fileAccess" || $models->getAttribute($k, "Type")=="file" || $models->getAttribute($k, "Type")=="fileArray" || $models->getAttribute($k, "Type")=="image" || $models->getAttribute($k, "Type")=="imageArray")) {
				$type = $files;
				if((!isset($type['error']) || is_array($type['error'])) && (!isset($type['name']) || is_array($type['name']))) {
					$viewI = 1;
					$type = Files::reArrayFiles($type);
					if(is_serialized($v)) {
						$v = unserialize($v);
					}
					$counter = 0;
					$types = array();
					foreach($type as $ks => $vs) {
						$upload = $this->UploadFile($models, $ks, $selectId, $vs, (is_array($uploads) && isset($uploads[$k]) ? $uploads[$k] : $uploads), $models->getAttribute($k, "allowUpload"), $viewI);
						if(!empty($upload) || !empty($v)) {
							$types[$ks] = (!$upload ? (is_array($v) && isset($v[$counter]) ? $v[$counter] : $v) : $upload."?".time());
							$types[$ks] = str_replace(DS, "/", $types[$ks]);
							$viewI++;
						}
						$counter++;
					}
					$type = $types;
				} else {
					$upload = $this->UploadFile($models, $k, $selectId, $type, $uploads, $models->getAttribute($k, "allowUpload"));
					$type = (isset($emptyFiles[$k]) ? "" : (!$upload ? $v : $upload."?".time()));
					$type = str_replace(DS, "/", $type);
				}
			} else if($models->getAttribute($k, "Type")=="imageAccess" || $models->getAttribute($k, "Type")=="fileAccess" || $models->getAttribute($k, "Type")=="file" || $models->getAttribute($k, "Type")=="fileArray" || $models->getAttribute($k, "Type")=="image" || $models->getAttribute($k, "Type")=="imageArray" || $models->getAttribute($k, "Type")=="fileArrayAccess" || $models->getAttribute($k, "Type")=="imageArrayAccess") {
				if(!empty($post)) {
					$type = $post;
				} else {
					$type = $v;
				}
				$type = str_replace(DS, "/", $type);
			} else if($models->getAttribute($k, "Type")=="date") {
                $post = str_replace("/", "-", $post);
				$type = strtotime((isset($post) && !empty($post) ? $post : date("Y/m/d"))." ".date("H:i:s"));
			} else if($models->getAttribute($k, "Type")=="time") {
				$type = strtotime(date("Y/m/d")." ".(isset($post) && !empty($post) ? $post : date("H:i:s")));
			} else if($models->getAttribute($k, "Type")=="datetime") {
                $post[0] = str_replace("/", "-", $post[0]);
				$type = strtotime((isset($post[0]) && !empty($post[0]) ? $post[0] : date("Y/m/d"))." ".(isset($post[1]) && !empty($post[1]) ? $post[1] : date("H:i:s")));
			} else if(!is_bool($post)) {
				$type = $post;
			} else {
				$type = $v;
			}
			execEventRef("KernelArcher-TakeAddModel-Data", $k, $type, $post, $files, $models);
			if(!is_string($type) && !is_numeric($type)) {
				$type = serialize($type);
			}
			$type = trim($type);
			$model->{$k} = $type;
		}
		$model = execEvent("KernelArcher-TakeEditModel-After", $model, $firstId);
		$model = $this->callArr($model, "TakeEditModel", array($model, $firstId, "countCall" => ""));
		$getExclude = KernelArcher::excludeField("get", "Edit");
		for($i=0;$i<sizeof($getExclude);$i++) {
			if(isset($model->{$getExclude[$i]})) {
				unset($model->{$getExclude[$i]});
			}
		}
		$model->WhereTo($firstId, $selectId);
		unset($model->{$firstId});
		if(isset($model->pathForUpload)) {
			unset($model->pathForUpload);
		}
		cardinal::RegAction("???????????????????? ???????????? ?? ????????????. ???????????? \"".$modelName."\". ????: \"".$selectId."\"");
		$model->Update();
		execEvent("KernelArcher-TakeEditModel-Completed", $model);
		$addition = "";
		if(Arr::get($_GET, "ShowPages", false)) {
			$addition .= "&ShowPages=".Arr::get($_GET, "ShowPages");
		}
		if(Arr::get($_GET, "orderBy", false)) {
			$addition .= "&orderBy=".Arr::get($_GET, "orderBy");
		}
		if(Arr::get($_GET, "orderTo", false)) {
			$addition .= "&orderTo=".Arr::get($_GET, "orderTo");
		}
		if(Arr::get($_GET, "Where", false)) {
			$addition .= "&Where=".Arr::get($_GET, "Where");
		}
		if(Arr::get($_GET, "WhereData", false)) {
			$addition .= "&WhereData=".Arr::get($_GET, "WhereData");
		}
		$ref = Arr::get($_GET, "ref", false);
		if($ref===false) {
			$ref = "{C_default_http_local}".(defined("ADMINCP_DIRECTORY") ? "{D_ADMINCP_DIRECTORY}" : "admincp.php")."?pages=Archer&type=".Saves::SaveOld($_GET['type']).$addition;
		} else {
			$ref = htmlspecialchars_decode($ref);
		}
		call_user_func_array("Core::addInfo", array("<b>?????????????????? ?????????????? ??????????????????</b> ID ????????????: ".$selectId, "info", false, (3), true));
		if(!empty($objTemplate)) {
			if(isset($_GET['type'])) {
				location($ref);
				//location($ref, 3, false);
			}
			//$this->UnlimitedBladeWorks($objTemplate, $template, $load);
		} else if(isset($_GET['type'])) {
			location($ref);
		}
	}
	
	function Edit($model = "", $objTemplate = "") {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$model = $model->Select();
		$model->SetTable($this->selectTable);
		if(isset($model->{'createdTime'})) unset($model->{'createdTime'});
		if(isset($model->{'editedTime'})) unset($model->{'editedTime'});
		$exc = array();
		$model = $this->callArr($model, "EditModel", array($model, &$exc), array(), true);
		$exc = array_values($exc);
		for($i=0;$i<sizeof($exc);$i++) {
			if(isset($model->{$exc[$i]})) {
				unset($model->{$exc[$i]});
			}
		}
		$list = $model->getArray(false);
		foreach($list as $k => $v) {
			if($model->getAttribute($k, "type")=="fileArray" || $model->getAttribute($k, "type")=="imageArray" || $model->getAttribute($k, "type")=="fileArrayAccess" || $model->getAttribute($k, "type")=="imageArrayAccess") {
				if(Validate::is_serialized($v)) {
					$t = unserialize($v);
				} else {
					$t = array($v);
				}
				if(isset($t[0]) && is_array($t[0])) {
					$t = array();
				}
				$model->{$k} = $list[$k] = implode(",", $t);
			}
		}
		$list = $model->getArray(false);
		$firstId = current($list);
		if(empty($firstId)) {
			errorHeader();
			throw new Exception("Error type kernal get data");
			die();
		}
		$this->AddBlocks("EditData", $list);
		$tpl = $this->TraceOn("Edit", $model, "ArcherAdd");
		if(!empty($objTemplate)) {
			$this->UnlimitedBladeWorks($objTemplate, $tpl, false);
		}
	}
	
	function CustomEdit($model = "", $objTemplate = "") {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$model = $model->Select();
		$model->SetTable($this->selectTable);
		if(isset($model->{'createdTime'})) unset($model->{'createdTime'});
		if(isset($model->{'editedTime'})) unset($model->{'editedTime'});
		$exc = array();
		$model = $this->callArr($model, "EditModel", array($model, &$exc), array(), true);
		$exc = array_values($exc);
		for($i=0;$i<sizeof($exc);$i++) {
			if(isset($model->{$exc[$i]})) {
				unset($model->{$exc[$i]});
			}
		}
		$list = $model->getArray(false);
		foreach($list as $k => $v) {
			if($model->getAttribute($k, "type")=="fileArray" || $model->getAttribute($k, "type")=="imageArray" || $model->getAttribute($k, "type")=="fileArrayAccess" || $model->getAttribute($k, "type")=="imageArrayAccess") {
				if(Validate::is_serialized($v)) {
					$t = unserialize($v);
				} else {
					$t = array($v);
				}
				if(isset($t[0]) && is_array($t[0])) {
					$t = array();
				}
				$model->{$k} = $list[$k] = implode(",", $t);
			}
		}
		$list = $model->getArray(false);
		$firstId = current($list);
		if(empty($firstId)) {
			errorHeader();
			throw new Exception("Error type kernal get data");
			die();
		}
		$this->AddBlocks("EditData", $list);
		$tpl = $this->TraceOn("CustomEdit", $model, "ArcherAdd");
		if(!empty($objTemplate)) {
			$this->UnlimitedBladeWorks($objTemplate, $tpl, false);
		}
	}
	
	function TakeDelete($model = "", $objTemplate = "", $template = "", $load = true) {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$modelName = get_class($model);
		$model->SetTable($this->selectTable);
		$models = $model->Select();
		if($models===null) {
			$models = $model;
		}
		$del = $this->callArr($model, "TakeDelete", array($model, $models));
		$del = execEvent("KernelArcher-TakeDelete-Before", $model, $models);
		$del = execEvent("KernelArcher-TakeDelete", $model, $models);
		if(is_array($del) && isset($del['model'])) {
			$model = $del['model'];
		}
		if(is_array($del) && isset($del['models'])) {
			$models = $del['models'];
		}
		/*if(is_object($del)) {
			$models = $del;
		}*/
		$models = $models->getArray(false);
		$trash = false;
		if(defined("PATH_CACHE_USERDATA")) {
			if(!is_writeable(PATH_CACHE_USERDATA)) {
				@chmod(PATH_CACHE_USERDATA, 0777);
			}
			if(!file_exists(PATH_CACHE_USERDATA."trashbin.lock")) {
				db::query("CREATE TABLE IF NOT EXISTS {{trashbin}} ( `tId` int not null auto_increment, `tTable` varchar(255) not null, `tData` longtext not null, `tTime` int(11) not null, `tIp` varchar(255) not null, primary key `id`(`tId`) ) ENGINE=MyISAM;");
				file_put_contents(PATH_CACHE_USERDATA."trashbin.lock", "");
			}
			$trash = true;
		}
		$first = current($models);
		$days = 30;
		if(defined("EMPTY_TRASH_DAYS")) {
			if(is_numeric(EMPTY_TRASH_DAYS) && EMPTY_TRASH_DAYS>0) {
				$days = EMPTY_TRASH_DAYS;
			} else if(is_bool(EMPTY_TRASH_DAYS) && EMPTY_TRASH_DAYS===false) {
				$days = 0;
			}
		}
		if($days==0 || !$trash) {
			if(isset(self::$excl[__FUNCTION__])) {
				foreach(self::$excl[__FUNCTION__] as $k => $v) {
					if(isset($models[$k])) {
						unset($models[$k]);
					}
				}
			}
			foreach($models as $name => $val) {
				if(empty($val)) {
					continue;
				}
				execEventRef("KernelArcher-TakeDelete-Data", $name, $val, $models);
				$type = $model->getAttribute($name, "type");
				if($type=="image" || $type=="file") {
					$val = str_replace("/", DS, $val);
					$exp = explode("?", $val);
					if((is_array($exp) && isset($exp[0]) && file_exists(ROOT_PATH.$exp[0])) || (file_exists(ROOT_PATH.$val))) {
						unlink(ROOT_PATH.(is_array($exp) && isset($exp[0]) ? $exp[0] : $val));
					}
				} else if($type=="imageArray" || $type=="fileArray" || $type=="fileArrayAccess" || $type=="imageArrayAccess") {
					$exp = explode(",", $val);
					for($i=0;$i<sizeof($exp);$i++) {
						$exp[$i] = str_replace("/", DS, $exp[$i]);
						$exps = explode("?", $exp[$i]);
						if((is_array($exps) && isset($exps[0]) && file_exists(ROOT_PATH.$exps[0])) || (file_exists(ROOT_PATH.$exp[$i]))) {
							unlink(ROOT_PATH.(is_array($exps) && isset($exps[0]) ? $exps[0] : $exp[$i]));
						}
					}
				}
			}
			cardinal::RegAction("???????????????? ???????????? ?? ????????????. ???????????? \"".$modelName."\". ????: \"".$first."\"");
		} else {
			db::doquery("INSERT INTO {{trashbin}} SET `tTable` = ".db::escape($this->selectTable).", `tData` = ".db::escape(json_encode($models)).", `tTime`= UNIX_TIMESTAMP(), `tIp` = '".HTTP::getip()."'");
			cardinal::RegAction("?????????????????????? ???????????? ?? ???????????? ?? ??????????????. ???????????? \"".$modelName."\". ????: \"".$first."\"");
		}
		$del = execEvent("KernelArcher-TakeDelete-After", $model);
		$list = $model->Deletes();
		execEvent("KernelArcher-TakeDelete-Completed", $model);
		$addition = "";
		if(Arr::get($_GET, "ShowPages", false)) {
			$addition .= "&ShowPages=".Arr::get($_GET, "ShowPages");
		}
		if(Arr::get($_GET, "orderBy", false)) {
			$addition .= "&orderBy=".Arr::get($_GET, "orderBy");
		}
		if(Arr::get($_GET, "orderTo", false)) {
			$addition .= "&orderTo=".Arr::get($_GET, "orderTo");
		}
		$ref = Arr::get($_GET, "ref", false);
		if($ref===false) {
			$ref = "{C_default_http_local}".(defined("ADMINCP_DIRECTORY") ? "{D_ADMINCP_DIRECTORY}" : "admincp.php")."?pages=Archer&type=".Saves::SaveOld($_GET['type']).$addition;
		} else {
			$ref = htmlspecialchars_decode($ref);
		}
		call_user_func_array("Core::addInfo", array("<b>???????????? ?????????????? ??????????????</b> ID ????????????: ".$first, "info", false, (60), true));
		if(!empty($objTemplate)) {
			if(isset($_GET['type'])) {
				//location($ref, 3, false);
				location($ref);
			}
			//$this->UnlimitedBladeWorks($objTemplate, $template, $load);
		} else if(isset($_GET['type'])) {
			location($ref);
		}
	}
	
	function Show($model = "", $objTemplate = "", $template = "") {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$model->SetTable($this->selectTable);
		$lists = $model->Select();
		$list = $lists->getArray(false);
		$firstId = current($list);
		if(empty($firstId)) {
			errorHeader();
			throw new Exception("Error type kernal get data");
			die();
		}
		$load = false;
		if(isset(self::$callbackFunc["Show"])) {
			$ret = $this->callArr($lists, "Show", array($this->selectTable, $objTemplate, $lists));
			if(isset($ret['list'])) {
				$list = $ret['list'];
			}
			if(isset($ret['objTemplate'])) {
				$objTemplate = $ret['objTemplate'];
			}
			if(isset($ret['template'])) {
				$template = $ret['template'];
			}
			if(isset($ret['load'])) {
				$load = $ret['load'];
			}
		}
		$this->AddBlocks("Show", $list);
		if(empty($template)) {
            $template = $this->TraceOn("Show", $list, "ArcherShow");
		}
		if(!empty($objTemplate)) {
			$this->UnlimitedBladeWorks($objTemplate, $template, $load);
		}
	}
	
	function Shield($model = "", $objTemplate = "", $template = "", $load = true) {
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		$objName = get_class($model);
		$model->SetTable($this->selectTable);
		$model = execEvent("KernelArcher-Shield-Before-Data", $model, $objName);
		$list = $model->Select();
		$list = execEvent("KernelArcher-Shield-Data", $list, $objName);
		if(is_object($list)) {
			$list = $list->getArray(false);
			$first = current($list);
			if(!is_null($first)) {
				$list = $this->callArr($list, "ShieldFunc", array($list, $this->selectTable));
				$this->AddBlocks("Mains", $list, $objName, $objName."-".current($list));
			}
		} elseif(is_array($list)) {
			for($i=0;$i<sizeof($list);$i++) {
				$subList = $list[$i]->getArray(false);
				$first = current($subList);
				if(is_null($first)) {
					continue;
				}
				$subList = $this->callArr($subList, "ShieldFunc", array($subList, $this->selectTable), array());
				$this->AddBlocks("Mains", $subList, $objName, $objName."-".current($subList));
			}
		}
		if(!empty($objTemplate)) {
			$this->UnlimitedBladeWorks($objTemplate, $template, $load);
		}
	}
	
	public function callArr($return, $page, $func, $params = array(), $single = true) {
		if(!isset($this->countCall[$page]) || !is_numeric($this->countCall[$page])) {
			$this->countCall[$page] = 0;
		}
		$this->countCall[$page]++;
		if(is_array($params) && array_key_exists("countCall", $params) && is_string($func)) {
			$params = array_merge($params, array("countCall" => $this->countCall[$page]));
		} elseif(is_array($func) && array_key_exists("countCall", $func)) {
			$func = array_merge($func, array("countCall" => $this->countCall[$page]));
		}
		if(isset(self::$callbackFunc[$page]) && is_string($func) && isset(self::$callbackFunc[$page][$func])) {
			$return = $params;
			for($i=0;$i<sizeof(self::$callbackFunc[$page][$func]);$i++) {
				$return = call_user_func_array(self::$callbackFunc[$page][$func][$i], $return);
			}
		} else if(isset(self::$callbackFunc[$page]) && is_array($func)) {
			$call = $func;
			for($i=0;$i<sizeof(self::$callbackFunc[$page]);$i++) {
				$call1 = call_user_func_array(self::$callbackFunc[$page][$i], $call);
				if(is_array($call1)) {
					$call = $call1;
				} else {
					trigger_error(var_export(self::$callbackFunc[$page][$i], true)." return is not array - ignore");
				}
			}
			if($single) {
				$return = current($call);
			} else {
				$return = $call;
			}
		}
		return $return;
	}
	
	function TraceOn($page, $model = "", $tpl = "", $objTemplate = "") {
		if(!empty($model) && empty($tpl) && empty($objTemplate)) {
			$tpl = $model;
			$model = $this->localModel;
		}
		if((empty($model) && (gettype($model)!=="object" || !method_exists($model, "getArray"))) && (gettype($this->localModel)!=="object" || !method_exists($this->localModel, "getArray"))) {
			errorHeader();
			throw new Exception("Error type kernal #1 parameter");
			die();
		}
		if(!empty($objTemplate) && is_object($objTemplate) && modules::checkObject($objTemplate, "templates")) {
			$tpl = call_user_func_array(array($objTemplate, "load_templates"), array($tpl));
		} else {
			$tpl = templates::load_templates($tpl);
		}
		$tpl = $this->callArr($tpl, $page, "TraceOn", array($this->selectTable, $page, $model, $tpl));
		return $tpl;
	}
	
	function AddBlocks($page, $arr, $block = "", $id = "") {
		foreach($arr as $k => $v) {
			if(isset(self::$callbackFunc[$page][$k])) {
				$arr[$k] = $this->callArr($arr[$k], $page, $k, array($v));
			}
		}
		if(!empty($block) && !empty($id)) {
			call_user_func_array("templates::assign_vars", array($arr, $block, $id));
		} else {
			call_user_func_array("templates::assign_vars", array($arr));
		}
	}
	
	function AddBlock($page, $name, $val) {
		$val = $this->callArr($val, $page, $name, array($val));
		$arr = array("name" => $name, "value" => $val);
		$val = $this->callArr($val, $page, array($arr));
		call_user_func_array("templates::assign_var", array($arr['name'], $arr['value']));
	}
	
	public static function Viewing($type, $name, $val, $height = "auto", $default = "", $required = false, $block = false, $isAjax = false, $lang = "", $models = "", $hide = false, $args = array()) {
		$grouper = "";
		$grouperLang = "";
		if($lang!=="") {
			$grouper = str_replace($lang, "", $name);
			$grouperLang = str_replace($grouper, "", $name);
		}
		if($val===null) {
			$val = "";
		}
		if($val==="") {
			$val = $default;
		}
		$open = defined("ADMINCP_DIRECTORY");
		$retType = '';
		$empted = false;
		$loadPlaceHolder = true;
		$placeholder = ($models instanceof DBOBject ? $models->getAttribute($name, "placeholder") : (isset($args['placeholder']) ? $args['placeholder'] : ""));
		execEventRef("KernelArcher::Viewing", $retType, $hide, $name, $val, $type, $height, $default, $empted);
		execEventRef("KernelArcher::Viewing-Placeholder", $loadPlaceHolder, $models);
		switch($type) {
			case "delimer":
				$hide = true;
				$retType = '<div class="form-group-separator"></div>';
			break;
			case "subpanel":
				$hide = true;
				$title = ($models instanceof DBOBject ? $models->getAttribute($name, "title_subpanel") : (isset($args['title_subpanel']) ? $args['title_subpanel'] : ""));
				$hidded = ($models instanceof DBOBject ? $models->getAttribute($name, "hidded") : (isset($args['hidded']) ? $args['hidded'] : ""));
				$collapsed = ($models instanceof DBOBject ? $models->getAttribute($name, "collapsed") : (isset($args['collapsed']) ? $args['collapsed'] : ""));
				$retType = '</div></div><div class="panel panel-default panel-'.$name.($collapsed ? ' collapsed' : '').'">'.($title ? '<div class="panel-heading"><h3 class="panel-title">'.$title.'</h3>'.($collapsed || $hidded ? '<div class="panel-options"><a href="#" data-toggle="panel"><span class="collapse-icon">???</span><span class="expand-icon">+</span></a></div>' : "").'</div>' : '').'<div class="panel-body">';
			break;
			case "linkToAdmin":
				$hide = true;
				$linkLink = ($models instanceof DBOBject ? $models->getAttribute($name, "linkLink") : (isset($args['linkLink']) ? $args['linkLink'] : ""));
				$titleLink = ($models instanceof DBOBject ? $models->getAttribute($name, "titleLink") : (isset($args['titleLink']) ? $args['titleLink'] : ""));
				$retType = "<div class=\"text-center ".(!$block ? "form-group" : "row")." block-".$name."\"".($lang!=="" ? " data-group=\"".$grouper."\" data-lang=\"".$grouperLang."\"" : "")."><div class=\"col-xs-12\"><a href=\"".$linkLink."\" class=\"btn btn-block btn-info col-xs-12\">".$titleLink."</a></div></div>";
			break;
			case "tinyint":
			case "smallint":
			case "mediumint":
			case "int":
			case "bigint":
				$retType = "<input id=\"".$name."\" class=\"form-control\" type=\"number\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">";
			break;
			case "float":
			case "double":
			case "decimal":
			case "real":
				$retType = "<input id=\"".$name."\" class=\"form-control\" type=\"number\" step=\"0.01\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">";
			break;
			case "radio":
				$radio = explode(",", $val);
				$radio = array_map("trim", $radio);
				for($i=0;$i<sizeof($radio);$i++) {
					$retType .= "<label for=\"".$name."-".$i."\"><input type=\"radio\" id=\"".$name."-".$i."\" name=\"".$name."\" class=\"cbr cbr-blue\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")."".(!empty($default) && $default==$radio[$i] ? " checked=\"checked\"" : "")." value=\"".htmlspecialchars($radio[$i])."\">".($open ? "{L_'" : "").htmlspecialchars($radio[$i]).($open ? "'}" : "")."</label><br>";
				}
			break;
			case "multiple-array":
                $comp = array();
                for($i=0;$i<sizeof($val);$i++) {
                	if(!isset($val[$i]) || !is_array($val[$i])) continue;
                    $k = key($val[$i]);
                    $v = current($val[$i]);
                    $comp[$k] = $v;
                }
                $val = $comp;
				$enum = array_map("trim", $val);
				$data = $selected = array();
				foreach($enum as $k => $v) {
					$data[] = array("id" => $k, "text" => $v);
					$selected[] = (!empty($default) && in_array($k, $default) ? $v : "");
				}
				$selected = array_filter($selected);
				$selectedBy = ($models instanceof DBOBject ? $models->getAttribute($name, "selectedBy") : (isset($args['selectedBy']) ? $args['selectedBy'] : ""));
				$id = md5(microtime().uniqid());
				$retType = "<input id=\"".$name."\" class=\"form-control multiple-select\" type=\"text\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" data-options='options_".$id."' value=\"".htmlspecialchars(implode(",", $selected))."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." data-selectedBy=\"".$selectedBy."\" style=\"".($height!="auto" ? "height:".$height."px" : "")."\"><script type='text/template' id='options_".$id."'>".json_encode($data)."</script>";
				$val = "";
			break;
			case "enum":
				$enum = explode(",", $val);
				$enum = array_map("trim", $enum);
				$retType = "<select id=\"".$name."\" data-select=\"true\" name=\"".$name."\" class=\"form-control\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">".(!defined("WITHOUT_NULL") ? "<option value=\"\">".($loadPlaceHolder ? ($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."</option>" : "");
				for($i=0;$i<sizeof($enum);$i++) {
					$retType .= "<option value=\"".htmlspecialchars($enum[$i])."\"".(!empty($default) && $default==$enum[$i] ? " selected=\"selected\"" : "").">".($open ? "{L_'" : "").htmlspecialchars($enum[$i]).($open ? "'}" : "")."</option>";
				}
				$retType .= "</select>";
			break;
			case "array":
				$enum = array_map(function($item) {
					return (is_array($item) ? $item : trim($item));
				}, $val);
				$retType = "<select id=\"".$name."\" data-select=\"true\" name=\"".$name."\" class=\"form-control\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">".(!defined("WITHOUT_NULL") ? "<option value=\"\">".($loadPlaceHolder ? ($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."</option>" : "");
				foreach($enum as $v) {
					$type = "o";
					if(is_array($v)) {
						if(isset($v['type']) && $v['type']=="opt") {
							$type = "opt";
						}
						if(isset($v['name'])) {
							$v = $v['name'];
						} else {
							$v = end($v);
						}
					}
					$v = trim($v);
					if($type=="opt") {
						$retType .= "<option class='bold' value=\"".htmlspecialchars($v)."\"".(!empty($default) && $default==$v ? " selected=\"selected\"" : "").">".($open ? "{L_'" : "").htmlspecialchars($v)."".($open ? "'}" : "")."</option>\n";
					} else {
						$retType .= "<option value=\"".htmlspecialchars($v)."\"".(!empty($default) && $default==$v ? " selected=\"selected\"" : "").">".($open ? "{L_'" : "").htmlspecialchars($v)."".($open ? "'}" : "")."</option>\n";
					}
				}
				$retType .= "</select>";
			break;
			case "varchar":
				$retType = "<input id=\"".$name."\" class=\"form-control\" type=\"text\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">";
			break;
			case "price":
				$retType = "<div class=\"input-group\"><span class=\"input-group-addon\">$</span><input id=\"".$name."\" type=\"number\" step=\"0.01\" class=\"form-control\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\"></div>";
			break;
			case "image":
			case "file":
				if(strpos($val, "http")===false) {
					$vals = "{C_default_http_local}".$val;
				} else {
					$vals = $val;
				}
				$empted = true;
				$retType = "<input id=\"".$name."\" class=\"form-control\" type=\"file\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\"".(empty($vals) && $required ? " required=\"required\"" : "")."".($block ? " readonly=\"readonly\"" : "").($type=="image" ? " accept=\"image/*\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">".(!empty($val) ? "&nbsp;&nbsp;<a href=\"".$vals."\"".($type=="image" ? " class=\"showPreview\"" : "")." target=\"_blank\">".($open ? "{L_'" : "")."??????????????????????".($open ? "'}" : "")."</a>" : "")."<br>";
			break;
			case "imageAccess":
			case "fileAccess":
				if(strpos($val, "http")===false) {
					$vals = "{C_default_http_local}".$val;
				} else {
					$vals = $val;
				}
				$parent = uniqid();
				$sType = (strpos($type, "file")!==false ? "file" : "image");
				$uid = rand();
				$datas = '<div class="row" data-show="'.$uid.'">'.
						'<div class="col-sm-12" data-for-btn-data="true">'.
							'<a href="#" class="btn btn-icon btn-red accessRemove pull-right" data-parent="'.$parent.'"><i class="fa-remove"></i></a>'.
							'<input class="form-control '.$sType.'Access" id="'.$name.'" name="'.$name.'" type="text" value="'.$val.'" data-upload-type="'.$type.'" placeholder="'.($loadPlaceHolder ? ($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "").'"'.($block ? " readonly=\"readonly\"" : "").($type=="imageAccess" ? " data-accept=\"image\"" : "").' value="'.htmlspecialchars($val).'"'.(empty($val) && $required ? " required=\"required\"" : "").' style="position:fixed;top:-99999px;left:-99999px;z-index:-1000;">'.
							'<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/assets/tinymce/filemanager/dialog.php?type='.($type=="imageAccess" ? "1" : "2").'&field_id='.$name.'&relative_url=0" class="btn btn-icon btn-success iframe-btn"><i class="fa-plus"></i></a>'.
							'<div class="children"><br>'.
							(!empty($val) ? '&nbsp;&nbsp;<a data-link="'.$vals.'" href="'.$vals.'"'.($type=="imageAccess" ? " class=\"showPreview new\"" : "").' target="_blank">'.($open ? "{L_'" : "")."??????????????????????".($open ? "'}" : "")."</a>" : "").
							'</div>'.
						'</div>'.
					'</div>';
				$container = "<div class=\"containerFiles container-".$type."\" data-parent=\"".$parent."\">".$datas."</div>";
				$retType = $container;
			break;
			case "imageArray":
			case "fileArray":
				$retType = '<input type="hidden" name="deleteArray['.$name.']">';
				$enum = explode(",", $val);
				$enum = array_map("trim", $enum);
				$size = sizeof($enum);
				$retType .= "<div id=\"inputForFile\" class=\"row\" data-accept=\"".($type=="imageArray" ? "image/*" : "")."\">";
				for($i=0;$i<sizeof($enum);$i++) {
					$uid = rand();
					$retType .= "<div class='array' data-show='".$uid."'>".(sizeof($enum)>1 ? "<div class='col-sm-1'>#".($i+1)."</div><div class='col-sm-9'>" : "<div class='col-sm-10'>")."<input class=\"form-control\" type=\"file\"".(sizeof($enum)==1 ? " multiple=\"multiple\"" : "")." name=\"".$name.(sizeof($enum)>1 ? "[".$i."]" : "[]")."\" data-upload-type=\"".$type."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\"".($block ? " readonly=\"readonly\"" : "").($type=="imageArray" ? " accept=\"image/*\"" : "")."".(empty($val) && $required ? " required=\"required\"" : "")."></div><div class='col-sm-2'><a class='btn btn-red btn-block fa-remove' onclick='removeInputFile(this,\"".$name."\",\"".$i."\")'></a></div>".(!empty($val) ? "<div class='col-sm-12'><a href=\"{C_default_http_local}".$enum[$i]."\" class=\"showPreview new\" target=\"_blank\">".($open ? "{L_'" : "")."??????????????????????".($open ? "'}" : "")."</a></div>" : "")."</div>";
				}
				$retType .= "</div><br><a href=\"#\" onclick=\"addInputFile(this, '".$name."');return false;\" class=\"btn btn-white btn-block btn-icon btn-icon-standalone\"><i class=\"fa-upload\"></i><span>".($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."</span></a>";
				$retType .= "<script type=\"text/javascript\">if(typeof(arrayAccess)===\"undefined\"){var arrayAccess = {};} arrayAccess['".$name."'] = ".($size)."</script>";
				$retType .= "<script type=\"text/template\" class=\"template_btn_access\" data-template-id=\"".$name."\"><div class='col-sm-12'><a href=\"{val}\" data-link=\"{val}\" class=\"{class}\" id=\"img{uid}\" target=\"_blank\">"."{L_'??????????????????????'}</a></div></script>";
			break;
			case "imageArrayAccess":
			case "fileArrayAccess":
				$retType = '<input type="hidden" name="deleteArray['.$name.']">';
				$enum = explode(",", $val);
				$enum = array_map("trim", $enum);
				$retType .= "<div id=\"inputForFiles\" class=\"row\" data-accept=\"".($type=="imageArrayAccess" ? "image/*" : "")."\">";
				$sType = (strpos($type, "file")!==false ? "file" : "image");
				$size = sizeof($enum);
				$count = ($size>1 ? "{i}" : "");
				$blocker = ($block ? " readonly=\"readonly\"" : "");
				$placeholders = ($loadPlaceHolder ? "{L_'????????????????'}&nbsp;"."{L_'".$name."'}" : "");
				$requirer = (empty($val) && $required ? " required=\"required\"" : "");
				$tmp = "";
				$tmp .= "<div class='col-sm-4 array' data-show='{template_access_uid}' data-ass='{__*__}'>";
					$tmp .= "<div class='row'>";
						$tmp .= "<div class='col-sm-12' data-for-btn-data='true'>";

							$tmp .= "<input class=\"form-control {sType}Access {sType}AccessArray inputedAccess\" id=\"{template_access_uid}\" type=\"text\""
							.($size==1 ? " multiple=\"multiple\"" : "").""
							.$blocker
							." name=\"{template_access_name}\" name-field=\"{template_access_name}\" placeholder=\"{placeholder}\" data-upload-type=\"".$type."\""
							.($type=="imageArrayAccess" ? " accept=\"image/*\" data-accept=\"image\"" : "")
							." value=\"{template_access_value}\"{required} style='position:fixed;top:-99999px;left:-99999px;z-index:-1000;'>";

							$tmp .= '<div class="row btn-add-image">';
								$tmp .= '<div class="col-sm-12 btn-add-image-control" style="position: absolute;width: 100%;display: flex;align-items: center;justify-content: center;height: 100%;flex-direction: column;z-index: 10;margin: 0 -15px;">';
									$tmp .= '<div style="width:50%;float:left;"><a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/assets/tinymce/filemanager/dialog.php?type='.($type=="imageAccess" ? "1" : "2").'&field_id={template_access_uid}&relative_url=0&multiple=1" class="btn btn-icon btn-success iframe-btn btn-block fa-plus"></a></div>';
									$tmp .= "<div style=\"width:50%;float:left;\"><a class='btn btn-red btn-block fa-remove' onclick='removeInputFile(this,\"{template_access_name}\",\"{__*__}\")'></a></div>";
								$tmp .= '</div>';
							$tmp .= '</div>';
							$tmp .= "<div class=\"children\">{template_access_btnWithData}</div>";
						$tmp .= "</div>";
					$tmp .= "</div>";
				$tmp .= "</div>";
				$tplS = str_replace("{required}", ($required ? " required=\"required\"" : ""), $tmp);
				$tplS = str_replace("{placeholder}", ($loadPlaceHolder ? "{L_'????????????????'}&nbsp;"."{L_'".$name."'}" : ""), $tplS);
				$tplS = str_replace("{__*__}", "{template_access_id}", $tplS);
				$tplS = str_replace("{sType}", $sType, $tplS);
				$tmpImg = (!empty($val) ? "<a href=\"{C_default_http_local}{enum}\" data-link=\"{C_default_http_local}{enum}\" class=\"showPreview new\" id=\"img{template_access_uid}\" target=\"_blank\">"."{L_'??????????????????????'}</a>" : "");
				for($i=0;$i<$size;$i++) {
					$uid = rand();
					$tpl = $tmp;
					$tpl = str_replace("{template_access_btnWithData}", $tmpImg, $tpl);
					$tpl = str_replace("{__*__}", $i, $tpl);
					$tpl = str_replace("{sType}", $sType, $tpl);
					$tpl = str_replace("{placeholder}", $placeholders, $tpl);
					$tpl = str_replace("{template_access_name}", $name, $tpl);
					$tpl = str_replace("{template_access_uid}", $uid, $tpl);
					$tpl = str_replace("{template_access_id}", ($i+1), $tpl);
					$tpl = str_replace("{template_access_value}", htmlspecialchars($enum[$i]), $tpl);
					$tpl = str_replace("{enum}", $enum[$i], $tpl);
					$tpl = str_replace("{required}", $requirer, $tpl);
					$tpl = str_replace("_subname_count_", $i, $tpl);
					$retType .= $tpl;
				}
				$retType .= "</div><br><a href=\"#\" onclick=\"addInputFileAccess(this, '".$name."', '".($type=="imageAccess" ? "1" : "2")."', '', true);return false;\" class=\"btn btn-white btn-block btn-icon btn-icon-standalone\"><i class=\"fa-upload\"></i><span>"."{L_'????????????????'}</span></a>";
				$retType .= "<script type=\"text/javascript\">if(typeof(arrayAccess)===\"undefined\"){var arrayAccess = {};} arrayAccess['".$name."'] = ".($size)."</script>";
				$retType .= "<script type=\"text/template\" class=\"template_btn_access\" data-template-id=\"".$name."\"><a href=\"{template_access_val}\" data-link=\"{template_access_val}\" class=\"{template_access_class}\" id=\"img{template_access_uid}\" target=\"_blank\">"."{L_'??????????????????????'}</a></script>";
				$retType .= "<script type=\"text/template\" class=\"template_array_access\" data-template-id=\"".$name."\">".$tplS."</script>";
			break;
			case "shorttext":
			case "mediumtext":
			case "text":
			case "longtext":
				$retType = "<textarea id=\"".$name."\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" class=\"form-control ckeditor\" rows=\"10\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">".htmlspecialchars($val)."</textarea>";
			break;
			case "onlytextareatext":
				$retType = "<textarea class=\"onlyText form-control\" id=\"".$name."\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" rows=\"10\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">".htmlspecialchars($val)."</textarea>";
			break;
			case "email":
				$retType = "<div class=\"input-group\"><span class=\"input-group-addon\">@</span><input id=\"".$name."\" class=\"form-control\" type=\"email\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\"></div>";
			break;
			case "link":
				$retType = "<div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-link\"></i></span><input id=\"".$name."\" class=\"form-control\" type=\"text\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\"></div>";
			break;
			case "password":
				$retType = "<input id=\"".$name."\" class=\"form-control\" type=\"password\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">";
			break;
			case "hidden":
			case "hide":
				$hide = true;
				$retType = "<input id=\"".$name."\" type=\"hidden\" name=\"".$name."\" value=\"".htmlspecialchars($val)."\"".($block ? " readonly=\"readonly\"" : "")." style=\"".($height!="auto" ? "height:".$height."px" : "")."\">";
			break;
			case "date":
				$retType = "<div class=\"date-and-time\"><input id=\"".$name."\" type=\"text\" class=\"form-control datepicker\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".($val!=="" && $val!==0 ? date("d/m/Y", $val) : ($default!=="" ? $default : date("d/m/Y")))."\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." data-format=\"dd/mm/yyyy\" style=\"width:100%;".($height!="auto" ? "height:".$height."px" : "")."\"></div>";
			break;
			case "time":
				$retType = "<div class=\"date-and-time\"><input id=\"".$name."\" type=\"text\" class=\"form-control timepicker\" name=\"".$name."\" placeholder=\"".($loadPlaceHolder ? ($open ? "{L_'" : "")."??????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."\" value=\"".($val!=="" && $val!==0 ? date("H:i:s", $val) : ($default!=="" ? $default : date("H:i:s")))."\"".($block ? " readonly=\"readonly\"" : "")." data-template=\"dropdown\" data-show-seconds=\"true\" data-default-time=\"".($val!=="" && $val!==0 ? date("H:i:s", $val) : ($default!=="" ? $default : date("H:i:s")))."\"".($required ? " required=\"required\"" : "")." data-show-meridian=\"false\" data-minute-step=\"5\" data-second-step=\"5\" style=\"width:100%;".($height!="auto" ? "height:".$height."px" : "")."\"></div>";
			break;
			case "datetime":
				if(!is_array($default)) {
					$default = array($default, $default);
				}
				$retType = "<div class=\"col-sm-12\"><div class=\"date-and-time\"><input type=\"text\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." name=\"".$name."[]\" class=\"form-control datepicker\" data-format=\"dd/mm/yyyy\" value=\"".($val!=="" && $val!==0 ? date("d/m/Y", $val) : ($default[0]!=="" ? $default[0] : date("d/m/Y")))."\" style=\"width:50%;".($height!="auto" ? "height:".$height."px" : "")."\"><input type=\"text\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "")." name=\"".$name."[]\" class=\"form-control timepicker\" data-template=\"dropdown\" data-show-seconds=\"true\" value=\"".($val!=="" && $val!==0 ? date("H:i:s", $val) : ($default[1]!=="" ? $default[1] : date("H:i:s")))."\" data-default-time=\"".($val!=="" && $val!==0 ? date("H:i:s", $val) : ($default!=="" ? $default : date("H:i:s")))."\" data-show-meridian=\"false\" data-minute-step=\"5\" data-second-step=\"5\" style=\"width:50%;".($height!="auto" ? "height:".$height."px" : "")."\" /></div></div>";
			break;
		}
		if(is_array($val) && !isset($val['type'])) {
			$enum = array_values($val);
			//$enum = array_map("trim", $enum);
			$retType = "<select id=\"".$name."\" data-select=\"true\" name=\"".$name."\" class=\"form-control\"".($block ? " readonly=\"readonly\"" : "")."".($required ? " required=\"required\"" : "").">".(!defined("WITHOUT_NULL") ? "<option value=\"\">".($loadPlaceHolder ? ($open ? "{L_'" : "")."????????????????".($open ? "'}" : "")."&nbsp;".($open ? "{L_'" : "").$name.($open ? "'}" : "") : "")."</option>" : (defined("WITHOUT_PLACEHOLDER_".$name) ? "<option value=\"\">".constant("WITHOUT_PLACEHOLDER_".$name)."</option>" : ""));
			for($i=0;$i<sizeof($enum);$i++) {
				$type = "o";
				if(is_array($enum[$i])) {
					if(isset($enum[$i]['type']) && $enum[$i]['type']=="opt") {
						$type = "opt";
					}
					if(isset($enum[$i]['name'])) {
						$enum[$i] = $enum[$i]['name'];
					} else {
						$enum[$i] = end($enum[$i]);
					}
				}
				$enum[$i] = trim($enum[$i]);
				if($type=="opt") {
					$retType .= "<option class='bold' value=\"".htmlspecialchars($enum[$i])."\"".(!empty($default) && $default==$enum[$i] ? " selected=\"selected\"" : "").">".($open ? "{L_'" : "").htmlspecialchars($enum[$i])."".($open ? "'}" : "")."</option>\n";
				} else {
					$retType .= "<option value=\"".htmlspecialchars($enum[$i])."\"".(!empty($default) && $default==$enum[$i] ? " selected=\"selected\"" : "").">".($open ? "{L_'" : "").htmlspecialchars($enum[$i])."".($open ? "'}" : "")."</option>\n";
				}
			}
			$retType .= "</select>";
		} else if(is_array($val) && isset($val['type'])) {
			$type = $val['type'];
			unset($val['type']);
			if(isset($val['val'])) {
				$val = $val['val'];
			} else if(sizeof($val)>1) {
				$val = array_values($val);
			} else {
				$val = array_values($val);
				$val = current($val);
			}
			$retType = self::Viewing($type, $name, $val, $height, $default, $block, $isAjax, $lang, $models, $hide, $args);
		}
		execEventRef("KernelArcher::Viewing-After", $retType, $hide, $name, $val, $type, $height, $default, $empted);
		$ret = (!$hide ? "<div class=\"".(!$block ? "form-group" : "row")." block-".$name."\"".($lang!=="" ? " data-group=\"".$grouper."\" data-lang=\"".$grouperLang."\"" : "")."><label class=\"col-sm-".($isAjax ? "2" : "3")." control-label\" for=\"".$name."\">{L_".$name."}".($required ? "<span style=\"color:red\">*</span>" : "")."</label><div class=\"col-sm-".($isAjax ? ($empted!==true ? "10" : "9") : ($empted!==true ? "9" : "8"))."\">" : "").$retType.(!$hide && $placeholder!=="" ? "<small class=\"".(!$block ? "form-group" : "row")." block-".$name."\"".($lang!=="" ? " data-group=\"".$grouper."\" data-lang=\"".$grouperLang."\"" : "").">".$placeholder."</small>" : "").(!$hide ? "</div>".($empted===true ? '<div class="col-sm-1"><a href="#" class="btn btn-red btn-icon btn-block btn-single removeImg" id="remove_'.$name.'"><i class="fa fa-remove"></i></a></div>' : "")."</div>\n" : "");
		return $ret;
	}
	
	function UnlimitedBladeWorks() {
		$num = func_num_args();
		if(!Validate::range($num, 1, 3)) {
			errorHeader();
			throw new Exception("Error num parameters for UnlimitedBladeWorks");
			die();
		}
        $objTemplate = "";
		$list = func_get_args();
		$load = true;
		$template = "";
		if($num==1) {
			$objTemplate = $list[0];
			if(!is_string($objTemplate) && !is_object($objTemplate) && !is_array($objTemplate)) {
				errorHeader();
				throw new Exception("Error first parameter for UnlimitedBladeWorks");
				die();
			}
		} elseif($num==2) {
			$objTemplate = $list[0];
			if(!is_string($objTemplate) && !is_object($objTemplate) && !is_array($objTemplate)) {
				errorHeader();
				throw new Exception("Error first parameter for UnlimitedBladeWorks");
				die();
			}
			$template = $list[1];
			if(!is_bool($template) && !is_string($template)) {
				errorHeader();
				throw new Exception("Error second parameter for UnlimitedBladeWorks");
				die();
			}
			if(is_bool($template)) {
				$load = $template;
				$template = "";
			}
		} elseif($num==3) {
			$objTemplate = $list[0];
			if(!is_string($objTemplate) && !is_object($objTemplate) && !is_array($objTemplate)) {
				errorHeader();
				throw new Exception("Error first parameter for UnlimitedBladeWorks");
				die();
			}
			$template = $list[1];
			if(!is_bool($template) && !is_string($template)) {
				errorHeader();
				throw new Exception("Error second parameter for UnlimitedBladeWorks");
				die();
			}
			$load = $list[2];
			if(!is_bool($load)) {
				errorHeader();
				throw new Exception("Error third parameter for UnlimitedBladeWorks");
				die();
			}
		}
		if(defined("IS_ADMIN") && is_callable($objTemplate)) {
			$call = array();
			$call[] = $template;
			if($load === false) {
				$call[] = true;
			}
			call_user_func_array($objTemplate, $call);
		} elseif(modules::checkObject($objTemplate, "templates")) {
			if($load === false) {
				$call = array();
				$call[] = $template;
				$tpl = call_user_func_array(array($objTemplate, "completed_assign_vars"), $call);
			} else {
				$tpl = $template;
			}
			call_user_func_array(array($objTemplate, "completed"), array($tpl));
			call_user_func(array($objTemplate, "display"));
		} else {
			if($load === false) {
				$tpl = $objTemplate;
			} else {
				$tpl = templates::completed_assign_vars($objTemplate);
			}
			templates::completed($tpl);
			templates::display();
		}
	}
	
}