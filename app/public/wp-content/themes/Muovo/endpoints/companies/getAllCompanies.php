<?php

/**
 * Get all companies
 */


 function rs_companies() {



	if (isset($_REQUEST['per_page'])) {
       $per_page = (int) $_REQUEST['per_page'];
      }

      if (isset($_REQUEST['page'])) {
        $page = (int) $_REQUEST['page'];
      }


    $args = [
		'numberposts' => 999,
		'post_type' => 'company',
		'paged' => $page,
		'posts_per_page' => $per_page,
	];


    $posts = get_posts($args);

	$data = [];
	$i = 0;

	foreach($posts as $post) {
		$data[$i]['id'] = $post->ID;
		$data[$i]['slug'] = $post->post_name;
		$data[$i]['title'] = $post->post_title;
		$data[$i]['content'] = $post->post_content;
		$data[$i]['sectors'] = wp_get_post_terms($post->ID, 'sectors', array('fields' => 'names'));
		$data[$i]['vacancies'] = get_field('vacancies', $post->ID );
		
		$i++;
	}
	return $data;
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'companies', [
		'methods' => 'GET',
		'callback' => 'rs_companies',
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