require.config({
    paths: {
    	smart_status_cell_renderer: '../app/smartmon/SMARTStatusCellRenderer'
    }
});

require(['jquery','underscore','splunkjs/mvc', 'smart_status_cell_renderer', 'splunkjs/mvc/searchmanager', 'splunkjs/mvc/simplexml/ready!'],
	function($, _, mvc, SMARTStatusCellRenderer, SearchManager){
	
		// Setup the cell renderer
	    var statusTable = mvc.Components.get('disks_table');
	
	    statusTable.getVisualization(function(tableView){
	        tableView.table.addCellRenderer(new SMARTStatusCellRenderer());
	        tableView.table.render();
	    });
	    
	}
);