<?php



/**
 * Sector alerts
 */


function rs_add_sector_alert(WP_REST_Request $request) {
    //

    $response = array();
    $parameters = $request->get_json_params();

    $user_id = get_current_user_id();

    $sector = sanitize_text_field($parameters['sector']);
    $frequency = sanitize_text_field($parameters['frequency']);


    $user = get_userdata($user_id);
    $username = $user->username;


    $id = wp_insert_post(array(
        'post_type' => 'job_alerts',  
        'post_status' => 'publish'
    ));

    //taxonomy
    wp_set_object_terms($id, $sector, 'sectors', true );

    //acf
    update_field('user_id',$user_id, $id);
    update_field('frequency', $frequency, $id);

   $user_list = [];

   array_push($user_list, $user_id);

   update_field('user', $user_list, $id);



    $response['code'] = 200;
    $response['message'] = __('Alerts activated for ' . $sector);
   

    return new WP_REST_Response($response, 123);

}





add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'alerts/sector', [
		'methods' => 'POST',
		'callback' => 'rs_add_sector_alert',
        'permission_callback' => function() {
            // if user -> true

          return true;
        }
	]);
    
});