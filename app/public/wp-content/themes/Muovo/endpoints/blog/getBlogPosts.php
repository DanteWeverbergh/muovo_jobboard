<?php

/**
 * Get all blogposts
 */
function rs_blog() {
    //

    $error = new WP_Error();
     $args = [];

     if (isset($_REQUEST['per_page'])) {
        $args['posts_per_page'] = (int) $_REQUEST['per_page'];
      }

      if (isset($_REQUEST['page'])) {
        $args['paged'] = (int) $_REQUEST['page'];
      }

      $args['post_type'] = 'hr-talks';

      $get_posts = new WP_Query();
      $posts = $get_posts->query($args);

      $data = [];
      $i = 0;

      foreach($posts as $post) {

         $data[$i]['id'] = $post->ID;
         $data[$i]['title'] = $post->post_title;
         $data[$i]['author'] = $post->post_author;
         $data[$i]['content'] = $post->post_content;
         $data[$i]['excerpt'] = $post->post_excerpt;
         $data[$i]['video'] = get_field('videourl', $post->ID);
         $data[$i]['date'] = get_the_date('j F Y', $post->ID); 
         $data[$i]['img']= get_the_post_thumbnail_url($post->ID);
         $data[$i]['categories'] = wp_get_post_terms($post->ID, 'categories', array('fields' => 'names') );
         $data[$i]['tags'] = wp_get_post_terms($post->ID, 'tags', array('fields' => 'names') );
         $i++;
        
      }


    return $data;
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'blog', [
		'methods' => 'GET',
		'callback' => 'rs_blog',
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
