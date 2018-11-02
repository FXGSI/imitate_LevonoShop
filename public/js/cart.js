$(function() {
    $(` <link rel="stylesheet" href="css/cart.css">`).appendTo("head");

    async function loadCart(){




        var res = await $.ajax({
            url: "http://localhost:3000/users/islogin",
            type: "get",
            dataType: "json"
        });

        if (res.ok == 0)
            alert("暂未登录，无法使用购物车");
        else {
            var res = await $.ajax({
                url: "http://localhost:3000/cart/items",
                type: "get",
                dataType: "json"
            })

            console.log(res);

            var html ="", total=0;

            for (var item of res) {
                var {iid, title, count, price, md} = item;
                total += price * count;
                html += `
   <div class="row clearfix">
 <div class="cart-pro"><a href="#"><img src="${md}" alt=""></a> <a
                href="#"><div class="cart-pro-tit">${title}</div></a></div>
                <div class="cart-price">${price.toFixed(2)}</div>
                    <div class="cart-num">
                    <span class="btn reduce" data-class="reduce" data-iid="${iid}"> </span>
                    <input type="text" class="txt"  value="${count}">
                    <span class="btn add" data-class="add" data-iid="${iid}"></span>
                    </div>
                    <div class="cart-sum">${(price * count).toFixed(2)}</div>
                    <div class="cart-handle"><a  data-iid="${iid}" href="#">删除</a></div></div>`

            }
            $("#cart-list").html(html);

        }

        console.log( $("#cart-list").children().length);
        if ($("#cart-list").children().length){
            $("#bc_nopro").hide()
        }else   $("#bc_nopro").show()
    }

    loadCart()
    //点击加减

    $("#cart-list").on("click", ".cart-handle a,.cart-num span", function (e) {
        e.preventDefault();
        var $btn = $(this);
        (async function () {

            var iid =  $btn.attr("data-iid");


            var count = $btn.siblings("input").val();

            if ($btn.is("span")) {

                var $input = $btn.siblings("input");

                if ($btn.attr("data-class") == "add")
                    count++;
                else if (count > 1)
                    count--;
                $input.val(count);
                //console.log(count*)
                var pri = $btn.parent().siblings(".cart-price").html();
                $btn.parent().siblings(".cart-sum").html((count * pri).toFixed(2))
            } else {

                if (!confirm("是否删除该商品？"))
                    return;//退出当前函数
                 console.log(987);
                   console.log(iid);

                await $.ajax({
                    url:"http://localhost:3000/cart/update",
                    type:"get",
                    data:{iid,count}
                });
                loadCart()
            }

        })()

    })

});





