<?php




function rs_update_company(WP_REST_Request $request) {
    //
    $response = array();
    $parameters = $request->get_json_params();

    $type = $parameters['type'];

   

    $slug = $parameters['slug'];

  
   $company =  get_page_by_path( $slug, OBJECT,'company' );

    $company_id = $company->ID;

    $description = $parameters['description'];

    //adress
    $adressline_1 = $parameters['adressline_1'];
    $adressline_2 = $parameters['adressline_2'];
    $postalcode = $parameters['postcode'];
    $town = $parameters['town'];
    $country = $parameters['country'];
    $latitude = $parameters['latitude'];
    $longitude = $parameters['longitude'];

    //socials
    $facebook = $parameters['facebook'];
    $instagram = $parameters['instagram'];
    $twitter = $parameters['twitter'];
    $youtube = $parameters['youtube'];
    $linkedin = $parameters['linkedin'];

    //contact
    $phone = $parameters['phone'];
    $email = $parameters['email'];
    $website = $parameters['website'];

    $error = new WP_Error();

    if (empty($type)) {
        $error->add(400, __("Type is required"), array('status' => 400));
        return $error;
    }

    if (empty($company_id)) {
        $error->add(400, __("Company id is required"), array('status' => 400));
        return $error;
    }

    if($type === 'description'){
        
        //update content
        $args = [
            'post_type' => 'company',
            'post_content' => $description,
            'ID' => $company_id,
            'post_status' => 'publish'
        ];

        wp_update_post($args);

    } else if ($type === 'address'){

        update_field('adressline_1', $adressline_1, $company_id);
        update_field('adressline_2', $adressline_2, $company_id);
        update_field('town', $town, $company_id);
        update_field('postcode', $postalcode, $company_id);
        update_field('country', $country, $company_id);
        update_field('latitude', $latitude, $company_id);
        update_field('longitude', $longitude, $company_id);



    }else if ($type === 'socials'){

       

        update_field('facebook', $facebook, $company_id);
        update_field('instagram', $instagram, $company_id);
        update_field('twitter', $twitter, $company_id);
        update_field('youtube', $youtube, $company_id);
        update_field('linkedin', $linkedin, $company_id);



    }else if ($type === 'contact') {
        update_field('phone', $phone, $company_id);
        update_field('email', $email, $company_id);
        update_field('website', $website, $company_id);

    }

    

    $response['code'] = 200;
    $response['message'] = __('Company updated succesfully!' );
   

    return new WP_REST_Response($response, 123);
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'company/update', [
		'methods' => 'POST',
		'callback' => 'rs_update_company',
        'permission_callback' => function() {
            //
           $user = wp_get_current_user();
           $roles = $user->roles;

           //only allow companyADmins to user this ruote
           if(in_array( 'companyadmin', $roles) || in_array( 'companyUser', $roles)  ){
               return true;
           } else {
               return false;
           }
        }
        
	]);
    
});