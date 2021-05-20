<?php

class modpro extends modules {
	
	function __construct() {
		//config::Set("deactive_site_adminbar", true);
		addEventRef("settinguser_main", array($this, "addInfo"));
		config::Set("mainPageAdmin", "?pages=Archer&type=tovary");
		config::Set("logoAdminMobile", "assets/xenon/images/logo2.svg");
		config::Set("logoAdminMain", "assets/xenon/images/logo2.svg");
		config::Set("deactiveMainMenu", "1");	
		KernelArcher::$quickEdit[] = array("tPoziciya", "tCena", "tSkidka", "tNazvanie", "tKategoriya", "Teg", "tAtribut");
		KernelArcher::$disabledQuickEditor = array("tPoziciya" => 1, "tCena" => 1, "tSkidka" => 1, "tNazvanie" => 1, "tKategoriya" => 1, "Teg" => 1, "tAtribut" => 1);
		//KernelArcher::addQuickEdit("tKategoriya", "ModelKategorii");
		addEvent("admin_footer", array($this, "addScript"));
		addEvent("printed_admin", array($this, "changeAdmin"));
		addEventRef("request-archer", array($this, "changeInfoArcher"));
        addEvent("admin_print_ready", array($this, "adminView"));
        addEvent("admin-header", function($header) {
        	$header .= '<style>'.file_get_contents(PATH_TEMPLATE."admin".DS."admin.css").'</style>';
        	return $header;
        });
		if(defined("IS_ADMIN")) {
			return false;
		}
		$this->manifest_set(array("class_pages", "main"), array(&$this, "mains"));
		$this->manifest_set(array("class_pages", "default"), array(&$this, "p404"));
		Route::Set("mainpage", "(<lang>)/succsess")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'mains',
		    'idView' => 'mains',
		));
		Route::Set("product", "(<lang>/)product-(<id>)")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'product',
		    'idView' => 'mains',
		));
		Route::Set("mainpage", "(<lang>/)")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'mains',
		    'idView' => 'mains',
		));
		Route::Set("success", "success")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'success',
		    'idView' => 'success',
		));

		Route::Set("contacts", "contacts")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'contacts',
		));

		Route::Set("contactsForm", "contactsForm")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'contactsForm',
		));

		Route::Set("delivery", "delivery")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'delivery',
		));

		Route::Set("aboutUs", "about-us")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'aboutUs',
		));

		Route::Set("attrProducts", "(<lang>/)attrProducts.php")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'attrProducts',
		    'idView' => 'attrProducts',
		));

		Route::Set("ajax", "(<lang>/)ajax.php")->defaults(array(
			'lang' => "ru",
			'class' => __CLASS__,
			'method' => 'ajax',
		    'idView' => 'ajax',
		));
		
		Route::Set("callback", "callback.php")->defaults(array(
			"class" => __CLASS__,
			"method" => "callback",
			"page" => "callback",
		));

		Route::Set("callback2", "callback2.php")->defaults(array(
			"class" => __CLASS__,
			"method" => "callback2",
			"page" => "callback2",
		));

		Route::Set("callback3", "callback3.php")->defaults(array(
			"class" => __CLASS__,
			"method" => "callback3",
			"page" => "callback3",
		));
		addEvent("callback2", array($this, "notyTg"));
		addEvent("mains", array($this, "changeMeta"));
	}

	function changeInfoArcher($request) {
		if(($type = $request->get->get('type', false))!==false && $type=="tovary") {
			$request->get->add("ShowPages", "true");
			$tId = $request->get->get('orderBy', 'tId');
			$request->get->add("orderBy", $tId);
			$orderTo = $request->get->get('orderTo', 'desc');
			$request->get->add("orderTo", $orderTo);
		}
	}

    function adminView() {
        if(isset($_GET['type']) && $_GET['type']=="tovary" && !isset($_GET['pageType'])) {
            $model = $this->loadModel("kategorii");
            $model->multiple(true);
            $model = $model->Select();
            $cats = array();
            $html = '<div class="cat_block" style="display: inline-flex;width: 100%;justify-content: space-around;margin: 0px auto 1.75em;">';
            $html .= '<a href="?pages=Archer&type=tovary" class="btn btn-block btn-single   btn-cat'.(!isset($_GET['WhereData']) || empty($_GET['WhereData']) ? ' active btn btn-turquoise' : "").'">{L_"Все"}</a>';
            for($i=0;$i<sizeof($model);$i++) {
                $model[$i] = $model[$i]->getArray();
                $html .= '<a href="./?pages=Archer&type=tovary&Where=tKategoriya&WhereType=IN&WhereData='.$model[$i]['kId'].'" class="btn btn-block btn-cat btn-single '.(isset($_GET['WhereData']) && isset($_GET['Where']) && $_GET['Where']=="tKategoriya" && $_GET['WhereData']==$model[$i]['kId'] ? ' active btn-turquoise' : "").'">'.$model[$i]['kKategoriya'].'</a>';
            }
            $html .= '</div><style>.btn-cat {
    margin: 0 !important;
    border: 1px solid #ccc;
    transition: all 300ms ease-in-out;
}
.btn-cat.active {
    border: 1px solid #960e21;
}
.btn-cat:not(.active):hover {
    border: 1px solid #121212;
    background-color: #121212;
    color: #fff;
}</style>';
            Core::addContentBefore($html);
        }   
    }

	public function addInfo(&$ret)	{
		$ret .= "{include templates=\"Info.tpl,SettingUser\"}";
	}

	function addScript($body) {
		$body = '<script>'.file_get_contents(PATH_TEMPLATE."admin".DS."admin.js").'</script><script>'.file_get_contents(PATH_TEMPLATE."js".DS."smoothScroll.js").'</script><style>'.file_get_contents(PATH_TEMPLATE."admin".DS."admin.css").'</style>';
		return $body;
	}

	function changeAdmin($html) {
		$html = preg_replace('#<div class="page-loading-overlay">.*?<div class="loader-2"></div>.*?</div>#is', "", $html);
		$html = preg_Replace("#<body(.+?)>#is", "<body$1>".'<div class="page-loading-overlay"><div class="loader-2"></div></div>', $html);
		return $html;
	}

	function notyTg($body) {
		$tgNoty = $this->loader("tgNoty");
		$tgNoty->noty($body);
	}

	function changeMeta($prod) {
		$db = $this->init_db();
		$prod = Route::param("prod");
		$prodId = str_replace("product-", "", $prod);	
		// vdump($prodId);die();
		$image = $db->doquery("SELECT `tIzobrazhenie` FROM {{tovary}} WHERE  `tId` LIKE ".$prodId."");
		$image = $image['tIzobrazhenie'];
		$change = "";
		$exp = explode("?", $image);
		$image = current($exp);
		$exp = explode(DS, $image);
		$end = end($exp);
		$endExp = explode(".", $end);
		$endType = end($endExp);
		$image = implode("/", $exp);
		$end2 = str_replace(".".$endType, "", $end);
		$imageNew = str_replace($end, $end2."_image.".$endType, $image);
		if(!file_exists(ROOT_PATH.$imageNew)) {
			$img = new Image(ROOT_PATH.$image);
			$img->resizePersent(110);
			$img->save(ROOT_PATH.$imageNew);
		}
		addSeo("image", "/".$imageNew);
	}

	function callback3() {
		$tmp = $this->init_templates();
		$db = $this->init_db();
		if(sizeof($_POST)>0) {
			$name = $_POST['name'];
			$surname = $_POST['surname'];
			$phone = $_POST['phone'];
			$body = "<p>Имя: ".$name."</p><p>Фамилия: ".$surname."</p><p>Телефон: ".$phone."</p>";	
			Debug::activShow(false);
			templates::$gzip = false;
			return true;
			die();
		}
	}

	function callback2() {
		$tmp = $this->init_templates();
		$db = $this->init_db();
		if(sizeof($_POST)>0) {
			$ids = $_POST['ids'];
			$ids = explode(",",$ids);
			$production = "Товары: \n";
			$db->doquery("SELECT * FROM {{tovary}} WHERE  `tId` IN(".implode(",", $ids).")", true);
			$product = "Товары: \n";
			while($row = $db->fetch_assoc()) {
				$product .= $row['tNazvanie']." -- ".$row['tCena']." грн\n";
				$production .= "Art: ".$row["tId"]."\n".$row['tNazvanie']." -- ".$row['tCena']." грн\n";
				$prodImg = $row['tIzobrazhenie'];
			}
			$name=$_POST['name'];
			$surname=$_POST['surname'];
			$phone=$_POST['phone'];
			$mess=$_POST['message'];
			$body .= "Заказ с сайта\n";
   			$body .= "Имя: ".$name." \nФамилия: ".$surname." \nТелефон: ".$phone."\nСообщение: ".$mess."\n".$production;
			$db->doquery("INSERT INTO {{zakazy}} SET `zImya` = ".db::escape($name).", `zData` = ".db::escape(date("Y-m-d H:i:s")).", `zTelefon` = ".db::escape($phone).", `zKartinka` = ".db::escape($prodImg).", `zTovary` = ".db::escape($production).", `zSoobszenie` = ".db::escape($mess));

			$idsn = $db->doquery("SELECT `zId` FROM {{zakazy}} ORDER BY `zId` DESC");

			$mess = "";
			$mess .= "Заказ принят!\n";
			$mess .= "Ваш номер заказа: ".$idsn['zId']."\n";
			$mess .= $product;
			// $d = execEvent("pay_smsc", "", $phone, $mess);
			vdump($d);
			execEvent("callback2", $body, $_POST);
			Debug::activShow(false);
			templates::$gzip = false;
			return true;
			die();
		}
	}

	function callback() {
		if(sizeof($_POST)>0) {
			$arr = array();
			foreach ($_POST as $key => $value) {
				$arr = $key;
			}
			$bodyadmin .= "Заявка c формы:\n";
			$bodyadmin .= "Данные: ".$arr."";
			execEvent("callback2", $bodyadmin, $_POST);
		
			Debug::activShow(false);
			templates::$gzip = false;
			return true;
			die();
		}
	}

	function mailtos($to, $head, $body, $from = "") {
		$mail = new phpmailer(true);
		$mail->CharSet = 'UTF-8';
		$mail->ContentType = 'text/html';
		$mail->Priority = 1;
		if(empty($from)) {
			$from = "info@".$_SERVER['SERVER_NAME'];
		}
		/*if(strpos($mail->From, "@")===false||strpos($to, "@")===false) {
			return false;
		}*/
		$fromNameP = strpos($from, "@");
		$fromName = substr($from, 0, $fromNameP);
		$mail->From = $from;
		$mail->FromName = $fromName;
		$mail->AddAddress($to);
		$mail->isHTML(true);
		$mail->Subject = $head;
		$mail->AltBody = $mail->Body = $body;
		$er = false;
		try {
			$er = $mail->Send();
		} catch(Exception $ex) {}
		if($er===false) {
			return false;
		} else {
			return true;
		}
	}

	function ajax($lang, $langDB) {
		$db = $this->init_db();
		$tags = array();
		$queryTags = $db->doquery("SELECT * FROM {{tegi}}", true);
		while($row = $db->fetch_assoc($queryTags)) {
			$tags[$row['TId']] = $row['Teg_name'];
		}
		$db->doquery("SELECT * FROM {{tovary}} WHERE `tSkryt_tovar` LIKE 'Нет' ORDER BY `tPoziciya` ASC", true);
		while($row = $db->fetch_assoc()) {
			$row = $this->getDataLang($row, $langDB);
			$row["tGallereya"] = unserialize($row["tGallereya"]);
			$row["tGallereya"] = json_encode($row["tGallereya"]);
			$row["tSprice"] = $row['tCena'] - $row['tCena']*$row['tSkidka']/100;
			$row['tSprice'] = ceil($row['tSprice']);
			$row['tNart'] = "#00".$row['tId'];
			$row['Teg'] = $tags[$row['Teg']];
			if($row['tSkidka'] > 0) {
				$row['class'] = "with_sale";
			} else {
				$row['class'] = "";
			}
			$arr[] = $row;
		}
		HTTP::ajax($arr);
	}

	function categories() {
		$tmp = $this->init_templates();
		$db = $this->init_db();
		$prod = Route::param("prod");
		$category_tpl = "<div class='category'>
                            <span class='attr_header sliding_header active'>
                                <span class='text'>Категории</span>
                                <span class='plus'>
                                    <span></span>
                                    <span></span>
                                </span>
                            </span>
                            <div class='sliding_cont'>
                                <div class='sliding'>
                                    <div class='container_block'>";
		$db->doquery("SELECT * FROM {{kategorii}}", true);
		while($row = $db->fetch_assoc()) {
			$category_tpl .= "<div class='attr_filter' data-cat='".$row['kId']."'>
                                            <span class='elem_2'>
                                                <span>".$row['kKategoriya']."</span>
                                            </span>
                                        </div>";
			$tmp->assign_vars($row, "Kategorii");
		}
            
		$category_tpl .= "</div></div></div></div>";
		return $category_tpl;
	}

	function attributes() {
		$tmp = $this->init_templates();
		$db = $this->init_db();
		$prod = Route::param("prod");
		$db->doquery("SELECT * FROM {{atributy}}", true);
		$attribute_tpl = "<div class='category attribute'>
                                <span class='attr_header sliding_header'>
                                    <span class='text'>Искать по</span>
                                </span>
                                <div class='sliding_cont'>
                                    <div class='sliding'>
                                        <div class='container_block'>";
		while($row = $db->fetch_assoc()) {
			//$attributes = explode(',', $row['tAtribut']);

			$attribute_tpl .= "
                                        <div class='attr_filter' data-attr='".$row['aId']."'>
	                                        <span class='elem_2'>
	                                            <span>".$row['aAtribut']."</span>
	                                        </span>
                                        </div>";
			$tmp->assign_vars($row, "tovary");
		}
		$attribute_tpl .= "</div></div></div></div>";
		return $attribute_tpl;
	}

	function menuCategories($db, $tmp, $show) {

		$db->doquery("SELECT * FROM {{kategorii}}", true);
		while($row = $db->fetch_assoc()) {
			$tmp->assign_vars($row, "menuCategories");
		}
		$tmp->assign_var('show', $show);
	}

	function mains($lang, $langDB) {
		$tmp = $this->init_templates();
		$db = $this->init_db();
		$prod = Route::param("prod");
		$tags = array();
		$queryTags = $db->doquery("SELECT * FROM {{tegi}}", true);
		while($row = $db->fetch_assoc($queryTags)) {
			$tags[$row['TId']] = $row['Teg_name'];
		}
		$db->doquery("SELECT * FROM {{tovary}} WHERE `tSkryt_tovar` LIKE 'Нет' ORDER BY `tPoziciya` ASC LIMIT 20", true);
		while($row = $db->fetch_assoc()) {
			$row = $this->getDataLang($row, $langDB);
			$row['Teg'] = $tags[$row['Teg']];
			$row["tSprice"] = $row['tCena'] - $row['tCena']*$row['tSkidka']/100;
			$row['tSprice'] = ceil($row['tSprice']);
			$row['tIzobrazhenie'] = str_Replace(config::Select("default_http_host"), "", $row['tIzobrazhenie']);
			if($row['tSkidka'] > 0) {
				$row['class'] = "with_sale";
			} else {
				$row['class'] = "";
			}
			$tmp->assign_vars($row, "prod", $row['tId']);
		}

		$db->doquery("SELECT * FROM {{tovary}} WHERE `tSkryt_tovar` LIKE 'Нет' AND `tSkidka` > 0 ORDER BY `tPoziciya` ASC", true);
		while($row = $db->fetch_assoc()) {
			$row = $this->getDataLang($row, $langDB);
			$row['Teg'] = $tags[$row['Teg']];
			$row["tSprice"] = $row['tCena'] - $row['tCena']*$row['tSkidka']/100;
			$row['tSprice'] = ceil($row['tSprice']);
			$row['tIzobrazhenie'] = str_Replace(config::Select("default_http_host"), "", $row['tIzobrazhenie']);
			if($row['tSkidka'] > 0) {
				$row['class'] = "with_sale";
			} else {
				$row['class'] = "";
			}
			$tmp->assign_vars($row, "prodsale", $row['tId']);
		}

		$category_tpl = $this->categories();
		$tmp->assign_var('categorii', $category_tpl);

		$attribute_tpl = $this->attributes();
		$tmp->assign_var('atributi', $attribute_tpl);

		//$tpl = $tmp->completed_assign_vars("main");
		if (sizeof($prod) > 7 && $prod != "success" && strpos("sale", $prod) === false) {
			execEvent("mains", $prod);
		}
		$this->menuCategories($db,$tmp, true);
		$tpl = $tmp->completed_assign_vars("main");
		$tmp->completed($tpl);
		$tmp->display();
	}

	function product() {
		$this->mains();
	}

	function success() {
		$this->mains();
	}

	function delivery($lang, $langDB) {
		$db = $this->init_db();
		$tmp = $this->init_templates();
		$this->menuCategories($db,$tmp, false);
		$tpl = $tmp->completed_assign_vars("delivery");
		$tmp->completed($tpl);
		$tmp->display();
	}

	function aboutUs($lang, $langDB) {
		$db = $this->init_db();
		$tmp = $this->init_templates();
		$this->menuCategories($db,$tmp, false);
		$tpl = $tmp->completed_assign_vars("about-us");
		$tmp->completed($tpl);
		$tmp->display();
	}

	function contacts($lang, $langDB) {
		$db = $this->init_db();
		$tmp = $this->init_templates();
		$this->menuCategories($db,$tmp, false);
		$tpl = $tmp->completed_assign_vars("contacts");
		$tmp->completed($tpl);
		$tmp->display();
	}

	function contactsForm($lang, $langDB) {
		if(sizeof($_POST)>0) {
			$bodyadmin .= "Заявка c формы контактов:\n";
			$bodyadmin .= "Имя: ".$_POST['name']."\n";
			$bodyadmin .= "Телефон: ".$_POST['phone']."\n";
			if(isset($_POST['email'])) {
				$bodyadmin .= "Почта: ".$_POST['email']."\n";
			}
			if(isset($_POST['message'])) {
				$bodyadmin .= "Сообщение: ".$_POST['message']."\n";
			}
			execEvent("callback2", $bodyadmin, $_POST);
		
			Debug::activShow(false);
			templates::$gzip = false;
			return true;
			die();
		}
	}
	
}