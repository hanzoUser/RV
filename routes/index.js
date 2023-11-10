//similar to page like rv_status.js
var express = require('express');
var router = express.Router();

// var body-parser = require('body-parser')
var rvStatus = require('../js/runStatus.js');
var violations = require('../js/read_violations.js')
var TGLB0 = "TGLB0P10"
var TGLSP0 = "TGLSP0P10"
var TGLSR0 = "TGLSR0P10"


var LVMTLCA0 = "LVMTLCA0"
var LVMTLSOCNA0 = "LVMTLSOCNA0"
var RVMTLCA0 = "RVMTLCA0"
var RVMTLCP0 = "RVMTLCP0"
var RVMTLCB0 = "RVMTLCB0"
var RVMTLCC0 = "RVMTLCC0"
var RVMTLCR0 = "RVMTLCR0"
var RVMTLCS0 = "RVMTLCS0"
var RVMTLCE0 = "RVMTLCE0"
var RVMTLSOCNA0 = "RVMTLSOCNA0"
var RVMTLSOCNB0 = "RVMTLSOCNB0"
var RVMTLSOCNC0 = "RVMTLSOCNC0"
var RVMTLSOCNK0 = "RVMTLSOCNK0"
var RVMTLSOCNB0INDU = "RVMTLSOCNB0INDU"
var RVMTLSOCSNA0 = "RVMTLSOCSNA0"
var RVMTLSOCSNB0 = "RVMTLSOCSNB0"
var RVMTLSOCSNR0 = "RVMTLSOCSNR0"
var RVARLCPXA0 = "RVARLCPXA0"
var RVARLCSP0  = "RVARLCSP0"
var RVARLCPA0  = "RVARLCPA0"
var RVARLCPB0  = "RVARLCPB0"
var RVARLCPB0_preswap  = "RVARLCPB0_preswap"

var RVARLCB0  = "RVARLCB0"

var RVARLCJ0  = "RVARLCJ0"
var RVARLCR0  = "RVARLCR0"

