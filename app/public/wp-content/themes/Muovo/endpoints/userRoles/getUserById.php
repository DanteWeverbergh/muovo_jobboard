<?php


/**
 * Get user by id
 */


function rs_get_me() {

    $user_id = get_current_user_id();

    $user = get_userdata($user_id);

    $roles = (array) $user->roles;
    $data = [];

   
   
    $data['role'] = $roles[0];
    $data['email'] = get_userdata($user_id)->user_email;
    $data['displayName'] = get_userdata($user_id)->display_name;
    $data['firstName'] = get_userdata($user_id)->first_name;
    $data['lastName'] =get_userdata($user_id)->last_name;


    
    return $data;
}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/me', [
		'methods' => 'GET',
		'callback' => 'rs_get_me',
	]);
    
});