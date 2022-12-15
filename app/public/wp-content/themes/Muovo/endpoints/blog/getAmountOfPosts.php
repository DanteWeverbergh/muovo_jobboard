<?php

function rs_amount() {



  $post_type = $_REQUEST['type'];


  $amount = wp_count_posts($post_type)->publish;

    return $amount;
}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'amount', [
		'methods' => 'GET',
		'callback' => 'rs_amount',
        'args' => [
            'type' => [
                'description' => 'Post type',
                'type' => "string",
              ],
            
        ]
        
	]);
    
});