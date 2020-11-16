$(function() {
  var layer = layui.layer;
  //获取页面基本元素  封装为函数
  getUserInfo();
  $("#btnLogout").on("click", function() {
    // console.log('ok');
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function(index) {
      //do something
//清空本地的token
localStorage.removeItem('token')
//跳转到本地登录页面
location.href = '/login.html'
      layer.close(index);
    });
  });
});

function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",
    type: "get",
    // headers: {
    //   Authorization: localStorage.getItem("token") || ""
    // },
    success: function(res) {
      if (res.status !== 0) return layer.msg(res.message);
      renderAvatar(res.data);
      
    },
    
    //无论成功或者失败都会调用complete回调函数
    // complete: function(res){
    //   // console.log(res);
      
    // //在complete回调函数中，可以使用res.responseJSON拿到服务响应回来的数据
    // if(res.responseJSON.status === 1&&res.responseJSON.message === '身份认证失败！'){
    //   //强制清空token
    //   localStorage.removeItem('token')
    //   //强制跳转到登录页面
    //   location.href = '/login.html'
    // } 

    // }
  });
}


//设置渲染用户头像的函数
function renderAvatar(user) {
  var name = user.username || user.nickname;
  $("#welcome").html("欢迎&nbsp;&nbsp" + name);

  //按需渲染用户的头像
  if (user.user_pic !== null) {
    //渲染文本图像
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .show();
    $(".text-avatar").hide();
  } else {
    //渲染文本图像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar")
      .html(first)
      .show();
  }
}
