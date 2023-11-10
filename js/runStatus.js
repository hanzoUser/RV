var fs = require('fs');
var path = require('path');
var config = require('../config.json')

var currentPath = config['status_file_path']
if (config['local_setup']){
    var currentPath = process.cwd();
}

console.log(currentPath)


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
//2022 start
var RVMTLSOCNB0 = "RVMTLSOCNB0"
var RVMTLSOCNC0 = "RVMTLSOCNC0"
var RVMTLSOCNK0 = "RVMTLSOCNK0"
var RVMTLSOCNB0INDU = "RVMTLSOCNB0INDU"
var RVMTLSOCSNA0 = "RVMTLSOCSNA0"
var RVMTLSOCSNB0 = "RVMTLSOCSNB0"
var RVMTLSOCSNR0 = "RVMTLSOCSNR0"
var RVARLCPXA0 = "RVARLCPXA0"
var RVARLCSP0 = "RVARLCSP0"
var RVARLCB0 = "RVARLCB0"
var RVARLCPA0 = "RVARLCPA0"
var RVARLCPB0 = "RVARLCPB0"
var RVARLCPB0_preswap = "RVARLCPB0_preswap"


var RVARLCJ0 = "RVARLCJ0"
var RVARLCR0 = "RVARLCR0"
var RVPTLA0 = "RVPTLA0"

var run_status, tglrvindicators, tgllvindicators,lvmtlca0indicators,lvmtlsocna0indicators;
var rvmtlca0indicators,rvmtlcp0indicators,rvmtlcb0indicators,rvmtlcc0indicators,rvmtlcr0indicators,rvmtlcs0indicators,rvmtlce0indicators,rvmtlsocna0indicators;
var rvmtlsocnb0indicators,rvmtlsocnb0induindicators,rvmtlsocsna0indicators,rvarlca0indicators,rvarlcsp0indicators,rvarlcpa0indicators;;
var rvmtlsocnc0indicators,rvmtlsocsnb0indicators,rvmtlsocsnr0indicators,rvmtlsocnk0indicators,rvarlcb0indicators;
var rvarlcpb0indicators,rvarlcpb0_preswapindicators,rvarlcj0indicators,rvarlcr0indicators,rvptla0indicators;

