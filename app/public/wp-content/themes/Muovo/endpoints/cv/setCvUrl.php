<?php

/**
 * Set cv url
 */


function rs_set_cv(WP_REST_Request $request) {


    $response = array();
    $parameters = $request->get_json_params();
    $cv_url = sanitize_text_field($parameters['cvUrl']);

    $user_id = 29;


    update_field('cv_url', $cv_url, $user_id);


    return $cv_url;
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/cv', [
		'methods' => 'POST',
		'callback' => 'rs_set_cv',
    
	]);
    
});