var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'template/shouye.html',
      controller: 'shouyeCtrl'
    })
    .when('/shouye', {
      templateUrl: 'template/shouye.html',
      controller: 'shouyeCtrl'
    })
    .when('/jingxuan', {
      templateUrl: 'template/jingxuan.html',
      controller: 'jingxuanCtrl'
    })
    .when('/tejia', {
      templateUrl: 'template/tejia.html',
      controller: 'tejiaCtrl'
    })
    .when('/shangcheng', {
      templateUrl: 'template/shangcheng.html',
      controller: 'shangchengCtrl'
    })
    .when('/join', {
      templateUrl: 'template/join.html'
    })
    .when('/goodsDetail/:shop/:price', {
      templateUrl: 'template/goodsDetail.html',
      controller: 'goodsDetailCtrl'
    })
    .when('/shengqing', {
      templateUrl: 'template/shenqingruzhu.html',
      controller: 'shengqingCtrl'
    })
    .when('/shangjia/:shop', {
      templateUrl: 'template/rh_shangjia.html',
      controller: 'shangjiaCtrl'
    })
    .when('/sousuo', {
      templateUrl: 'template/rh_sousuo.html'
    })
    .when('/zhengping', {
      templateUrl: 'template/zhengping.html'
    })
    .when('/about', {
      templateUrl: 'template/aboutus.html',
      controller: 'aboutCtrl'
    })
    .when('/person', {
      templateUrl: 'template/person.html',
      controller: 'wh_scoreDetail'
    })
    .when('/shopcar', {
      templateUrl: 'template/shopcar.html',
      controller: 'shopcarCtrl'
    })
    .otherwise({
      redirectTo: '/shouye'
    });
});
app.controller('mainCtrl', function($scope, $location) {
  //当前搜索框必须有内容才会跳转路由(开始)
  $scope.clickme = function() {
    var inputs = $('#wh_middleContent>ul>li:nth-of-type(2)>input');
    var searchBtn = $(
      '#wh_middleContent>ul>li:nth-of-type(2)>a:nth-of-type(1)'
    );
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).css('display') == 'inline-block') {
        if ($(inputs[i]).val() == '') {
          alert('当前搜索词为空,请重新输入!');
        } else {
          $scope.searchWord = $(inputs[i]).val();
          $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            async: true,
            jsonp: 'cb',
            url:
              'http://101.132.96.6/yhlife/server/selectStoreDetail.php?searchWord=' +
              $scope.searchWord,
            success: function(data) {
              $scope.$apply(function() {
                if (data == 'sreach word is null') {
                  alert('搜索词为空!请输入搜索词!');
                } else if (data == 'select failed') {
                  alert('根据当前搜索词搜索结果为空!');
                } else {
                  $scope.searchResult = data;
                }
              });
            },
            error: function() {
              alert('请求出错');
            }
          });
          $location.path('/sousuo');
        }
      }
    }
  };
  //当前搜索框必须有内容才会跳转路由(结束)

  $scope.entersearch = function(e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.clickme();
    }
  };

  //获取到传过来的手机号并显示逻辑开始
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
  //获取到传过来的手机号并显示逻辑结束

  $scope.rh_location = '首页';
  $scope.pingpais = [
    './img/pingpai1.png',
    './img/pingpai2.png',
    './img/pingpai3.png',
    './img/pingpai4.png',
    './img/pingpai5.png',
    './img/pingpai6.png',
    './img/pingpai7.png',
    './img/pingpai8.png',
    './img/pingpai9.png',
    './img/pingpai10.png',
    './img/pingpai11.png',
    './img/pingpai12.png'
  ];

  $scope.ren_goshopcar = function() {
    window.location.href = './shopCar.html?phonenumber=' + $scope.userphone;
  };
});
app.controller('shouyeCtrl', function($scope, $location, $routeParams) {
  var rhSwiper = new Swiper('#rh_shouye .swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '#rh_shouye .swiper-pagination',
    //自动播放
    autoplay: 2000,
    //动画效果  (cube fade overflow  flip)
    effect: 'overflow'
  });
  $scope.clickAction = function(index) {
    $('#rh_shouye>.two>.cars .marks>.right>.line').css(
      'left',
      index * 100 + 'px'
    );
    if (index == 0) {
      $('#rh_shouye>.two>.cars>.blocks>.right>ul').css('display', 'none');
      $('#rh_shouye>.two>.cars>.blocks>.right>.baokuan').css(
        'display',
        'block'
      );
    } else if (index == 1) {
      $('#rh_shouye>.two>.cars>.blocks>.right>ul').css('display', 'none');
      $('#rh_shouye>.two .blocks>.right>.nvzuang').css('display', 'block');
    } else {
      $('#rh_shouye>.two>.cars>.blocks>.right>ul').css('display', 'none');
      $('#rh_shouye>.two .blocks>.right>.nanzuang').css('display', 'block');
    }
  };
  $scope.clickHotel = function(index) {
    $('#rh_shouye>.two>.hotel .marks>.right>.line').css(
      'left',
      index * 100 + 'px'
    );
    if (index == 0) {
      $('#rh_shouye>.two>.hotel>.blocks>.right>ul').css('display', 'none');
      $('#rh_shouye>.two>.hotel>.blocks>.right>.baokuan').css(
        'display',
        'block'
      );
    } else if (index == 1) {
      $('#rh_shouye>.two>.hotel>.blocks>.right>ul').css('display', 'none');
      $('#rh_shouye>.two>.hotel>.blocks>.right>.nvzuang').css(
        'display',
        'block'
      );
    } else {
      $('#rh_shouye>.two>.hotel>.blocks>.right>ul').css('display', 'none');
      $('#rh_shouye>.two>.hotel>.blocks>.right>.nanzuang').css(
        'display',
        'block'
      );
    }
  };
  $scope.cars = [
    {
      src: './img/car1.png',
      des: '同城汽车装饰中心',
      name: '罗阳1',
      phone: 19541,
      addr: '郑州市莲花街55号'
    },
    {
      src: './img/car2.png',
      des: '同城汽车装饰中心',
      name: '罗阳2',
      phone: 24547,
      addr: '郑州市莲花街56号'
    },
    {
      src: './img/car3.png',
      des: '同城汽车装饰中心',
      name: '罗阳3',
      phone: 345427,
      addr: '郑州市莲花街57号'
    },
    {
      src: './img/car4.png',
      des: '同城汽车装饰中心',
      name: '罗阳44',
      phone: 447474,
      addr: '郑州市莲花街58号'
    },
    {
      src: './img/car5.png',
      des: '同城汽车装饰中心',
      name: '罗阳5',
      phone: 5242,
      addr: '郑州市莲花街59号'
    },
    {
      src: './img/car6.png',
      des: '同城汽车装饰中心',
      name: '罗阳6424',
      phone: 6242,
      addr: '郑州市莲花街60号'
    }
  ];
  $scope.cargirl = [
    {
      src: './img/man5.png',
      des: '同城汽车装饰中心',
      name: '罗阳988663',
      phone: 77521,
      addr: '郑州市莲花街55号'
    },
    {
      src: './img/man6.png',
      des: '同城汽车装饰中心',
      name: '罗阳98869',
      phone: 77521,
      addr: '郑州市莲花街55号'
    }
  ];
  $scope.dress = [
    {
      src: './img/man1.png',
      des: '同城汽车装饰中心',
      name: '罗阳9886',
      phone: 77521,
      addr: '郑州市莲花街55号'
    },
    {
      src: './img/man2.png',
      des: '同城汽车装饰中心',
      name: '罗阳2477',
      phone: 1424,
      addr: '郑州市莲花街56号'
    },
    {
      src: './img/man3.png',
      des: '同城汽车装饰中心',
      name: '罗阳31447',
      phone: 24242,
      addr: '郑州市莲花街57号'
    },
    {
      src: './img/man4.png',
      des: '同城汽车装饰中心',
      name: '罗阳4444444444',
      phone: 2424,
      addr: '郑州市莲花街58号'
    },
    {
      src: './img/man5.png',
      des: '同城汽车装饰中心',
      name: '罗阳5557',
      phone: 2424,
      addr: '郑州市莲花街59号'
    },
    {
      src: './img/man6.png',
      des: '同城汽车装饰中心',
      name: '罗阳6666',
      phone: 4224575,
      addr: '郑州市莲花街60号'
    }
  ];
  $scope.hopes = [
    {
      src: './img/house1.png',
      des: '三亚酒店服务中心',
      name: '任志浩',
      phone: 1,
      addr: '郑州市莲花街55号'
    },
    {
      src: './img/house2.png',
      des: '三亚酒店服务中心',
      name: '任志浩',
      phone: 2,
      addr: '郑州市莲花街56号'
    },
    {
      src: './img/house3.png',
      des: '三亚酒店服务中心',
      name: '任志浩',
      phone: 3,
      addr: '郑州市莲花街57号'
    },
    {
      src: './img/house4.png',
      des: '三亚酒店服务中心',
      name: '任志浩',
      phone: 4,
      addr: '郑州市莲花街58号'
    },
    {
      src: './img/house5.png',
      des: '三亚酒店服务中心',
      name: '任志浩',
      phone: 5,
      addr: '郑州市莲花街59号'
    },
    {
      src: './img/house6.png',
      des: '三亚酒店服务中心',
      name: '任志浩',
      phone: 6,
      addr: '郑州市莲花街60号'
    }
  ];
  $scope.hotelgirl = [
    {
      src: './img/home4.png',
      des: '三亚酒店装饰中心',
      name: '王辉',
      phone: 4,
      addr: '郑州市莲花街58号'
    },
    {
      src: './img/home5.png',
      des: '三亚酒店装饰中心',
      name: '王辉',
      phone: 5,
      addr: '郑州市莲花街59号'
    },
    {
      src: './img/home6.png',
      des: '三亚酒店装饰中心',
      name: '王辉',
      phone: 6,
      addr: '郑州市莲花街60号'
    }
  ];
  $scope.houses = [
    {
      src: './img/home1.png',
      des: '三亚酒店装饰中心',
      name: '王辉',
      phone: 1,
      addr: '郑州市莲花街55号'
    },
    {
      src: './img/home2.png',
      des: '三亚酒店装饰中心',
      name: '王辉',
      phone: 2,
      addr: '郑州市莲花街56号'
    },
    {
      src: './img/home3.png',
      des: '三亚酒店装饰中心',
      name: '王辉',
      phone: 3,
      addr: '郑州市莲花街57号'
    }
  ];
});
app.controller('jingxuanCtrl', function($scope, $location, $rootScope) {
  var mySwiper1 = new Swiper('#ly-jingxuan .swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '#ly-jingxuan .swiper-pagination',
    autoplay: 2000,
    effect: 'overflow'
  });
  $('.ly-content-car').mouseover(function() {
    $(this).css('backgroundColor', 'white');
  });
  $('.ly-content-car').mouseleave(function() {
    $(this).css('backgroundColor', '#f2f2f2');
  });
  $scope.cars = [
    {
      src: './img/car1.png',
      des: '同城汽车装饰中心',
      name: '罗阳1',
      phone: 19541,
      addr: '郑州市莲花街55号'
    },
    {
      src: './img/car2.png',
      des: '同城汽车装饰中心',
      name: '罗阳2',
      phone: 24547,
      addr: '郑州市莲花街56号'
    },
    {
      src: './img/car3.png',
      des: '同城汽车装饰中心',
      name: '罗阳3',
      phone: 345427,
      addr: '郑州市莲花街57号'
    },
    {
      src: './img/car4.png',
      des: '同城汽车装饰中心',
      name: '罗阳44',
      phone: 447474,
      addr: '郑州市莲花街58号'
    },
    {
      src: './img/car5.png',
      des: '同城汽车装饰中心',
      name: '罗阳5',
      phone: 5242,
      addr: '郑州市莲花街59号'
    },
    {
      src: './img/car6.png',
      des: '同城汽车装饰中心',
      name: '罗阳6424',
      phone: 6242,
      addr: '郑州市莲花街60号'
    }
  ];
  var index = 1;
  $('.ly-sousuo').click(function() {
    $('.ly-sousuo>img:nth-child(2)').css('display', 'none');
    if (index) {
      $('.ly-quyu>ul').css('display', 'block');
      index = !index;
    } else {
      $('.ly-sousuo>img:nth-child(2)').css('display', 'block');
      $('.ly-quyu>ul').css('display', 'none');
      $('.ly-quyu-fenzhi').css('display', 'none');
      index = !index;
    }
  });
  var inde = 2;
  $('.ly-quyu>ul>li:eq(0)').click(function() {
    if (inde) {
      $('.ly-quyu-fenzhi').css('display', 'block');
      inde = !inde;
    } else {
      $('.ly-quyu-fenzhi').css('display', 'none');
      inde = !inde;
    }
  });

  $rootScope.clickindex = '1';
  $('.ly-bottom .pages').click(function() {
    $('.ly-bottom span')
      .eq($(this).index())
      .addClass('beijingse')
      .siblings()
      .removeClass('beijingse');
    $rootScope.clickindex = $(this).attr('index');
  });
  $('.ly-bottom span')
    .eq(8)
    .click(function() {
      $rootScope.clickindex++;
      var lypages = $('.ly-bottom>.pages');
      for (var i = 0; i < lypages.length; i++) {
        $(lypages[i]).removeClass('beijingse');
      }
      if ($rootScope.clickindex - 1 > lypages.length - 1) {
        alert('到头了');
        return;
      } else {
        $(lypages[$rootScope.clickindex - 1]).addClass('beijingse');
      }
    });
  $('.ly-bottom span')
    .eq(1)
    .click(function() {
      $rootScope.clickindex--;
      var lypages = $('.ly-bottom>.pages');
      for (var i = 0; i < lypages.length; i++) {
        $(lypages[i]).removeClass('beijingse');
      }
      if ($rootScope.clickindex - 1 < 0) {
        alert('到头了');
        return;
      } else {
        $(lypages[$rootScope.clickindex - 1]).addClass('beijingse');
      }
    });
});
app.controller('shangchengCtrl', function($scope, $location) {
  var rhSwiper1 = new Swiper('#rh_shop .swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '#rh_shop .swiper-pagination',
    autoplay: 2000,
    effect: 'overflow'
  });
  $scope.nanshangyi = [
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 16.8
    },
    {
      src: './img/shangpin3.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 22.8
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 66.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 13.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 11.8
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 66.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 13.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      jifen: '50',
      price: 11.8
    }
  ];
});

