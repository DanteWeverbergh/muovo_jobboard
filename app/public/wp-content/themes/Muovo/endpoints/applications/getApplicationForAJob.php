<?php


function rs_application_for_job(WP_REST_Request $request) {



    $response = array();
    $parameters = $request->get_json_params();


    // get job id
    $job_id = sanitize_text_field($parameters['jobId']);

    $job_args = [
        'post_type' => 'jobs',
        'include' => $job_id
    ];

    $job = get_post($job_id);

    //return all fields to react
   // return get_field('applied_jobseekers', $job_id);



    if( have_rows('applied_jobseekers', $job_id)){

            $jobseekers_ids = [];
            $data  = [];
            $i = 0;

            while (have_rows('applied_jobseekers', $job_id)) : $row = the_row(true);
               // return $row;
               array_push($jobseekers_ids, $row);

            endwhile;

            
            // get user_id en application_id from repeater field
            foreach ($jobseekers_ids as $j_id){
                $data[$i]['jobseeker_id'] = $j_id['jobseeker_id'];
                $data[$i]['email'] = get_userdata($j_id['jobseeker_id'])->user_email;
                $data[$i]['full_name'] = get_user_meta($j_id['jobseeker_id'], 'first_name', true) . ' ' . get_user_meta($j_id['jobseeker_id'], 'last_name', true);
                $data[$i]['application_id'] = $j_id['application_id'];
                $data[$i]['job_id'] = $job_id;
                $data[$i]['job_title'] = get_the_title($job_id);
                $data[$i]['cv_url'] = get_field('cv_url', 'user_' . $j_id['jobseeker_id']);
                $data[$i]['status'] = get_field('status', $j_id['application_id']);
                $data[$i]['date'] = get_the_date('j F Y', $j_id['application_id']);
                $data[$i]['phone'] = get_field('phone', 'user_' .$j_id['jobseeker_id']);  
                $i++;
            
            }

    return $data;

    //user data with user_id

    //application data with application_id
          
    } else {
        return 'No applications';
    }
}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'applications/job', [
		'methods' => 'POST',
		'callback' => 'rs_application_for_job',

        /*
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
        */
	]);
    
});