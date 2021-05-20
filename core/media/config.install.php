<?php
		if(!defined("IS_CORE")) {
		echo "403 ERROR";
		die();
		}
		
		if(!defined("COOK_USER")) {
			define("COOK_USER", "username_4ba58c");
		}
		if(!defined("COOK_PASS")) {
			define("COOK_PASS", "password_4ba58c");
		}
		if(!defined("COOK_ADMIN_USER")) {
			define("COOK_ADMIN_USER", "admin_username_4ba58c");
		}
		if(!defined("COOK_ADMIN_PASS")) {
			define("COOK_ADMIN_PASS", "admin_password_4ba58c");
		}
		if(!defined("START_VERSION")) {
			define("START_VERSION", "10.6");
		}

		$config = array_merge($config, array(
			"api_key" => "1234567890",
			"logs" => ERROR_FILE,
			"speed_update" => false,
			"hosting" => true,
			"default_http_local" => "/",
			"default_http_hostname" => "marc",
			"default_http_host" => "marc",
			"default_http_mobyhost" => "",
			"lang" => "ru",
			"cache" => array(
				"type" => CACHE_FILE,
				"server" => "localhost",
				"port" => 11211,
				"login" => "",
				"pass" => "",
				"path" => "/",
			),
			"viewport" => "width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, minimal-ui, user-scalable=no",
			"ParsePHP" => false,	'FullMenu' => true,
	'telegramToken' => '739504482:AAFxE_kGqxP_ds5wcvlMdH1_4IKlqPxQzww',

			"lang" => "ru",
			"charset" => "utf-8",
		));

		?>