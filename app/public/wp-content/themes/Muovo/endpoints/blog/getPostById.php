<?php


/**
 * Get post on id
 */


 function rs_post_id(){
     //

    // return $_REQUEST;

     $args = [];

     if (isset($_REQUEST['id'])) {
        $id = (int) $_REQUEST['id'];
      }
      $args['post_type'] = 'hr-talks';

      $post = get_post($id);


      $data = [];
      $data['id'] = $post->ID;
      $data['title'] = $post->post_title;
      $data['author'] = $post->post_author;
      $data['content'] = $post->post_content;
      $data['excerpt'] = $post->post_excerpt;
      $data['video'] = get_field('videourl', $post->ID);
      $data['date'] = get_the_date('j F Y', $post->ID); 
      $data['img']= get_the_post_thumbnail_url($post->ID);
      $data['categories'] = wp_get_post_terms($post->ID, 'categories', array('fields' => 'names') );
      $data['tags'] = wp_get_post_terms($post->ID, 'tags', array('fields' => 'names') );

      return $data;
    
 }



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'blog/id', [
		'methods' => 'GET',
		'callback' => 'rs_post_id',
        'args' => [
            'id' => [
                'description' => 'post id',
                'type' => 'integer'
            ]
        ]
        
	]);
    
});