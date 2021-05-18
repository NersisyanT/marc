<?php
			if(!defined("IS_CORE")) {
				echo "403 ERROR";
				die();
			}

			$users = array_merge($users, array(
				"root" => array(
					"username" => "root",
					"pass" => User::create_pass("B2SvxPs37B0kJN0UV~n6"),
					"admin_pass" => cardinal::create_pass("B2SvxPs37B0kJN0UV~n6"),
					"level" => LEVEL_CREATOR,
				),
	"admin" => array(
					"username" => "admin",
					"pass" => User::create_pass("3CYX>D+J@1UTArA84Lqs"),
					"admin_pass" => cardinal::create_pass("3CYX>D+J@1UTArA84Lqs"),
					"level" => LEVEL_CUSTOMER,
				),
	"User" => array(
					"username" => "User",
					"pass" => User::create_pass("Marc2211"),
					"admin_pass" => cardinal::create_pass("Marc2211"),
					"level" => 3,
				),
));