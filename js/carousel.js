/* Carousel Plugin
 * Author: Ajay Suresh
 */

 (function ( $ ) {
	
	$.fn.carousel = function(options){
	
	
		/********* PRELIMINARY SETTINGS **************************************/
		
		var this_set = $(this); //store 'this' to avoid multiple DOM traversals
		this_set.css({'position': 'relative', 'overflow' : 'hidden'});
		var all_images = this_set.find('img');
		
		//give the beginning and ending positions unique attributes
		all_images.first().attr('pos', 'first');
		all_images.last().attr('pos', 'last');
		//set the active image 
		all_images.first().attr('active', 'true')
	
		// If the user passes any functions to override the default settings
        var settings = $.extend({
            // These are the defaults.
			delay 	   			 : '3',
			infinitescroll		 : 'false',
			autoscroll 		     : 'true',
			autoscroll_direction : 'right',
			buttons				 : 'false',
			links				 : 'true',
			keyboard_nav		 : 'true'
        }, options );
		
		var greatest_height = 0;  //determine the height of the tallest image
		all_images.each(function(i){ 
			var this_image = $(this);			
			this_image.css({'float': 'left'});
			greatest_height = parseInt(this_image.css('height')) >  greatest_height? parseInt(this_image.css('height')): greatest_height
		});
		
		//set the height of the carousel 
		this_set.css('height', greatest_height);
		
		//initiate the autoscroll, if appropriate
		if(settings.autoscroll == 'true'){
			autoscroll(settings.autoscroll_direction);
		}  
		
		//buttons
		if(settings.buttons == 'true'){
				var left_button = $("<input type='button' value='left' id='left_button' class='button'>");
				var right_button = $("<input type='button' value='right' id='right_button' class='button'>");
				var buttons_div = $('<div class="buttons_div">').append(left_button, right_button);
				this_set.after(buttons_div);
				//this_set.after(left_button, right_button);
				$('#left_button').click(function(){
					moveTo('left');	
				}); 
				$('#right_button').click(function(){
					moveTo('right');	
				}); 
			}
			
		//links	
		if(settings.links == 'true'){
				var left_link= $("<a href='#' id='left_link' class='links'>Left</a>");
				var right_link = $("<a href='#' id='right_link' class='links'>Right</a>");
				var links_div =  $('<div class="links_div">').append(left_link, right_link);
				this_set.after(links_div);
				
				//this_set.after(left_button, right_button);
				$('#left_link').click(function(){
					moveTo('left');	
				}); 
				$('#right_link').click(function(){
					moveTo('right');	
				}); 
			}
			
			//keyboard navigation
			if(settings.keyboard_nav == 'true'){
				$(document).keydown(function(e){
					if (e.keyCode == 37) { 
					   moveTo('left');
					   return false;
					}
					
					if (e.keyCode == 39) { 
					   moveTo('right');
					   return false;
					}
				});
				
			}
		
		
		/********* END OF PRELIMINARY SETTINGS **************************************/
		
		
		
		/********* FUNCTIONS / ACTIONS **************************************/
		
		//scroll to the given 'direction' automatically
		function autoscroll(direction){
			var scroll_interval = setInterval(function(){
				eval("moveTo('"+direction+"')");
			}, parseInt(settings.delay) * 1000);
			
			//handle if the user hovers over the div
		}
		
		//'slide' the image in the appopriate direction
		function moveTo(direction){
			var current_image = this_set.find('img[active=true]') //obtain current image
			handleMovement(current_image, direction);
		}
		
	    //take the needed action if an image is at the end of list; otherwise, perform a normal slide
		//if the user is on the first image and scrolling left, move the last image in the series before this first image (if 'infinite scroll is on')
		//if the user is on the last image and scrolling right, move the first image in the series after the last image (if 'infinite scroll is on')
		function handleMovement(image, dir){
			image.animate({'opacity': 0});
		
			var image_to_remove = '';
			if(dir == 'left' && (image.attr('pos') == 'first') && settings.infinitescroll == 'true'){
				
				var last_image = this_set.find('img').last();
				image.before(last_image.removeAttr('pos').clone());
				//adding an offset so that adding a new element does not disturb the current image being displayed
				this_set.css('margin-left', -(parseInt(last_image.css('width'))));
				image_to_remove = last_image;
				
				//add back in the attributes for 'first' and 'last'
				image.removeAttr('pos');
				this_set.find('img').first().attr('pos', 'first'); 
				var second_to_last_element = this_set.find('img').index() - 2;
				this_set.find('img').eq(second_to_last_element).attr('pos', 'last'); 
			} else if(dir == 'right' && (image.attr('pos') == 'last') && settings.infinitescroll == 'true'){
				var first_image = this_set.find('img').first();				
				image.after(first_image.removeAttr('pos').clone());
				image_to_remove = first_image;
				
				//add back in the attributes for 'first' and 'last'
				image.removeAttr('pos');
				this_set.find('img').last().attr('pos', 'last');
				this_set.find('img').eq('1').attr('pos', 'first'); 
			}
			
			var current_image_width = parseInt(image.css('width'));
			
			//perform the scroll action
			if(dir == 'right'){
				var curr_active = this_set.find('img[active=true]');
				var curr_active_index = curr_active.index();
				if(dir == 'right' && (image.attr('pos') == 'last') && settings.infinitescroll == 'false'){
						this_set.find('img:eq(0)').attr('active', 'true'); // change the 'active' attribute to the proper image
				}
				else {
					this_set.find('img:eq('+(curr_active_index+1)+')').attr('active', 'true'); // change the 'active' attribute to the proper image
				}				
				curr_active.removeAttr('active');
				
				//find all elements before this 'active' one that will be scrolled to
				var new_index = this_set.find('img[active="true"]').index();
				var total_offset = 0;
				this_set.find('img').each(function(i){
					if (i < new_index){
						total_offset = total_offset + parseInt($(this).css('width'));
						}
						else {return false;}
				});
				
				this_set.delay(100).animate({marginLeft: -(total_offset)}, function(){
					
					if(image_to_remove != ''){
						var move_back_to = -(total_offset) + (parseInt(image_to_remove.css('width'))) ;
						this_set.css('margin-left', move_back_to);
						image_to_remove.remove();
					}
				});
				
				
			} else{
				var curr_active = this_set.find('img[active=true]');
				var curr_active_index = curr_active.index();
				this_set.find('img:eq('+(curr_active_index-1)+')').attr('active', 'true'); // change the 'active' attribute to the proper image
				curr_active.removeAttr('active');
				
				//find all elements before this 'active' one that will be scrolled to
				var new_index = this_set.find('img[active="true"]').index();
				var total_offset = 0;
				this_set.find('img').each(function(i){
					if (i < new_index){
						total_offset = total_offset - parseInt($(this).css('width'));
						}
						else {return false;}
				});
				
				this_set.animate({marginLeft: total_offset}, function(){
					if(image_to_remove != ''){
						//var move_back_to = -(total_offset) - (parseInt(image_to_remove.css('width'))) ;
						//this_set.css('margin-left', move_back_to);
						image_to_remove.remove();
					}
				});
			}
			//make all the images full opacity for next cycle
				this_set.find('img').css('opacity', 1);
	} // end of handleMovement()

		/********* END OF FUNCTIONS / ACTIONS **************************************/	
		
	} /********* END OF 'carousel' function **************************************/	
}( jQuery ));