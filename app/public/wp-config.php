<?php



define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );



$table_prefix = 'wp_';


define( 'WP_DEBUG', false );


define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'o{%<H1$za/.6L&|j3&k2Q~4b!a+$Q%FF15A@}{PE5jn$,uaTs:@ViOT&#+x-=:@D' );
	
//jwt auth token
define('JWT_AUTH_SECRET_KEY', 'o{%<H1$za/.6L&|j3&k2Q~4b!a+$Q%FF15A@}{PE5jn$,uaTs:@ViOT&#+x-=:@D');

define('JWT_AUTH_CORS_ENABLE', true);


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}




/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