var RVPTLA0  = "RVPTLA0"

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
			"dvd": "Ir Drop",
			"dvd15percent": "15% Ir Drop",
			"dvd22percent": "22% Ir Drop",
			"dvdA0_signoff": "22% Ir Drop + waiver",
			"dvdlowstafreq": "Ir Drop low sta freq",
			"gateddvd":"gateddvd",
			"ungateddvd":"ungateddvd",
			"stair": "StaIR",
			"idr" : "Metal-Via Idr",
			"fish" : "FISH",
		"sig.metal.avg" : "sigmetalavg_ind",
		"sig.metal.peak" : "sigmetalpeak_ind",
		"sig.metal.rms" : "sigmetalrms_ind",
		"power.metal.avg" : "powermetalavg_ind",
		"power.metal.peak" : "powermetalpeak_ind",
		"power.metal.rms" : "powermetalrms_ind",
		"sig.via.avg" : "sigviaavg_ind",
		"sig.via.peak" : "sigviapeak_ind",
		"sig.via.rms" : "sigviarms_ind",
		"power.via.avg" : "powerviaavg_ind",
		"power.via.peak" : "powerviapeak_ind",
		"power.via.rms" : "powerviarms_ind",
		"press" : "press;",
		"sig.metal.avg_dt" : "sigmetalavg_dt",
		"sig.metal.peak_dt" : "sigmetalpeak_dt",
		"sig.metal.rms_dt" : "sigmetalrms_dt",
		"power.metal.avg_dt" : "powermetalavg_dt",
		"power.metal.peak_dt" : "powermetalpeak_dt",
		"power.metal.rms_dt" : "powermetalrms_dt",
		"sig.via.avg_dt" : "sigviaavg_dt",
		"sig.via.peak_dt" : "sigviapeak_dt",
		"sig.via.rms_dt" : "sigviarms_dt",
		"power.via.avg_dt" : "powerviaavg_dt",
		"power.via.peak_dt" : "powerviapeak_dt",
		"power.via.rms_dt" : "powerviarms_dt",
				"sig.metal.avg_normal" : "sigmetalavg",
				"sig.metal.peak_normal" : "sigmetalpeak",
				"sig.metal.rms_normal" : "sigmetalrms",
				"power.metal.avg_normal" : "powermetalavg",
				"power.metal.peak_normal" : "powermetalpeak",
				"power.metal.rms_normal" : "powermetalrms",
				"sig.via.avg_normal" : "sigviaavg",
				"sig.via.peak_normal" : "sigviapeak",
				"sig.via.rms_normal" : "sigviarms",
				"power.via.avg_normal" : "powerviaavg",
				"power.via.peak_normal" : "powerviapeak",
				"power.via.rms_normal" : "powerviarms",
			"sig.metal.rms.150_dt" : "sig.metal.rms.violations150_dt",
			"sig.metal.avg.a0final_dt" : "sig.metal.avg.violationsa0finala0final_dt",
			"sig.metal.peak.a0final_dt" : "sig.metal.peak.violationsa0final_dt",
			"sig.metal.rms.a0final_dt" : "sig.metal.rms.violationsa0final_dt",
			"power.metal.avg.a0final_dt" : "power.metal.avg.violationsa0final_dt",
			"power.metal.peak.a0final_dt" : "power.metal.peak.violationsa0final_dt",
			"power.metal.peak.a0.tapein" : "rhsc.power.metal.peak.violations_tapein_a0final_dt",
			"power.metal.rms.a0final_dt" : "power.metal.rms.violationsa0final_dt",
			"sig.via.avg.a0final_dt" : "sig.via.avg.violationsa0final_dt",
			"sig.via.peak.a0final_dt" : "sig.via.peak.violationsa0final_dt",
			"sig.via.rms.a0final_dt" : "sig.via.rms.violationsa0final_dt",
			"power.via.avg.a0final_dt" : "power.via.avg.violationsa0final_dt",
			"power.via.peak.a0final_dt" : "power.via.peak.violationsa0final_dt",
			"power.via.rms.a0final_dt" : "power.via.rms.violationsa0final_dt",
				"power.metal.avg_dataTR0.2" : "power.metal.avg_dataTR0.2",
				"power.via.avg_dataTR0.2" : "power.via.avg_dataTR0.2",
				"power.metal.peak_dataTR0.2" : "power.metal.peak_dataTR0.2",
			"ir_no_tw" : "ir_no_tw",
			"em_no_tw" : "em_no_tw",
			"7rescheck" : "rescheck7",
			"260rescheck" : "260rescheck",
			"400rescheck" : "400rescheck",
			"90rescheck" : "90rescheck",
			"120rescheck" : "120rescheck",
			"SMP_Reff" : "SMP_Reff",
			"check_hip_pg" : "check_hip_pg",
			"check_aon_power_connection" : "check_aon_power_connection",
			"check_secondary_pg_cells" : "check_secondary_pg_cells",
		"dvd_manual_waiver" : "dvd_manual_waiver",
		"dvd_timing_final" : "dvd_timing_final",
		"dvd_timing_waiver" : "dvd_timing_waiver",
		"dvd_timing_debug" : "dvd_timing_debug",
		"powerfit" : "powerfit",
		"SHE" : "SHE",
		"pg_temp" : "pg_temp",
		"signal_temp" : "signal_temp",
		"metal.maxem.em" : "metal.maxem.em",
		"via.maxem.em" : "via.maxem.em",
		"metal.peak.em" : "metal.peak.em",
		"via.peak.em" : "via.peak.em",
		"Sfactor" : "Sfactor",
		"MaxLTE" : "MaxLTE",
		"SH" : "SH",
		"LIB" : "LIB",
		"apl_cap_check" : "apl_cap_check",
		"apl_current_check" : "apl_current_check",
		"ccs_timing_check" : "ccs_timing_check",
		"lef_check" : "lef_check",
		"lib_check" : "lib_check",
		"lib_nldm" : "lib_nldm",
		"spef_check" : "spef_check",
		"timing_window" : "timing_window",
		"timing_slew" : "timing_slew",
		"w2w.metal_dataTR0.5" : "w2w.metal_dataTR0.5",
		"w2w.via_dataTR0.5" : "w2w.via_dataTR0.5",
		"w2w.metal_dataTR0.2" : "w2w.metal_dataTR0.2",
		"w2w.via_dataTR0.2" : "w2w.via_dataTR0.2",
		"droppedSignals" : "droppedSignals",
		//105 thresholds
		"power.metal.avg.105_dt" : "power.metal.avg.105_dt",
		"power.via.avg.105_dt" : "power.via.avg.105_dt",
		"power.metal.peak.105_dt" : "power.metal.peak.105_dt",
		"sig.metal.peak.105_dt" : "sig.metal.peak.105_dt"
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
            "check_cbc_boundary": "check_cbc_boundary",
        "check_cbc_placement": "check_cbc_placement",
        "check_macro_abutment": "check_macro_abutment", 
        "check_power_domains_missing_voltage_areas": "check_power_domains_missing_voltage_areas",
        "check_va_dimensions": "check_va_dimensions",
        "check_min_channel": "check_min_channel",
        "check_nonedge_terminals_minlength": "check_nonedge_terminals_minlength",
        "check_ps_service_area": "check_ps_service_area",
        "check_cells_within_voltage_area": "check_cells_within_voltage_area",
        "check_secondary_power_grid": "check_secondary_power_grid",
        "check_hip_pg": "check_hip_pg",
        "check_secondary_pg_cells": "check_secondary_pg_cells",
        "check_port_tie_offs": "check_port_tie_offs",
        "check_edge_terminals_below_spec_layer": "check_edge_terminals_below_spec_layer",
        "check_ports_missing_terminal": "check_ports_missing_terminal",
        "check_terminals_shorts": "check_terminals_shorts",
        "check_terminals_not_on_track": "check_terminals_not_on_track",
        "check_terminals_legal_width":  "check_terminals_legal_width",
        "check_ports_with_multi_terms": "check_ports_with_multi_terms",
        "check_dangling_ports": "check_dangling_ports",
        "check_tieoff_connection": "check_tieoff_connection",
        "check_additional_td_route_objects": "check_additional_td_route_objects",
        "check_pdfx_content": "check_pdfx_content",
        "check_illegal_net_names": "check_illegal_net_names",
        "check_gnac_on_analog_nets":"check_gnac_on_analog_nets",
        "check_gnacpin_connection": "check_gnacpin_connection",
        "check_objects_out_of_boundary": "check_objects_out_of_boundary",
        "check_wire_objects_at_boundary": "check_wire_objects_at_boundary",    
        "check_shorts": "check_shorts",
        "check_opens": "check_opens",
        "check_pg_connectivity": "check_pg_connectivity",
        "check_pg_drc": "check_pg_drc",
        "antdrc":  "antdrc", 
        "drc": "drc",                                  
        "erc": "erc",                           
        "esdlupdrc": "esdlupdrc", 
        "mimantdrc": "mimantdrc",
        "srampattern": "srampattern",
			"pg_opens": "Power Ground Open",
			"sh": "Self Heat",
			"sf": "S-Factor",
			"dvd": "Ir Drop",
			"dvd15percent": "15% Ir Drop",
			"dvd22percent": "22% Ir Drop",
			"dvdA0_signoff": "22% Ir Drop + waiver",
			"dvdlowstafreq": "Ir Drop low sta freq",
			"gateddvd":"gateddvd",
			"ungateddvd":"ungateddvd",
			"stair": "StaIR",
			"idr" : "Metal-Via Idr",
			"fish" : "FISH",
		"sig.metal.avg" : "sigmetalavg_ind",
		"sig.metal.peak" : "sigmetalpeak_ind",
		"sig.metal.rms" : "sigmetalrms_ind",
		"power.metal.avg" : "powermetalavg_ind",
		"power.metal.peak" : "powermetalpeak_ind",
		"power.metal.rms" : "powermetalrms_ind",
		"sig.via.avg" : "sigviaavg_ind",
		"sig.via.peak" : "sigviapeak_ind",
		"sig.via.rms" : "sigviarms_ind",
		"power.via.avg" : "powerviaavg_ind",
		"power.via.peak" : "powerviapeak_ind",
		"power.via.rms" : "powerviarms_ind",
		"press" : "press;",
		"sig.metal.avg_dt" : "sigmetalavg_dt",
		"sig.metal.peak_dt" : "sigmetalpeak_dt",
		"sig.metal.rms_dt" : "sigmetalrms_dt",
		"power.metal.avg_dt" : "powermetalavg_dt",
		"power.metal.peak_dt" : "powermetalpeak_dt",
		"power.metal.rms_dt" : "powermetalrms_dt",
		"sig.via.avg_dt" : "sigviaavg_dt",
		"sig.via.peak_dt" : "sigviapeak_dt",
		"sig.via.rms_dt" : "sigviarms_dt",
		"power.via.avg_dt" : "powerviaavg_dt",
		"power.via.peak_dt" : "powerviapeak_dt",
		"power.via.rms_dt" : "powerviarms_dt",
			"sig.metal.rms.150_dt" : "sig.metal.rms.violations150_dt",
			"sig.metal.avg.a0final_dt" : "sig.metal.avg.violationsa0finala0final_dt",
			"sig.metal.peak.a0final_dt" : "sig.metal.peak.violationsa0final_dt",
			"sig.metal.rms.a0final_dt" : "sig.metal.rms.violationsa0final_dt",
			"power.metal.avg.a0final_dt" : "power.metal.avg.violationsa0final_dt",
			"power.metal.peak.a0final_dt" : "power.metal.peak.violationsa0final_dt",
			"power.metal.peak.a0.tapein" : ".rhsc.power.metal.peak.violations_tapein_a0final_dt",
			"power.metal.rms.a0final_dt" : "power.metal.rms.violationsa0final_dt",
			"sig.via.avg.a0final_dt" : "sig.via.avg.violationsa0final_dt",
			"sig.via.peak.a0final_dt" : "sig.via.peak.violationsa0final_dt",
			"sig.via.rms.a0final_dt" : "sig.via.rms.violationsa0final_dt",
			"power.via.avg.a0final_dt" : "power.via.avg.violationsa0final_dt",
			"power.via.peak.a0final_dt" : "power.via.peak.violationsa0final_dt",
			"power.via.rms.a0final_dt" : "power.via.rms.violationsa0final_dt",
		"sig.metal.avg_normal" : "sigmetalavg",
		"sig.metal.peak_normal" : "sigmetalpeak",
		"sig.metal.rms_normal" : "sigmetalrms",
		"power.metal.avg_normal" : "powermetalavg",
		"power.metal.peak_normal" : "powermetalpeak",
		"power.metal.rms_normal" : "powermetalrms",
		"sig.via.avg_normal" : "sigviaavg",
		"sig.via.peak_normal" : "sigviapeak",
		"sig.via.rms_normal" : "sigviarms",
		"power.via.avg_normal" : "powerviaavg",
		"power.via.peak_normal" : "powerviapeak",
		"power.via.rms_normal" : "powerviarms",
				"power.metal.avg_dataTR0.2" : "power.metal.avg_dataTR0.2",
				"power.via.avg_dataTR0.2" : "power.via.avg_dataTR0.2",
				"power.metal.peak_dataTR0.2" : "power.metal.peak_dataTR0.2",
			"ir_no_tw" : "ir_no_tw",
			"em_no_tw" : "em_no_tw",
			"7rescheck" : "rescheck7",
			"260rescheck" : "rescheck260",
			"400rescheck" : "rescheck400",
			"90rescheck" : "90rescheck",
			"120rescheck" : "120rescheck",
			"SMP_Reff" : "SMP_Reff",
			"check_hip_pg" : "check_hip_pg",
			"check_aon_power_connection" : "check_aon_power_connection",
			"check_secondary_pg_cells" : "check_secondary_pg_cells",
		"dvd_manual_waiver" : "dvd_manual_waiver",
		"dvd_timing_final" : "dvd_timing_final",
		"dvd_timing_waiver" : "dvd_timing_waiver",
		"dvd_timing_debug" : "dvd_timing_debug",
		"powerfit" : "powerfit",
		"SHE" : "SHE",
		"pg_temp" : "pg_temp",
		"signal_temp" : "signal_temp",
		"metal.maxem.em" : "metal.maxem.em",
		"via.maxem.em" : "via.maxem.em",
		"metal.peak.em" : "metal.peak.em",
		"via.peak.em" : "via.peak.em",
		"Sfactor" : "Sfactor",
		"MaxLTE" : "MaxLTE",
		"SH" : "SH",
		"LIB" : "LIB",
		"apl_cap_check" : "apl_cap_check",
		"apl_current_check" : "apl_current_check",
		"ccs_timing_check" : "ccs_timing_check",
		"lef_check" : "lef_check",
		"lib_check" : "lib_check",
		"lib_nldm" : "lib_nldm",
		"spef_check" : "spef_check",
		"timing_window" : "timing_window",
		"timing_slew" : "timing_slew",
		"w2w.metal_dataTR0.5" : "w2w.metal_dataTR0.5",
		"w2w.via_dataTR0.5" : "w2w.via_dataTR0.5",
		"w2w.metal_dataTR0.2" : "w2w.metal_dataTR0.2",
		"w2w.via_dataTR0.2" : "w2w.via_dataTR0.2",
		"droppedSignals" : "droppedSignals",
		//105 thresholds
		"power.metal.avg.105_dt" : "power.metal.avg.105_dt",
		"power.via.avg.105_dt" : "power.via.avg.105_dt",
		"power.metal.peak.105_dt" : "power.metal.peak.105_dt",
		"sig.metal.peak.105_dt" : "sig.metal.peak.105_dt"
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
router.get('/rvstatussr0', function (req, res) {
    var toolList = ["populate","socrv_prep", "socrv_bind","socrv_staticir", "socrv_dynamicir",  "socrv_staticem", "socrv_sigem", "socrv_thermal", "socrv_report"];
    var status = rvStatus.access_rv_status();
    res.render('rv_status_sr0', { title: 'RV Indicator TGLSR0P10', testing: status[2], Tools: toolList, lastupdate: status[3]})
});

