<?php


/**
 * Register company admin role
 */

add_role(
    'companyAdmin', //  System name of the role.
    __( 'Company Admin'  ), // Display name of the role.
    array(
        'read'  => true,
        'delete_posts'  => true,
        'delete_published_posts' => true,
        'edit_posts'   => true,
        'publish_posts' => true,
        'upload_files'  => true,
        'edit_pages'  => true,
        'edit_published_pages'  =>  true,
        'publish_pages'  => true,
        'delete_published_pages' => false, // This user will NOT be able to  delete published pages.
    )
);