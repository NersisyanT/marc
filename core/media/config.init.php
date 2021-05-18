<?php
		if(!defined("IS_CORE")) {
		echo "403 ERROR";
		die();
		}

		$config = array_merge($config, array(
		// start
		'skins' => array('skins' => 'marc','admincp' => 'xenon','mobile' => 'marc',),'fb' => 'https://www.facebook.com','inst' => 'https://www.instagram.com','yt' => 'https://www.youtube.com','mail' => 'nataliia.svarovski@gmail.com','phone1' => '+38 097 330 12 12','phone2' => '+38 096 932 77 67','smsc' => array('login' => 'Marcj','psw' => 'marcj2211',),
		// start
		));

		?>