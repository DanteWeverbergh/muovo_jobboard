<?php


function rs_all_applications(WP_REST_Request $request) {
    //

    $response = array();
    $parameters = $request->get_json_params();

    $company_id = sanitize_text_field($parameters['company_id']);
  


 
        $args = [
            'post_type' => 'applications',
            'meta_key' => 'company_id',
            'meta_value' => $company_id
        ];

    $get_applications = new WP_Query;
    $applications = $get_applications->query($args);


    $data = [];
    $i = 0;

    foreach($applications as $application) {
        $data[$i]['id'] = $application->ID;
        $data[$i]['title'] = $application->post_title;
        $data[$i]['user_id'] = get_field('user_id', $application->ID);
        $data[$i]['phone'] = get_field('phone', 'user_' .get_field('user_id', $application->ID));
        $data[$i]['email'] = get_userdata(get_field('user_id', $application->ID))->user_email;
        $data[$i]['cv_url'] = get_field('cv_url', 'user_' . get_field('user_id', $application->ID));
        $data[$i]['full_name'] = get_user_meta(get_field('user_id', $application->ID), 'first_name', true) . ' ' . get_user_meta(get_field('user_id', $application->ID), 'last_name', true);
        $data[$i]['status'] = get_field('status', $application->ID);

        $i++;
    }

    return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'applications', [
		'methods' => 'POST',
		'callback' => 'rs_all_applications',
	]);
    
});