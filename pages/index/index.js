var app = getApp()
Page({
    data: {
        isOpenRemind: 0,
        currentstate: 0,
        lastOpenTime: '',
        userInfo: null
    },
    dateDiff: function (dateTimeStamp) {
        let result = "";
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var year = month * 12;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        var yearC = diffValue / year;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (yearC >= 1) {
            result = parseInt(yearC) + "年前";
        } else if (monthC >= 1) {
            result = parseInt(monthC) + "个月前";
        } else if (weekC >= 1) {
            result = parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            result = parseInt(minC) + "分钟前";
        } else {
            result = "刚刚";
        }
        return result;
    },
    clientProbe: function () {
        var that = this
        wx.request({
            url: 'https://jingzheng.hstba.com/current-state.json',
            success: function (res) {
                if (!res.data.success) {
                    return
                }
                that.setData({
                    currentstate: res.data.currentstate
                })
                that.setData({
                    lastOpenTime: that.dateDiff(res.data.lastOpenTime)
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
            url: 'https://jingzheng.hstba.com/get-user-switch-state.json?openid=' + openid,
            success: function (res) {
                if (res.data.success) {
                    that.setData({
                        isOpenRemind: res.data.remind
                    })
                }
            }
        })
    },
    syncUserInfo: function (openid) {
        var userInfo = this.data.userInfo || {
            avatarUrl: 'http://wx4.sinaimg.cn/mw690/abf9e936ly1fiygm6u588j208c08cdg0.jpg',
            city: '',
            country: '',
            gender: '',
            language: '',
            nickName: '游客',
            province: ''
        };
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
                    wx.request({
                        url: 'https://jingzheng.hstba.com/login.json?code=' + res.code,
                        method: 'POST',
                        success: function (loginRes) {
                            that.syncUserInfo(loginRes.data.openid)
                        }
                    })
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
            url: 'https://jingzheng.hstba.com/switch-remind.json?state=' + data.state + '&formId=' + data.formId + '&openid=' + data.openid,
            method: 'POST'
        })
    }
})
