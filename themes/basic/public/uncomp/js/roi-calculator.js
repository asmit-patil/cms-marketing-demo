$(document).ready(function() {

window.roical = function(){

        if($("input[name='NumberofEngineers']:checked").val() == "< 3"){
            var development_time = (0.25)*(176)*(3)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "3-4"){
            var development_time = (0.25)*(176)*(3)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "5-9"){
             var development_time = (0.25)*(176)*(5)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "10+"){
            var development_time = (0.25)*(176)*(10)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "I don't know"){
             var development_time = null
        }     
       // if($("input[name='NumberofEngineers']:checked").val() == "N/A"){
       //       var development_time = null
       //  }else{
       //       var development_time = (0.25)*(176)*($("input[name='NumberofEngineers']:checked").val())    
       //  }
        if($("input[name='NumberofEditors']:checked").val() == "< 3"){
        var cal = ((0.85)*(0.50)*(176))*(3)
        var contenteditor_time = Math.floor(cal)
        }
        if($("input[name='NumberofEditors']:checked").val() == "3-4"){
        var cal = ((0.85)*(0.50)*(176))*(3)
        var contenteditor_time = Math.floor(cal)
        }
        if($("input[name='NumberofEditors']:checked").val() == "5-9"){
        var cal = ((0.85)*(0.50)*(176))*(5)
        var contenteditor_time = Math.floor(cal)
        }
        if($("input[name='NumberofEditors']:checked").val() == "10+"){
        var cal = ((0.85)*(0.50)*(176))*(10)
        var contenteditor_time = Math.floor(cal)
        }
        if($("input[name='NumberofEditors']:checked").val() == "I don't know"){
        var contenteditor_time = null
        }
        //  if($("input[name='NumberofEditors']:checked").val() == "N/A"){
        //      var contenteditor_time = null
        // }else{
        //      var cal = ((0.85)*(0.50)*(176))*($("input[name='NumberofEditors']:checked").val())
        //      var contenteditor_time = Math.floor(cal)
        // }
        if($("input[name='TimetoPublishContent']:checked").val() == "< 1 hr"){
            var timetopublishcontent = Math.round((0.85)*(1))
        }
        if($("input[name='TimetoPublishContent']:checked").val() == "1-2 hrs"){
            var timetopublishcontent = Math.round((0.85)*(1))
        }
        if($("input[name='TimetoPublishContent']:checked").val() == "Half day"){
            var timetopublishcontent = Math.round((0.85)*(4))
        }
        if($("input[name='TimetoPublishContent']:checked").val() == "1-2 days"){
            var timetopublishcontent = Math.round((0.85)*(8))
        }
        if($("input[name='TimetoPublishContent']:checked").val() == "1 week"){
            var timetopublishcontent = Math.round((0.85)*(40))
        }
        if($("input[name='TimetoPublishContent']:checked").val() == "I don't know"){
             var timetopublishcontent = null
        }
        //  if($("input[name='TimetoPublishContent']:checked").val() == "N/A"){
        //      var timetopublishcontent = null
        // }else{
        //      var timetopublishcontent = Math.round((0.85)*($("input[name='TimetoPublishContent']:checked").val()))
        // }
    
        if($("input[name='InfraAnnualSpend']:checked").val() == "N/A"){
             var ongoing_infrastructure = null
        }else{
             if($("input[name='InfraAnnualSpend']:checked").val() == "< $9K")
                {
                var ongoing_infrastructure = (0.7*9000)
                }
            if($("input[name='InfraAnnualSpend']:checked").val() == "$10K-$99K")
                {
                var ongoing_infrastructure = (0.7*10000)
                }
            if($("input[name='InfraAnnualSpend']:checked").val() == "$100K-$499K")
                {
                var ongoing_infrastructure = (0.7*100000)
               }
            if($("input[name='InfraAnnualSpend']:checked").val() == "$500K+")
                {
                var ongoing_infrastructure = (0.7*500000)    
                } 
            
        }
        //AnnualRevenue
         if($("input[name='AnnualRevenue']:checked").val() == "< $100M"){
             var annualRevenue = 100000000;
        }
         if($("input[name='AnnualRevenue']:checked").val() == "$100M-$499M"){
             var annualRevenue = 100000000;
        }
         if($("input[name='AnnualRevenue']:checked").val() == "$500M-$999M"){
             var annualRevenue = 500000000;
        }
         if($("input[name='AnnualRevenue']:checked").val() == "$1B+"){
             var annualRevenue = 1000000000;
        }
         if($("input[name='AnnualRevenue']:checked").val() == "Private company"){
             var annualRevenue = null
        }
        //AnnualRevenue
         //unpublishedContent
         if($("input[name='unpublishedContent']:checked").val() == "< 10%"){
             var unpublishedContent = 0.1;
        }
         if($("input[name='unpublishedContent']:checked").val() == "10-29%"){
             var unpublishedContent = 0.1;
        }
         if($("input[name='unpublishedContent']:checked").val() == "30%+"){
             var unpublishedContent = 0.3;
        }        
         if($("input[name='unpublishedContent']:checked").val() == "I don't know"){
             var unpublishedContent = null
        }
        //unpublishedContent
         //RevenuePotential
        if($("input[name='RevenuePotential']:checked").val() == "< 1%"){
             var RevenuePotential = 0.01;
        }
         if($("input[name='RevenuePotential']:checked").val() == "1-2.9%"){
             var RevenuePotential = 0.01;
        }
         if($("input[name='RevenuePotential']:checked").val() == "3-4.9%"){
             var RevenuePotential = 0.03;
        }
         if($("input[name='RevenuePotential']:checked").val() == "5%+"){
             var RevenuePotential = 0.05;
        }       
        //RevenuePotential
        if(annualRevenue == null){
             var money_gain = null
        }else{
         var money_gain = Math.round(annualRevenue*(RevenuePotential+(unpublishedContent/100)))
        }
        //  if($("input[name='AnnualRevenue']:checked").val() == "Private company"){
        //      var money_gain = null
        // }else{
        //        var a = Number($("input[name='AnnualRevenue']:checked").val());
        //            b = Number($("input[name='RevenuePotential']:checked").val());
        //            c = Number($("input[name='unpublishedContent']:checked").val());
        //            money_gain = Math.round(a*(b+(c/100)))
        // }
         if($("input[name='NumberofEngineers']:checked").val() == "< 3"){
               var devresgain = (0.25)*(3)
                  // devresgain = Math.round(dev)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "3-4"){
            var devresgain = (0.25)*(3)
                  // devresgain = Math.round(dev)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "5-9"){
             var devresgain = (0.25)*(5)
                  // devresgain = Math.round(dev)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "10+"){
             var devresgain = (0.25)*(10)
                  // devresgain = Math.round(dev)
        }
        if($("input[name='NumberofEngineers']:checked").val() == "I don't know"){
             var devresgain = null
        }       
        //  if($("input[name='NumberofEngineers']:checked").val() == "N/A"){
        //      var devresgain = null
        // }else{
        //       var dev = (0.25)*($("input[name='NumberofEngineers']:checked").val())
        //           devresgain = Math.round(dev)
        // }
        if($("input[name='NumberofEditors']:checked").val() == "< 3"){
       var coneditresgain = (0.85)*(3)*(0.5)
        }
        if($("input[name='NumberofEditors']:checked").val() == "3-4"){
        var coneditresgain = (0.85)*(3)*(0.5)
        }
        if($("input[name='NumberofEditors']:checked").val() == "5-9"){
        var coneditresgain = (0.85)*(5)*(0.5)
        }
        if($("input[name='NumberofEditors']:checked").val() == "10+"){
        var coneditresgain = (0.85)*(10)*(0.5)
        }
        if($("input[name='NumberofEditors']:checked").val() == "I don't know"){
         var coneditresgain = null
        }       
        // if($("input[name='NumberofEditors']:checked").val() == "N/A"){
        //      var coneditresgain = null
        // }else{
        //       var coneditresgain = (0.85)*($("input[name='NumberofEditors']:checked").val())*(0.5)
        // }
        if(development_time == null){
             var developer_resources = null
        }else{
             var developer_resources =  Math.round((development_time)*(200000)*(12/2080))
        }
        if(contenteditor_time == null){
             var content_manager_resources = null
        }else{
              var content_manager_resources = Math.round((contenteditor_time)*(160000)*(12/2080))
        }
        if(developer_resources == null || content_manager_resources == null || ongoing_infrastructure == null){
             var roi = null
        }else{
              var roi = ((developer_resources+content_manager_resources+ongoing_infrastructure)/40000)
        }
        var result = {
                      "devlopment_time":development_time,
                      "contenteditor_time" :contenteditor_time,
                      "timetopublishcontent":timetopublishcontent,
                      "developer_resources" :developer_resources,
                      "content_manager_resources" :content_manager_resources,
                      "ongoing_infrastructure" :ongoing_infrastructure,
                      "money_gain":money_gain,
                      "devresgain":devresgain,
                      "coneditresgain":coneditresgain,
                      "roi":roi
                    }
         localStorage.setItem('result', JSON.stringify(result));       
 }  
})