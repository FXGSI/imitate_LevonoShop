$(function(){
    $(`<link rel="stylesheet" href="css/search.css">`).appendTo("head");
    $(`<link rel="stylesheet" href="css/login.css">`).appendTo("head");
    $.ajax({
        url:"topSearch.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#search");

            //遮罩框

            $("#login").click(function () {

                $("#ppMask").show();
                $("#loginWrapper").show();
            });

            $("#logo_close").click(function () {
                $("#ppMask").hide();
                $("#loginWrapper").hide();
            } );


           //1.查找触发事件元素
            var $btnSearch = $("#btnSearch"),
                $input = $btnSearch.next() ;
               console.log($input);

             $btnSearch.click(function () {
                   //2.查找要修改的元素
                   //3. 修改
                  var kw = $input.val().trim()   //删除字符串开始和末尾的空格
                    if(kw!=="")
                         location.href = `products.html?kwords=${kw}`;
               });
             $input.keyup(function (e) {
                  if(e.keyCode==13) $btnSearch.click()
             });

            if(location.search.indexOf("kwords")!=-1){
                var kwords=decodeURI(
                    location.search.split("=")[1]
                );
                $input.val(kwords)
            }

            $.ajax({
                url:"http://localhost:3000/users/islogin",
                type:"get",
                dataType:"json",
                success:function(res){
                    console.log(res.user_name)
                    if(res.ok==0){
                        $("#unlogin").show().next().hide();
                         $("#home_cart").click(function () {
                             alert("暂未登录，无法使用购物车");
                         })
                    }else{
                        $("#user_name").text(res.user_name);
                        $("#unlogin").hide().next().show();
                        $("#home_cart").attr("href","cart.html");
                    }
                }
            });
            $("#btnSignout").click(function(){
                $.ajax({
                    url:"http://localhost:3000/users/signout",
                    type:"get",
                    success:function(){ location.reload(); }
                })
            })


}
    });




});