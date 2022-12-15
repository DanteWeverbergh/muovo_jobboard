<?php

/**
 * Get current user id
 */

 function rs_current_user() {

    $user_id = get_current_user_id();


    return $user_id;
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/current', [
		'methods' => 'GET',
		'callback' => 'rs_current_user',
        'permission_callback' => function() {
            // if user -> true

            $user_id = get_current_user_id();
            if($user_id){
                return true;
            }
        }
	]);
    
});