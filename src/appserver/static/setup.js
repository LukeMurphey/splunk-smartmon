require.config({
    paths: {
        setup_view: "../app/smartmon/SetupView"
    }
});

require([
         "jquery",
         "setup_view",
         "splunkjs/mvc/simplexml/ready!"
     ], function(
         $,
         SetupView
     )
     {
         var setupView = new SetupView({
        	 el: $('#setup-view')
         });
         
         setupView.renderConfigNotRequired('disk_monitoring');
         setupView.setConfigured();

         /*
         setTimeout(function(){
            setupView.setConfigured();
         }, 3000);
         */
         
     }
);