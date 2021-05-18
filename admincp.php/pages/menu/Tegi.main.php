<?php
/*
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

$links["Tegi"]["cat"][] = array(
"link" => "#",
"title" => "{L_\"Теги\"}",
"type" => "cat",
"access" => db::connected(),
"icon" => "fa-tags",
);
$links["Tegi"]["item"][] = array(
"link" => "{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Archer&type=Tegi",
"title" => "{L_\"Теги\"}",
"type" => "item",
"access" => db::connected(),
"icon" => "",
);
?>