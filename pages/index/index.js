var app = getApp()
Page({
    data: {
        isOpenRemind: 0,
        currentstate: 0,
        lastOpenTime: '',
        userInfo: null
    },
    clientProbe: function () {
        var that = this
        wx.request({
            url: 'https://jingzheng.hstba.com/current-state.json',
            success: function (res) {
                if (!res.success) {
                    return
                }
                that.setData({
                    currentstate: res.currentstate
                })
                that.setData({
                    lastOpenTime: res.lastOpenTime
                })
            }
        })
    },
    getUserSwitchState: function (openid) {
        var that = this
        if (!openid) {
            return
        }
        wx.request({
            url: 'https://jingzheng.hstba.com/get-user-switch-state.json',
            data: {
                openid: openid
            },
            success: function (res) {
                if (res.success) {
                    that.setData({
                        isOpenRemind: remind
                    })
                }
            }
        })
    },
    syncUserInfo: function (openid) {
        var userInfo = this.data.userInfo;
        userInfo.openid = openid;
        this.setData({
            userInfo: userInfo
        })
        wx.request({
            url: 'https://jingzheng.hstba.com/sync-user-info.json',
            method: 'POST',
            data: userInfo
        })
        this.getUserSwitchState(openid)
    },
    login: function () {
        var that = this
        wx.login({
            success: function (res) {
                if (res.code) {
                    console.log(res.code)
                    wx.request({
                        url: 'https://jingzheng.hstba.com/login.json',
                        method: 'POST',
                        data: {
                            code: res.code
                        },
                        success: function (loginRes) {
                            that.syncUserInfo(loginRes.openid)
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    init: function () {
        wx.setNavigationBarTitle({
            title: '京证'
        });
        this.clientProbe();
        this.login();
    },
    onLoad: function () {
        var that = this
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            that.setData({
                userInfo: userInfo
            })
        })
        this.init();
    },
    switchRemind: function () {
        this.setData({
            isOpenRemind: this.data.isOpenRemind ? 0 : 1
        })
    },
    formSubmit: function (e) {
        this.switchRemind();
        var data = {
            state: this.data.isOpenRemind,
            formId: e.detail.formId,
            openid: this.data.userInfo.openid
        }
        wx.request({
            url: 'https://jingzheng.hstba.com/switch-remind.json',
            method: 'POST',
            data: data
        })
    }
})
