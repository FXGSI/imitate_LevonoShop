
$(function(){

    $(`<link rel="stylesheet" href="css/login.css">`).appendTo("head");
    $.ajax({
        url:"login.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#loginMask");


            $("#login_in").click(function () {
                var uname=$("#login_uname").val();
                 var upwd =$("#login_upwd").val();

                (async function () {
                   var res=await $.ajax({
                       url:"http://localhost:3000/users/signin",
                       type:"POST",
                       data:{uname,upwd},
                       dataType:"json"
                   });
                     if(res.ok==0){
                         $("#login_error").css({"display":"block"})
                      $("#login_errMsg").html(res.msg)}
                    else{
                        alert("登录成功！即将返回当前页面");
                         // if(location.search.startsWith("?back=")){
                         //    var url =location.search.slice(6)
                         // }
                         var url =location.search;
                         // else{
                         //    var url="index.html"
                         // }
                          location.href = url;
                     }

                })()

            })

        }
    });

});





