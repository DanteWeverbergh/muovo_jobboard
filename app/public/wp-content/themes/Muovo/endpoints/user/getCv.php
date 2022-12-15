<?php

/**
 * Get CV
 */



 function rs_get_cv() {
     //

    $user_id = get_current_user_id();

    $cv_url = get_field('cv_url', $user_id);

    return $user_id;
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/cv', [
		'methods' => 'GET',
		'callback' => 'rs_get_cv',
        'permission_callback' => function() {
            // if user -> true

            $user_id = get_current_user_id();

            if($user_id){
                return true;
            }
        }
	]);
    
});