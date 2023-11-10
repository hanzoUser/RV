//TODO:
// Show checkbox on load page from cookie
//x button should do something else? Discuss required functionality 

// Events

var partitions;

//to store search history
var vals = [];
var raw_search_val;
var raw2_search_val;
var secondval;
var today = new Date();

//for cookies
var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
// plus 30 days

var rows = $('table tbody tr');
//filter all rows
var testrows = $('table thead tr th.indicators');
//filter all rows
var regex = new RegExp("^(.*)_ww");

//get the cookie from page load vals is for checkbox, raw is for text box
vals = Array.from(new Set(getCookie("searchvalues")));
raw_search_val = getCookie('rawsearchvalues')[0]
raw2_search_val = getCookie('raw2searchvalues')[0]

$(document).on('click', '#addfilter', filter_click);
$(document).on('click', '.dropdown-search', filter_input);
$(document).on('click', '[type="checkbox"]', filter_change);
$(document).on('input', "#rawsearch", raw_search);
$(document).on('input', "#testsearch", test_search);
$(document).on('click', "#clear_raw_filter", clear_raw_search);

//filter if there are any cookies
//assumption that the user may not have both
//both work independently
$(window).load(function() {
/*     //if there are search box entries
    if (vals.length > 0) {
        rows.hide();
        rows.each(function() {
            $this = $(this);
            var p_val = $this.find("td:first-child").text();

            //check if ww exists in the td
            if (regex.test(p_val)) {
                var match = regex.exec(p_val)[1];
                if (vals.includes(match)) {
                    $this.show()
                }
            }
            if (vals.includes(p_val)) {
                $this.show();
            }
        });
    } else {
        rows.show();
    } */
	
////Start declare on the variable
var rows
var regex_jan, regex_feb, regex_mar, regex_apr,regex_may, regex_jun;
var regex_jul, regex_aug, regex_sep,  regex_oct, regex_nov, regex_dec;
var date_arc, date_compt, each_date_arc, each_date_comp;
var reg_arc_month_jan, reg_arc_month_feb, reg_arc_month_mar;
var reg_arc_month_apr, reg_arc_month_may, reg_arc_month_jun;
var reg_arc_month_jul,  reg_arc_month_aug, reg_arc_month_sep;
var reg_arc_month_oct, reg_arc_month_nov, reg_arc_month_dec;
var reg_comp_month_jan,  reg_comp_month_feb,  reg_comp_month_mar;
var reg_comp_month_apr, reg_comp_month_may, reg_comp_month_jun;
var reg_comp_month_jul,  reg_comp_month_aug,  reg_comp_month_sep;
var reg_comp_month_oct, reg_comp_month_nov, reg_comp_month_dec;
var arc_month, comp_month;
var allpartitionlength;
var i ;
////Complete declare on the variable


///////////////DO WHILE LOOP START FROM HERE
/////Declaring all the all the regex
allpartitionlength = $('table tbody tr');
for ( i = 0; i < (allpartitionlength.length - 1); i++) {
//for ( i = 0; i <  6; i++) {
	rows = $('table tbody tr');
	regex_jan = /Jan/g;     regex_feb = /Feb/g;  regex_mar = /Mar/g;  regex_apr = /Apr/g;
	regex_may = /May/g; regex_jun = /Jun/g;  regex_jul = /Jul/g;        regex_aug = /Aug/g;
	regex_sep = /Sep/g;    regex_oct = /Oct/g;  regex_nov = /Nov/g;  regex_dec = /Dec/g;
	
	//Start to read all the montth
	date_arc = rows[i].getElementsByTagName("TD")[1].outerText;
	date_comp = rows[i].getElementsByTagName("TD")[2].outerText;
	each_date_arc      =     date_arc.match(/([\S]+)[\s]+([\S]+)[\s]+([\S]+):([\S]+)[\s]+([\S]+).*/);
	each_date_comp = date_comp.match(/([\S]+)[\s]+([\S]+)[\s]+([\S]+):([\S]+)[\s]+([\S]+).*/);
	console.log("up to here");
	if (each_date_arc  != null && each_date_comp != null ) {
		//regexp matching the month
		reg_arc_month_jan= each_date_arc[1].match(regex_jan);    reg_arc_month_feb= each_date_arc[1].match(regex_feb);
		reg_arc_month_mar= each_date_arc[1].match(regex_mar); reg_arc_month_apr= each_date_arc[1].match(regex_apr);
		reg_arc_month_may= each_date_arc[1].match(regex_may); reg_arc_month_jun= each_date_arc[1].match(regex_jun);
		reg_arc_month_jul= each_date_arc[1].match(regex_jul);       reg_arc_month_aug= each_date_arc[1].match(regex_aug);
		reg_arc_month_sep= each_date_arc[1].match(regex_sep);     reg_arc_month_oct= each_date_arc[1].match(regex_oct);
		reg_arc_month_nov= each_date_arc[1].match(regex_nov);   reg_arc_month_dec= each_date_arc[1].match(regex_dec);
		reg_comp_month_jan= each_date_comp[1].match(regex_jan); reg_comp_month_feb= each_date_comp[1].match(regex_feb);
		reg_comp_month_mar= each_date_comp[1].match(regex_mar); reg_comp_month_apr= each_date_comp[1].match(regex_apr);
		reg_comp_month_may= each_date_comp[1].match(regex_may); reg_comp_month_jun= each_date_comp[1].match(regex_jun);
		reg_comp_month_jul= each_date_comp[1].match(regex_jul);      reg_comp_month_aug= each_date_comp[1].match(regex_aug);
		reg_comp_month_sep= each_date_comp[1].match(regex_sep);   reg_comp_month_oct= each_date_comp[1].match(regex_oct);
		reg_comp_month_nov= each_date_comp[1].match(regex_nov);  reg_comp_month_dec= each_date_comp[1].match(regex_dec);
		
		//purely month declaration
		arc_month = ""
		if (reg_arc_month_jan!= null) { arc_month = parseInt(1)}
		else if (reg_arc_month_feb!= null) { arc_month = parseInt(2)} 
		else if (reg_arc_month_mar!= null) { arc_month = parseInt(3)} 
		else if (reg_arc_month_apr!= null) { arc_month = parseInt(4)} 
		else if (reg_arc_month_may!= null) { arc_month = parseInt(5)} 
		else if (reg_arc_month_jun!= null) { arc_month = parseInt(6)} 
		else if (reg_arc_month_jul!= null) { arc_month = parseInt(7)} 
		else if (reg_arc_month_aug!= null) { arc_month = parseInt(8)} 
		else if (reg_arc_month_sep!= null) { arc_month = parseInt(9)} 
		else if (reg_arc_month_oct!= null) { arc_month = parseInt(10)} 
		else if (reg_arc_month_nov!= null) { arc_month = parseInt(11)} 
		else if (reg_arc_month_dec!= null) { arc_month = parseInt(12)}
		comp_month = ""
		if (reg_comp_month_jan!= null) {comp_month = parseInt(1)}
		else if (reg_comp_month_feb!= null) { comp_month = parseInt(2)} 
		else if (reg_comp_month_mar!= null) { comp_month = parseInt(3)} 
		else if (reg_comp_month_apr!= null) { comp_month = parseInt(4)} 
		else if (reg_comp_month_may!= null) { comp_month = parseInt(5)} 
		else if (reg_comp_month_jun!= null) { comp_month = parseInt(6)} 
		else if (reg_comp_month_jul!= null) { comp_month = parseInt(7)} 
		else if (reg_comp_month_aug!= null) { comp_month = parseInt(8)} 
		else if (reg_comp_month_sep!= null) { comp_month = parseInt(9)} 
		else if (reg_comp_month_oct!= null) { comp_month = parseInt(10)} 
		else if (reg_comp_month_nov!= null) { comp_month = parseInt(11)} 
		else if (reg_comp_month_dec!= null) { comp_month = parseInt(12)}
		
		
		//Complete each of the reading
		comparing_arc_month  = arc_month;
		comparing_arc_day       = parseInt(each_date_arc[2]);
		comparing_arc_hour     = parseInt(each_date_arc[3]);
		comparing_arc_min      = parseInt(each_date_arc[4]);
		comparing_arc_year     = parseInt(each_date_arc[5]);
		
		comparing_comp_month  = comp_month;
		comparing_comp_day       = parseInt(each_date_comp[2]);
		comparing_comp_hour     = parseInt(each_date_comp[3]);
		comparing_comp_min      = parseInt(each_date_comp[4]);
		comparing_comp_year     = parseInt(each_date_comp[5]);
	
		//console.log(each_date_arc);
		//console.log(each_date_comp);
		
		
		if (comparing_arc_year > comparing_comp_year)                     {
			rows[i].getElementsByTagName("TD")[1].style.backgroundColor = "yellow";
			rows[i].getElementsByTagName("TD")[2].style.backgroundColor = "yellow";
			console.log("22");
		} else if (comparing_arc_year == comparing_comp_year)  {
			if  (comparing_arc_month  > comparing_comp_month )  { 
				rows[i].getElementsByTagName("TD")[1].style.backgroundColor = "yellow";
				rows[i].getElementsByTagName("TD")[2].style.backgroundColor = "yellow";
				console.log("33");
			} else if  (comparing_arc_month  == comparing_comp_month )  {
				if  (comparing_arc_day       > comparing_comp_day       )  { 
					rows[i].getElementsByTagName("TD")[1].style.backgroundColor = "yellow";
					rows[i].getElementsByTagName("TD")[2].style.backgroundColor = "yellow";
					console.log("44");
				} else if  (comparing_arc_day       == comparing_comp_day       )  {
					 if  (comparing_arc_hour     > comparing_comp_hour     )  {
						rows[i].getElementsByTagName("TD")[1].style.backgroundColor = "yellow";
						rows[i].getElementsByTagName("TD")[2].style.backgroundColor = "yellow";
						console.log("55");
					} else  if  (comparing_arc_hour     == comparing_comp_hour     )  {
						 if  (comparing_arc_min      > comparing_comp_min       )  { 
							rows[i].getElementsByTagName("TD")[1].style.backgroundColor = "yellow";
							rows[i].getElementsByTagName("TD")[2].style.backgroundColor = "yellow";
							console.log("66");
						}
					}
				}
			}
		}
	} else {
			rows[i].getElementsByTagName("TD")[1].style.backgroundColor = "yellow";
			rows[i].getElementsByTagName("TD")[2].style.backgroundColor = "yellow";
			console.log("77");
	}
}

	try {
	    //if there are raw2 searches
        if (raw2_search_val.length != 0) {
        console.log(raw2_search_val)
    	var val = raw2_search_val
        secondval = [];
    	
        testrows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            if (text === "partition") {
                secondval.push(0);
                return 0;
            }
            secondval.push(text.indexOf(val));
            return !~text.indexOf(val);
        }).hide();
    	$("#testsearch").val(raw2_search_val)
        secondval.forEach(myFunction)
    
        }
	} catch {
	}
	
    //if there are raw searches
	try {
        if (raw_search_val.length != 0) {
            console.log(raw_search_val)
            rows.show().filter(function() {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(raw_search_val);
            }).hide();
    
            $("#rawsearch").val(raw_search_val)
        }
    } catch {	
	}
    
	
	
	
	

})