router.get('/rvindicatorsr0', function (req, res) {
    var status = rvStatus.access_rv_indicators();
    res.render('rv_indicator_sr0', { title: 'RV Indicator TGLSR0P10', testing: status[TGLSR0], Tools: status[TGLSR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated']})
});
router.get('/lvindicatorsr0', function (req, res) {
    var status = rvStatus.access_lv_indicators();
    res.render('lv_indicator_sr0', { title: 'LV Indicator TGLSR0P10', testing: status[TGLSR0], Tools: status[TGLSR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

router.get('/rvindicatormtlca0', function (req, res) {
    var status = rvStatus.access_rvmtlca0_indicators();
    res.render('rv_indicator_mtlca0', { title: 'RV Indicator RVMTLCA0', testing: status[RVMTLCA0], Tools: status[RVMTLCA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlcp0', function (req, res) {
    var status = rvStatus.access_rvmtlcp0_indicators();
    res.render('rv_indicator_mtlcp0', { title: 'RV Indicator RVMTLCP0', testing: status[RVMTLCP0], Tools: status[RVMTLCP0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlcb0', function (req, res) {
    var status = rvStatus.access_rvmtlcb0_indicators();
    res.render('rv_indicator_mtlcb0', { title: 'RV Indicator RVMTLCB0', testing: status[RVMTLCB0], Tools: status[RVMTLCB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlcc0', function (req, res) {
    var status = rvStatus.access_rvmtlcc0_indicators();
    res.render('rv_indicator_mtlcc0', { title: 'RV Indicator RVMTLCC0', testing: status[RVMTLCC0], Tools: status[RVMTLCC0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlcr0', function (req, res) {
    var status = rvStatus.access_rvmtlcr0_indicators();
    res.render('rv_indicator_mtlcr0', { title: 'RV Indicator RVMTLCR0', testing: status[RVMTLCR0], Tools: status[RVMTLCR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

*/
router.get('/rvindicatormtlcs0', function (req, res) {
    var status = rvStatus.access_rvmtlcs0_indicators();
    res.render('rv_indicator_mtlcs0', { title: 'RV Indicator RVMTLCS0', testing: status[RVMTLCS0], Tools: status[RVMTLCS0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlce0', function (req, res) {
    var status = rvStatus.access_rvmtlce0_indicators();
    res.render('rv_indicator_mtlce0', { title: 'RV Indicator RVMTLCE0', testing: status[RVMTLCE0], Tools: status[RVMTLCE0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
/*
router.get('/rvindicatormtlsocna0', function (req, res) {
    var status = rvStatus.access_rvmtlsocna0_indicators();
    res.render('rv_indicator_mtlsocna0', { title: 'RV Indicator RVMTLSOCNA0', testing: status[RVMTLSOCNA0], Tools: status[RVMTLSOCNA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
//###########3
router.get('/rvindicatormtlsocnb0', function (req, res) {
    var status = rvStatus.access_rvmtlsocnb0_indicators();
    res.render('rv_indicator_mtlsocnb0', { title: 'RV Indicator RVMTLSOCNB0', testing: status[RVMTLSOCNB0], Tools: status[RVMTLSOCNB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

*/
router.get('/rvindicatormtlsocnc0', function (req, res) {
    var status = rvStatus.access_rvmtlsocnc0_indicators();
    res.render('rv_indicator_mtlsocnc0', { title: 'RV Indicator RVMTLSOCNC0', testing: status[RVMTLSOCNC0], Tools: status[RVMTLSOCNC0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlsocnk0', function (req, res) {
    var status = rvStatus.access_rvmtlsocnk0_indicators();
    res.render('rv_indicator_mtlsocnk0', { title: 'RV Indicator RVMTLSOCNK0', testing: status[RVMTLSOCNK0], Tools: status[RVMTLSOCNK0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
/*router.get('/rvindicatormtlsocnb0indu', function (req, res) {
    var status = rvStatus.access_rvmtlsocnb0indu_indicators();
    res.render('rv_indicator_mtlsocnb0indu', { title: 'RV Indicator RVMTLSOCNB0 Industrial', testing: status[RVMTLSOCNB0], Tools: status[RVMTLSOCNB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlsocsna0', function (req, res) {
    var status = rvStatus.access_rvmtlsocsna0_indicators();
    res.render('rv_indicator_mtlsocsna0', { title: 'RV Indicator RVMTLSOCSNA0', testing: status[RVMTLSOCSNA0], Tools: status[RVMTLSOCSNA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
*/
router.get('/rvindicatormtlsocsnb0', function (req, res) {
    var status = rvStatus.access_rvmtlsocsnb0_indicators();
    res.render('rv_indicator_mtlsocsnb0', { title: 'RV Indicator RVMTLSOCSNB0', testing: status[RVMTLSOCSNB0], Tools: status[RVMTLSOCSNB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatormtlsocsnr0', function (req, res) {
    var status = rvStatus.access_rvmtlsocsnr0_indicators();
    res.render('rv_indicator_mtlsocsnr0', { title: 'RV Indicator RVMTLSOCSNR0', testing: status[RVMTLSOCSNR0], Tools: status[RVMTLSOCSNR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

router.get('/rvindicatorarlca0', function (req, res) {
    var status = rvStatus.access_rvarlca0_indicators();
    res.render('rv_indicator_arlca0', { title: 'RV Indicator ARLCPXA0', testing: status[RVARLCPXA0], Tools: status[RVARLCPXA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatorarlcsp0', function (req, res) {
    var status = rvStatus.access_rvarlcsp0_indicators();
    res.render('rv_indicator_arlcsp0', { title: 'RV Indicator ARLCSP0', testing: status[RVARLCSP0], Tools: status[RVARLCSP0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatorarlcb0', function (req, res) {
    var status = rvStatus.access_rvarlcb0_indicators();
    res.render('rv_indicator_arlcb0', { title: 'RV Indicator ARLCB0', testing: status[RVARLCB0], Tools: status[RVARLCB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
//1278.2
router.get('/rvindicatorarlcpa0', function (req, res) {
    var status = rvStatus.access_rvarlcpa0_indicators();
    res.render('rv_indicator_arlcpa0', { title: 'RV Indicator ARLCPA0', testing: status[RVARLCPA0], Tools: status[RVARLCPA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
//RVARLCPA0
router.get('/rvindicatorarlcpb0', function (req, res) {
    var status = rvStatus.access_rvarlcpb0_indicators();
    res.render('rv_indicator_arlcpb0', { title: 'RV Indicator ARLCPB0', testing: status[RVARLCPB0], Tools: status[RVARLCPB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

//RVARLCPA0
router.get('/rvindicatorarlcpb0_preswap', function (req, res) {
    var status = rvStatus.access_rvarlcpb0_preswap_indicators();
    res.render('rv_indicator_arlcpb0_preswap', { title: 'RV Indicator ARLCPB0 preswap', testing: status[RVARLCPB0 + "_preswap" ], Tools: status[RVARLCPB0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
//RVARLCPA0


router.get('/rvindicatorarlcj0', function (req, res) {
    var status = rvStatus.access_rvarlcj0_indicators();
    res.render('rv_indicator_arlcj0', { title: 'RV Indicator ARLCJ0', testing: status[RVARLCJ0], Tools: status[RVARLCJ0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/rvindicatorarlcr0', function (req, res) {
    var status = rvStatus.access_rvarlcr0_indicators();
    res.render('rv_indicator_arlcr0', { title: 'RV Indicator ARLCR0', testing: status[RVARLCR0], Tools: status[RVARLCR0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

//##PTL
router.get('/rvindicatorptla0', function (req, res) {
    var status = rvStatus.access_rvptla0_indicators();
    res.render('rv_indicator_ptla0', { title: 'RV Indicator PTLA0', testing: status[RVPTLA0], Tools: status[RVPTLA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});

//#############3
router.get('/lvindicatormtlca0', function (req, res) {
    var status = rvStatus.access_lvmtlca0_indicators();
    res.render('lv_indicator_mtlca0', { title: 'LV Indicator LVMTLCA0', testing: status[LVMTLCA0], Tools: status[LVMTLCA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
});
router.get('/lvindicatormtlsocna0', function (req, res) {
    var status = rvStatus.access_lvmtlsocna0_indicators();
    res.render('lv_indicator_mtlsocna0', { title: 'LV Indicator LVMTLSOCNA0', testing: status[LVMTLSOCNA0], Tools: status[LVMTLSOCNA0 + "_items"], tooltip_mapping: status['indicator_header_tooltip_mapping'], lastupdate: status['lastupdated'], datapath :status['datapath']})
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



/* old project
router.get('/rvindicatorsr0/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvsr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "TGLSR0RV", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/lvindicatorsr0/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_lvsr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "TGLSR0LV", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlca0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlca0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCA0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlcp0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlcp0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCP0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlcb0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlcb0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCB0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlcc0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlcc0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCC0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlcr0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlcr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCR0", header: header_dict[violation_type] + ' for ' + partition});
});
*/
router.get('/rvmtlcs0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlcs0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCS0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlce0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlce0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLCE0", header: header_dict[violation_type] + ' for ' + partition});
});
/*
router.get('/rvmtlsocna0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocna0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCNA0", header: header_dict[violation_type] + ' for ' + partition});
});
//#####
router.get('/rvmtlsocnb0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocnb0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCNB0", header: header_dict[violation_type] + ' for ' + partition});
});
*/
router.get('/rvmtlsocnc0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocnc0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCNC0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlsocnk0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocnk0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCNK0", header: header_dict[violation_type] + ' for ' + partition});
});
/*
router.get('/rvmtlsocnb0induviolations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocnb0indu_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCNB0INDU", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlsocsna0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocsna0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCSNA0", header: header_dict[violation_type] + ' for ' + partition});
});
*/
router.get('/rvmtlsocsnb0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocsnb0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCSNB0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvmtlsocsnr0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvmtlsocsnr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVMTLSOCSNR0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvarlca0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlca0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCPXA0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvarlcsp0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcsp0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCSP0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvarlcb0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcb0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCB0", header: header_dict[violation_type] + ' for ' + partition});
});
//1278.2
router.get('/rvarlcpa0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcpa0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCPA0", header: header_dict[violation_type] + ' for ' + partition});
});
//RVARLCPA0
//#####
router.get('/rvarlcpb0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcpb0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCPB0", header: header_dict[violation_type] + ' for ' + partition});
});
//RVARLCPA0
router.get('/rvarlcpb0_preswapviolations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcpb0_preswap_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCPB0_preswap", header: header_dict[violation_type] + ' for ' + partition});
});
//RVARLCPA0


//#####
router.get('/rvarlcj0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcj0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCJ0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvarlcr0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvarlcr0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVARLCR0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/rvptla0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_rvptla0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "RVPTLA0", header: header_dict[violation_type] + ' for ' + partition});
});

router.get('/lvmtlca0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_lvmtlca0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "LVMTLCA0", header: header_dict[violation_type] + ' for ' + partition});
});
router.get('/lvmtlsocna0violations/loadviolation/', function(req, res){
    let partition = req.query.partition;
    let violation_type = req.query.viol_type
    var violation_content = violations.access_lvmtlsocna0_violations(partition, violation_type)
    res.render('violations', { title: title_dict[violation_type], partition: partition, violation_content: violation_content, version: "LVMTLSOCNA0", header: header_dict[violation_type] + ' for ' + partition});
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






