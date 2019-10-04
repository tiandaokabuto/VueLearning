function Compile(el, vm) {
    // 保存vm到compile对象
    this.$vm = vm;
    // 将el对应的元素对象保存到compile对象中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 如果有el元素
    if (this.$el) {
        // 1.取出el元素中所有子节点保存到一个fragment对象中
        this.$fragment = this.node2Fragment(this.$el);
        // 2.编译fragment中所有层次的子节点
        this.init();
        // 3.将编译好的fragment添加到页面的el元素中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 取出最外层所有子节点
        var childNodes = el.childNodes,
            // 保存compile对象
            me = this;
        // 遍历所有子节点（text/element）
        [].slice.call(childNodes).forEach(function(node) {
            // 获得节点的文本内容
            var text = node.textContent;
            // 创建正则对象(用来匹配大括号)
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                // 解析指令
                me.compile(node);

                // 判断节点是否是大括号格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译大括号表达式文本节点
                me.compileText(node, RegExp.$1.trim());
            }
            // 如果当前节点还有子节点,通过递归调用实现所有层次的节点的编译
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // 得到标签的所有属性
        var nodeAttrs = node.attributes,
            me = this;

        // 便利所有属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 得到属性名: v-on:click
            var attrName = attr.name;
            // 判断是否是指令属性
            if (me.isDirective(attrName)) {
                // 得到属性值--表达式show
                var exp = attr.value;
                // 从属性名中得到指令名on:click
                var dir = attrName.substring(2);
                // 是否事件指令
                if (me.isEventDirective(dir)) {
                    // 解析事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合 v-xxx
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // 得到事件类型,click
        var eventType = dir.split(':')[1],
            // 从methods中得到表达式所对应的函数(事件回调函数名show)
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 如果都在
        if (eventType && fn) {
            // 给节点绑定指定事件名和回调函数的DOM事件监听
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 更新节点的方法的工具对象
var updater = {
    // 更新节点的textContent属性
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};