<?php




function rs_get_number_of_posts() {
    //

    if (isset($_REQUEST['type'])) {
        $type = (string) $_REQUEST['type'];
      }


      $posts = wp_count_posts($type);

      $posts = $posts->publish;



      return $posts;
}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/number', [
		'methods' => 'GET',
		'callback' => 'rs_get_number_of_posts',
        'args' => [
            
            'post_type' => [
                'description' => 'Post type',
                'type' => 'string'
            ]
        ]
	]);
    
});