<?php


/**
 * Get user role
 */

function rs_get_user_role() {
   
    $id = get_current_user_id();

    $data = [];

    $id = get_current_user_id();

    $user = get_userdata($id);

    $roles = (array) $user->roles;

    return $roles[0];


}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/role', [
		'methods' => 'GET',
		'callback' => 'rs_get_user_role',
	]);
    
});