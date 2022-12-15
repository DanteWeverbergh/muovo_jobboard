<?php

/**
 * Get all the applications for a jobseeker
 */

 function rs_jobseeker_applications() {
    //


    $user_id = get_current_user_id();

    $args = [
        'post_type' => 'applications',
        'post_status' => 'publish',
        'meta_key' => 'user_id',
        'posts_per_page' => 25,
        'meta_value' => $user_id,
        ];

    
        $get_applications = new WP_Query;
        $applications = $get_applications->query($args);

        $data = [];
        $i = 0;

        foreach($applications as $application) {
            $data[$i]['id'] = $application->ID;
            $data[$i]['company_id'] = get_field('company_id', $application->ID);
            $data[$i]['job_id'] = get_field('job_id', $application->ID);
            $data[$i]['job'] = get_the_title(get_field('job_id', $application->ID));
            $data[$i]['company'] = get_the_title(get_field('company_id', $application->ID));
            $data[$i]['date'] = get_field('date_time', $application->ID);
            $i++;
        }

        return $data;

 }



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'applications/jobseeker', [
		'methods' => 'GET',
		'callback' => 'rs_jobseeker_applications',
        'permission_callback' => function() {
            // if user -> true

            $user = wp_get_current_user();
        
            
            if($user) {
                return true;
            }else{
                return false;
            }
        }
	]);
    
});