$(function(){
    $(`<link rel="stylesheet" href="css/proHeader.css">`).appendTo("head");
    $.ajax({
        url:"proHeader.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#proHeader")
        }
    })
});