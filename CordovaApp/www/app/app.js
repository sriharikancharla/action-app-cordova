(function(){
 
    ThisApp = null;
    var tmpHasLaunched = false;
  
    if( typeof(window.cordova) == 'undefined'){
      window.isWeb = true;
      setup();
    }
    //-- ToDo: Client detection ***  
    // window.setTimeout( function(){
    //   if( !tmpHasLaunched) {
    //     tmpHasLaunched = true;
    //     (app.onDeviceReady.bind(app))();
    //   }
    // },500)
    //---- ACTUAL CODE ==    
    ActionAppCore = ActionAppCore || window.ActionAppCore;
    
    var app = {
      initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      },
      onBackButton: function(){
        ThisApp.hideSidebar();        
        ThisApp.closeCommonDialog();
        if( ThisApp.activePopup ){
          ThisApp.clearActivePopup();          
        }
        return false;
      },
      onVolUpButton: function(){
        //alert('onVolUpButton');
        return false;
      },
      onVolDownButton: function(){
        //alert('onVolDownButton');
        return false;
      },
      onMenuButton: function(){
        ThisApp.showSidebar();
        return false;
      },
      onDeviceReady: function() {
        tmpHasLaunched = true;
        setup();
        this.receivedEvent('deviceready');
        
        document.addEventListener('backbutton', this.onBackButton.bind(this), false);
        // document.addEventListener('volumedownbutton', this.onVolDownButton.bind(this), false);
        // document.addEventListener('volumeupbutton', this.onVolUpButton.bind(this), false);            
        if( typeof(navigator) != 'undefined' && typeof(navigator.app) != 'undefined' && typeof(navigator.app.overrideButton) === 'function'){
          navigator.app.overrideButton("menubutton", true);  // <-- Add this line
        }
        //
        document.addEventListener("menubutton", this.onMenuButton, false);
      },
      receivedEvent: function(id) {
  
      }
    };
    
    app.initialize();
  
    var btnTest,
    testOutput;
  
    var tmpAt = 0;
    function setup(){
        try {
            var siteMod = ActionAppCore.module('site');
            ThisApp = new siteMod.CoreApp();
  
            var tmpTplSpecs = {
              baseURL: 'app/app-tpl',
              templateMap:{
                  "about-this-app.html": "app:about-this-app",
                  "page-loading-spinner.html": "app:page-loading-spinner"
              }
            };
  
  
            /* ****************************************
            //------------ This App Config
            //-- "display" Option:  The Links on the top hide when in mobile, the display options control where the links show
            //     primary = show on top but not in sidebar, then add to sidebar for small screens only
            //     both = show on top and sidebar, then add to sidebar for small screens only
            //     primary = show on top but not in sidebar, then add to sidebar for small screens only
            //     [blank] = blank or missing value will make it show on the left only
            */
            var appModule = ActionAppCore.module('app');
           
            var tmpPluginComponents = ['SvgControls','WebControls'];
            var tmpAppCompsToInit = ['HomePage', 'DashboardPage', 'WorkspacesPage', 'LogsPage','DebugPage']; 
            var tmpAppComponents = [ ];
  
            ThisApp.useModuleComponents('plugin', tmpPluginComponents)
    
            ThisApp.initModuleComponents(ThisApp, 'app', tmpAppCompsToInit)
            ThisApp.useModuleComponents('app', tmpAppComponents)
    
            ThisApp.siteLayout = null;
    
            ThisApp.refreshLayouts = function (theTargetEl) {
              ThisApp.siteLayout.resizeAll();
            }
            ThisApp.resizeLayouts = function (name, $pane, paneState) {
              try {
                var tmpH = $pane.get(0).clientHeight - $pane.get(0).offsetTop - 1;
                ThisApp.getByAttr$({ appuse: "cards", group: "app:pages", item: '' }).css("height", tmpH + "px");;
              } catch (ex) {
    
              }
            }
    
            ThisApp.siteLayout = $('body').layout({
              center__paneSelector: ".site-layout-center"
              , north__paneSelector: ".site-layout-north"
              , north__spacing_open: 0
              , north__spacing_closed: 0
              , north__resizable: false
              , spacing_open: 6 // ALL panes
              , spacing_closed: 8 // ALL panes
              , onready: ThisApp.resizeLayouts
              , center__onresize: ThisApp.resizeLayouts
            });
  
            ThisApp.init();
            ThisApp._svg = ThisApp.getComponent("plugin:SvgControls");

            ThisApp.initTemplates(tmpTplSpecs);
            ThisApp.getByAttr$({ appuse: "app-loader" }).remove();
  

            ThisApp.aboutThisApp = function(){
              ThisApp.showCommonDialog({ header: "About this application", content: {data:'', template:'app:about-this-app'} });
            }

            ThisApp.showContextMenu = function(theSelector, theOptions){
              $.contextMenu({
                selector: theSelector, 
                build: function($trigger, e) {
                    // this callback is executed every time the menu is to be shown
                    // its results are destroyed every time the menu is hidden
                    // e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
                    return {
                        callback: function(key, options) {
                            var m = "clicked: " + key;
                            window.console && console.log(m) || alert(m); 
                        },
                        items: {
                            "edit": {name: "Edit", icon: "edit"},
                            "cut": {name: "Cut", icon: "cut"},
                            "copy": {name: "Copy", icon: "copy"},
                            "paste": {name: "Paste", icon: "paste"},
                            "delete": {name: "Delete", icon: "delete"},
                            "sep1": "---------",
                            "quit": {name: "Quit", icon: function($element, key, item){ return 'context-menu-icon context-menu-icon-quit'; }}
                        }
                    };
                }
            });
              
            }
            //--- Turn off messages by default
            ThisApp.setMessagesOptions({show:false})
    
        } catch(ex){
             console.error("Unexpected Error " + ex);
        }
  
        
  }
    function runTest(){
        alert('runTest');
    }
  
    })();
  
  