<?php


function rs_get_user_data() {
    //


    $user_id = get_current_user_id();

    $user = wp_get_current_user();
    $cv_url = get_field('cv_url', 'user_' . $user_id);

    return $cv_url;
}

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/data', [
		'methods' => 'GET',
		'callback' => 'rs_get_user_data',
        'permission_callback' => function() {
            //
           
         $user_id = get_current_user_id();

           //only allow companyADmins to user this ruote
           if($user_id){

                return true;

           }else {

                return false;

           }
        }
	]);
    
});