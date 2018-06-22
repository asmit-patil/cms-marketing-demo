//
//				    .ooooo.          ooo. .oo.     .ooooo.    oooo d8b
//				   d88' `88b         `888P"Y88b   d88' `88b   `888""8P
//				   888888888  88888   888   888   888   888    888
//				   888        88888   888   888   888   888    888       
//				   `"88888"          o888o o888o  `Y8bod8P'   d888b      
//

/***************************************************************************************************
Author: Allaedin Ezzedin
Company: E-Nor Inc
Last Updated: October 14, 2014
/***************************************************************************************************/

/*******************  Google Analytics Legacy Tracking Code  *******************/

// List all top-level domains that are belong to your organization for cross domain tracking
var domains = ["contentstack.com"]; 
var source, medium, term, content,campaign, session_count, pageview_count;

var hostname = document.location.hostname;
hostname = hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
hostname = hostname.toLowerCase();

var _gaq = _gaq || [];
// DON'T UPDATE THE GA ACCOUNT ID - Your site should be tracked using Universal Analytics outside this JavaScript code
_gaq.push(['sfga._setAccount', 'UA-XXXYYYZZZ-1']);
_gaq.push(['sfga._setDomainName', hostname]);
_gaq.push(['sfga._setAllowLinker', true]);
_gaq.push(['sfga._trackPageview']);
_gaq.push(function(){get_campaign_info();});

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/*******************  Set Up Cross Domain Tracking  *******************/

var arr = document.getElementsByTagName("a");

 for(i=0; i < arr.length; i++)
 {
    var tmp = arr[i].getAttribute("onclick");
	var doname ="";
	try
 	 {
  		doname = arr[i].hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
		doname = doname.toLowerCase();
 	 }
	catch(err)
 	 {
	 	doname = arr[i].href;
	 }
	 
	if (tmp != null) 
		{
			tmp = String(tmp);
			if (tmp.indexOf('_gasf.push') > -1) 
				continue;
		}
	 
		for (var j = 0; j < domains.length; j++) 
		{
			//Auto-Linker
			if ( doname != hostname && doname.indexOf(domains[j]) != -1 && doname.indexOf("mailto:") == -1)
			{
				
				arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"_gaq.push(['sfga._link', '"+arr[i].href+"']); return false;");
			}
		}
 }
 
/*******************  Set Up Cross Domain Tracking  *******************/

//This function extracts the "_utma", "_utmb", "_utmc" and "_utmz" strings from the cookies set by Google Analytics
//This function was originally written by the Google Analytics team (urchin.js)

function get_campaign_info()
{
	var utma = get_utm_value(document.cookie, '__utma=', ';');
	var utmb = get_utm_value(document.cookie, '__utmb=', ';');
	var utmc = get_utm_value(document.cookie, '__utmc=', ';');
	var utmz = get_utm_value(document.cookie, '__utmz=', ';');
	
	source = get_utm_value(utmz, 'utmcsr=', '|');
	medium = get_utm_value(utmz, 'utmcmd=', '|');
	term = get_utm_value(utmz, 'utmctr=', '|');
	content = get_utm_value(utmz, 'utmcct=', '|');
	campaign = get_utm_value(utmz, 'utmccn=', '|');
	gclid = get_utm_value(utmz, 'utmgclid=', '|');
	
	session_count = get_session_count(utma);
	pageview_count = get_pageview_count(utmb, utmc);
		
	if (gclid !="-") {
	 source = 'google';
	 medium = 'cpc';
	}
}

function get_utm_value(l,n,s)
{
if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
var i, j, k, utm="-";
i=l.indexOf(n);
k=n.indexOf("=")+1;

if (i > -1)
{
    j=l.indexOf(s,i);
    if (j < 0)
        {
         j=l.length;
         }
    utm=l.substring((i+k),j);
     }
return utm;
}

//This function extracts the "Count of Sessions" value from the _utma cookie
function get_session_count(str) 
{
var i, vc='-';
	if (str != '-') {
		i = str.lastIndexOf(".");
		i++;
		vc = str.substring(i);
	}
return vc;
}

//This function extracts the "Count of Pageviews" value from the _utmb cookie
function get_pageview_count(utmb,utmc)
{
var i, j, pc='-'; 
	if(utmb != '-' && utmc != '-'){
		utmc=utmc+'.';

		i=utmc.length;
		j=utmb.indexOf(".", i);
		pc=utmb.substring(i,j);
	}
return pc;
}
