<?php



/**
 * Delete alert
 */



 function rs_delete_alert(){
     //


     $alert_id =  $_REQUEST['id'];


     //delete oist
     wp_delete_post($alert_id);

     $response['code'] = 200;
     $response['message'] = __('Alert deleted!');
    
 
     return new WP_REST_Response($response, 123);
 }






add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'alerts/delete', [
		'methods' => 'DELETE',
		'callback' => 'rs_delete_alert',
        'permission_callback' => function() {
            // if user -> true

            $user_id = get_current_user_id();

            if($user_id){
                return true;
            }
        },
        'args' => [
            'id' => [
                'description' => 'Alert id',
                'type' => 'string',
            ]
        ]
	]);
    
});
