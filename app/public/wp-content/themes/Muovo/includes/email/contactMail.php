<?php



function rs_contact(WP_REST_Request $request){

    $response = array();
    $parameters = $request->get_json_params();

    $first_name = $parameters['firstName'];
    $last_name = $parameters['lastName'];
    $email = $parameters['email'];
    $message = $parameters['message'] . '         ' . $email;
    $subject = 'Muovo contavt - ' . $first_name . ' ' . $last_name . $parameters['subject'];


    wp_mail('contact@email.com', $subject, $message );

    $response['code'] = 200;
    $response['message'] = __($subject  );
   

    return new WP_REST_Response($response, 123);
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'contact', [
		'methods' => 'POST',
		'callback' => 'rs_contact',
	]);
    
});