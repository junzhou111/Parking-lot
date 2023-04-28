
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/my/my","pages/duty/duty","pages/homepages/OverViewPark/OverViewPark","pages/homepages/SiteManagement/SiteManagement","pages/homepages/EntryExitRecords/EntryExitRecords","pages/homepages/FeeRecords/FeeRecords","pages/homepages/BlackWhiteListManagement/BlackWhiteListManagement","pages/homepages/Coupon/Coupon","pages/homepages/OwnerCarManagement/OwnerCarManagement","pages/homepages/MonthlyfeeparkspaceManagement/MonthlyfeeparkspaceManagement","pages/homepages/RemoteOpening/RemoteOpening","pages/mypages/changepassword/changepassword","pages/mypages/Visitorregistration/Visitorregistration","pages/mypages/Feedback/Feedback","pages/mypages/Aboutus/Aboutus","pages/homepages/SiteManagement/SiteManainfo","pages/homepages/EntryExitRecords/EntryExit","pages/homepages/FeeRecords/Fee"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#515151","selectedColor":"#1296db","list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"static/tabbaricon/index.png","selectedIconPath":"static/tabbaricon/indexclick.png"},{"text":"集中值守","pagePath":"pages/duty/duty","iconPath":"static/tabbaricon/duty.png","selectedIconPath":"static/tabbaricon/dutyclick.png"},{"text":"我的","pagePath":"pages/my/my","iconPath":"static/tabbaricon/my.png","selectedIconPath":"static/tabbaricon/myclick.png"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-app","compilerVersion":"3.7.9","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#1296db","navigationBarTextStyle":"white"}},{"path":"/pages/duty/duty","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"集中值守","enablePullDownRefresh":false}},{"path":"/pages/homepages/OverViewPark/OverViewPark","meta":{},"window":{"navigationBarTitleText":"车场概况","enablePullDownRefresh":false}},{"path":"/pages/homepages/SiteManagement/SiteManagement","meta":{},"window":{"navigationBarTitleText":"场内车辆管理","enablePullDownRefresh":false}},{"path":"/pages/homepages/EntryExitRecords/EntryExitRecords","meta":{},"window":{"navigationBarTitleText":"出入记录","enablePullDownRefresh":false}},{"path":"/pages/homepages/FeeRecords/FeeRecords","meta":{},"window":{"navigationBarTitleText":"收费记录","enablePullDownRefresh":false}},{"path":"/pages/homepages/BlackWhiteListManagement/BlackWhiteListManagement","meta":{},"window":{"navigationBarTitleText":"黑白名单管理","enablePullDownRefresh":false}},{"path":"/pages/homepages/Coupon/Coupon","meta":{},"window":{"navigationBarTitleText":"优惠券","enablePullDownRefresh":false}},{"path":"/pages/homepages/OwnerCarManagement/OwnerCarManagement","meta":{},"window":{"navigationBarTitleText":"业主车管理","enablePullDownRefresh":false}},{"path":"/pages/homepages/MonthlyfeeparkspaceManagement/MonthlyfeeparkspaceManagement","meta":{},"window":{"navigationBarTitleText":"月费车位管理","enablePullDownRefresh":false}},{"path":"/pages/homepages/RemoteOpening/RemoteOpening","meta":{},"window":{"navigationBarTitleText":"远程开闸","enablePullDownRefresh":false}},{"path":"/pages/mypages/changepassword/changepassword","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/mypages/Visitorregistration/Visitorregistration","meta":{},"window":{"navigationBarTitleText":"访客登记","enablePullDownRefresh":false}},{"path":"/pages/mypages/Feedback/Feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/mypages/Aboutus/Aboutus","meta":{},"window":{"navigationBarTitleText":"关于我们","enablePullDownRefresh":false}},{"path":"/pages/homepages/SiteManagement/SiteManainfo","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/homepages/EntryExitRecords/EntryExit","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/homepages/FeeRecords/Fee","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
