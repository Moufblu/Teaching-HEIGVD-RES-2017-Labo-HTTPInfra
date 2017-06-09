<?php 
	$static = $getenv('STATIC_APP');
	$dynamic = $getenv('DYAMIC_APP');
 ?>

<VirtualHost *:80>
	ServerName demo.res.ch

	ProxyPass '/api/profiles/' 'http://<?php print "$dynamic" ?>/'
	ProxyPassReverse '/api/profiles/' 'http://<?php print "$dynamic" ?>/'

	ProxyPass '/' 'http://<?php print "$static" ?>/'
	ProxyPassReverse '/' 'http://<?php print "$static" ?>/'
</VirtualHost>