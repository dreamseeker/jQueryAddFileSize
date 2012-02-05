/*
 * jQuery AddFileSize Plugin
 *
 * Copyright (c) 2012 TORU KOKUBUN (http://d-s-b.jp/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Last Modified: 2012-02-04
 * version: 1.00
 *
 * This program checked the oparation on jQuery 1.7.1.
 * 
 */

(function($){
	$.fn.AddFileSize = function( options ) {
		var opts = $.extend( {}, $.fn.AddFileSize.defaults, options );
		
		return this.each(function(){
			/* -------------------------------------------------------------------------
		
				Properties
			
			-------------------------------------------------------------------------- */
			var $self			= this;
			
			var php_url			= opts.php_url;
			var file_url			= encodeURI( $( $self ).attr('href') );
			
			var prefix			= opts.prefix;
			var suffix			= opts.suffix;
			
			// Extension Properties
			var ext				= opts.extension;
			var ext_enable		= ( ext['enable'] ) ? ext['enable'] : false;
			var ext_suffix		= ( ext['suffix'] ) ? ext['suffix'] : ' / ';
			
			/* -------------------------------------------------------------------------
		
				Initialize
			
			-------------------------------------------------------------------------- */
			init();
			
				/* -------------------------------------------------------------------------
		
					Function
				
				-------------------------------------------------------------------------- */

				// initialize
				function init(){
					
					$.ajax({
						
						url: php_url + "?file=" + file_url,
						cache: false,
						success: function( data ){
							if( !data.match( /file not exist|error/ ) ) {
								
								var data_str = '';
								data_str += prefix;
								if( ext_enable ) {
									data_str += addExtension(file_url);
								}
								data_str += data;
								data_str += suffix;
								
								$( $self ).after( data_str );
							} else {
								console.log( data );
							}
						}
						
					});
					
				};
				
				// add file extension
				function addExtension(filename) {
					
					var filename_arr = filename.split(".");
					var length = filename_arr.length;
					var file_ext = filename_arr[length - 1];
					
					switch (file_ext) {
						case 'doc':
						case 'docx':
							file_ext = 'Word';
							break;
						case 'xls':
						case 'xlsx':
							file_ext = 'Excel';
							break;
						case 'ppt':
						case 'pptx':
							file_ext = 'PowerPoint';
							break;
						default:
							file_ext = file_ext.toUpperCase();
							break;
					}
					
					return file_ext + ext_suffix;
					
				}
				
		});
		
	};

	
	/* -------------------------------------------------------------------------
	
		set default options
	
	-------------------------------------------------------------------------- */
	$.fn.AddFileSize.defaults = {
		
		php_url:		'/lib/filesize.php',
		
		prefix:		' ( ',
		suffix:		' )',
		
		extension: {
			enable:	false,
			suffix:	' / '
		}
		
	};
	
})(jQuery);
