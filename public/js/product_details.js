$(function() {
    if(location.search.indexOf("lid=")!=-1) {
        var lid = location.search.split("=")[1];
        (async function(){
            var res=await $.ajax({
                url:"http://localhost:3000/details",
                type:"get",
                data:{lid},  //"lid="+lid,
                dataType:"json"
            })

             console.log(product)
             var {product,pics,specs}=res;
              var {title,subtitle,price,promise,details}=product;

            console.log(res)
             $("#nav_con_tit").html(title)
            $("#span_product_name").html(title)
            $("#div_product_dec").html(details)
            $("#pc_promotion p:first-child").html(subtitle)
            $("#span_price").html(price.toFixed(2))
            //将lid 值赋值给加入购物车按钮
             $("#jrgwc").attr("data-lid",lid)

             var ul=$("#detail_playPicture_list ul")
            var html="";
            for(var pic of pics){
                var {sm,md,lg}=pic;


                 html+=`<li data-index="2" class="">
                            <a href="javascript:;">
                                <img src="${sm}"
                                     data-md="${md}"                                    alt="联想 图片" width="100%">
                            </a>
                        </li>`
            }

             ul.html(html)
              $("#winpic").attr("src" , pics[0].md)


     $("#guige>li span").click(function () {
            $(this).addClass("active");
            $(this).siblings().removeClass("active")
        })

        var count = $("#buy_number").val() * 1;
        $("#reduce_buy_number").click(function () {
            if (count > 1) {
                $("#buy_number").val(count -= 1);
                $("#span_price").text((price() * count).toFixed(2))


            }
        });

        $("#add_buy_number").click(function () {

            $("#buy_number").val(count += 1);
            $("#span_price").html(function () {
                $("#span_price").text((price() * count).toFixed(2))


            })

        });
        var price = (function () {
            var pri = $("#span_price").text();

            return function () {
                return pri
            }
        })();

//加入购物车
            $("#jrgwc").click(function () {
                console.log("点击")
                var $btn = $(this);
                // console.log(n);

                (async function () {
                    var res = await $.ajax({
                        url: "http://localhost:3000/users/islogin",
                        type: "get",
                        dataType: "json"
                    });
                    if (res.ok == 1) {
                        var lid = $btn.attr("data-lid");
                        await $.ajax({
                            url: "http://localhost:3000/cart/add",
                            type: "get",
                            data: {lid, count}
                        })

                        alert("添加成功")

                    } else alert("请先登录！");
                })()
               });

            $("#ljgm").click(function () {


                 $(this).attr("href","cart.html")
            })




// 商品详情图片 视频

        var $prev = $("#play_picture_leftbtn");
        var $next = $("#play_picture_rightbtn");
        var $ul = $("#detail_playPicture_list>ul");
        var moved = 0, LIWIDTH = 98;
//前进按钮
        $next.click(function () {
            var $next = $(this);

            if (!$next.is(".disabled")) {
                moved++;
                $ul.css("left", -LIWIDTH * moved);
                $prev.removeAttr("disabled");
                $prev.removeClass("disabled");

                if ($ul.children().length - 5 == moved) {

                    $next.addClass("disabled");
                    $next.attr({"disabled": "disabled"});
                }
            }
        })
//后退按钮
        $prev.click(function () {
            var $prev = $(this);

            if (!$prev.is(".disabled")) {
                moved--;
                $ul.css("left", -LIWIDTH * moved);
                $next.removeAttr("disabled");
                $next.removeClass("disabled");
                console.log(moved)
                if (moved == 0) {
                    $prev.addClass("disabled");
                    $prev.attr({"disabled": "disabled"});
                }
            }
        })
        $ul.children().click(function () {
            $(this).addClass("checked").siblings().removeClass("checked")
        })

        var $mImg = $("#detail_left>#winpic");

        $ul.on("click", "img", function () {
            var $img = $(this);
            var md = $img.attr("data-md");
            $mImg.attr("src", md);

        })

//视频
        $("#detail_left .closevedio").click(function () {
            $("#detail_left .mvideo").css({"display": "none"})
            $("#winpic").css({"display": "block"});
            $("#showVideoBtn").css({"display": "block"});
        });

        $("#showVideoBtn").click(function () {
            $(this).css({"display": "none"});
            $("#winpic").css({"display": "none"});

            $("#detail_left .mvideo").css({"display": "block"})
        })
        })()
    }
    });