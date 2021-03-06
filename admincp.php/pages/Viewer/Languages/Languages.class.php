<?php

class Languages extends Core {
	
	function implodes($k, $v) {
		return $k."[-@-]".$v;
	}
	
	function translate($text, $to, $from = "") {
		$ret = "";
		if(!config::Select("apiKeyTranslate")) {
			return $text;
		}
		$isArr = false;
		if(is_array($text)) {
			$orText = $text;
			foreach($text as $k => $v) {
				if(is_array($v)) {
					unset($text[$k]);
				}
			}
			$text = implode("[@]", $text);
			$isArr = true;
		}
		$text = urlencode($text);
		for($i=0;$i<strlen($text);$i+=10000) {
			$subText = substr($text, $i, 10000);
			$p = new Parser("https://translate.yandex.net/api/v1.5/tr.json/translate");
			$p->post(array("text" => $subText, "key" => config::Select("apiKeyTranslate"), "lang" => (!empty($from) ? $from."-" : "").$to));
			$resp = json_decode($p->get(), true);
			if(isset($resp['message'])) {
				$ret = "";
				break;
			}
			$ret .= (is_string($resp['text']) ? $resp['text'] : current($resp['text']));
		}
		if($isArr && strpos($ret, "[@]")!==false) {
			$ret = explode('[@]', $ret);
			$ret = array_map('trim', $ret);
			$arr = array();
			$keys = array_keys($orText);
			for($i=0;$i<sizeof($ret);$i++) {
				$arr[$keys[$i]] = $ret[$i];
			}
			return $arr;
		} else {
			return $ret;
		}
	}
	
