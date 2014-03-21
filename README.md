simpleCarousel.js
=================

A simple, normal or infinite carousel. 

##Usage

### Calling Plugin
(All images should be inside of an outer 'div' element)
```
$('#carousel_div').carousel();
```

### Options
<table>
<tr style='background-color:#f8f8f8;'>
        <td><b>Option</b></td>
        <td>Feature Description</td>
        <td>Valid Input</td>
    </tr>
    <tr>
        <td><b>delay</b></td>
        <td>the number of seconds between each slide transition in 'autoscroll' model </td>
        <td>pass an integer value as a string ['5']</td>
    </tr>
    <tr>
    	<td><b>infinitescroll</b></td>
    	<td>enable the infinite scroll feature that will allow the user to scroll continuously in 1 direction</td>
    	<td>pass 'true' or 'false'</td>
    </tr>
    <tr>
    	<td><b>autoscroll</b></td>
    	<td>(enable the carousel to scroll automatically</td>
    	<td> pass 'true' or 'false'</td>
    </tr>
    <tr>
    	<td><b>autoscroll_direction</b></td>
    	<td>set the 'autoscroll' direction</td>
    	<td>pass 'left' or 'right'</td>
    </tr>
    <tr>
    	<td><b>buttons</b></td>
    	<td>add buttons for navigation </td>
    	<td>pass 'true' or 'false'</td>
    </tr>
    <tr>
    	<td><b>links</b></td>
    	<td>add links for navigation </td>
    	<td>pass 'true' or 'false'</td>
    </tr>
     <tr>
    	<td><b>keyboard_nav</b></td>
    	<td>enable keyboard navigation for the left and right arrow marks </td>
    	<td>pass 'true' or 'false'</td>
    </tr>
</table>
