<?php


/**
 * Get jobs on search
 */


 function rs_search_jobs(WP_REST_Request $request) {
    $response = array();
    $parameters = $request->get_json_params();

    $tax_query = array();
    $meta_query = "";
    $search_query = "";
    $sector_query = [];
    $job_types = [];

    //get searchfilters
    $searchTerm = sanitize_text_field($parameters['searchTerm']);
    $sectors = rest_sanitize_array($parameters['sectors']);
    $full_time = rest_sanitize_boolean($parameters['Full-time']);
    $part_time = rest_sanitize_boolean($parameters['Part-time']);
    $casual = rest_sanitize_boolean($parameters['Casual']);
    $remote = rest_sanitize_boolean($parameters['Remote']);
    $flexible = rest_sanitize_boolean($parameters['Flexible']);
    $company = sanitize_text_field($parameters['company']);

    //get values from url
    if (isset($_REQUEST['per_page'])) {
       $per_page = (int) $_REQUEST['per_page'];
      }

      if (isset($_REQUEST['page'])) {
        $page = (int) $_REQUEST['page'];
      }
   
    //args
    if($searchTerm != 'undefined' && $searchTerm != ""){
        $search_query  = $searchTerm;
    }
    if($sectors != 'undefined' && !empty($sectors && $sectors != "")){
        $tax_query = array (
            array(
                'taxonomy' => 'sectors',
                'field' => 'slug',
                'terms' => $sectors,
            ));
    }
    if($full_time){
        array_push($job_types, 'Full time');
    }
    if($part_time){
        array_push($job_types, 'Part time');
    }
    if($casual){
        array_push($job_types, 'Casual');
    }

      

    $args= [
        'posts_per_page' => $per_page,
        'post_type' => 'jobs',
        'paged' => $page,
        'post_status' => 'publish', 
        'tax_query' => $tax_query,
        's' => $searchTerm,
        'meta_key' => 'company_name',
        'meta_value' => $company,
    ];

    $job_query = new WP_Query($args);

    $jobs = $job_query->query($args);

    if(   $job_query->have_posts()){
        //return 'posts found';

        $data = [];
        $i = 0;

        foreach($jobs as $job){
            $data[$i]['id'] = $job->ID;
            $data[$i]['title'] = $job->post_title;
            $data[$i]['jobDescription'] = $job->post_content;
            $data[$i]['company'] = get_field('company_name', $job->ID);
            $data[$i]['companyId'] = get_field('company_id', $job->ID);
            $data[$i]['active'] = get_field('is_active', $job->ID);
            $data[$i]['date'] = get_the_date('j F Y', $job->ID);  
            $data[$i]['sector'] = wp_get_post_terms($job->ID, 'sectors', array('fields' => 'names') );
            $data[$i]['jobType'] = get_field('job_type', $job->ID);
            $data[$i]['package_id'] = get_field('package_id', $job->ID);
            $i++;
        }

        return $data;
    }else {
        'no posts found';
    }


 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/search', [
		'methods' => 'POST',
		'callback' => 'rs_search_jobs',
        'args' => [
            'page' => [
                'description' => 'Current page',
                'type' => "integer",
              ],
            'per_page' => [
                'description' => 'Items per page',
                'type' => 'integer'
            ]
        ]
        
	]);
    
});