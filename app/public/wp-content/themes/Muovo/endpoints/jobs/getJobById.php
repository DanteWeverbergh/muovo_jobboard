<?php


/**
 * Get job by id
 */


 function rs_get_job_by_id(WP_REST_Request $request) {
     //
     $response = array();
     $parameters = $request->get_json_params();

     $id = sanitize_text_field($parameters['id']);


     $args = [
        'post_type' => 'Jobs',
        'include' => $id,
   ];

     $post = get_post($id);

     $data = [];

     $data['jobTitle'] = $post->post_title;
     $data['jobDescription'] = $post->post_content;
     $data['slug'] = $post->post_name;
     $data['jobType'] = get_field('job_type', $post->ID);
     $data['company'] = get_field('company_name', $post->ID);
     $data['companyId'] = get_field('company_id', $post->ID);
     $data['applied'] = get_field('applied_jobseekers', $post->ID);
     $data['sector'] = wp_get_post_terms($post->ID, 'sectors', array('fields' => 'names'));
     $data['skills'] = wp_get_post_terms($post->ID, 'skills', array('fields' => 'names'));
     $data['date'] = get_the_date('j F Y', $post->ID); 
     $data['remote'] = get_field('is_remote', $post->ID);
     $data['package_id'] = get_field('package_id', $post->ID);
    


     return $data;
     
 }




add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/id', [
		'methods' => 'POST',
		'callback' => 'rs_get_job_by_id',
	]);
    
});