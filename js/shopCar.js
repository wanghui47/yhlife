var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'template1/shopcar.html',
      controller: 'shopCarCtrl'
    })
    .when('/shopcar', {
      templateUrl: 'template1/shopcar.html',
      controller: 'shopCarCtrl'
    })
    .when('/success', {
      templateUrl: 'template1/zhifuchenggong.html'
    })
    .when('/ordersubmit', {
      templateUrl: 'template1/ordersubmit.html',
      controller: 'submitCtrl'
    })
    .when('/dingdan', {
      templateUrl: 'template1/dingdan.html',
      controller: 'dingdanCtrl'
    })
    .otherwise({
      redirectTo: '/shopcar'
    });
});
app.controller('mainCtrl1', function($scope, $location) {
  $scope.GetQueryString = function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = '';
    if (r != null) context = r[2];
    reg = null;
    r = null;
    return context == null || context == '' || context == 'undefined'
      ? ''
      : context;
  };
  $scope.userphone = $scope.GetQueryString('phonenumber');
  console.log($scope.userphone);
  $scope.ren_goshouye = function() {
    window.location.href = './index.html?phonenumber=' + $scope.userphone;
  };
});
//购物车逻辑
app.controller('shopCarCtrl', function($scope, $location) {
  $scope.shopCar1 = [];
  $.ajax({
    type: 'get',
    dataType: 'jsonp',
    url:
      'http://101.132.96.6/yhlife/server/shopcar.php?phonenumber=' +
      $scope.userphone +
      '&flag=shopcar',
    async: true,
    jsonp: 'cb',
    success: function(data) {
      // console.log(data);
      $scope.$apply(function() {
        for (var i = 0; i < data.length; i++) {
          var obj = {};
          obj = {
            _id: data[i].shop,
            arr: [
              {
                id: data[i].id,
                name: data[i].name,
                size: data[i].size,
                color: data[i].color,
                price: data[i].price,
                count: data[i].count,
                src: data[i].src
              }
            ]
          };
          for (var j = 0; j < $scope.shopCar1.length; j++) {
            if (data[i].shop == $scope.shopCar1[j]._id) {
              //商店重复
              $scope.shopCar1[j].arr.push(obj.arr[0]);
              break;
            }
          }
          //商店不重复
          if (j == $scope.shopCar1.length) {
            $scope.shopCar1.push(obj);
          }
        }
      });
    }
  });
  // $scope.shopCar=[
  //     {
  //         _id:"海澜之家",
  //         arr:[
  //             {id:0,name:"《寻龙诀》北京保利龙旗广场", version:"国兴32G",color:"星钻黑",price:"35.0", count:"3"},
  //             {id:2,name:"《vivo》北京保利龙旗广场", version:"国兴32G",color:"玫瑰金",price:"35.0", count:"2"}
  //             ]
  //     },
  //     {
  //         _id:"特步旗舰店",
  //         arr:[{id:9,name:"25", version:"国兴32G",color:"玫瑰金",price:"35.0", count:"1",}]
  //     }
  // ]
  //设置多选框状态的方法
  $scope.clickQuanxuan = function() {
    console.log(
      $('#ly-shopcar>.ly-content>.three>.table>div:first-child>input')
    );
    $('#ly-shopcar>.ly-content>.three>.item>li>.name>input').prop(
      'checked',
      'true'
    );
    $('#ly-shopcar>.ly-content>.three>.table>div:first-child>input').prop(
      'checked',
      'true'
    );
  };

  //一个商品总价格
  $scope.shoptotalprice = function(obj) {
    var sum = obj.price * obj.count;
    sum = sum.toFixed(2);
    return sum;
  };
  //一个商店的商品总价格
  $scope.totalprice = function(w, obj) {
    var str = '.' + w + ' .checked';
    var a = document.querySelectorAll(str);
    var sum = 0;
    for (var i = 0; i < obj.arr.length; i++) {
      if (a[i].checked) {
        sum += obj.arr[i].count * obj.arr[i].price;
      }
    }
    sum = sum.toFixed(2);
    return sum;
  };
  //点击减
  $scope.clickShopCarsub = function(obj) {
    //购物车的商点种类
    for (var i = 0; i < $scope.shopCar1.length; i++) {
      // console.log($scope.shopCar[i].arr)
      //每个商店购物车的商品种类
      for (var j = 0; j < $scope.shopCar1[i].arr.length; j++) {
        if ($scope.shopCar1[i].arr[j].id == obj.id) {
          if ($scope.shopCar1[i].arr[j].count <= 0) {
            $scope.shopCar1[i].arr[j].count = 0;
          } else {
            $scope.shopCar1[i].arr[j].count--;
            $.ajax({
              type: 'get',
              dataType: 'jsonp',
              url:
                'http://101.132.96.6/yhlife/server/shopcarcount.php?id=' +
                $scope.shopCar1[i].arr[j].id +
                '&flag=sub',
              async: true,
              jsonp: 'cb',
              success: function(data) {
                console.log(data);
              }
            });
          }
          break;
        }
      }
    }
  };
  //点击加
  $scope.clickShopCaradd = function(obj) {
    //购物车的商点种类
    for (var i = 0; i < $scope.shopCar1.length; i++) {
      //每个商店购物车的商品种类
      for (var j = 0; j < $scope.shopCar1[i].arr.length; j++) {
        if ($scope.shopCar1[i].arr[j].id == obj.id) {
          $scope.shopCar1[i].arr[j].count++;
          $.ajax({
            type: 'get',
            dataType: 'jsonp',
            url:
              'http://101.132.96.6/yhlife/server/shopcarcount.php?id=' +
              $scope.shopCar1[i].arr[j].id +
              '&flag=add',
            async: true,
            jsonp: 'cb',
            success: function(data) {
              console.log(data);
            }
          });
          break;
        }
      }
    }
  };
  //删除商品
  $scope.deleteShop = function(obj) {
    // console.log(obj)
    // obj.count--;
    $scope.clickShopCarsub(obj);
    if (obj.count <= 0) {
      //获取元素的下标找不到时返回-1
      for (var i = 0; i < $scope.shopCar1.length; i++) {
        var j = $scope.shopCar1[i].arr.indexOf(obj);
        //找到时(找不到时返回-1,找到时返回下标)
        if (j != -1) {
          // console.log($scope.shopCar[i].arr.length)
          if ($scope.shopCar1[i].arr.length == 0) {
            $scope.shopCar1.splice(i, 1);
            break;
          } else {
            $scope.shopCar1[i].arr.splice(j, 1);
            break;
          }
        }
      }
      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url:
          'http://101.132.96.6/yhlife/server/shopcarcount.php?id=' +
          obj.id +
          '&flag=del',
        async: true,
        jsonp: 'cb',
        success: function(data) {
          console.log(data);
        }
      });
    }
  };
  //商品总价格
  $scope.getTotalMoney = function() {
    var a = document.querySelectorAll('.ren_price');
    // console.log(a)
    var sum = 0;
    for (var i = 0; i < $('.ren_price').length; i++) {
      //每个商店购物车的商品种类
      var b = $('.ren_price')
        .eq(i)
        .html();
      sum = sum + (b.replace('¥', '') - 0);
    }
    sum = sum.toFixed(2);
    return sum;
  };
  //点击去结算
  $scope.next = function() {
    var a = false;
    for (var i = 0; i < $scope.shopCar1.length; i++) {
      for (var j = 0; j < $scope.shopCar1[i].arr.length; j++) {
        if (
          $('.hou' + i + ' .checked')
            .eq(j)
            .prop('checked') == true
        ) {
          // console.log($scope.shopCar1[i].arr[j].id);
          $.ajax({
            type: 'get',
            dataType: 'jsonp',
            url:
              'http://101.132.96.6/yhlife/server/shopcarcount.php?id=' +
              $scope.shopCar1[i].arr[j].id +
              '&flag=checked',
            async: true,
            jsonp: 'cb',
            success: function(data) {
              // console.log(data);
            }
          });
          a = true;
        }
      }
    }
    if (a) {
      $location.path('/dingdan');
    } else {
      alert('请选择你要买的商品!!!');
    }
  };
});

