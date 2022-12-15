<?php


/**
 * Create job
 * 
 * 
 * 
 * 
 * 
 * https://github.com/AdvancedCustomFields/acf/issues/252
 * https://www.advancedcustomfields.com/resources/date-time-picker/
 * 
 */



function rs_create_job(WP_REST_Request $request) {

    $error = new WP_Error();

    date_default_timezone_set('Europe/Malta');

    
    //
    $response = array();
    $parameters = $request->get_json_params();

    $jobTitle = sanitize_text_field($parameters['jobTitle']);
    $jobDescription = sanitize_text_field($parameters['jobDescription']);

    //acf fields
    $jobType = sanitize_text_field($parameters['jobType']);
    $isRemote = sanitize_text_field($parameters['remote']);
   // $isActive = sanitize_text_field($parameters['isActive']);
    $package_id = sanitize_text_field($parameters['jobPackageId']);
    $sector = sanitize_text_field($parameters['sector']);

// values from uer
    $user_id = get_current_user_id();
    $company = get_field('company', 'user_' . $user_id);
    $company_id = get_field('company_id', 'user_' . $user_id);

    //company field from backend 
   // $company = sanitize_text_field($parameters['company']);
  

      // error if required fields are empty
      $error = new WP_Error();

      if (empty($jobTitle)) {
          $error->add(400, __("Jobtite field is required."), array('status' => 400));
          return $error;
      }
  
      if (empty($jobDescription)) {
          $error->add(400, __("Jobdescription field is required."), array('status' => 400));
          return $error;
      }
      


      //current date
    $now = date("Y-m-d H:i:s");

      // get job package
   
    $package = get_post($package_id);

    $package_data = [];

    $package_data['package_expires'] = get_field('package_expires', $package->ID);

    $package_data['bought_on'] = get_field('bought_on', $package->ID);
      

    $package_data['bought_on'];


    //job counts
    $job_count =  get_field('job_count', $package_id);
    //jobs posted
    $jobs_posted =  get_field('jobs_posted', $package_id);

    if($jobs_posted >= $job_count) {
        // 
        $error->add(400, __("This package is full, select or buy another one to keep posting jobs."), array('status' => 400));
        return $error;
    }else{
        //
        if($package_id != 0 ) {
            //publish post
    
            $id = wp_insert_post(array(
                'post_title' => $jobTitle,
                'post_type' => 'jobs',
                'post_content' => $jobDescription,
                'post_status' => 'publish'
            ));
    
            update_field('active_from', $now, $id);
            update_field('company_id', $company_id, $id);
    
            // add 30 days to the current time
            //
            $active_until = date("Y-m-d H:i:s", strtotime("+30 days"));
            
            
            error_log($active_until);
            update_field('active_until', $active_until, $id);
            update_field('is_active', true, $id);
            update_field('package_id', $package_id,$id );
            
    
            $jobs_posted = get_field('jobs_posted', $package_id);
            update_field('jobs_posted', $jobs_posted + 1, $package_id);
    
            $value_repeater = [
                'job_id' => $id,
            ];
    
            add_row('job_ids', $value_repeater, $package_id);
      
            //send mail

            include '../../includes/email/alerts/newJobPosted.php';
            new_job_posted($sector, $jobTitle, $company);
      
        }

    }

    if (empty($package_id)) {
        $id = wp_insert_post(array(
            'post_title' => $jobTitle,
            'post_type' => 'jobs',
            'post_content' => $jobDescription,
            'post_status' => 'draft'
    ));

        update_field('is_active', false, $id);
    }

        //draft -> not showing to the public
     
    //acf
    update_field('company_name', $company, $id);
    update_field('is_remote', $isRemote, $id);
    update_field('job_type', $jobType, $id);

    wp_set_post_terms($id, $sector, 'sectors');

    $response['code'] = 200;
    $response['message'] = __($jobTitle . "was posted succesfully!" );

    return new WP_REST_Response($response, 123);
}

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/create', [
		'methods' => 'POST',
		'callback' => 'rs_create_job',
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