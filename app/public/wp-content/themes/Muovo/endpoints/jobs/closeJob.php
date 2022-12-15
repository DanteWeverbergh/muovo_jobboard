<?php


/**
 * Close job
 */



function rs_close_job(WP_REST_Request $request) {
    //
    $error = new WP_Error();
    
   // date_default_timezone_set('Europe/Malta');
    //
    $response = array();
    $parameters = $request->get_json_params();


    $job_id = sanitize_text_field($parameters['jobId']);
    $package_id = sanitize_text_field($parameters['packageId']);
    //package id get from joId
    //$package_id = get_field($parameters['package_id']);


    update_field('is_active', false, $job_id);
    update_field('status', 'closed', $job_id);

    update_field('active_until', '', $job_id);
    update_field('active_from', '', $job_id);
    update_field('package_id', '', $job_id);

    // $args = [
    //     'post_type' => 'job_package',
    //     //'posts_per_page' => -1,
    //     'meta_query'     => array(
    //         array(
    //                 'key' => 'jobs_ids_$_job_id', // our repeater field post object
    //                 'value' =>  (int) $job_id, //matches exactly "123", not just 123 - prevents a match for "1234"
    //                 'compare' => '='
    //                 )
    //             )
    //         ];

    // $application_query = new wp_Query($args);
    // $applications = $application_query->query($args);

    // return $application_query->have_posts();


    //packages
    $jobs_posted = get_field('jobs_posted', $package_id);
    update_field('jobs_posted', $jobs_posted, $package_id);



    $response['code'] = 200;
    $response['message'] = __("Job closed succesfully!" );
   

    return new WP_REST_Response($response, 123);
}




add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/close', [
		'methods' => 'POST',
		'callback' => 'rs_close_job',
        // 'permission_callback' => function() {
        //     //
        //    $user = wp_get_current_user();
        //    $roles = $user->roles;

        //    //only allow companyADmins to user this ruote
        //    if(in_array( 'companyadmin', $roles) || in_array( 'companyUser', $roles)  ){
        //        return true;
        //    } else {
        //        return false;
        //    }
        // }
	]);
    
});