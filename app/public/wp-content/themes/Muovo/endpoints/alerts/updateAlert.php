<?php

/**
 * Update alert
 */



function rs_update_alert(WP_REST_Request $request) {

   
    $response = array();
    $parameters = $request->get_json_params();

    $frequency = sanitize_text_field($parameters['frequency']);
    $old_sector = sanitize_text_field($parameters['oldSector']);
    $new_sector = sanitize_text_field($parameters['newSector']);
    $alert_id =  $_REQUEST['id'];

    

    //update frequency field
   update_field('frequency', $frequency, $alert_id);

   // remove old sector
   wp_remove_object_terms($alert_id,$old_sector, 'sectors');

   // Set new sector
   wp_set_object_terms($alert_id, $new_sector, 'sectors', true );


    $response['code'] = 200;
    $response['message'] = __('Alert updated!');
   

    return new WP_REST_Response($response, 123);
}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'alerts/update', [
		'methods' => 'PUT',
		'callback' => 'rs_update_alert',
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
                'type' => 'int',
            ]
        ]
	]);
    
});