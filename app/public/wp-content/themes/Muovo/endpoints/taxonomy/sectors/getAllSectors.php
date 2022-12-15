<?php



/**
 * Get all sectors
 */


function rs_get_all_sectors() {
    //

  
    $args = [];

    //$args['sectors'];

    //$taxonomies = get_taxonomies($args);

    $terms = get_terms('sectors');

    $data = [];
    $i = 0;

    foreach($terms as $term) {
        //
        $data[$i]['id'] = $term->term_id;
        $data[$i]['sector'] = $term->name;

        $i++;
    }

    

    return $data;
}
 

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'taxonomy/sectors', [
		'methods' => 'GET',
		'callback' => 'rs_get_all_sectors',
        'args' => [
            'type' => [
                'description' => 'type of taxonomy',
                'type' => 'string',
            ],
        ]
	]);
    
});