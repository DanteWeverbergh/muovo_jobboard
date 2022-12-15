<?php

/**
 * Get all the categories
 */

function rs_get_categories(){
    //

    $terms = get_terms('categories');

    $data = [];
    $i = 0;

    foreach($terms as $term) {
        //
        $data[$i]['id'] = $term->term_id;
        $data[$i]['category'] = $term->name;

        $i++;

    }
 
    return $data;
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'taxonomy/categories', [
		'methods' => 'GET',
		'callback' => 'rs_get_categories',
       
	]);
    
});