var stateTemplate = _.template('<li>' + '<input value="<%= abbreviation %>" name="<%= abbreviation %>" type="checkbox">' + '<label for="<%= abbreviation %>"><%= capName %></label>' + '</li>');

//get url to get partition names
var pathname = window.location.pathname;
var partition_query_dict = {
    "/rvstatusb0": "/b0partitions",
    "/rvstatussp0": "/sp0partitions",
    "/rvindicatorb0": "/b0indpartitions",
    "/rvindicatorsp0": "/sp0indpartitions"
};

//partiion names returned as json
$.getJSON(partition_query_dict[pathname], {}, function(data) {
    console.log("Calling for partition names!")
    partitions = data;
    // console.log(partitions)
    _.each(partitions, function(s) {
        s.capName = s.name;
        $('ul').append(stateTemplate(s));
    });
});

/* setCookie, getCookie, deleteCookie are functions for cookies
setcookie sets cookie with 30 day expiry
getcookie returns an array of searched values
since checkboxes can have multiple values set array is used
text entry will have to extract first value of array */
function setCookie(name, value) {
    // console.log(value);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]).split(",") : [];
}

function deletecookie(name) {
    var expired = new Date(today.getTime() - 24 * 3600 * 1000);
    // less 24 hours
    document.cookie = name + "=null; path=/; expires=" + expired.toGMTString();
}

