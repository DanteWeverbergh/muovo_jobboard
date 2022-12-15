<?php

/**
 * Edit jobs
 */


 function rs_update_job(WP_REST_Request $request) {
   //

   $response = array();
   $parameters = $request->get_json_params();


   $job_title = sanitize_text_field($parameters['jobTitle']);
   $job_description = sanitize_text_field($parameters['jobDescription']);
   $job_type = sanitize_text_field($parameters['jobType']);
   $job_id = sanitize_text_field($parameters['jobId']);


   $error = new WP_Error();

   if (empty($job_id)) {
       $error->add(400, __("Job id field is required."), array('status' => 400));
       return $error;
   }

    $args = [
      'ID' => $job_id,
      'post_title' => $job_title,
      'post_content' => $job_description
    ];

    wp_update_post($args);

   $response['code'] = 200;
   $response['message'] = __("Job updated succesfully." );
  

   return new WP_REST_Response($response, 123);
 }



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'job/update', [
		'methods' => 'PUT',
		'callback' => 'rs_update_job',
        'permission_callback' => function() {
             // if user -> true

            $user = wp_get_current_user();
             $roles = $user->roles;

             if(in_array('companyadmin', $roles) || in_array('companyUser', $roles)){
        return true;
             }else {
               return false;
             }

           return true;
         }
	]);
    
});