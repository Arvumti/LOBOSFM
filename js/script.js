/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	
	/*-------------------------------------------------*/
	/* =  REcuadros
	/*-------------------------------------------------*/

	var winDow = $(window);
	// Needed variables
	var $contenedor=$('.recuadro_opciones, .blog-box');
	var $filter=$('.filter');

	try{
		$contenedor.imagesLoaded( function(){
			$contenedor.show();
			$contenedor.isotope({
				filter:'*',
				layoutMode:'masonry',
				animationOptions:{
					duration:750,
					easing:'linear'
				}
			});
		});
	} catch(err) {
	}

	winDow.bind('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');

		try {
			$contenedor.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {
		}
		return false;
	});
	
	// filtro isotopo
	$filter.find('a').click(function(){
		var selector = $(this).attr('data-filter');

		try {
			$contenedor.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {

		}
		return false;
	});


	var filterItemA	= $('.filter li a');

	filterItemA.on('click', function(){
		var $this = $(this);
		if ( !$this.hasClass('active')) {
			filterItemA.removeClass('active');
			$this.addClass('active');
		}
	});

	/*-------------------------------------------------*/
	/* = Fucion precarga
	/*-------------------------------------------------*/
	var body = $('body');
	body.addClass('active');

	winDow.load( function(){
		var mainDiv = $('#contenedor'),
			preloader = $('.preloader');

			preloader.fadeOut(400, function(){
				mainDiv.delay(400).addClass('active');
				body.delay(400).css('background', '#b4b7b8');
			});
	});

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/
	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			animation: "fade",
			slideshowSpeed: 4000,
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* = Largo del Header Fix
	/*-------------------------------------------------*/
	var content = $('#contenido');
	content.imagesLoaded( function(){
		var bodyHeight = $(window).outerHeight(),
		contenedorHeight = $('.contenido_interno').outerHeight(),
		headerHeight = $('header');

		if( bodyHeight > contenedorHeight ) {
			headerHeight.css('height',bodyHeight);
		} else {
			headerHeight.css('height',contenedorHeight);	
		}
	});

	winDow.bind('resize', function(){
		var bodyHeight = $(window).outerHeight(),
		contenedorHeight = $('.contenido_interno').outerHeight(),
		headerHeight = $('header');

		if( bodyHeight > contenedorHeight ) {
			headerHeight.css('height',bodyHeight);
		} else {
			headerHeight.css('height',contenedorHeight);	
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	nice scroll
	/* ---------------------------------------------------------------------- */

	try {
		var HTMLcontenedor = $("html");
		HTMLcontenedor.niceScroll({
			cursorcolor:"#e74c3c"
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Caja con información
	/* ---------------------------------------------------------------------- */

	var toggleInfo = $('.info-toggle'),
		toggleContent = $('.info-content');

		toggleInfo.on('click', function(e){
			e.preventDefault();

			if ( !$(this).hasClass('active') ) {
				$(this).addClass('active');
				toggleContent.addClass('active');
			} else {
				$(this).removeClass('active');
				toggleContent.removeClass('active');				
			}
		});

	/* ---------------------------------------------------------------------- */
	/*	Mapa de contacto
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"24.0484168", "lon":"-104.6332481"}; //Cambiar coordenadas del mapa

	try {
		var mapcontenedor = $('#mapa');
		mapcontenedor.gmap3({
			action: 'addMarker',
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 14
				},
			},
			{action: 'setOptions', args:[{scrollwheel:true}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	POP UP
	/* ---------------------------------------------------------------------- */

	try {
		
		var ZoomImage = $('.zoom, .zoom-image');
		ZoomImage.magnificPopup({
			type: 'image'
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Testimonio
	/*-------------------------------------------------*/
	try{
		var testimUl = $('.testimonial ul');

		testimUl.quovolver({
			transitionSpeed:300,
			autoPlay:true
		});
	}catch(err){
	}

	/*-------------------------------------------------*/
	/* =
	/*-------------------------------------------------*/

	try {
		var animateElement = $(".meter > span");
		animateElement.each(function() {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1200);
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Menu Responsivo
	/* ---------------------------------------------------------------------- */
	var menuClick = $('a.elemento'),
		navbarVertical = $('.zona_menu');
		
	menuClick.on('click', function(e){
		e.preventDefault();

		if( navbarVertical.hasClass('active') ){
			navbarVertical.slideUp(300).removeClass('active');
		} else {
			navbarVertical.slideDown(300).addClass('active');
		}
	});

	winDow.bind('resize', function(){
		if ( winDow.width() > 768 ) {
			navbarVertical.slideDown(300).removeClass('active');
		} else {
			navbarVertical.slideUp(300).removeClass('active');
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	Formulario de contacto
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

});