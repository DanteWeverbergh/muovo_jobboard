<?php

/**
 * Update user
 */

function rs_update_user (WP_REST_Request $request) {
    //

    $response = array();
    $parameters = $request->get_json_params();

    $firstName = sanitize_text_field($parameters['firstName']);
    $lastName = sanitize_text_field($parameters['lastName']);
    $email = sanitize_text_field($parameters['email']);
 

    $error = new WP_Error();
    $user_id = get_current_user_id();

    wp_update_user(array(
        'ID' => $user_id,
        'user_email' => $email,
        'first_name' => $firstName,
        'last_name' => $lastName,
    ));



    $response['code'] = 200;
    $response['message'] = __('Profile updated!');
   

    return new WP_REST_Response($response, 123);


}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/update', [
		'methods' => 'PUT',
		'callback' => 'rs_update_user',
        'permission_callback' => function() {
            // if user -> true

            $user_id = get_current_user_id();

            if($user_id){
                return true;
            }
        }
	]);
    
});