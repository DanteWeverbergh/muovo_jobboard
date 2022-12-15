<?php


/**
 * Set status applications
 */


function rs_set_status(WP_REST_Request $request) {


    $response = array();
    $parameters = $request->get_json_params();

    $status = sanitize_text_field($parameters['status']);
    $jobId = sanitize_text_field($parameters['jobId']);
    $application_id = sanitize_text_field($parameters['applicationId']);

    //update application 
    update_field('status', $status, $application_id);
    

    //update_field('status', $status, $jobId);



    $response['code'] = 200;
    $response['message'] = __('Status update to ' . $status);
   
    return new WP_REST_Response($response, 123);
}

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'application/status', [
		'methods' => 'POST',
		'callback' => 'rs_set_status',
        'permission_callback' => function() {
            //
           $user = wp_get_current_user();
           $roles = $user->roles;

           //only allow companyADmins to user this ruote
           if(in_array( 'companyadmin', $roles) || in_array( 'companyUser', $roles)  ){
               return true;
           } else {
               return false;
           }
        }
        
       
	]);
    
});