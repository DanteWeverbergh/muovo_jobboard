<?php



/**
 * Get all jobs from 1 company
 */




 function rs_get_jobs_company(WP_REST_Request $request) {
     //
     $response = array();
     $parameters = $request->get_json_params();

     $company = sanitize_text_field($parameters['company']);

    
     /**
      * Errors
      */

      
     $error = new WP_Error();
     $error = new WP_Error();
     if (empty($company)) {
         $error->add(400, __("Company is empty field is required.", 'wp-rest-user'), array('status' => 400));
         return $error;
     }

    
     /**
      * Get jobs
      */
     $args = [
		'numberposts' => 99999,
		'post_type' => 'jobs'
	];

    $posts = get_posts($args);

	$data = [];
	$i = 0;

	foreach($posts as $post) {
            if(get_field('company_name', $post->ID) === $company) {
                $data[$i]['id'] = $post->ID;
                $data[$i]['title'] = $post->post_title;
                $data[$i]['company'] = get_field('company_name', $post->ID);
                $data[$i]['active'] = get_field('is_active', $post->ID);
                $data[$i]['date_posted'] = get_the_date('j F Y', $post->ID); 
                $data[$i]['isActive'] = get_field('is_active', $post->ID);
                $data[$i]['applications']= get_field('applied_jobseekers', $post->ID);
                $data[$i]['slug']=$post->post_name;
                $data[$i]['active_until'] = get_field('active_until', $post->ID);
                $data[$i]['package_id'] = get_field('package_id', $post->ID);
                
                
                $i++; 
            }       
	}

	return $data;


  
 }





add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/company', [
		'methods' => 'POST',
		'callback' => 'rs_get_jobs_company',
	]);
    
});