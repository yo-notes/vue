import { Watcher } from './watcher.js';

export class Compile {
  constructor(el, vm) {
    this.vm = vm;
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    if (el && _isElementNode(el)) {
      const fragment = this.nodeToFragment(el);
      this.compile(fragment);
      el.appendChild(fragment);
    }
  }

  compileElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      if (attrName.includes('-')) {
        const [, type] = attrName.split('-');
        this['_' + type](node, attr.value);
      }
    });
  }

  compileText(node) {
    let content = node.textContent;
    if (/\{\{[^}]+\}\}/.test(content)) {
      this._text(node, content);
    }
  }

  compile(fragment) {
    let children = fragment.childNodes;
    Array.from(children).forEach(node => {
      if (_isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      } else {
        this.compileText(node);
      }
    });
  }

  nodeToFragment(el) {
    let fragment = document.createDocumentFragment(); // 创建一个纯占位的父节点
    let firstChild;
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild); // appendChild 会移动节点
    }
    return fragment;
  }
  _model(node, access) {
    node.addEventListener('input', e => {
      const newVal = e.target.value;
      access.split('.').reduce((res, key, idx, arr) => {
        if (idx === arr.length - 1) {
          return res[key] = newVal;
        }
        return res[key];
      }, this.vm.$data);
    });
    const getVal = this._getVal.bind(this);
    node.value = getVal(access);
    new Watcher(
      this.vm,
      () => {
        return getVal(access); // (args[1])
      },
      newVal => {
        node.value = newVal;
      }
    );
  }
  _text(node, access) {
    const value = access.replace(/\{\{ *([^}]+?) *\}\}/g, (...args) => {
      // 触发一次 getter，收集依赖，并注册 update 回调
      const getVal = this._getVal.bind(this);
      new Watcher(
        this.vm,
        () => {
          return getVal(args[1]); // (args[1])
        },
        newVal => {
          node.textContent = access.replace(/\{\{ *([^}]+?) *\}\}/g, (...args) => {
            return this._getVal(args[1])
          });
        }
      );

      return this._getVal(args[1]);
    });
    node.textContent = value;
  }
  _getVal(access) {
    return access.split('.').reduce((res, key) => {
      return res[key];
    }, this.vm.$data);
  }
}

function _isElementNode(node) {
  return node.nodeType === 1;
}
