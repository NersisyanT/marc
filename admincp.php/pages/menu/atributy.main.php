<?php
/*
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

$links["Atributy"]["cat"][] = array(
"link" => "#",
"title" => "{L_\"Атрибуты\"}",
"type" => "cat",
"access" => db::connected(),
"icon" => "fa-sitemap",
);
$links["Atributy"]["item"][] = array(
"link" => "{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Archer&type=atributy",
"title" => "{L_\"Атрибуты\"}",
"type" => "item",
"access" => db::connected(),
"icon" => "",
);
?>