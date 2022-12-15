<?php

/**
 * Get company by slug
 */

 function rs_get_company_by_slug(){
     //
    

     $args = [
         'post_type' => 'company',
         'name' => $_REQUEST['company'],
         'post_status' => 'publish', 
     ];

     $company_query = new WP_Query($args);

     $company = $company_query->query($args);


     $data = [];

foreach($company as $c){
  

   $data['companyName'] = $c->post_title;
   $data['companyDescription'] = $c->post_content;
   $data['slug'] = $c-> post_name;
   //sociall
   $data['website'] = get_field('website', $c->ID);
   $data['facebook'] = get_field('facebook', $c->ID);
   $data['twitter'] = get_field('twitter', $c->ID);
   $data['instagram'] = get_field('instagram', $c->ID);
   $data['linkedin'] = get_field('linkedin', $c->ID);
   $data['youtube'] = get_field('youtube', $c->ID);

   //
   $data['location'] = get_field('country', $c->ID);
   $data['email'] = get_field('email', $c->ID);
   $data['phone'] = get_field('phone', $c->ID);

   //adress
   $data['adressline_1'] = get_field('adressline_1', $c->ID);
   $data['adressline_2'] = get_field('adressline_2', $c->ID);
   $data['postcode'] = get_field('postcode', $c->ID);
   $data['town'] = get_field('town', $c->ID);
   $data['latitude'] = get_field('latitude', $c->ID);
   $data['longitude'] = get_field('longitude', $c->ID);
   

}
     return $data;

  
 }



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'company/slug', [
		'methods' => 'GET',
		'callback' => 'rs_get_company_by_slug',
        'args' => [
            'company' => [
                'description' => 'company slug',
                'type' => "string",
              ],
            
        ]
       
	]);
    
});