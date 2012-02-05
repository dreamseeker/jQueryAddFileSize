<?php
/*
 * FileSize Cheker for jQuery AddFileSize Plugin
 *
 * Copyright (c) 2012 TORU KOKUBUN (http://d-s-b.jp/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * SPECIAL THANKS! TAKEHARU MISAKA (http://www.toricoco.com/)
 *
 * Last Modified: 2012-02-04
 * version: 1.00 
 * 
 */

	/* ---------------------------------------------------------
	
		FileSize Checker
	
	------------------------------------------------------------ */
	// set Properties
	$domain = $_SERVER["SERVER_NAME"];
	$url_pattern = escape_domain();
	$root_dir = $_SERVER['DOCUMENT_ROOT'];
	$file = urldecode( $_GET['file'] );
	
	// output
	header("Content-type: text/plain");
	echo check_filesize();
	exit();
	
		/* ---------------------------------------------------------
		
			Function
		
		------------------------------------------------------------ */
		// check File Size
		function check_filesize() {
			
			global $url_pattern, $root_dir, $file;
			
			if( $file ) {
				$file_path = $root_dir . preg_replace( $url_pattern, '', $file );
				$path_parts = pathinfo( $file_path );
				
				if( file_exists( $file_path ) && $path_parts['extension'] ) {
					return convert_units( filesize( $file_path ) );
				} else {
					return 'file not exist : ' . $file;
				}
				
			} else {
				return 'error : Require File URL.';
			}
			
		}
		
		// escape DOMAIN Strings
		function escape_domain() {
			
			global $domain;
			
			$patterns = array('/\./', '/\-/');
			$replacements = array('\.', '\-');
			
			return '/http:\/\/' . preg_replace( $patterns, $replacements, $domain ) . '/';
			
		}
		
		// convert units
		function convert_units( $bytes ) {
			
			if( $bytes < 1024 ) {
				return $bytes .'bytes';
			} elseif ( $bytes < 1048576 ) {
				return round( $bytes / 1024, 1 ) .'KB';
			} elseif ( $bytes < 1073741824 ) {
				return round( $bytes / 1048576, 2 ) . 'MB';
			} elseif ( $bytes < 1099511627776 ) {
				return round( $bytes / 1073741824, 2 ) . 'GB';
			}
			
		}
?>