read_files = function(){
    console.log("Reading files11...runStatus.js");
    console.log("Reading files22...");
    console.log("Reading files33...");
    console.log("Reading files44...");
    console.log("Reading files55...");
    console.log("Reading files66...");	
	
	
	console.log("Reading files777...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcpa0indicator.json'));
    rvarlcpa0indicators = JSON.parse(rawdata);
    console.log("Reading files778...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcpb0indicator.json'));
    rvarlcpb0indicators = JSON.parse(rawdata);
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcpb0_preswapindicator.json'));
    rvarlcpb0_preswapindicators = JSON.parse(rawdata);
	
	
    console.log("Reading files779...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvptla0indicator.json'));
    rvptla0indicators = JSON.parse(rawdata);
	


	var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocnc0indicator.json'));
    rvmtlsocnc0indicators = JSON.parse(rawdata);

	var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocnk0indicator.json'));
    rvmtlsocnk0indicators = JSON.parse(rawdata);

	/*
    var rawdata = fs.readFileSync(path.join(currentPath, 'lvmtlsocna0indicator.json'));
    lvmtlsocna0indicators = JSON.parse(rawdata);
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlca0indicator.json'));
    rvmtlca0indicators = JSON.parse(rawdata);
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlcp0indicator.json'));
    rvmtlcp0indicators = JSON.parse(rawdata);
	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlcb0indicator.json'));
    rvmtlcb0indicators = JSON.parse(rawdata);
	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlcc0indicator.json'));
    rvmtlcc0indicators = JSON.parse(rawdata);
	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlcr0indicator.json'));
    rvmtlcr0indicators = JSON.parse(rawdata);
	*/
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlcs0indicator.json'));
    rvmtlcs0indicators = JSON.parse(rawdata);
	
    console.log("Reading files771...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlce0indicator.json'));
    rvmtlce0indicators = JSON.parse(rawdata);
	/*
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocna0indicator.json'));
    rvmtlsocna0indicators = JSON.parse(rawdata);
	
    console.log("Reading files77...");	
	//#######2022
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocnb0indicator.json'));
    rvmtlsocnb0indicators = JSON.parse(rawdata);
	*/
	/*
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocnb0induindicator.json'));
    rvmtlsocnb0induindicators = JSON.parse(rawdata);
	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocsna0indicator.json'));
    rvmtlsocsna0indicators = JSON.parse(rawdata);
	*/
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocsnb0indicator.json'));
    rvmtlsocsnb0indicators = JSON.parse(rawdata);
	
	try {
    console.log("Reading files772...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvmtlsocsnr0indicator.json'));
    rvmtlsocsnr0indicators = JSON.parse(rawdata);
    } catch (error) {
      return null;
    }
	
	try {
    console.log("Reading files773...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlca0indicator.json'));
    rvarlca0indicators = JSON.parse(rawdata);
	
    console.log("Reading files774...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcsp0indicator.json'));
    rvarlcsp0indicators = JSON.parse(rawdata);

    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcb0indicator.json'));
    rvarlcb0indicators = JSON.parse(rawdata);

    console.log("Reading files775...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcj0indicator.json'));
    rvarlcj0indicators = JSON.parse(rawdata);
	
    console.log("Reading files776...");	
    var rawdata = fs.readFileSync(path.join(currentPath, 'rvarlcr0indicator.json'));
    rvarlcr0indicators = JSON.parse(rawdata);
   } finally {
      return null;
   }
   

	console.log("Reading files88donedonedone...");	
};

console.log("Reading files88...");	
exports.read_rv_queue = function(){
    console.log("Reading Queue...");
    var rawdata = fs.readFileSync(path.join(currentPath, 'queuejson', 'rvqueue.json'));
    return JSON.parse(rawdata)
}

exports.write_rv_queue = function(queue){
    fs.writeFileSync(path.join(currentPath, 'queuejson', 'rvqueue.json'),JSON.stringify(queue, null, 4));
}

exports.access_rv_status = function () {

    //read js file

    read_files();
    var flattened_status_b0 = {};
    var flattened_status_sp0 = {};
    var flattened_status_sr0 = {};

    var status_b0 = run_status[TGLB0];
    var status_sp0 = run_status[TGLSP0];
    var status_sr0 = run_status[TGLSR0];

    var everypartition;
    var everyfolder;

    //parsing status - flattening it for b0
    for (everypartition in status_b0){
        for (everyfolder in status_b0[everypartition]){
            flattened_status_b0[everyfolder] = status_b0[everypartition][everyfolder];
        }
    }

    for (everypartition in status_sp0){
        for (everyfolder in status_sp0[everypartition]){
            flattened_status_sp0[everyfolder] = status_sp0[everypartition][everyfolder];
        }
    }
    for (everypartition in status_sr0){
        for (everyfolder in status_sr0[everypartition]){
            flattened_status_sr0[everyfolder] = status_sr0[everypartition][everyfolder];
        }
    }

    var lastupdated = run_status['lastupdated'];
    return [flattened_status_b0, flattened_status_sp0, flattened_status_sr0, lastupdated];
};
/*
exports.access_rv_indicators = function () {
    read_files();
    //read js file
    return tglrvindicators;
};
exports.access_lv_indicators = function () {
    read_files();
    //read js file
    return tgllvindicators;
};
*/

console.log("Reading files99...");	
/*
exports.access_rvmtlca0_indicators = function () {
    read_files();
    //read js file
    return rvmtlca0indicators;
};
exports.access_rvmtlcp0_indicators = function () {
    read_files();
    //read js file
    return rvmtlcp0indicators;
};
exports.access_rvmtlcb0_indicators = function () {
    read_files();
    //read js file
    return rvmtlcb0indicators;
};
exports.access_rvmtlcc0_indicators = function () {
    read_files();
    //read js file
    return rvmtlcc0indicators;
};
exports.access_rvmtlcr0_indicators = function () {
    read_files();
    //read js file
    return rvmtlcr0indicators;
};
*/
exports.access_rvmtlcs0_indicators = function () {
    read_files();
    //read js file
    return rvmtlcs0indicators;
};
exports.access_rvmtlce0_indicators = function () {
    read_files();
    //read js file
    return rvmtlce0indicators;
};
/*
exports.access_rvmtlsocna0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocna0indicators;
};
exports.access_lvmtlca0_indicators = function () {
    read_files();
    //read js file
    return lvmtlca0indicators;
};

exports.access_lvmtlsocna0_indicators = function () {
    read_files();
    //read js file
    return lvmtlsocna0indicators;
};
//###2022
exports.access_rvmtlsocnb0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocnb0indicators;
};
*/
exports.access_rvmtlsocnc0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocnc0indicators;
};
exports.access_rvmtlsocnk0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocnk0indicators;
};
/*
exports.access_rvmtlsocnb0indu_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocnb0induindicators;
};

exports.access_rvmtlsocsna0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocsna0indicators;
};
*/
exports.access_rvmtlsocsnb0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocsnb0indicators;
};
exports.access_rvmtlsocsnr0_indicators = function () {
    read_files();
    //read js file
    return rvmtlsocsnr0indicators;
};


exports.access_rvarlca0_indicators = function () {
    read_files();
    //read js file
    return rvarlca0indicators;
};
exports.access_rvarlcsp0_indicators = function () {
    read_files();
    //read js file
    return rvarlcsp0indicators;
};
exports.access_rvarlcb0_indicators = function () {
    read_files();
    //read js file
    return rvarlcb0indicators;
};
exports.access_rvarlcpa0_indicators = function () {
    read_files();
    //read js file
    return rvarlcpa0indicators;
};
//###2022

exports.access_rvarlcpb0_indicators = function () {
    read_files();
    //read js file
    return rvarlcpb0indicators;
};
exports.access_rvarlcpb0_preswap_indicators = function () {
    read_files();
    //read js file
    return rvarlcpb0_preswapindicators;
};

exports.access_rvarlcj0_indicators = function () {
    read_files();
    //read js file
    return rvarlcj0indicators;
};
exports.access_rvarlcr0_indicators = function () {
    read_files();
    //read js file
    return rvarlcr0indicators;
};
exports.access_rvptla0_indicators = function () {
    read_files();
    //read js file
    return rvptla0indicators;
};
//##2023