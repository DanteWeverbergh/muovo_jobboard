<?php

/**
 * Get company by name
 */


 function rs_get_company_by_name() {

    $args = [];

    if (isset($_REQUEST['name'])) {
      $company =  $_REQUEST['name'];
     }

    /*
     $posts = get_posts([
        'post_type'  => 'recipe',
        'title' => 'Chili Sin Carne',
    ]);
    */


    return $company;



 }



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'company', [
		'methods' => 'GET',
		'callback' => 'rs_get_company_by_name',
        'args' => [
            'name' => [
                'description' => 'company_name',
                'type' => 'string'
            ]
        ]
        
	]);
    
});
