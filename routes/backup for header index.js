//similar to page like rv_status.js

var express = require('express');
var router = express.Router();

// var body-parser = require('body-parser')
var rvStatus = require('../js/runStatus.js');
var violations = require('../js/read_violations.js')
var TGLB0 = "TGLB0P10"
var TGLSP0 = "TGLSP0P10"
var TGLSR0 = "TGLSR0P10"
var LVMTLC0 = "MTLC0"
var LVMTLSOCN0 = "MTLSOCN0"
var RVMTLC0 = "MTLCA0P08"

var title_dict = {
    "pgopens": "PG Open violations",
    "sfactor": "Sfactor violations",
    "sh":"SH violations",
    "gdvd" : "Gated DVD violations", // todo here in backend
    "udvd": "Ungated DVD violations",
    "glbdrvmissingv5uclkqclk": "Global Driver Pins Missing v5 uclk & qclk",
    "checkhipnopg":"Check Hip no PG",
    "checkhippgmissingvias":"Check Hip no PG with Missing 50% vias",
    "checksecondarypgcells":"Secondary PG cells",
    "gdsimissingv6qclkuclk":"GDSI missing v6 uclk & qclk",
    "aonmissingladder":"Aon missing ladder",
    "aonmissingv4":"Aon missing v4",            "LibInteg": ".LibInteg",
            "badtap": ".badtap",
            "boxcon": ".boxcon",
            "cmden": ".cmden",
            "con2cell": ".con2cell",
            "denallIP": ".denallIP",
            "dfi_integra": ".dfi_integra",
            "dfi_integra.info": ".dfi_integra.info",
            "dfi_integra.warn": ".dfi_integra.warn",
            "dfmtail_active": ".dfmtail_active",
            "dfmtail_float": ".dfmtail_float",
            "dfmtail_longactive": ".dfmtail_longactive",
            "drc_IL": ".drc_IL",
            "drc_IOgnac": ".drc_IOgnac",
            "drc_IPall": ".drc_IPall",
            "drc_LU": ".drc_LU",
            "drc_MCR": ".drc_MCR",
            "drc_PWR_HU": ".drc_PWR_HU",
            "drc_RE": ".drc_RE",
            "drc_TUC": ".drc_TUC",
            "drc_gc": ".drc_gc",
            "drcdf_base1": ".drcdf_base1",
            "drcdf_base2": ".drcdf_base2",
            "drcdf_base3": ".drcdf_base3",
            "drcdf_high1": ".drcdf_high1",
            "drcdf_high1_fill": ".drcdf_high1_fill",
            "drcdf_high2": ".drcdf_high2",
            "drcdf_high2_fill": ".drcdf_high2_fill",
            "drcdf_low1": ".drcdf_low1",
            "drcdf_low2": ".drcdf_low2",
            "drcdf_med": ".drcdf_med",
            "drcgclmp": ".drcgclmp",
            "gate2pwr": ".gate2pwr",
            "gnacpin": ".gnacpin",
            "grden": ".grden",
            "metnoport": ".metnoport",
            "misscontainer": ".misscontainer",
            "numgnac": ".numgnac",
            "oob": ".oob",
            "popen": ".popen",
            "trclvs": ".trclvs",
            "trclvs.icvlvs": ".trclvs.icvlvs",
            "trclvs.open": ".trclvs.open",
            "trcopens": ".trcopens",
            "trcoth": ".trcoth",
            "trcport": ".trcport",
            "uv2laycheck": ".uv2laycheck",
			"pg_opens": "Power Ground Open",
			"sh": "Self Heat",
			"sf": "S-Factor",
			"dvd": "Ir Drop"


}