	function __construct() {
		global $mainLangSite;
		config::SetDefault("");
		templates::accessNull();
		$orLang = (modules::manifest_get("mainLang") ? modules::manifest_get("mainLang") : "ru");
		$langs = $orLang;
		if(!isset($mainLangSite)) {
			$mainLangSite = "ru";
		}
		if(Arr::get($_GET, "saveAPI", false)) {
			callAjax();
			config::Update("apiKeyTranslate", Arr::get($_POST, "api", false));
			cardinal::RegAction("Сохранён новый ключ для перевода в разделе языковой панели");
			return;
		}
		if(Arr::get($_GET, "page", false)) {
			if(Arr::get($_GET, "page")=="main") {
				$support = lang::support(true);
				$supports = lang::translateSupport();
				sortByValue($supports);
				for($i=0;$i<sizeof($support);$i++) {
					$langer = nucfirst($support[$i]);
					templates::assign_vars(array(
						"clearLang" => $support[$i],
						"lang" => (isset($supports[$support[$i]]) ? $supports[$support[$i]] : $langer),
						"mainLang" => ($mainLangSite==$support[$i] ? "yes" : "no"),
					), "supportLang", "lang".($i+1));
				}
				foreach($supports as $k => $v) {
					templates::assign_vars(array(
						"clearLang" => $k,
						"lang" => $v,
					), "supportTranslate", "lang".$k);
				}
				$this->Prints("LangSupport");
			}
			return;
		}
		if(Arr::get($_GET, 'createLang', false)) {
			callAjax();
			$newLang = Arr::get($_POST, 'nameCreated');
			if(isset($_POST['useLang']) && $_POST['useLang']=="1") {
				lang::include_lang("install");
				$this->ParseLang();
				global $lang;
				if(is_array($lang)) {
					$arr = array_merge(array(), $lang);
				} else {
					$arr = array();
				}
			} else {
				$arr = array();
			}
			if(isset($_POST['supportSkinsAdmin']) && ($_POST['supportSkinsAdmin'] == "on" || $_POST['supportSkinsAdmin'] == "1")) {
				$admin = ADMIN_SKINS.config::Select("skins", "admincp").DS;
				$dir = read_dir($admin);
				sort($dir);
				for($z=0;$z<sizeof($dir);$z++) {
					$file = file_get_contents($admin.$dir[$z]);
					preg_match_all("#\{L_(['\"]|)(.+?)(\[(.*?)\]|)\\1\}#", $file, $match);
					for($i=0;$i<sizeof($match[2]);$i++) {
						$arr[$match[2][$i]] = $match[2][$i];
					}
				}
			}
			if(isset($_POST['supportSkins']) && ($_POST['supportSkins'] == "on" || $_POST['supportSkins'] == "1")) {
				$admin = PATH_SKINS;
				$dir = read_dir($admin);
				for($z=0;$z<sizeof($dir);$z++) {
					$file = file_get_contents($admin.$dir[$z]);
					preg_match_all("#\{L_(['\"]|)(.+?)(\[(.*?)\]|)\\1\}#", $file, $match);
					for($i=0;$i<sizeof($match[2]);$i++) {
						$arr[$match[2][$i]] = $match[2][$i];
					}
				}
				$admin = PATH_SKINS.config::Select("skins", "skins").DS;
				$dir = read_dir($admin);
				for($z=0;$z<sizeof($dir);$z++) {
					$file = file_get_contents($admin.$dir[$z]);
					preg_match_all("#\{L_(['\"]|)(.+?)(\[(.*?)\]|)\\1\}#", $file, $match);
					for($i=0;$i<sizeof($match[2]);$i++) {
						$arr[$match[2][$i]] = $match[2][$i];
					}
				}
			}
			$arr['lang_ini'] = $newLang;
			foreach($arr as $k => $v) {
				if(!is_array($v)) {
					$translate = lang::get_lang($v);
				} else {
					$translate = "";
				}
				if(!empty($translate)) {
					$arr[$k] = $v = $translate;
				}
				$v = $this->translate($v, $newLang, $orLang);
				lang::Update($newLang, $k, $v);
			}
			execEvent("create_language", $newLang);
			cardinal::RegAction("Создан новый язык \"".$newLang."\" в разделе языковой панели");
			location("./?pages=Languages&page=main");
			return true;
		}
		if(Arr::get($_GET, 'lang', false)) {
			if(!(Arr::get($_GET, 'lang', false)) || !lang::checkLang(Arr::get($_GET, 'lang'))) {
				new Errors();
				die();
			}
			$langs = Arr::get($_GET, 'lang', $orLang);
			lang::set_lang($langs);
		}
		if(Arr::get($_GET, 'saveLang', false)) {
			callAjax();
			if(Arr::get($_POST, 'orLang', false) && Arr::get($_POST, 'translate', false) && lang::Update($langs, rawurldecode(Arr::get($_POST, 'orLang')), rawurldecode(Arr::get($_POST, 'translate')))) {
				cardinal::RegAction("Сохранён перевод для языка \"".Arr::get($_GET, 'lang', $orLang)."\" в разделе языковой панели");
				$ret = "1";
			} else {
				$ret = "0";
			}
			HTTP::echos($ret);
			die();
		}
		if(Arr::get($_GET, 'removeLang', false)) {
			callAjax();
			$lang = Arr::get($_GET, 'removeLang', false);
			if(!$lang || !lang::checkLang($lang)) {
				new Errors();
				die();
			}
			if(lang::Remove($lang)) {
				$ret = "1";
			} else {
				$ret = "0";
			}
			HTTP::echos($ret);
			cardinal::RegAction("Удалён язык \"".$lang."\" в разделе языковой панели");
			location("./?pages=Languages&page=main");
			die();
		}
		if(Arr::get($_GET, 'mainLang', false)) {
			callAjax();
			$lang = Arr::get($_GET, 'mainLang', false);
			if(!$lang || !lang::checkLang($lang)) {
				new Errors();
				die();
			}
			if(!is_writeable(PATH_MEDIA)) {
				chmod(PATH_MEDIA, 0777);
			}
			@file_put_contents(PATH_MEDIA."config.langSettings.".ROOT_EX, '<?php'.PHP_EOL.'lang::set_lang("'.$lang.'");Route::SetLang("'.$lang.'", true);$mainLangSite = "'.$lang.'";');
			$ret = "1";
			HTTP::echos($ret);
			cardinal::RegAction("Установлен язык по-умолчанию \"".$lang."\" в разделе языковой панели");
			location("./?pages=Languages&page=main");
			die();
		}
		if(Arr::get($_GET, 'resetLang', false)) {
			callAjax();
			if(Arr::get($_POST, 'orLang', false) && lang::LangReset($langs, rawurldecode(Arr::get($_POST, 'orLang')))) {
				cardinal::RegAction("Сброшен перевод для языка \"".Arr::get($_GET, 'lang', $orLang)."\" в разделе языковой панели");
				$ret = "1";
			} else {
				$ret = "0";
			}
			HTTP::echos($ret);
			die();
		}
		templates::assign_var("initLang", $langs);
		$lang = lang::init_lang(true);
		if(!is_array($lang)) {
			die();
		}
		$i = 0;
		foreach($lang as $k => $v) {
			if(!is_string($v)) {
				continue;
			}
			templates::assign_vars(array("or" => $k, "lang" => str_replace(array("{"), array("&#123;"), $v)), "langList", "lang".$i);
			$i++;
		}
		$this->Prints("Lang");
	}
	
}

?>