//to show dropdown list
function filter_click() {
    $(".dropdown-list").toggle();
}

//to show the content in dropdown list
function filter_input() {
    var target = $(this);
    // var dropdownList = target.closest(".dropdown-list");
    var dropdownList = target.parent();
    // console.log(dropdownList)
    var search = target.val().toLowerCase();

    if (!search) {
        dropdownList.find("li").show();
        return false;
    }

    dropdownList.find("li").each(function() {
        var text = $(this).text().toLowerCase();
        var match = text.indexOf(search) > -1;
        $(this).toggle(match);
    });
}

//when a checkbox is clicked filter
function filter_change() {
    if ($('input[type="checkbox"]:checked').length > 0) {
        // Get values all checked boxes
        var inner_vals = $('input[type="checkbox"]:checked').map(function() {
            return this.value.toLowerCase();
        }).get();

        //set cookie everytime changes happen
        setCookie("searchvalues", inner_vals.join(","));
        console.log(inner_vals);

        //filter values by checkbox
        rows.hide();

        //do on each row
        rows.each(function() {
            $this = $(this);
            //get partition name by using jquery td's first column
            var p_val = $this.find("td:first-child").text();

            //check if ww exists in the td - this is for status page
            if (regex.test(p_val)) {
                var match = regex.exec(p_val)[1];
                if (inner_vals.includes(match)) {
                    $this.show()
                    ///show row which match textbox entry
                }
            }
            //this is for indicator page
            if (inner_vals.includes(p_val)) {
                $this.show();
            }
        });
    } else {
        rows.show();
        //if nothing checked
    }
}
//basic jquery search1
function raw_search() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    setCookie("rawsearchvalues", val);

    rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
}