var header_dict = {
    "pgopens": "PG Open violations",
    "sfactor": "Sfactor violations",
    "sh":"Self heat violations",
    "gdvd" : "Gated DVD violations", // todo here in backend
    "udvd": "Ungated DVD violations",
    "glbdrvmissingv5uclkqclk": "glbdrv pins missing v5 on uclk & qclk",
    "checkhipnopg":"No power grid on HIP",
    "checkhippgmissingvias":"<50% vias for HIP",
    "checksecondarypgcells":"Secondary PG cells check",
    "gdsimissingv6qclkuclk":"gdsi missing v6 on uclk & qclk",
    "aonmissingladder":"AON cells missing via ladder",
    "aonmissingv4":"Aon cells missing v4",            "LibInteg": ".LibInteg",
            "badtap": ".badtap",
            "boxcon": ".boxcon",
            "cmden": ".cmden",
            "con2cell": ".con2cell",
            "denallIP": ".denallIP",
            "dfi_integra": ".dfi_integra",
            "dfi_integra.info": ".dfi_integra.info",
            "dfi_integra.warn": ".dfi_integra.warn",
            "dfmtail_active": ".dfmtail_active",
            "dfmtail_float": ".dfmtail_float",
            "dfmtail_longactive": ".dfmtail_longactive",
            "drc_IL": ".drc_IL",
            "drc_IOgnac": ".drc_IOgnac",
            "drc_IPall": ".drc_IPall",
            "drc_LU": ".drc_LU",
            "drc_MCR": ".drc_MCR",
            "drc_PWR_HU": ".drc_PWR_HU",
            "drc_RE": ".drc_RE",
            "drc_TUC": ".drc_TUC",
            "drc_gc": ".drc_gc",
            "drcdf_base1": ".drcdf_base1",
            "drcdf_base2": ".drcdf_base2",
            "drcdf_base3": ".drcdf_base3",
            "drcdf_high1": ".drcdf_high1",
            "drcdf_high1_fill": ".drcdf_high1_fill",
            "drcdf_high2": ".drcdf_high2",
            "drcdf_high2_fill": ".drcdf_high2_fill",
            "drcdf_low1": ".drcdf_low1",
            "drcdf_low2": ".drcdf_low2",
            "drcdf_med": ".drcdf_med",
            "drcgclmp": ".drcgclmp",
            "gate2pwr": ".gate2pwr",
            "gnacpin": ".gnacpin",
            "grden": ".grden",
            "metnoport": ".metnoport",
            "misscontainer": ".misscontainer",
            "numgnac": ".numgnac",
            "oob": ".oob",
            "popen": ".popen",
            "trclvs": ".trclvs",
            "trclvs.icvlvs": ".trclvs.icvlvs",
            "trclvs.open": ".trclvs.open",
            "trcopens": ".trcopens",
            "trcoth": ".trcoth",
            "trcport": ".trcport",
            "uv2laycheck": ".uv2laycheck",
            "complete_date": "complete_date",
            "archive_date": "archive_date",    
            "tcic": "tcic",  
            "check_legality": "check_legality",                       
            "opens": "opens",                              
            "shorts": "shorts",
        "check_cbc_boundary": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_cbc_boundary.rpt",
        "check_cbc_placement": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_cbc_placement.rpt",
        "check_macro_abutment": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_macro_abutment.rpt", 
        "check_power_domains_missing_voltage_areas": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_power_domains_missing_voltage_areas.rpt",
        "check_va_dimensions": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_va_dimensions.rpt",
        "check_min_channel": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_min_channel.rpt",
        "check_nonedge_terminals_minlength": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_nonedge_terminals_minlength.rpt",
        "check_ps_service_area": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_ps_service_area.rpt",
        "check_cells_within_voltage_area": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_cells_within_voltage_area.rpt",
        "check_secondary_power_grid": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_secondary_power_grid.rpt",
        "check_hip_pg": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_hip_pg.rpt",
        "check_secondary_pg_cells": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_secondary_pg_cells.rpt",
        "check_port_tie_offs": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_port_tie_offs.rpt",
        "check_edge_terminals_below_spec_layer": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_edge_terminals_below_spec_layer.rpt",
        "check_ports_missing_terminal": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_ports_missing_terminal.rpt",
        "check_terminals_shorts": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_terminals_shorts.rpt",
        "check_terminals_not_on_track": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_terminals_not_on_track.rpt",
        "check_terminals_legal_width":  "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_terminals_legal_width.rpt",
        "check_ports_with_multi_terms": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_ports_with_multi_terms.rpt",
        "check_dangling_ports": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_dangling_ports.rpt",
        "check_tieoff_connection": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_tieoff_connection.rpt",
        "check_additional_td_route_objects": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_additional_td_route_objects.rpt",
        "check_pdfx_content": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_pdfx_content.rpt",
        "check_illegal_net_names": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_illegal_net_names.rpt",
        "check_gnac_on_analog_nets":"${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_gnac_on_analog_nets.rpt",
        "check_gnacpin_connection": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_gnacpin_connection.rpt",
        "check_objects_out_of_boundary": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_objects_out_of_boundary.rpt",
        "check_wire_objects_at_boundary": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_wire_objects_at_boundary.rpt",    
        "check_shorts": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_shorts.rpt",
        "check_opens": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_opens.rpt",
        "check_pg_connectivity": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_pg_connectivity.rpt",
        "check_pg_drc": "${ward}/${partition}/runs/${partition}/n6_h240_m13_2r/apr_fc/reports/finish/healthchecks/${partition}/${partition}.finish.check_pg_drc.rpt",
			"antdrc":  "antdrc", 
			"drc": "drc",                                  
			"erc": "erc",                           
			"esdlupdrc": "esdlupdrc", 
			"mimantdrc": "mimantdrc",
			"srampattern": "srampattern",
				"pg_opens": "Power Ground Open",
				"sh": "Self Heat",
				"sf": "S-Factor",
				"dvd": "Ir Drop"
}

