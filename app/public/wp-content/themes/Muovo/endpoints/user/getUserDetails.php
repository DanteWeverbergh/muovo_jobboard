<?php

/**
 * Get user details
 */

function rs_user_details() {
  $user = wp_get_current_user();

  $data = [
    'first_name' => $user->user_firstname,
    'last_name' => $user->user_lastname,
    'email' => $user->user_email,
    'id' => get_current_user_id(),
  ];

  return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/details', [
		'methods' => 'GET',
		'callback' => 'rs_user_details',
        'permission_callback' => function() {
            //
           $user = wp_get_current_user();
          
           //only allow companyADmins to user this ruote
           if($user){
            return true;
           }
        }
        
	]);
    
});

