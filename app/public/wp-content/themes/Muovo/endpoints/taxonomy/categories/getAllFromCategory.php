<?php


function rs_get_post_from_category(WP_REST_Request $request) {



    $response = array();
    $parameters = $request->get_json_params();

    $category = $parameters['category'];

       //get values from url
  if (isset($_REQUEST['per_page'])) {
        $per_page = (int) $_REQUEST['per_page'];       
    }
 
   if (isset($_REQUEST['page'])) {
         $page = (int) $_REQUEST['page'];
     }

     $tax_query = array(
         array(
             'taxonomy' => 'categories',
             'field' => 'slug',
             'terms' => $category
         )
    );

    $args = [
        'post_per_page' => $per_page,
        'post_type' => 'hr-talks',
        'paged' => $page,
        'post_status' => 'publish',
        'tax_query' => $tax_query,

    ];

    $blog_query = NEW WP_Query($args);
    $posts = $blog_query->query($args);

    
    if ($blog_query->have_posts()){

        $data = [];
        $i = 0;

        foreach($posts as $post){
            $data[$i]['id'] = $post->ID;
            $data[$i]['title'] = $post->post_title;
            $data[$i]['content'] = $post->post_content;
            $data[$i]['excerpt'] = $post->post_excerpt;
            $data[$i]['date'] = get_the_date('j F Y', $post->ID);
             $data[$i]['img']= get_the_post_thumbnail_url($post->ID);
            $data[$i]['categories'] = wp_get_post_terms($post->ID, 'categories', array('fields' => 'names') );
            $i++;
        }
    }
    
    return $data;
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'blog/category', [
		'methods' => 'POST',
		'callback' => 'rs_get_post_from_category',
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