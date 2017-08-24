//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        isOpenRemind: 0,
        currentstate: 0,
        lastOpenTime: '',
        userInfo: null
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '京证'
        })
        var that = this
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            that.setData({
                userInfo: userInfo
            })
        })
        this.clientProbe();
    },
    clientProbe: function () {
        var that = this
        wx.request({
            url: 'https://api.jinjingzheng.zhongchebaolian.com/enterbj/jsp/enterbj/addcartype.jsp',
            header: {
                'content-type': 'text/html'
            },
            success: function (res) {
                if (res.statusCode === 200) {
                    if (res.data.indexOf('排队人数过多') < 0) {
                        that.setData({
                            currentstate: 1
                        })
                    }
                }
                that.setData({
                    lastOpenTime: '2017-08-24 20:21:35'
                })
            }
        })
    },
    switchRemind: function () {
        this.setData({
            isOpenRemind: this.data.isOpenRemind ? 0 : 1
        })
    }
})
