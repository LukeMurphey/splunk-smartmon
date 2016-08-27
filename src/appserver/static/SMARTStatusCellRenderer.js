define(function(require, exports, module) {
	
    // Load dependencies
    var _ = require('underscore');
    var mvc = require('splunkjs/mvc');
    var $ = require('jquery');
    
    var BaseCellRenderer = require('views/shared/results_table/renderers/BaseCellRenderer');
    
    var SMARTStatusCellRenderer = BaseCellRenderer.extend({
    	 canRender: function(cell) {
    		 return ($.inArray(cell.field, ["Health_Assessment"]) >= 0);
		 },
		 
		 render: function($td, cell) {
			 
			 // Add the class so that the CSS can style the content
			 $td.addClass(cell.field);
			 
			 var icon = "";
			 
			 // Handle the Health_Assessment field
			 if( cell.field == "Health_Assessment" ){
				 
				 var int_value = parseInt(cell.value, 10);
				 
				 if( cell.value == "PASSED" ){
					 $td.addClass("pass");
					 icon = 'check';
				 }
				 else{
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