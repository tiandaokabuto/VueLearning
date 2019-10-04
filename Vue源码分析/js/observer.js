function Observer(data) {
    this.data = data;
    // 开始对data进行监视
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
        // 保存observer对象
        var me = this;
        // 遍历data
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // 对指定的属性实现响应式的数据绑定
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        // 创建属性对应的dep对象 dependency依赖
        var dep = new Dep();
        var childObj = observe(val);
        // 给data重新定义属性,添加get/set
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() { // 返回值,建立dep和watcher的关系
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) { // 监视key属性的变化,更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    // 被观察的必须是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建对应的Observer对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;