app.controller('dingdanCtrl', function($scope, $location) {
  //获得地址
  $.ajax({
    type: 'get',
    url:
      'http://101.132.96.6/yhlife/server/shopcar.php?phonenumber=' +
      $scope.userphone +
      '&flag=addr',
    dataType: 'jsonp',
    async: true,
    jsonp: 'cb',
    success: function(data) {
      // console.log(data);
      $scope.$apply(function() {
        $scope.address = data;
      });
    }
  });
  //获取积分
  $.ajax({
    type: 'get',
    url:
      'http://101.132.96.6/yhlife/server/getintegral.php?phonenumber=' +
      $scope.userphone,
    dataType: 'jsonp',
    async: true,
    jsonp: 'cb',
    success: function(data) {
      // console.log(data);
      $scope.$apply(function() {
        $scope.havejifen = data;
      });
    }
  });
  //付钱
  $scope.paymoney = function() {
    var money = 0;
    money = $scope.gettotalmoney() - $scope.jifen / 100;
    money = money.toFixed(2);
    return money;
  };
  //获得积分
  $scope.getjifen = function() {
    var sum = $scope.paymoney() / 10;
    sum = Math.round(sum);
    return sum;
  };
  $scope.change = function() {
    if (
      $scope.havejifen - 0 < $scope.jifen - 0 ||
      $scope.gettotalmoney() <= ($scope.jifen - 0) / 100
    ) {
      $scope.jifen = 0;
      alert('对不起,你的积分不足或不能超出付款金额');
    }
  };

  //积分输入
  $scope.jifen = 0;

  $scope.dingdancar = [];
  $.ajax({
    type: 'get',
    url:
      'http://101.132.96.6/yhlife/server/shopcardingdan.php?phonenumber=' +
      $scope.userphone +
      '&flag=find',
    dataType: 'jsonp',
    async: true,
    jsonp: 'cb',
    success: function(data) {
      $scope.$apply(function() {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
          var obj = {};
          obj = {
            _id: data[i].shop,
            arr: [
              {
                id: data[i].id,
                name: data[i].name,
                size: data[i].size,
                color: data[i].color,
                price: data[i].price,
                count: data[i].count,
                src: data[i].src
              }
            ]
          };
          for (var j = 0; j < $scope.dingdancar.length; j++) {
            if (data[i].shop == $scope.dingdancar[j]._id) {
              //商店重复
              $scope.dingdancar[j].arr.push(obj.arr[0]);
              break;
            }
          }
          //商店不重复
          if (j == $scope.dingdancar.length) {
            $scope.dingdancar.push(obj);
          }
        }
      });
    }
  });
  //计算商品价格
  $scope.totalprice = function(obj) {
    var sum = obj.price * obj.count;
    sum = sum.toFixed(2);
    return sum;
  };
  //计算店铺商品价格
  $scope.totalPrice = function(obj) {
    // console.log(obj);
    var sum = 0;
    for (var i = 0; i < obj.arr.length; i++) {
      sum += obj.arr[i].count * obj.arr[i].price;
    }
    sum = sum.toFixed(2);
    return sum;
  };
  //计算总价格
  $scope.gettotalmoney = function() {
    var a = document.querySelectorAll('.ren_dingdan');
    // console.log(a)
    var sum = 0;
    for (var i = 0; i < $('.ren_dingdan').length; i++) {
      //每个商店购物车的商品种类
      var b = $('.ren_dingdan')
        .eq(i)
        .html();
      sum = sum + (b.replace('¥', '') - 0);
    }
    sum = sum.toFixed(2);
    return sum;
  };
  //设置默认地址
  $scope.shezhimorendizhi = function(index) {
    // console.log($index);
    $('#rh_dingdan>.rh-content>.three>li').css('border', 'none');
    $('#rh_dingdan>.rh-content>.three>li')
      .eq(index)
      .css('border', '1px solid red');

    $('#rh_dingdan>.rh-content>.three>li>.morendizhi').css('display', 'none');
    $('#rh_dingdan>.rh-content>.three>li>.morendizhi')
      .eq(index)
      .css('display', 'block');

    $('#rh_dingdan>.rh-content>.three>li>.shezhimorendizhi').css(
      'display',
      'block'
    );
    $('#rh_dingdan>.rh-content>.three>li>.shezhimorendizhi')
      .eq(index)
      .css('display', 'none');

    $('#rh_dingdan>.rh-content>.three>li>input')
      .eq(index)
      .prop('checked', 'checked');
    // console.log( $("#rh_dingdan>.rh-content>.three>li"));
  };
  //设置选中的地址
  $scope.xuanzhong = function(index) {
    $('#rh_dingdan>.rh-content>.three>li').css('border', 'none');
    $('#rh_dingdan>.rh-content>.three>li')
      .eq(index)
      .css('border', '1px solid red');
  };
  //提交订单
  $scope.submit = function() {
    //获取应付金额
    var money = $scope.paymoney();
    // console.log(money);
    var a = false;
    for (var i = 0; i < $scope.address.length; i++) {
      if (
        $('#rh_dingdan>.rh-content>.three>li>input')
          .eq(i)
          .prop('checked') == true
      ) {
        // console.log( $scope.address[i]);
        var obj = $scope.address[i];
        a = true;
      }
    }
    $.ajax({
      type: 'get',
      url:
        'http://101.132.96.6/yhlife/server/shopcardingdan.php?phonenumber=' +
        $scope.userphone +
        '&flag=del',
      dataType: 'jsonp',
      async: true,
      jsonp: 'cb',
      success: function(data) {
        console.log(data);
        if (a) {
          $location.path('/ordersubmit').search({ addr: obj, money: money });
        } else {
          alert('请选择你的收货地址!!!');
        }
      }
    });
  };
});
app.controller('submitCtrl', function($scope, $location, $routeParams) {
  $scope.addr = $routeParams.addr;
  $scope.money = $routeParams.money;
  layui.use('layer', function() {
    $scope.lijizhifu = function() {
      layer.alert('支付成功!!!');
    };
  });
});