//basic jquery search2
function test_search() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    secondval = [];
    setCookie("raw2searchvalues", val);


    testrows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();

        //console.log("11beforein")
        //console.log(text.indexOf(val))
        //console.log("22beforein")
        //console.log(text)
        if (text === "partition") {
            //console.log("afterin")
            secondval.push(0);
            return 0;
        }
        secondval.push(text.indexOf(val));
        return !~text.indexOf(val);
    }).hide();
    //console.log(secondval)
    //var numbers = [65, 44, 12, 4];

    secondval.forEach(myFunction)
}

//for text entry clearing with button 
//make the text val as '' and set cookie to ''
function clear_raw_search() {
    var val = ''
    var secondval = []
    setCookie("rawsearchvalues", val);
    setCookie("raw2searchvalues", val);

    rows.show()
    testrows.show()
    $("#rawsearch").val('')
    $("#testsearch").val('')

    $('input[type="checkbox"]:checked').attr("checked", false);
    deletecookie("searchvalues");
    $(".dropdown-list").hide()


    testrows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();

            secondval.push(0);
            return 0;
    }).hide();
    secondval.forEach(myFunction)
}

//filters for buttons 
//iwth buttins cookies are not set
//uncomment to set and show in text box
$("#running_filter").on('click', null, function raw_filter_search_buttons() {
    var val = "running"
    // setCookie("rawsearchvalues", val);

    // $("#rawsearch").val(val)
    rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
})

$("#waiting_filter").on('click', null, function raw_filter_search_buttons() {
    var val = "waiting"
    // setCookie("rawsearchvalues", val);

    // $("#rawsearch").val(val)
    rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
})

$("#failed_filter").on('click', null, function raw_filter_search_buttons() {
    var val = "failed"
    // setCookie("rawsearchvalues", val);

    // $("#rawsearch").val(val)
    rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
})