app.controller('tejiaCtrl', function($scope, $location) {
  var lySwiper1 = new Swiper('#ly—tejia>.swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '#ly—tejia>.swiper-container>.swiper-pagination',
    autoplay: 2000,
    effect: 'overflow'
  });

  var swiper = new Swiper('#ly-fenzulunbo .swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 30
  });
  $scope.nanshangyi = [
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 11.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    },
    {
      src: './img/shangpin3.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 22.8
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 66.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 13.8
    }
  ];
});

app.controller('shangjiaCtrl', function($scope, $location, $routeParams) {
  $scope.shop = $routeParams.shop;

  $scope.allgood = [
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 11.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    },
    {
      src: './img/shangpin3.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 22.8
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 66.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 13.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 11.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 13.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 12.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 22.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 36.1
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 10.2
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 15.4
    }
  ];
  $scope.nanshangyi = [
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 11.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    },
    {
      src: './img/shangpin3.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 22.8
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 66.8
    },
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 13.8
    }
  ];
  //女上衣
  $scope.nvshangyi = [
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 11.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    }
  ];
  $scope.nanku = [
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 16.8
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 13.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 12.8
    }
  ];
  $scope.nvku = [
    {
      src: './img/shangpin5.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 22.8
    },
    {
      src: './img/shangpin1.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 36.1
    },
    {
      src: './img/shangpin2.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 10.2
    },
    {
      src: './img/shangpin4.png',
      des: '自家礼包送亲人，送朋友的不二选择。自家礼包...',
      price: 15.4
    }
  ];
  $scope.clickPre = function() {
    $('#rh_shangjia>.one>.left>.lunbo>.img>ul').css('left', '0px');
  };
  $scope.clickNext = function() {
    $('#rh_shangjia>.one>.left>.lunbo>.img>ul').css('left', '-300px');
  };
  $scope.clickTitle = function(index) {
    $('#rh_shangjia>.two>.title>li')
      .eq(index)
      .addClass('active')
      .siblings()
      .removeClass('active');
    $('#rh_shangjia>.two>.item')
      .eq(index)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };
});
app.controller('goodsDetailCtrl', function($scope, $location, $routeParams) {
  $scope.shop = $routeParams.shop;
  $scope.li_price = $routeParams.price;
  layui.use('layer', function() {
    $scope.clickJoinCar = function() {
      //获取手机号
      var phonenumber = $('#wh_topContent>p>a:nth-child(2)').html();
      //获取图片的src
      var src = $(
        '#wh_detailTop>.gallery-top>div:nth-child(1)>div:nth-child(1)'
      ).css('background-image');
      var src1 =
        './' + src.substring(src.indexOf('/img') + 1, src.indexOf('")'));
      //获取名字
      var name = $('#wh_detailTop1>p:nth-child(1)').html();

      //获取店铺名称
      var shop = $('#wh_goodsDetail0>p>span:nth-child(1)').text();
      //获取尺寸
      for (var i = 0; i < $('#wh_detailShirtSize>button').length; i++) {
        if (
          $('#wh_detailShirtSize>button')
            .eq(i)
            .css('border') == '2px solid rgb(236, 106, 23)'
        ) {
          break;
        }
      }
      var size = $('#wh_detailShirtSize>button')
        .eq(i)
        .html();

      //获取颜色
      for (var i = 0; i < $('#wh_detailShirtColor button').length; i++) {
        if (
          $('#wh_detailShirtColor button')
            .eq(i)
            .css('border') == '2px solid rgb(236, 106, 23)'
        ) {
          break;
        }
      }
      var color = $('#wh_detailShirtColor button')
        .eq(i)
        .html();

      //获取价格
      var price = $('#wh_detailShirtPrice>p:first-child>.price>span').html();

      //获取数量
      var count = $('#wh_detailShirtPrice>p:nth-child(2)>.count').html();

      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url:
          'http://101.132.96.6/yhlife/server/joinshopcar.php?phonenumber=' +
          $scope.userphone +
          '&shop=' +
          shop +
          '&name=' +
          name +
          '&src=' +
          src1 +
          '&color=' +
          color +
          '&size=' +
          size +
          '&price=' +
          price +
          '&count=' +
          count,
        async: true,
        jsonp: 'cb',
        success: function(data) {
          if (data == 'success') {
            layer.confirm(
              '加入购物车成功',
              {
                btn: ['查看购物车', '继续购物'], //按钮
                area: ['300px', '200px']
              },
              function() {
                // layer.msg('的确很重要', {icon: 1});
                window.location.href =
                  './shopCar.html?phonenumber=' + $scope.userphone;
              },
              function() {}
            );
          }
        }
      });
    };
  });
  $.ajax({
    type: 'get',
    dataType: 'jsonp',
    url: 'http://101.132.96.6/yhlife/server/goodsdetail.php',
    async: true,
    jsonp: 'cb',
    success: function(data) {
      $scope.$apply(function() {
        // console.log(data);
        $scope.pingjia = data;
      });
    }
  });
});
//个人中心我的积分逻辑开始
app.controller('wh_scoreDetail', function($scope, $rootScope, $timeout, $http) {
  //个人资料修改手机逻辑开始

  //输入密码输入框
  var wh_tips = $('#wh_perRightBottom>i');

  //输入密码提示信息(错误,正确)
  $scope.pason = function() {
    var passwords1 = $('#wh_perRightBottom>input:nth-of-type(2)').val();
    if (passwords1 == '') {
      $(wh_tips[0]).css('display', 'none');
      $(wh_tips[1]).css('display', 'none');
    } else if (passwords1.length < 6 && passwords1.length > 0) {
      $(wh_tips[0]).css('display', 'inline');
      $(wh_tips[1]).css('display', 'none');
    } else if (passwords1.length >= 6 && passwords1.length <= 20) {
      $(wh_tips[0]).css('display', 'none');
      $(wh_tips[1]).css('display', 'inline');
    }
  };

  //确认密码提示信息(错误,正确)
  $scope.pason1 = function() {
    var passwords1 = $('#wh_perRightBottom>input:nth-of-type(2)').val();
    var passwords2 = $('#wh_perRightBottom>input:nth-of-type(3)').val();
    if (passwords2 == '') {
      $(wh_tips[2]).css('display', 'none');
      $(wh_tips[3]).css('display', 'none');
    } else if (
      (passwords2.length < 6 && passwords2.length > 0) ||
      passwords1 != passwords2
    ) {
      $(wh_tips[2]).css('display', 'inline');
      $(wh_tips[3]).css('display', 'none');
    } else if (
      (passwords2.length >= 6 && passwords2.length <= 20) ||
      passwords1 == passwords2
    ) {
      $(wh_tips[2]).css('display', 'none');
      $(wh_tips[3]).css('display', 'inline');
    }
  };

  // <!--验证码逻辑开始-->
  var verifyCode = new GVerify('wh_vContainer');
  $('#my_button').click(function() {
    var phoneinput = $('#wh_perRightBottom>input:nth-of-type(1)').val();
    if (
      phoneinput == '' ||
      phoneinput.length < 11 ||
      !/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneinput)
    ) {
      alert('请输入正确的手机号!');
    } else {
      var res = verifyCode.validate($('#code_input').val());
      if (res) {
        //成功获取验证码之后让倒计时显示,获取验证码按钮消失
        var codedaojishi = $(
          '#wh_perRightBottom>div:nth-of-type(2)>button:nth-of-type(2)'
        );
        $(codedaojishi).css('display', 'inline-block');
        $('#my_button').css('display', 'none');

        //验证码有效期倒计时开始
        var setTime = setInterval(function() {
          var hahaha = $(
            '#wh_perRightBottom>div:nth-of-type(2)>button:nth-of-type(2)>span'
          );
          var wh_time = $(hahaha).html();
          wh_time--;
          if (wh_time <= -1) {
            alert('验证码已失效,请重新获取!');
            clearInterval(setTime);
            $(codedaojishi).css('display', 'none');
            $('#my_button').css('display', 'inline-block');
            // window.location.reload();
          } else {
            $(hahaha).html(wh_time);
          }
        }, 1000);
        //验证码有效期倒计时结束

        //发起ajax请求,获取发送给用户的验证码(开始)
        var phonenumber = $('#wh_perRightBottom>input:nth-of-type(1)').val();
        $scope.$apply(function() {
          $.ajax({
            type: 'get',
            url: 'http://101.132.96.6/yhlife/server/message/index.php',
            data: {
              mobile: phonenumber,
              action: 'message'
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data) {
              //打印返回的数据
              $scope.message = data.obj;
            }
          });
        });
        //发起ajax请求,获取发送给用户的验证码(结束)
      } else {
        alert('验证码错误,请重新输入!');
      }
    }
  });

  // <!--验证码逻辑结束-->

  //修改手机按钮
  var updatephone = $('#wh_perRightBottom>div:nth-of-type(3)>button');
  $(updatephone).click(function() {
    //手机号输入框
    var phoneinput = $('#wh_perRightBottom>input:nth-of-type(1)').val();

    //手机验证码输入框
    var phonecode = $('#wh_perRightBottom>div:nth-of-type(2)>input').val();

    //密码输入框
    var passwordi1 = $('#wh_perRightBottom>input:nth-of-type(2)').val();
    var passwordi2 = $('#wh_perRightBottom>input:nth-of-type(3)').val();

    if (
      phoneinput == $scope.userphone ||
      phoneinput == '' ||
      phoneinput.length < 11 ||
      !/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneinput)
    ) {
      alert('请输入除用户名之外的正确的手机号!');
    } else if (passwordi1 == '' || passwordi2 == '') {
      alert('请输入密码!');
    } else if (phonecode == '') {
      alert('未输入手机验证码!');
    } else if ($scope.message != phonecode) {
      alert('手机验证码输入错误!');
    } else if (
      phoneinput != '' &&
      passwordi1 != '' &&
      passwordi2 != '' &&
      phonecode != '' &&
      $scope.message == phonecode
    ) {
      //ajax请求开始
      $scope.$apply(function() {
        var phonenumber = $('#wh_perRightBottom>input:nth-of-type(1)').val();
        $.ajax({
          type: 'get',
          url: 'http://101.132.96.6/yhlife/server/message/index.php',
          data: {
            phonenumber: $scope.userphone,
            mobile: phonenumber,
            action: 'database',
            password: passwordi1
          },
          dataType: 'jsonp',
          jsonp: 'callback',
          success: function(data) {
            //打印返回的数据
            if (data == 'user exist!') {
              alert('用户已存在!');
            } else if (data == 'password error!') {
              alert('用户密码错误!');
            } else if (data == 'update success!') {
              alert('修改手机号成功!');
            } else if (data == 'update failed!') {
              alert('修改手机号失败!');
            } else {
              alert('意外情况!请刷新页面');
            }
          },
          error: function(error) {
            alert('发生错误', error);
          }
        });
      });
      //ajax请求结束
    } else {
      alert('未知情况!请刷新页面!');
    }
  });

  //个人资料逻辑结束

  // <!--左侧li的点击事件开始-->
  var ass = $('#wh_personWrap>div:nth-of-type(n+2)');
  var bss = $('.wh_canClick');

  //li的点击事件
  for (var i = 0; i < bss.length; i++) {
    $(bss[i]).click(function() {
      //点击地址管理的时候先判断从数据库取出的数据是否为空,如果为空,显示空地址页面;如果不为空,显示地址;
      if (this == bss[5]) {
        // if(不为空){显示所有地址,其他都隐藏}else(为空){显示空地址,其他都隐藏}
        if (true) {
          //设置li的样式
          for (var k = 0; k < bss.length; k++) {
            $(bss[k]).css('backgroundColor', 'white');
          }
          $(this).css('backgroundColor', 'cyan');

          //设置右边的div的样式
          for (var j = 0; j < ass.length; j++) {
            $(ass[j]).addClass('disNone');
            $(ass[j]).removeClass('disBlock');
          }
          /*
                     * wh_personMyAddress 空地址
                     * wh_personAddAddress 添加新地址
                     * wh_personAllAddress 所有地址
                     * */
          $('#wh_personMyAddress').addClass('disNone');
          $('#wh_personMyAddress').removeClass('disBlock');

          $('#wh_personAddAddress').addClass('disNone');
          $('#wh_personAddAddress').removeClass('disBlock');

          $('#wh_personAllAddress').addClass('disBlock');
        } else {
          //设置li的样式
          for (var k = 0; k < bss.length; k++) {
            $(bss[k]).css('backgroundColor', 'white');
          }
          $(this).css('backgroundColor', 'cyan');

          //设置右边的div的样式
          for (var j = 0; j < ass.length; j++) {
            $(ass[j]).addClass('disNone');
            $(ass[j]).removeClass('disBlock');
          }
          /*
                     * wh_personMyAddress 空地址
                     * wh_personAddAddress 添加新地址
                     * wh_personAllAddress 所有地址
                     * */
          $('#wh_personAllAddress').addClass('disNone');
          $('#wh_personAllAddress').removeClass('disBlock');

          $('#wh_personAddAddress').addClass('disNone');
          $('#wh_personAddAddress').removeClass('disBlock');

          $('#wh_personMyAddress').addClass('disBlock');
        }
      } else {
        //设置右边的div的显示和隐藏
        for (var j = 0; j < ass.length; j++) {
          $(ass[j]).addClass('disNone');
          $(ass[j]).removeClass('disBlock');
        }
        var flagNum = $(this).attr('flag');
        $(ass[flagNum]).removeClass('disNone');
        $(ass[flagNum]).addClass('disBlock');

        //设置li的样式
        for (var k = 0; k < bss.length; k++) {
          $(bss[k]).css('backgroundColor', 'white');
        }
        $(this).css('backgroundColor', 'cyan');
      }
    });
  }

  // <!--点击更换手机时候的逻辑开始-->
  var wh_changePhone = $('#wh_personMyData>form>ul>li:nth-of-type(5) a');
  $(wh_changePhone).click(function() {
    for (var j = 0; j < ass.length; j++) {
      $(ass[j]).addClass('disNone');
      $(ass[j]).removeClass('disBlock');
    }
    $('#wh_personBindPhone').addClass('disBlock');
  });
  // <!--点击更换手机时候的逻辑结束-->

  // <!--地址管理中的添加新地址按钮点击事件逻辑开始-->
  var wh_addAddress = $('#wh_personMyAddress>div>button');
  $(wh_addAddress).click(function() {
    for (var j = 0; j < ass.length; j++) {
      $(ass[j]).addClass('disNone');
    }
    $('#wh_personMyAddress').addClass('disNone');
    $('#wh_personMyAddress').removeClass('disBlock');

    $('#wh_personAllAddress').addClass('disNone');
    $('#wh_personAllAddress').removeClass('disBlock');

    $('#wh_personAddAddress').addClass('disBlock');
  });
  // <!-- 地址管理中的添加新地址按钮点击事件逻辑结束 -->
  var wh_allAddress = $('#wh_personAllAddress>div>button');
  $(wh_allAddress).click(function() {
    for (var j = 0; j < ass.length; j++) {
      $(ass[j]).addClass('disNone');
    }
    $('#wh_personMyAddress').addClass('disNone');
    $('#wh_personMyAddress').removeClass('disBlock');

    $('#wh_personAllAddress').addClass('disNone');
    $('#wh_personAllAddress').removeClass('disBlock');

    $('#wh_personAddAddress').addClass('disBlock');
  });
  // <!--所有地址中的添加新地址按钮点击事件逻辑结束-->

  //从数据库查询所有的用户信息逻辑开始
  $.ajax({
    type: 'get',
    dataType: 'jsonp',
    url:
      'http://101.132.96.6/yhlife/server/albb.php?phonenumber=' +
      $scope.userphone,
    async: true,
    jsonp: 'cb',
    success: function(data) {
      $scope.$apply(function() {
        $scope.score = data[0].Integral;
        $scope.money = data[0].money;
        $scope.ticket = data[0].ticket;
        $scope.nickname = data[0].nickname;
        $scope.phonenumber = data[0].phonenumber;
        $scope.sex = data[0].sex;
        $scope.picsrc = data[0].picsrc;

        //获取数据库中的出生年月日
        $scope.year = data[0].year;
        $scope.month = data[0].month;
        $scope.day = data[0].day;

        //年月日三级联动逻辑开始
        new YMDselect(
          'year1',
          'month1',
          'day1',
          $scope.year,
          $scope.month,
          $scope.day
        );
        //年月日三级联动逻辑结束

        //用户性别根据数据库显示逻辑开始
        var wh_sexSelect = $(
          '#wh_personMyData>form>ul li:nth-of-type(3)>div input'
        );
        for (var i = 0; i < wh_sexSelect.length; i++) {
          if (wh_sexSelect[i].value == $scope.sex) {
            $(wh_sexSelect[i]).attr('checked', 'checked');
          } else {
            $(wh_sexSelect[i]).removeAttr('checked');
          }
        }
        //用户性别根据数据库显示逻辑结束

        //请求成功之后改变下方vip指示条
        var wh_countClass = $(
          '#wh_countMiddle p:nth-of-type(1) span:nth-of-type(2)'
        );
        var wh_countClassFont = $('#wh_countMiddle p:nth-of-type(2) i');
        var wh_countOrangeSpan = $(
          '#wh_countMiddle p:nth-of-type(2) span:nth-of-type(2n+2)'
        );
        switch (true) {
          case $scope.score <= 500: {
            $(wh_countClass).text('VIP1');
            $(wh_countClassFont[0]).css('color', 'rgb(255, 108, 0)');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score;
            var wh_residueWidth = wh_scoreResidue / 500 * 108;
            $(wh_countOrangeSpan[0]).width(wh_residueWidth);
            break;
          }
          case $scope.score > 500 && $scope.score <= 2000: {
            $(wh_countClass).text('VIP2');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score - 500;
            var wh_residueWidth = wh_scoreResidue / 1500 * 108;
            for (var i = 0; i < 2; i++) {
              $(wh_countClassFont[i]).css('color', 'rgb(255, 108, 0)');
              $(wh_countOrangeSpan[i - 1]).width(108);
              $(wh_countOrangeSpan[i]).width(wh_residueWidth);
            }
            break;
          }
          case $scope.score > 2000 && $scope.score <= 5000: {
            $(wh_countClass).text('VIP3');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score - 2000;
            var wh_residueWidth = wh_scoreResidue / 3000 * 108;
            for (var i = 0; i < 3; i++) {
              $(wh_countClassFont[i]).css('color', 'rgb(255, 108, 0)');
              $(wh_countOrangeSpan[i - 1]).width(108);
              $(wh_countOrangeSpan[i]).width(wh_residueWidth);
            }
            break;
          }
          case $scope.score > 5000 && $scope.score <= 20000: {
            $(wh_countClass).text('VIP4');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score - 5000;
            var wh_residueWidth = wh_scoreResidue / 15000 * 108;
            for (var i = 0; i < 4; i++) {
              $(wh_countClassFont[i]).css('color', 'rgb(255, 108, 0)');
              $(wh_countOrangeSpan[i - 1]).width(108);
              $(wh_countOrangeSpan[i]).width(wh_residueWidth);
            }
            break;
          }
          case $scope.score > 20000 && $scope.score <= 50000: {
            $(wh_countClass).text('VIP5');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score - 20000;
            var wh_residueWidth = wh_scoreResidue / 30000 * 108;
            for (var i = 0; i < 5; i++) {
              $(wh_countClassFont[i]).css('color', 'rgb(255, 108, 0)');
              $(wh_countOrangeSpan[i - 1]).width(108);
              $(wh_countOrangeSpan[i]).width(wh_residueWidth);
            }
            break;
          }
          case $scope.score > 50000 && $scope.score <= 100000: {
            $(wh_countClass).text('VIP6');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score - 50000;
            var wh_residueWidth = wh_scoreResidue / 50000 * 108;
            for (var i = 0; i < 6; i++) {
              $(wh_countClassFont[i]).css('color', 'rgb(255, 108, 0)');
              $(wh_countOrangeSpan[i - 1]).width(108);
              $(wh_countOrangeSpan[i]).width(wh_residueWidth);
            }
            break;
          }
          case $scope.score > 100000: {
            $(wh_countClass).text('VIP7');
            for (var i = 0; i < 7; i++) {
              $(wh_countClassFont[i]).css('color', 'rgb(255, 108, 0)');
              $(wh_countOrangeSpan[i - 1]).width(108);
            }
            break;
          }
          default: {
            $(wh_countClass).text('VIP1');
            $(wh_countClassFont[0]).css('color', 'rgb(255, 108, 0)');
            //剩余的积分(走进度条)
            var wh_scoreResidue = $scope.score;
            var wh_residueWidth = wh_scoreResidue / 500 * 108;
            $(wh_countOrangeSpan[0]).width(wh_residueWidth);
            break;
          }
        }
      });
    }
  });
  //从数据库查询所有的用户信息逻辑结束

  //我的订单

  //我的积分中的积分明细逻辑开始
  $(bss[2]).click(function() {
    $.ajax({
      type: 'get',
      dataType: 'jsonp',
      url:
        'http://101.132.96.6/yhlife/server/selectScoreDetail.php?phonenumber=' +
        $scope.userphone,
      async: true,
      jsonp: 'cb',
      success: function(data) {
        $scope.$apply(function() {
          $scope.whScoreDetail = data;
        });
      }
    });
  });
  //我的积分中的积分明细逻辑结束

  //从数据库查询用户的所有地址信息逻辑开始
  $.ajax({
    type: 'get',
    dataType: 'jsonp',
    url:
      'http://101.132.96.6/yhlife/server/selectAddress.php?phonenumber=' +
      $scope.userphone,
    async: true,
    jsonp: 'cb',
    success: function(data) {
      $scope.$apply(function() {
        $scope.whAllAddress = data;
      });
    }
  });
  //从数据库查询用户的所有地址信息逻辑结束

  //插入地址信息逻辑开始

  $('#wh_personAddAddress p:nth-of-type(5)>button').click(function() {
    //收货人姓名
    var name = $('#wh_personAddAddress p:nth-of-type(1)>input').val();
    //收货人所在地区
    var wh_dataAddress = $('#sel1').val();
    var reg = new RegExp('-', 'gm');
    var address = wh_dataAddress.replace(reg, '');
    //收货人详细地址
    var street = $('#wh_personAddAddress p:nth-of-type(2)>input').val();
    //收获人联系电话
    var contact = $(
      '#wh_personAddAddress p:nth-of-type(3)>input:nth-of-type(1)'
    ).val();

    if (name != '' && address != '' && street != '' && contact != '') {
      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url:
          'http://101.132.96.6/yhlife/server/insertAddress.php?name=' +
          name +
          '&address=' +
          address +
          '&street=' +
          street +
          '&contact=' +
          contact +
          '&phonenumber=' +
          $scope.userphone,
        async: true,
        jsonp: 'cb',
        success: function(data) {
          $scope.$apply(function() {
            if (data == 'insert success!') {
              alert('插入成功!');
            } else {
              alert('插入失败!');
            }
          });
        }
      });
    } else {
      alert('请完整填写信息哟亲!');
    }
  });
  //插入地址所选信息逻辑结束

  //修改地址函数
  $scope.whAddressUpdate = function(id) {
    var ass = $('#wh_personWrap>div:nth-of-type(n+2)');
    for (var j = 0; j < ass.length; j++) {
      $(ass[j]).addClass('disNone');
    }
    $('#wh_personMyAddress').addClass('disNone');
    $('#wh_personMyAddress').removeClass('disBlock');

    $('#wh_personAllAddress').addClass('disNone');
    $('#wh_personAllAddress').removeClass('disBlock');

    $('#wh_personAddAddress').addClass('disBlock');
  };

  //删除地址函数
  //把点击删除的那个a连接的整个对象传进来;
  $scope.whAddressDelete = function(x) {
    for (var i = 0; i < $scope.whAllAddress.length; i++) {
      if ($scope.whAllAddress[i] == x) {
        //先从网页删除地址
        $scope.whAllAddress.splice(i, 1);

        //发起ajax请求,删除数据库中的地址
        $.ajax({
          type: 'get',
          dataType: 'jsonp',
          url:
            'http://101.132.96.6/yhlife/server/deleteAddress.php?number=' +
            x.number,
          async: true,
          jsonp: 'cb',
          success: function(data) {
            $scope.$apply(function() {
              if (data == 'delete success!') {
                alert('删除成功!');
              } else {
                alert('删除失败!');
              }
            });
          }
        });
        //ajax请求结束
      }
    }
  };
});
app.controller('aboutCtrl', function($scope) {
  $('.ly-about-l-yihe ul li').click(function() {
    $('.ly-about-l-yihe ul li')
      .eq($(this).index())
      .addClass('ly-about-i')
      .siblings()
      .removeClass('ly-about-i');
  });

  var lyy_arr = $('.ly-about-l-yihe ul li');
  $(lyy_arr[1]).click(function() {
    $('.ly-about-r').css('display', 'block');
    $('.ly-zaixianxiadan').css('display', 'none');
    $('.ly-zhifufangshi').css('display', 'none');
    $('.ly-peisongshuoming').css('display', 'none');
  });

  $(lyy_arr[2]).click(function() {
    $('.ly-about-r').css('display', 'none');
    $('.ly-zaixianxiadan').css('display', 'block');
    $('.ly-zhifufangshi').css('display', 'none');
    $('.ly-peisongshuoming').css('display', 'none');
  });
  $(lyy_arr[3]).click(function() {
    $('.ly-about-r').css('display', 'none');
    $('.ly-zaixianxiadan').css('display', 'none');
    $('.ly-zhifufangshi').css('display', 'block');
    $('.ly-peisongshuoming').css('display', 'none');
  });
  $(lyy_arr[4]).click(function() {
    $('.ly-about-r').css('display', 'none');
    $('.ly-zaixianxiadan').css('display', 'none');
    $('.ly-zhifufangshi').css('display', 'none');
    $('.ly-peisongshuoming').css('display', 'block');
  });
});
