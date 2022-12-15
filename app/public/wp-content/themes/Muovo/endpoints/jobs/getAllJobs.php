<?php



/**
 * Get all jobs
 */



 function rs_get_all_jobs() {
     //
     //error
     $error = new WP_Error();
     $args = [];

     if (isset($_REQUEST['per_page'])) {
        $args['posts_per_page'] = (int) $_REQUEST['per_page'];
      }

      if (isset($_REQUEST['page'])) {
        $args['paged'] = (int) $_REQUEST['page'];
      }
      
    
    $args['post_type'] = 'jobs';
 

    $get_posts = new WP_Query;
    $posts= $get_posts->query( $args );

    $data = [];
	$i = 0;


    foreach($posts as $post) {
            $data[$i]['id'] = $post->ID;
            $data[$i]['slug'] = $post-> post_name;
            $data[$i]['title'] = $post->post_title;
            $data[$i]['jobDescription'] = $post->post_content;
            $data[$i]['company'] = get_field('company_name', $post->ID);
            $data[$i]['companyId'] = get_field('company_id', $post->ID);
            $data[$i]['active'] = get_field('is_active', $post->ID);
            $data[$i]['date'] = get_the_date('j F Y', $post->ID);  
            $data[$i]['active_until'] = get_field('active_until', $post->ID);
            $data[$i]['sector'] = wp_get_post_terms($post->ID, 'sectors', array('fields' => 'names') );
            $data[$i]['jobType'] = get_field('job_type', $post->ID);
            $data[$i]['package_id'] = get_field('package_id', $post->ID);

            $i++;        
        }

     return $data;
 }

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs', [
		'methods' => 'GET',
		'callback' => 'rs_get_all_jobs',
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