$("#killed_filter").on('click', null, function raw_filter_search_buttons() {
    var val = "killed"
    // setCookie("rawsearchvalues", val);

    // $("#rawsearch").val(val)
    rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
})

function test_search() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    secondval = [];
    setCookie("raw2searchvalues", val);


    testrows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();

        //console.log("11beforein")
        //console.log(text.indexOf(val))
        //console.log("22beforein")
        //console.log(text)
        if (text === "partition") {
            //console.log("afterin")
            secondval.push(0);
            return 0;
        }
        secondval.push(text.indexOf(val));
        return !~text.indexOf(val);
    }).hide();
    //console.log(secondval)
    //var numbers = [65, 44, 12, 4];

    secondval.forEach(myFunction)
}

$("#sdhc").on('click', null, function raw_filter_search_buttons() {
var flowfiltered= [  "Partition",
             "archive_date",
             "complete_date",
        "opens",
        "shorts",
        "check_cbc_boundary",
        "check_cbc_placement",
        "check_macro_abutment",
        "check_power_domains_missing_voltage_areas",
        "check_va_dimensions",
        "check_min_channel",
        "check_nonedge_terminals_minlength",
        "check_ps_service_area",
        "check_cells_within_voltage_area",
        "check_secondary_power_grid",
        "check_hip_pg",
        "check_secondary_pg_cells",
        "check_port_tie_offs",
        "check_edge_terminals_below_spec_layer",
        "check_ports_missing_terminal",
        "check_terminals_shorts",
        "check_terminals_not_on_track",
        "check_terminals_legal_width",
        "check_ports_with_multi_terms",
        "check_dangling_ports",
        "check_tieoff_connection",
        "check_additional_td_route_objects",
        "check_pdfx_content",
        "check_illegal_net_names",
        "check_gnac_on_analog_nets",
        "check_gnacpin_connection",
        "check_objects_out_of_boundary",
        "check_wire_objects_at_boundary",
        "check_shorts",
        "check_opens",
        "check_pg_connectivity",
        "check_pg_drc"];
    var rows = $('table thead tr');
    var rows2 = $('table thead tr th.indicators');

        for (i = 0; i < (rows2.length - 0); i++) {
           var bbb = rows[0].getElementsByTagName("TH")[i].outerText
           if (flowfiltered.includes(bbb)) {
                var j = i + 1
                var columns_up = $('table thead tr th.indicators:nth-child(' + j + ')');
                var columns_down = $('table tbody tr td:nth-child(' + j + ')');
                columns_up.show()
                columns_down.show()
            } else {
                var j = i + 1
                var columns_up = $('table thead tr th.indicators:nth-child(' + j + ')');
                var columns_down = $('table tbody tr td:nth-child(' + j + ')');
                columns_up.hide()
                columns_down.hide()
            }
        }

})

$("#drc").on('click', null, function raw_filter_search_buttons() {
var flowfiltered= [  "Partition",
             "archive_date",
             "complete_date",
        "drc",
        "esdlupdrc",
        "antdrc",
		"lvs_Comparison",
		"lvs_Extraction",
		"lvs_Shorts",
        "srampattern",
        "mimantdrc",
        "erc",
        "perc_esdsch_tsmc",
        "perc_esd_bump_intel",
        "perc_esdsch_bump_intel",
        "perc_esd_topo_tsmc",
        "perc_esd_cd_tsmc",
        "perc_esd_ldl_tsmc",
        "perc_esd_p2p_tsmc",
        "MICRO_packagedrc",
        "RBOP_packagedrc"];

    var rows = $('table thead tr');
    var rows2 = $('table thead tr th.indicators');

        for (i = 0; i < (rows2.length - 0); i++) {
           var bbb = rows[0].getElementsByTagName("TH")[i].outerText
           if (flowfiltered.includes(bbb)) {
                var j = i + 1
                var columns_up = $('table thead tr th.indicators:nth-child(' + j + ')');
                var columns_down = $('table tbody tr td:nth-child(' + j + ')');
                columns_up.show()
                columns_down.show()
            } else {
                var j = i + 1
                var columns_up = $('table thead tr th.indicators:nth-child(' + j + ')');
                var columns_down = $('table tbody tr td:nth-child(' + j + ')');
                columns_up.hide()
                columns_down.hide()
            }
        }

})

