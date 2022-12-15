<?php


/**
 * Buy package for now withour payment
 */




 function rs_buy_package(WP_REST_Request $request) {
     //

     date_default_timezone_set("Europe/Malta");

     $response = array();
     $parameters = $request->get_json_params();

        $user_id = get_current_user_id();
        $company_admin = wp_get_current_user();
        $company = get_field('company', 'user_' . $user_id);
        $job_count = sanitize_text_field($parameters['jobCount']);
        $valid_for = 365;
        $bought_on = date('Y-m-d H:i:s');
        $package_expires = date('Y-m-d H:i:s', strtotime('+'. $valid_for .'days'));
        error_log('Bought: ' . $bought_on);
        error_log('Expires: ' . $package_expires);


     $package_id = wp_insert_post(array(
         'post_title' => 'Job Package - ' . $valid_for . ' days - ' . $company . ' - ' . $job_count . ' jobs',
         'post_type' => 'job_package', 
         'post_status' => 'publish'    
        ));

        //acf fields
        update_field('job_count', $job_count, $package_id);
        update_field('jobs_posted', 0, $package_id);
        update_field('valid_for', $valid_for, $package_id);
        update_field('package_expires', $package_expires, $package_id);
        update_field('bought_on', $bought_on, $package_id);
        update_field('company_admin_id', $user_id, $package_id);
        update_field('company', $company, $package_id);


     $response['code'] = 200;
     $response['message'] = __("Succes!" );
    
  
     return new WP_REST_Response($response, 123);
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'packages/buy', [
		'methods' => 'POST',
		'callback' => 'rs_buy_package',
        'permission_callback' => function() {
            // if user -> true

            $user = wp_get_current_user();
            $roles = $user->roles;

            if(in_array('companyadmin', $roles)){
              return true;
            }else {
              return false;
            }

          return true;
        }
	]);
    
});