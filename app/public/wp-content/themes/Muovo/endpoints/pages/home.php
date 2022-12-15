<?php


/**
 * Home page
 */


 function rs_get_home_page() {

    $data = [];

    
    $slug =  $_REQUEST['page'];

    $args = [
        'name' => $slug,
    ];

    $page_query = new WP_Query($args);
    $page = $page_query->query($args);
    




    $data['blog'] = get_field('blog_description', 200);




    return $data;
 }



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'pages/home', [
		'methods' => 'GET',
		'callback' => 'rs_get_home_page',
        
	]);
    
});