$("#other").on('click', null, function raw_filter_search_buttons() {
var flowfiltered= [  "Partition",
             "archive_date",
             "complete_date",
             "tcic"];

    var rows = $('table thead tr');
    var rows2 = $('table thead tr th.indicators');

        for (i = 0; i < (rows2.length - 0); i++) {
           var bbb = rows[0].getElementsByTagName("TH")[i].outerText
           if (flowfiltered.includes(bbb)) {
                var j = i + 1
                var columns_up = $('table thead tr th.indicators:nth-child(' + j + ')');
                var columns_down = $('table tbody tr td:nth-child(' + j + ')');
                columns_up.show()
                columns_down.show()
            } else {
                var j = i + 1
                var columns_up = $('table thead tr th.indicators:nth-child(' + j + ')');
                var columns_down = $('table tbody tr td:nth-child(' + j + ')');
                columns_up.hide()
                columns_down.hide()
            }
        }

})


function myFunction(item, index, arr) {
    //console.log(index)
    //console.log(item)
    var index2 = index + 1;
    var columns = $('table tbody tr td:nth-child(' + index2 + ')');
    //filter all rows
    //    }).hide();
    if (item === -1) {
        columns.hide()
    } else {
        columns.show()
    }
}
function sortTable(n) {
  var switching, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    shouldSwitch = false;
    var  i, x, y;
    var rows = $('table tbody tr');
    for (i = 0; i < (rows.length - 1); i++) {
    	
      x = parseInt(rows[i].getElementsByTagName("TD")[n].outerText);
      y = parseInt(rows[i+1].getElementsByTagName("TD")[n].outerText);
      // Check if the two rows should switch place:
      if (isNaN(x)) {x = -1;}
      if (isNaN(y)) {y = -1;}
      //console.log(x)
     // console.log(y)
      if (x < y) {
	    //console.log("switching")
	    //rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	        shouldSwitch = true;
	        break;
	
      } else if (x > y) {
	   // console.log("no switching")
	    //rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      }

    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

##########################################################################################	   
##########################################################################################
##to clear all filter
	var rows2 = $('table tbody tr');
	rows2.hide()

##to remove certain row
	var rows3 = $('table tbody tr:nth-child(' + 6 + ')');
	rows3.show()
        
##########################################################################################
	var rows2 = $('table tbody tr');
	rows2.hide()
	var flowfiltered= [  
		"ddrccc",
		"ddrcomp",
		"ddrdata",
        "ddrpgcombo",
		"ddrslrpgcombo",
        "ddrrptchtop",
        "ddrvccclkpgcombo",
        "ddrvttpgcombo"];	 
	var rows2 = $('table tbody tr');
	for (i = 0; i < (rows2.length - 0); i++) {
		var bbb = rows2[i].getElementsByTagName("td")[0].outerText
		console.log(bbb)
		    if  (flowfiltered.includes(bbb))  { 
							console.log(bbb);
							var rows3 = $('table tbody tr:nth-child(' + i + ')');
							rows3.show()
						}
			}
	
########################################################################################
$("#atom").on('click', null, function raw_filter_search_buttons() {
 	var flowfiltered= [  
		"par_atom_bus",
		"par_atom_core",
		"par_atom_l2"];	 
		
	var rows2 = $('table tbody tr');
	for (i = 0; i < (rows2.length - 0); i++) {
		var bbb = rows2[i].getElementsByTagName("td")[0].outerText
		console.log(bbb)
		    if  (flowfiltered.includes(bbb))  { 
							console.log(bbb);
							var rows3 = $('table tbody tr:nth-child(' + i + ')');
							rows3.show()
						}
			}
})


$("#ddrphy").on('click', null, function raw_filter_search_buttons() {
 	var flowfiltered= [  
		"ddrccc",
		"ddrcomp",
		"ddrdata",
        "ddrpgcombo",
		"ddrslrpgcombo",
        "ddrrptchtop",
        "ddrvccclkpgcombo",
        "ddrvttpgcombo"];	 
		
	var rows2 = $('table tbody tr');
	for (i = 0; i < (rows2.length - 0); i++) {
		var bbb = rows2[i].getElementsByTagName("td")[0].outerText
		console.log(bbb)
		    if  (flowfiltered.includes(bbb))  { 
							console.log(bbb);
							var rows3 = $('table tbody tr:nth-child(' + i + ')');
							rows3.show()
						}
			}
})


$("#hac").on('click', null, function raw_filter_search_buttons() {
 	var flowfiltered= [  
		"par_gbo0",
		"par_gbo1",
		"par_gbo2",
		"par_cbopair",
		"par_llctag",
		"par_sboidp",
		"par_d2dc",
		"par_d2dl"];	 
		
	var rows2 = $('table tbody tr');
	for (i = 0; i < (rows2.length - 0); i++) {
		var bbb = rows2[i].getElementsByTagName("td")[0].outerText
		console.log(bbb)
		    if  (flowfiltered.includes(bbb))  { 
							console.log(bbb);
							var rows3 = $('table tbody tr:nth-child(' + i + ')');
							rows3.show()
						}
			}
})

$("#ipu").on('click', null, function raw_filter_search_buttons() {
 	var flowfiltered= [  
		"par_dma_sf",
		"par_bbff_gdc_sf",
		"par_bbff_main_infra_sf",
		"par_bbff_tnr_sf",
		"par_bnlm_sf",
		"par_central_sp_sf",
		"par_io_channel_sf",
		"par_io_sf",
		"par_ipu_buttress_sf",
		"par_is_cmp_sf",
		"par_is_fabric_sf",
		"par_isa_infra_sf",
		"par_isa_x2b_dol_sf",
		"par_isa_x2i_sf",
		"par_lbff_infra_sf",
		"par_lbff_main_sf",
		"par_mmu_sf",
		"par_ps_cmp_sf",
		"par_xnr_sf"];	 
		
	var rows2 = $('table tbody tr');
	for (i = 0; i < (rows2.length - 0); i++) {
		var bbb = rows2[i].getElementsByTagName("td")[0].outerText
		console.log(bbb)
		    if  (flowfiltered.includes(bbb))  { 
							console.log(bbb);
							var rows3 = $('table tbody tr:nth-child(' + i + ')');
							rows3.show()
						}
			}
})


$("#media").on('click', null, function raw_filter_search_buttons() {
 	var flowfiltered= [  
		"par_gtavpak2",
		"par_gtavdec1",
		"par_gtavdecpak1",
		"par_gtavdecpak2",
		"par_gtavpak1",
		"par_gtavparcom1",
		"par_gtcfn",
		"par_gtdecip1",
		"par_gtdecip2",
		"par_gtgampar1",
		"par_gtgampar2",
		"par_gtgsc1",
		"par_gtgsc2",
		"par_gtguc",
		"par_gthcppar1",
		"par_gthcppar2",
		"par_gthcppar3",
		"par_gthcppar4",
		"par_gthcppar5",
		"par_gtinf",
		"par_gtmfx",
		"par_gtsfc1",
		"par_gtsfc2",
		"par_gtsqidim",
		"par_gtvdboxtop",
		"par_gtvdencpar1",
		"par_gtvdencpar2",
		"par_gtvdencpar3",
		"par_gtvdencpar4",
		"par_gtveboxpar1",
		"par_gtveboxpar2",
		"par_noc_fabric_fdi1",
		"par_noc_fabric_fdi2",
		"par_noc_fabric_north"];	 
		
	var rows2 = $('table tbody tr');
	for (i = 0; i < (rows2.length - 0); i++) {
		var bbb = rows2[i].getElementsByTagName("td")[0].outerText
		console.log(bbb)
		    if  (flowfiltered.includes(bbb))  { 
							console.log(bbb);
							var rows3 = $('table tbody tr:nth-child(' + i + ')');
							rows3.show()
						}
			}
})

	