<?php

/**
 * Apply for job
 */


function rs_apply_for_job(WP_REST_Request $request) {

    //timezone
    date_default_timezone_set('Europe/Malta');
    
    $response = array();
    $parameters = $request->get_json_params();

    $job_id = sanitize_text_field($parameters['jobId']);
    $user_id = get_current_user_id();
    $job_title = sanitize_text_field($parameters['jobTitle']);
    $company_name = sanitize_text_field($parameters['companyName']);
    $company_id = sanitize_text_field($parameters['companyId']);

    $user = get_userdata($user_id);
    $full_name = get_userdata($user_id)->first_name . ' ' . get_userdata($user_id)->last_name;
    $email = get_userdata($user_id)->user_email;

    /**
     * Erros
     */

    $error = new WP_Error();
    if (empty($job_id)) {
        $error->add(400, __('Oops something went wrong, please try again.'), array('status' => 400));
        return $error;
    }
    if (empty($user_id)) {
        $error->add(400, __('Oops something went wrong, please try again.'), array('status' => 400));
        return $error;
    }
    if (empty($job_title)) {
        $error->add(400, __('Oops something went wrong, please try again.'), array('status' => 400));
        return $error;
    }
    if (empty($company_name)) {
        $error->add(400, __('Oops something went wrong, please try again.'), array('status' => 400));
        return $error;
    }

    $application_id = wp_insert_post(array(
        'post_title' => 'Application - ' . $full_name . ' - ' . $job_title,
        'post_type' => 'applications',
        'post_status' => 'publish'
    ));

    /**
     * Update acf fields in applications
     */
       // date_default_timezone_set('Europe/Malta');

        update_field('user_id', $user_id, $application_id);
        update_field('company_id', $company_id, $application_id );
        update_field('date_time', date('d-m-Y h:i:s'), $application_id);
        update_field('status', 'pending', $application_id);
        update_field('job_id', $job_id, $application_id);


    $value = [
            'jobseeker_id' => $user_id,
            'status' => 'pending',
            'application_id' => $application_id
    ];
    

    add_row('applied_jobseekers', $value, $job_id);


    
    $mail = 'test@email.mt';
    $subject = 'New application for '. $job_title . '.';
    $message = 'Dear ..., A new application has been submitted for ' . $job_title . ' on ' . date("Y/m/d") . '. ' 
    
    . 'Jobseeker: ' . $full_name . ' Email adress: ' . $email;
    

    wp_mail($mail, $subject, $message);

    $response['code'] = 200;
    $response['message'] = __('You have succesfully applied for the position ' . $job_title . ' at ' . $company_name);
   

    return new WP_REST_Response($response, 123);
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/apply', [
		'methods' => 'POST',
		'callback' => 'rs_apply_for_job',
        'permission_callback' => function() {
            //
           $user = wp_get_current_user();
           $roles = $user->roles;

           //only allow companyADmins to user this ruote
           if(in_array( 'jobseeker', $roles)  ){
               return true;
           } else {
               return false;
           }
        }
	]);
    
});