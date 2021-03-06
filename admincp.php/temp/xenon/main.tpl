<!DOCTYPE html>
<html lang="{langPanel}">
<head>
	<meta charset="{C_charset}">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Cardinal Engine Admin Panel" />
	<meta name="author" content="KilleR" />
	<!--base href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/" /-->
	
	<title>{head_title}</title>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Arimo:400,700,400italic">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/fonts/linecons/css/linecons.css?1">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/fonts/fontawesome/css/font-awesome.min.css?1">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/bootstrap.css?1">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/xenon-core.css?5">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/xenon-forms.css?1">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/xenon-components.css?10">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/xenon-skins.css?1">
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/css/custom.css?{S_time}">

	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/jquery-1.11.1.min.js?1"></script>
	<script>
		var defaultTime = {S_time};
		var default_link = "{C_default_http_host}";
		var default_admin_link = "{C_default_http_host}{D_ADMINCP_DIRECTORY}/";
		var default_localadmin_link = "{C_default_http_local}{D_ADMINCP_DIRECTORY}/";
		var selectLang = "{langPanel}";
		var langSupport = '{langSupport}';
		try {
			langSupport = JSON.parse(langSupport);
		} catch(Exception) {}
	</script>
	{header}

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
</head>
<body class="page-body {C_defaultAdminSkin}">

	[if {C_accessChangeSkin}==true]<div class="settings-pane accessChangeSkin">
			
		<a href="#" data-toggle="settings-pane" data-animate="true">
			&times;
		</a>
		
		<div class="settings-pane-inner">
			
			<div class="row">
				
				<div class="col-md-4">
					
					<div class="user-info">
						
						<div class="user-details">
							
							<h3>
								<a href="#">{U_username}</a>
								<span class="user-status is-online"></span>
							</h3>
							
						</div>
						
					</div>
					
				</div>
				
				<div class="col-md-8 link-blocks-env">
					
					<div class="links-block left-sep">
						<h4>
							<a href="#">
								<span>Skins part 1</span>
							</a>
						</h4>
						
						<ul class="list-unstyled">
							<li data-skin="">
								<a href="#" class="skin-color-palette" data-set-skin="">
									<span style="background-color: #2c2e2f"></span>
									<span style="background-color: #EEE"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #68b828"></span>
									<span style="background-color: #27292a"></span>
									<span style="background-color: #323435"></span>
								</a>
							</li>
							<li data-skin="aero">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #558C89"></span>
									<span style="background-color: #ECECEA"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #5F9A97"></span>
									<span style="background-color: #558C89"></span>
									<span style="background-color: #255E5b"></span>
								</a>
							</li>
							<li data-skin="navy">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #2c3e50"></span>
									<span style="background-color: #a7bfd6"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #34495e"></span>
									<span style="background-color: #2c3e50"></span>
									<span style="background-color: #ff4e50"></span>
								</a>
							</li>
							<li data-skin="facebook">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #3b5998"></span>
									<span style="background-color: #8b9dc3"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #4160a0"></span>
									<span style="background-color: #3b5998"></span>
									<span style="background-color: #8b9dc3"></span>
								</a>
							</li>
							<li data-skin="turquoise">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #16a085"></span>
									<span style="background-color: #96ead9"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #1daf92"></span>
									<span style="background-color: #16a085"></span>
									<span style="background-color: #0f7e68"></span>
								</a>
							</li>
							<li data-skin="lime">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #8cc657"></span>
									<span style="background-color: #ffffff"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #95cd62"></span>
									<span style="background-color: #8cc657"></span>
									<span style="background-color: #70a93c"></span>
								</a>
							</li>
						</ul>
					</div>
					<div class="links-block left-sep">
						<h4>
							<a href="#">
								<span>Skins part 2</span>
							</a>
						</h4>
						<ul class="list-unstyled">
							<li data-skin="green">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #27ae60"></span>
									<span style="background-color: #a2f9c7"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #2fbd6b"></span>
									<span style="background-color: #27ae60"></span>
									<span style="background-color: #1c954f"></span>
								</a>
							</li>
							<li data-skin="purple">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #795b95"></span>
									<span style="background-color: #c2afd4"></span>
									<span style="background-color: #FFFFFF"></span>
									<span style="background-color: #795b95"></span>
									<span style="background-color: #27ae60"></span>
									<span style="background-color: #5f3d7e"></span>
								</a>
							</li>
							<li data-skin="white">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #FFF"></span>
									<span style="background-color: #666"></span>
									<span style="background-color: #95cd62"></span>
									<span style="background-color: #EEE"></span>
									<span style="background-color: #95cd62"></span>
									<span style="background-color: #555"></span>
								</a>
							</li>
							<li data-skin="concrete">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #a8aba2"></span>
									<span style="background-color: #666"></span>
									<span style="background-color: #a40f37"></span>
									<span style="background-color: #b8bbb3"></span>
									<span style="background-color: #a40f37"></span>
									<span style="background-color: #323232"></span>
								</a>
							</li>
							<li data-skin="watermelon">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #b63131"></span>
									<span style="background-color: #f7b2b2"></span>
									<span style="background-color: #FFF"></span>
									<span style="background-color: #c03737"></span>
									<span style="background-color: #b63131"></span>
									<span style="background-color: #32932e"></span>
								</a>
							</li>
							<li data-skin="lemonade">
								<a href="#" class="skin-color-palette">
									<span style="background-color: #f5c150"></span>
									<span style="background-color: #ffeec9"></span>
									<span style="background-color: #FFF"></span>
									<span style="background-color: #ffcf67"></span>
									<span style="background-color: #f5c150"></span>
									<span style="background-color: #d9a940"></span>
								</a>
							</li>
						</ul>
					</div>
					
				</div>
				
			</div>
		
		</div>
		
	</div>[/if {C_accessChangeSkin}==true]
	
	<div class="page-container"><!-- add class "sidebar-collapsed" to close sidebar by default, "chat-visible" to make chat appear always -->
			
		<!-- Add "fixed" class to make the sidebar fixed always to the browser viewport. -->
		<!-- Adding class "toggle-others" will keep only one menu item open at a time. -->
		<!-- Adding class "collapsed" collapse sidebar root elements and show only icons. -->
		<div class="sidebar-menu toggle-others fixed[if {C_FullMenu}!=1&&{M_[mobile]}==false] collapsed[/if {C_FullMenu}!=1&&{M_[mobile]}==false]">
			
			<div class="sidebar-menu-inner">	
				
				<header class="logo-env">
					
					<!-- logo -->
					<div class="logo">
						<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/{C_mainPageAdmin}" class="logo-expanded">
							<img src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/{C_logoAdminMain}" width="{C_logoAdminMainWidth}" alt="" />
						</a>
						
						<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/{C_mainPageAdmin}" class="logo-collapsed">
							<img src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/{C_logoAdminMobile}" width="{C_logoAdminMobileWidth}" alt="" />
						</a>
					</div>
					
					<!-- This will toggle the mobile menu and will be visible only on mobile devices -->
					<div class="mobile-menu-toggle visible-xs visible-sm">
						<!--a href="#" data-toggle="user-info-menu">
							<i class="fa-bell-o"></i>
							<span class="badge badge-success">7</span>
						</a-->

						<a href="{C_default_http_local}" class="visible-xs-inline-block visible-sm-inline-block" title="{L_"?????????????? ???? ????????"}" alt="{L_"?????????????? ???? ????????"}">
							<i class="fa fa-paper-plane"></i>
						</a>
						
						<a href="#" data-toggle="mobile-menu">
							<i class="fa-bars"></i>
						</a>
					</div>
					
					<!-- This will open the popup with user profile settings, you can use for any purpose, just be creative -->
					[if {C_accessChangeSkin}==true]<div class="settings-icon accessChangeSkin">
						<a href="#" data-toggle="settings-pane" data-animate="true">
							<i class="linecons-cog"></i>
						</a>
					</div>[/if {C_accessChangeSkin}==true]
					
								
				</header>
				<ul id="main-menu" class="main-menu">
					<!-- add class "multiple-expanded" to allow multiple submenus to open -->
					<!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->
						<li[if {C_deactiveMainMenu}==1] style="display:none;"[/if {C_deactiveMainMenu}==1]>
							<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/{C_mainPageAdmin}">
								<i class="linecons-cog"></i>
								<span class="title">{L_"??????????????"}</span>
							</a>
						</li>
						[foreach block=menu]
						[foreachif {menu.type_st}=="start"&&{menu.existSub}==false]<li>
							<a href="{menu.link}">
								<i class="{menu.icon}"></i>
								<span class="title">{menu.value}</span>
							</a>
							<ul>[/foreachif {menu.type_st}=="start"&&{menu.existSub}==false]
						[foreachif {menu.type_st}=="start"&&{menu.existSub}==true]<li class="hasSubmenu">
							<a href="{menu.link}">
								<i class="{menu.icon}"></i>
								<span class="title">{menu.value}</span>
							</a>
							<ul>[/foreachif {menu.type_st}=="start"&&{menu.existSub}==true]
								<li[foreachif {menu.is_now}==1] class="active"[/foreachif][foreachif {menu.type_st}=="start"] style="display:none;"[/foreachif {menu.type_st}=="start"]>
									<a href="{menu.link}">
										<i class="{menu.icon}"></i>
										<span class="title">{menu.value}</span>
									</a>
								</li>
						[foreachif {menu.type_end}=="end"]	</ul>
						</li>[/foreachif {menu.type_end}=="end"]
						[/foreach]
				</ul>
						
			</div>
			
		</div>
		
		<div class="main-content">
					
			<!-- User Info, Notifications and Menu Bar -->
			<nav class="navbar user-info-navbar" role="navigation">
				
				<!-- Left links for user info navbar -->
				<ul class="user-info-menu left-links list-inline list-unstyled">
					
					<!-- <li class="hidden-sm hidden-xs">
						<a href="#" data-toggle="sidebar">
							<i class="fa-bars"></i>
						</a>
					</li> -->
					
					<li class="dropdown hover-line">
						<a href="{C_default_http_host}" target="_blank" class="dropdown-toggle" aria-expanded="true" title="{L_"?????????????? ???? ????????"}" alt="{L_"?????????????? ???? ????????"}">
							<i class="fa-paper-plane"></i>
						</a>
					</li>
					
					[if {count[langListSupport]}>=2]<li class="dropdown hover-line language-switcher" style="min-height: 76px;">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><img src="{nowLangImg}">{nowLangText}</a>
						<ul class="dropdown-menu languages">
							[foreach block=langListSupport]<li><a href="./?setLanguage={langListSupport.langMenu}"><img src="{langListSupport.img}">{langListSupport.lang}</a></li>[/foreach]
						</ul>
					</li>[/if {count[langListSupport]}>=2]
					
					[if {count_Yui}==true]<li class="dropdown hover-line">
						<a href="#" onclick="jQuery('#modal-yui').modal('show', {backdrop: 'static'});" title="{L_"???????????? ?????????????? Yui"}" alt="{L_"???????????? ?????????????? Yui"}">
							<i class="fa-info"></i>
						</a>
					</li>[/if {count_Yui}==true]
					
					///***<li class="dropdown hover-line">
						<a href="#" data-toggle="dropdown">
							<i class="fa-bell-o"></i>
							[if {count_unmoder}>=1]<span class="badge badge-purple">{count_unmoder}</span>[/if {count_unmoder}>=1]
						</a>
							
						[if {count_unmoder}>=1]<ul class="dropdown-menu notifications">
							<li>
								<ul class="dropdown-menu-list list-unstyled ps-scrollbar">
									[foreach block=unmoders]<li class="active
									[foreachif {unmoders.errors}==0]notification-success[/foreachif]
									[foreachif {unmoders.errors}>=1]notification-danger[/foreachif]">
										[foreachif {unmoders.errors}==0]<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}?pages=Videos&mod=edit&edit={unmoders.name_id}">[/foreachif]
										[foreachif {unmoders.errors}>=1]<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}?pages=Videos&mod=errors">[/foreachif]
											[foreachif {unmoders.errors}>=1]<i class="fa-trash"></i>[/foreachif]
											[foreachif {unmoders.errors}==0]<i class="fa-play-circle-o"></i>[/foreachif]
											<span class="line"><strong>{unmoders.name}</strong></span>
											<span class="line small time">{unmoders.ago}</span>
										</a>
									</li>[/foreach]
								</ul>
							</li>
						</ul>[/if {count_unmoder}>=1]
					</li>***///
					
				</ul>
				
				<div class="versionCardinal">{L_"????????????"}: {D_VERSION}</div>
				
				<!-- Right links for user info navbar -->
				<ul class="user-info-menu right-links list-inline list-unstyled">
					
					<li class="dropdown user-profile">
						<a href="#" data-toggle="dropdown">
							<span>
								{U_username}
								<i class="fa-angle-down"></i>
							</span>
						</a>
						
						<ul class="dropdown-menu user-profile-menu list-unstyled">
							[if {UL_settings}==true]<li>
								<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Settings">
									<i class="fa-wrench"></i>
									{L_"Settings"}
								</a>
							</li>[/if {UL_settings}==true]
							<li class="last">
								<a href="{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Login&out">
									<i class="fa-lock"></i>
									{L_"Logout"}
								</a>
							</li>
						</ul>
					</li>
					
				</ul>

				<span id="doc_time"></span>
				
			</nav>
			<div class="page-title">
				<div class="title-env">
					<h1 class="title">{title_admin}</h1>
				</div>
			</div>
			<span class="content_admin">
				{info}
				{main_admin}
			</span>
			<!-- Main Footer -->
			<!-- Choose between footer styles: "footer-type-1" or "footer-type-2" -->
			<!-- Add class "sticky" to  always stick the footer to the end of page (if page contents is small) -->
			<!-- Or class "fixed" to  always fix the footer to the end of page -->
			<footer class="main-footer sticky footer-type-1">
				
				<div class="footer-inner">
				
					<!-- Add your copyright text here -->
					<div class="footer-text">
						&copy; 2015 - {S_data="Y"} 
						<strong>Xenon</strong> 
						theme by <a href="http://laborator.co" target="_blank">Laborator</a> for Cardinal Engine
					</div>
					
					
					<!-- Go to Top Link, just add rel="go-top" to any link to add this functionality -->
					<div class="go-up">
					
						<a href="#" rel="go-top">
							<i class="fa-angle-up"></i>
						</a>
						
					</div>
					
					<div class="pull-right col-sm-2 text-right text-muted">rev. {D_INTVERSION}</div>
					
				</div>
				
			</footer>
		</div>
		
		
	</div>
	
	{E_[admin_footer]}
	
	<div class="modal fade custom-width" id="modal-3" data-backdrop="static">
		<div class="modal-dialog" style="width:95%;height:90%;">
			<form class="modal-content" style="height:100%;display:block;">
				<div class="modal-header">
					<button type="button" class="close hide" onclick="show_hide(this);return false"><span class="collapse-icon">-</span></button>
					<button type="button" class="close" id="closeIco" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="title_video"></h4>
				</div>
				<div class="modal-body" id="content_video" style="height:85%;"></div>
				<div class="modal-footer" style="position:absolute;left:0px;width:100%;padding:30px;bottom:0px;margin-bottom:-10px;">
					<button type="button" class="btn btn-white pull-right" id="close" data-dismiss="modal">Close</button>
				</div>
			</form>
		</div>
	</div>
	<div id="modalView" class="btn btn-purple btn-lg hidden" style="bottom:0px;left:0px;position:fixed;background:#fff;color:#000;z-index:100;" onclick="shows();return false;">View</div>
	<div class="modal fade" id="modal-4" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Error</h4>
				</div>
				<div class="modal-body" id="error-body" style="height:500px;overflow:auto;">You can close this modal when you click on button only!</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-info" data-dismiss="modal">Continue</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="modal-yui" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header"><h4 class="modal-title">{L_"???????????? ?????????????? Yui"}</h4></div>
				<div class="modal-body">
					<button type="button" class="btn btn-info" data-demo="data-demo" data-demo-this="1" data-dismiss="modal">{L_"?????????????????? ???????????????? ?????? ???????? ????????????????"}</button>
					<button type="button" class="btn btn-red" data-demo="data-demo" data-demo-this="0" data-dismiss="modal">{L_"?????????????????? ???????????? ???????? ????????????????"}</button>
				</div>
			</div>
		</div>
	</div>

	<div class="page-loading-overlay">
		<div class="loader-2"></div>
	</div>

	<!-- Import flash -->
	<script type="text/javascript">
		jQuery(document).ready(function($) {
			$("[data-skin]").each(function(i, el)
			{
				var $el = $(el),
					skin = $el.data('skin');
				
				$el.find('a').attr('data-set-skin', skin).attr('href', '#setSkin:' + skin);
			});
			$('[data-set-skin]').on('click', function(ev)
			{
				ev.preventDefault();
				
				var skin = $(this).data('set-skin'),
					skin_name = skin ? (' skin-'+skin) : '';
				
				var body_classes = public_vars.$body.attr('class').replace(/skin-[a-z]+/i, '');
				
				public_vars.$body.attr('class', body_classes).addClass(skin_name);
				
				Cookies.set('current-skin', skin);
			});
			jQuery('body').attr('class', jQuery('body').attr('class').replace(/skin-[a-z]+/i, '')).addClass(Cookies.get('current-skin') ? (' skin-'+Cookies.get('current-skin')) : '');
		});
	</script>
	
	<!-- Imported styles on this page -->
	<link rel="stylesheet" href="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/toastr/toastr.min.css?1">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.7/css/jquery.fancybox.min.css" rel="stylesheet">
	{css_list}
	<!-- Bottom Scripts -->
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/bootstrap.min.js?1"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/TweenMax.min.js?1"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/resizeable.js?1"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/joinable.js?2"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/xenon-api.js?2"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/xenon-toggles.js?1"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/xenon-widgets.js?1"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/tinymce/tinymce.min.js?{S_time}"></script>

	
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/datepicker/bootstrap-datepicker.js"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/timepicker/bootstrap-timepicker.min.js"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/colorpicker/bootstrap-colorpicker.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.7/js/jquery.fancybox.min.js"></script>

	{js_list}
	
	<script>
	var editorTextarea;
	jQuery(".update-nag .dismiss").unbind("click").click(function() {
		var th = this;
		var id = jQuery(th).attr("data-code");
		jQuery.post("{C_default_http_local}{D_ADMINCP_DIRECTORY}/?pages=main&removeCode="+id, function(d) {
			jQuery(th).parent().parent().hide(500, function() {jQuery(th).parent().parent().remove();});
		});
	});
	if(typeof(disableAllEditors)==="undefined") {
		$(document).ready(function(){
			if(typeof(editorTextarea)!=="object") {
				editorTextarea = {configTinymce};
			}
			tinymce.init(editorTextarea);
			jQuery("body").on("click", '.iframe-btn', function() {
				jQuery.fancybox.open({'href': jQuery(this).attr("href"), 'width': (jQuery("body").width()/1.5), 'height': (jQuery("body").height()/1.5), 'type': 'iframe', 'autoScale': false});
				return false;
			});
		});
	}
	function responsive_filemanager_callback(field_id) {
		var type = jQuery("#"+field_id).attr("data-accept");
		var link = jQuery("#"+field_id).val();
		var http_link = link;
		link = link.replace(default_link, "");
		jQuery("#"+field_id).val(link);
		var par = jQuery("#img"+field_id).parent();
		par.find("#img"+field_id).remove();
		par.prepend('<a data-link="'+field_id+'" id="img'+field_id+'" href="'+http_link+'"'+(type=="image" || type=="imageArrayAccess" ? " class=\"showPreview new\"" : "")+' target="_blank">??????????????????????</a>');
		jQuery(".showPreview.new").each(function(i, elem) {
			jQuery(elem).parent().find("img").remove();
			jQuery(elem).after("<br><img src='"+jQuery(elem).attr("href")+"' data-link='"+jQuery(elem).attr("data-link")+"' width='200'>");
		});
	}
	</script>

	<style type="text/css">.mce-branding-powered-by { display: none !important; }</style>

	<!-- JavaScripts initializations and stuff -->
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/xenon-custom.js?2"></script>
	<script src="{C_default_http_local}{D_ADMINCP_DIRECTORY}/assets/xenon/js/toastr/toastr.min.js?1"></script>
</body>
</html>