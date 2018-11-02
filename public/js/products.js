$(function(){
    if(location.search.indexOf("kwords=")!=-1){
        var kwords=decodeURI(
            location.search.split("=")[1]
        );
           // 设置导航搜索结果
        var $search_result_nav = $("#search_result_nav");

        $search_result_nav.text(`  >${kwords}`);

        //
        var pno=0;
        function loadPage(no=0){//no:新页号
            pno=no;
            $.ajax({
                url:"http://localhost:3000/products",
                type:"get",
                data:{kwords,pno},
                dataType:"json",
                success:function(output){
                    //console.log(output.count);

                    //设置总产品数
                     $searchProCount =$("#searchProCount");
                      $searchProCount.text(output.count);


                    var { products,pageCount }=output;
                    var html="";
                    for(var p of products){
                        var {lid,title,price,md,details}=p;
                        html+=` <li>
                                <a href="product_details.html?lid=${lid}"  class="search_pro_img pro_item_href" ><img style="cursor: pointer;" target="_blank" src="${md}"  alt=""></a>
                                <div class="search_pro_price"  >￥${price.toFixed(2)}</div>
                                <div class="search_pro_name">
                                    <a href="product_details.html?lid=${lid}" class="ro_item_href" title="${details}">${details}</a></div>
                                <div class="icons_mark"><i class="sirendingzhi" title="私人定制"></i><i class="fenqifukuan" title="分期付款"></i><span class="youhuiquan">优惠券</span></div>

                            </li>`;
                    }
                    $plist.html(html);


  //HTML:   页码栏
                    var html="";
                    for(var i=1;i<=pageCount;i++){
                        //  页码
                        html+=`<a href="javascript://" class="despage ${i==pno+1?'activity':''}" data-value=${i}>${i}</a>`
                    }

                    //删除中间li:
                    $pager.children(":not(:first-child):not(:last-child)").remove();
                   //将html追加到上一页后
                    $pager.children().first().after(html)
                    if(pno==0){//如果当前页是第一页就禁用上一页
                        $pager.children().first().attr({"disabled":"disabled"})
                    }else{//否则就启用上一页
                        $pager.children().first().removeAttr("disabled");
                    }
                    if(pno==pageCount-1){
                        $pager.children().last().attr({"disabled":"disabled"})
                    }else{
                        $pager.children().last().removeAttr("disabled");
                    }
                }
            })
        }
        loadPage();
        //$.ajax({...})

        var $plist=$("#plist");
       var  $pager = $("#pager");
        //只在页面首次加载时，在分页按钮的父元素上绑定一次
        $pager.on("click","a",function(e){
            e.preventDefault();
            var $a=$(this);
            //除了禁用和当前正在激活按钮之外才能点击
            if(!$a.parent().is("disabled,.activity")){
                if($a.is(":first-child"))//上一页
                    var no=pno-1;//新页号=当前页号-1
                else if($a.is(":last-child"))
                    var no=pno+1;//新页号=当前页号+1
                else//1、2、3按钮
                    var no=$a.html()-1;//新页号=按钮内容-1
                loadPage(no);//重新加载新页号的页面内容
            }
        });



        /*
        //34行,href="cart.html"->href="#"
        $plist.on("click","button,a.btn",function(e){
            e.preventDefault();
            //获得目标元素保存在变量$btn中
            var $btn=$(this);
            if($btn.is("button")){
                //找到$btn旁边的input，保存在变量$input中
                var $input=$btn.siblings("input")
                //获得$input的内容保存在变量n中
                var n=parseInt($input.val())
                //如果$btn的内容是+
                if($btn.html()=="+")
                    n++;//n++
                else if(n>1)//否则，如果n>1
                    n--//n--
                //设置$input的内容是n
                $input.val(n);
            }else{
                (async function(){
                    var res=await $.ajax({
                        url:"http://localhost:3000/users/islogin",
                        type:"get",
                        dataType:"json"
                    });
                    if(res.ok==1){
                        var lid=$btn.attr("data-lid");
                        var count=$btn.siblings("input").val()
                        await $.ajax({
                            url:"http://localhost:3000/cart/add",
                            type:"get",
                            data:{lid,count}
                        })
                        $btn.siblings("input").val(1);
                        alert("添加成功！");
                    }else alert("请先登录!");
                })()
            }
        });

        async function loadCart(){
            var res=await $.ajax({
                url:"http://localhost:3000/users/islogin",
                type:"get",
                dataType:"json"
            });
            if(res.ok==0)
                alert("暂未登录，无法使用购物车");
            else{
                var res=await $.ajax({
                    url:"http://localhost:3000/cart/items",
                    type:"get",
                    dataType:"json"
                });
                var html="",total=0;
                for(var item of res){
                    var {iid,title,count,price}=item;
                    total+=price*count;
                    html+=` `;
                }
                $ulCart.children(":gt(0):not(:last)")
                    .remove();
                $ulCart.find("li:last-child>h4")//尾li中的h4
                    .html(`¥${total.toFixed(2)}`)
                    .parent()//尾li
                    .prev()//头li
                    .after(html);
            }
        }
        loadCart();
        var $ulCart=$("#cart");
        $ulCart.on("click","button",function(){
            var $btn=$(this);
            (async function(){
                var iid=$btn.attr("data-iid");
                var count=
                    $btn.parent().siblings("input").val();
                if($btn.html()=="+")
                    count++;
                else
                    count--;
                if(count==0)
                    if(!confirm("是否删除该商品？"))
                        return;//退出当前函数

                await $.ajax({
                    url:"http://localhost:3000/cart/update",
                    type:"get",
                    data:{iid,count}
                });
                loadCart()
            })()
        })*/
    }
});