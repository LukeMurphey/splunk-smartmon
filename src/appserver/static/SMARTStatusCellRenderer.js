define(function(require, exports, module) {
	
    // Load dependencies
    var _ = require('underscore');
    var mvc = require('splunkjs/mvc');
    var $ = require('jquery');
    
    var BaseCellRenderer = require('views/shared/results_table/renderers/BaseCellRenderer');
    
    var SMARTStatusCellRenderer = BaseCellRenderer.extend({
    	 canRender: function(cell) {
    		 return ($.inArray(cell.field, ["Health_Assessment", "Warnings"]) >= 0);
		 },
		 
		 render: function($td, cell) {
			 
			 // Add the class so that the CSS can style the content
			 $td.addClass(cell.field);
			 
			 var icon = "";
			 
			 // Handle the Health_Assessment field
			 if( cell.field == "Health_Assessment" ){
				 
				 if( cell.value == "PASSED" ){
					 $td.addClass("pass");
					 icon = 'check';
				 }
				 else{
					 $td.addClass("fail");
					 icon = 'alert';
				 }
				 
			 }
			 
			// Handle the Warnings field
			 else if( cell.field == "Warnings" ){
					 
					 if( cell.value != null && cell.value.length > 0 ){
						 $td.addClass("fail");
						 icon = 'alert';
					 }
					 
				 }
			 
			 // Render the cell
			 if( icon != null ){
				 $td.html(_.template('<i class="icon-<%- icon %>"> </i><%- value %>', {
		            	value: cell.value,
		                icon: icon
		         }));
			 }
			 else{
				 $td.html( cell.value );
			 }
		 }
	});
    
    return SMARTStatusCellRenderer;
});