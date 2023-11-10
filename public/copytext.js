
$(".fas.fa-copy.fa").on(
    "click", null, function(){
        $('.copytext').CopyToClipboard();
        console.log("Success!")
    }
)