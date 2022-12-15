<?php


/**
 * Get company by id
 */



 function rs_get_company_by_id(){


    if (isset($_REQUEST['id'])) {
      $id =  $_REQUEST['id'];
     }

     $args = [
        'post_type' => 'company',
        'include' => $id,
   ];


   $post = get_post($id);

   $data = [];

   $data['companyName'] = $post->post_title;
   $data['companyDescription'] = $post->post_content;
   $data['slug'] = $post-> post_name;
   //sociall
   $data['website'] = get_field('website', $post->ID);
   $data['facebook'] = get_field('facebook', $post->ID);
   $data['twitter'] = get_field('twitter', $post->ID);
   $data['instagram'] = get_field('instagram', $post->ID);
   $data['linkedin'] = get_field('linkedin', $post->ID);
   $data['youtube'] = get_field('youtube', $post->ID);

     

    return $data;
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'company/id', [
		'methods' => 'GET',
		'callback' => 'rs_get_company_by_id',
        'args' => [
            'id' => [
                'description' => 'company Id',
                'type' => 'number'
            ]
        ]
        
	]);
    
});