<?php


/**
 * Get my packages
 */

 function rs_my_packages() {
     //

     $user_id = get_current_user_id();

     $args = [
         'post_type' => 'job_package',
         'post_status' => 'publish',
         'meta_key' => 'company_admin_id',
         'meta_value' => $user_id,
     ];

     $query = new WP_Query($args);
     $packages = $query->query($args);

     if($query->have_posts()){

        $data = [];
        $i = 0;

        foreach($packages as $package) {

            $data[$i]['id'] = $package->ID;
            $data[$i]['title'] = $package->post_title;
            $data[$i]['jobCount'] = get_field('job_count', $package->ID);
            $data[$i]['jobsPosted'] = get_field('jobs_posted', $package->ID);
            $data[$i]['validFor'] = get_field('valid_for', $package->ID);
            $data[$i]['packageExpires'] = get_field('package_expires', $package->ID);
            $data[$i]['boughtOn'] = get_field('bought_on', $package->ID);
    
            $i++;
        }
     }

     return $data;
 }

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'packages', [
		'methods' => 'GET',
		'callback' => 'rs_my_packages',
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