/* GET home page. */
router.get('/', function(req, res, next) {
    //render a better homepage
    res.render('index', { title: 'MD Home Page', testing: {}, Tools: [] });
});
/* this is previously one
router.get('/rvstatusb0', function (req, res) {
    var toolList = ["populate","socrv_prep", "socrv_bind","socrv_staticir", "socrv_dynamicir",  "socrv_staticem", "socrv_sigem", "socrv_thermal", "socrv_report"];
    var status = rvStatus.access_rv_status();
    res.render('rv_status_b0', { title: 'RV Status TGLB0P10', testing: status[0], Tools: toolList, lastupdate: status[3]})
});

router.get('/rvindicatorb0', function (req, res) {
    var status = rvStatus.access_rv_indicators();
    res.render('rv_indicator_b0', { title: 'RV Indicator TGLB0P10', testing: status[TGLB0], Tools: status[TGLB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated']})
});

router.get('/rvstatussp0', function (req, res) {
    var toolList = ["populate","socrv_prep", "socrv_bind","socrv_staticir", "socrv_dynamicir",  "socrv_staticem", "socrv_sigem", "socrv_thermal", "socrv_report"];
    var status = rvStatus.access_rv_status();
    res.render('rv_status_sp0', { title: 'RV Status TGLSP0P10', testing: status[1], Tools: toolList, lastupdate: status[3]})
});
router.get('/rvindicatorsp0', function (req, res) {
    var status = rvStatus.access_rv_indicators();
    res.render('rv_indicator_sp0', { title: 'RV Indicator TGLSP0P10', testing: status[TGLSP0], Tools: status[TGLSP0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated']})
});
*/
router.get('/rvstatussr0', function (req, res) {
    var toolList = ["populate","socrv_prep", "socrv_bind","socrv_staticir", "socrv_dynamicir",  "socrv_staticem", "socrv_sigem", "socrv_thermal", "socrv_report"];
    var status = rvStatus.access_rv_status();
    res.render('rv_status_sr0', { title: 'RV Indicator TGLSR0P10', testing: status[2], Tools: toolList, lastupdate: status[3]})
});

router.get('/rvindicatorsr0', function (req, res) {
    var status = rvStatus.access_rv_indicators();
    res.render('rv_indicator_sr0', { title: 'RV Indicator TGLSR0P10', testing: status[TGLSR0], Tools: status[TGLSR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated']})
});
router.get('/rvindicatormtlc0', function (req, res) {
    var status = rvStatus.access_rvmtlc0_indicators();
    res.render('rv_indicator_mtlc0', { title: 'RV Indicator RVMTLC0', testing: status[RVMTLC0], Tools: status[RVMTLC0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/lvindicatorsr0', function (req, res) {
    var status = rvStatus.access_lv_indicators();
    res.render('lv_indicator_sr0', { title: 'LV Indicator TGLSR0P10', testing: status[TGLSR0], Tools: status[TGLSR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/lvindicatormtlc0', function (req, res) {
    var status = rvStatus.access_lvmtlc0_indicators();
    res.render('lv_indicator_mtlc0', { title: 'LV Indicator LVMTLC0', testing: status[LVMTLC0], Tools: status[LVMTLC0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/lvindicatormtlsocn0', function (req, res) {
    var status = rvStatus.access_lvmtlsocn0_indicators();
    res.render('lv_indicator_mtlsocn0', { title: 'LV Indicator LVMTLSOCN0', testing: status[LVMTLSOCN0], Tools: status[LVMTLSOCN0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});





/*
//start from here not using
//internal querys for partitions
router.get('/b0partitions', function(req, res){
    var partitions = rvStatus.get_b0_partitions();
    res.json(partitions);
});

router.get('/sp0partitions', function(req, res){
    var partitions = rvStatus.get_sp0_partitions();
    res.json(partitions);
});
router.get('/sr0partitions', function(req, res){
    var partitions = rvStatus.get_sr0_partitions();
    res.json(partitions);
});

router.get('/b0indpartitions', function(req, res){
    var partitions = rvStatus.get_b0_ind_partitions();
    res.json(partitions);
});
router.get('/sp0indpartitions', function(req, res){
    var partitions = rvStatus.get_sp0_ind_partitions();
    res.json(partitions);
});
router.get('/sr0indpartitions', function(req, res){
    var partitions = rvStatus.get_sr0_ind_partitions();
    res.json(partitions);
});
router.get('/rvindicatorsp0/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_sp0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "SP0", header: header_dict[violation_type] + ' for ' + partition});
});

router.get('/rvindicatorb0/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_b0_violations(partition,violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "B0", header: header_dict[violation_type] + ' for ' + partition});
});
//until this part is not using
*/




router.get('/rvindicatorsr0/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvsr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "TGLSR0RV", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlc0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlc0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "MTLCA0P08", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/lvindicatorsr0/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_lvsr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "TGLSR0LV", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/lvmtlc0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_lvmtlc0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "MTLC0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/lvmtlsocn0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_lvmtlsocn0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "MTLSOCN0", header: header_dict[violation_type] + ' for ' + partition});
});


/*
//start from here not using
// For internal pages
router.get('/editrvqueue', function (req, res) {
    res.render('editrvqueue', { title: 'RV Indicator Queue', filepath: "/nfs/pdx/disks/hdk.sdrv_indicators_01/indicators/TGL_TGLB0_indicators/queue.json"})
});

router.get('/editrvqueuejson', function (req, res) {
    var status = rvStatus.read_rv_queue(); //TODO: have to change this function
    res.json(status)
});

router.post('/editrvqueuejson', function(req, res){
    console.log(req.body);
    rvStatus.write_rv_queue(req.body)
    res.sendStatus(200)
})
//end from here not using
*/





module.exports = router;






