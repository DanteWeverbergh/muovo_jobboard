<?php


/**
 * Renew job
 */


function rs_renew_job(WP_REST_Request $request) {
    $error = new WP_Error();
    
   // date_default_timezone_set('Europe/Malta');
    //
    $response = array();
    $parameters = $request->get_json_params();


    $job_id = sanitize_text_field($parameters['job_id']);
    $package_id = get_field('package_id',$job_id);



     $is_active = get_field('is_active',$job_id);



    if($is_active){
        //add 30 days


        $current = get_field('active_until', $job_id);
        $new_date = date('d/m/y H:i:s', strtotime($current."+30 days"));

        update_field('active_until', $new_date, $job_id);


    }else {

        //get jobs/jobs
        $job_count = get_field('job_count', $package_id);
        $jobs_posted = get_field('jobs_posted', $package_id);

        if($jobs_posted >= $job_count){
            $error->add(400, __("This package is full, select or buy another one to keep posting jobs."), array('status' => 400));
            return $error;
        }else{

        //set active
        update_field('is_active', true, $job_id);

        $now = date(date("d/m/y H:i:s"));

        update_field('active_from', $now, $job_id);

        //update packages
        update_field('jobs_posted', $jobs_posted +1, $package_id);
        }
        
    }




    $response['code'] = 200;
    $response['message'] = __("Job renewed for 30 days!" );
   

    return new WP_REST_Response($response, 123);

}




add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/renew', [
		'methods' => 'POST',
		'callback' => 'rs_renew_job',
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