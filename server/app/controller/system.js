'use strict';
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const Controller = require('../core/base_controller');
const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('../../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../../dist/index.html'), 'utf-8'),
  clientManifest,
});

const renderToString = context => {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
};
const pMap = require('p-map');
class HomeController extends Controller {
  async getSSR() {
    const {
      ctx,
    } = this;
    let html = '';
    try {
      html = await renderToString(ctx);
      ctx.body = html;
    } catch (e) {
      this.notFound(e);
    }
  }
  // 登录
  async login() {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.helper.http('/user/login', ctx.request.body);
      this.success(res);
    } catch (error) {
      this.notFound(error);
    }
  }
  // 注册
  async register() {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.helper.http('/user/register', ctx.request.body);
      this.success(res);
    } catch (error) {
      this.notFound(error);
    }
  }
  // 重置密码
  async forget() {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.helper.http('/user/forget', ctx.request.body);
      this.success(res);
    } catch (error) {
      this.notFound(error);
    }
  }
  // 获取登录用户详情
  async getUser() {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.helper.http('/user/getUser');
      this.success(res);
    } catch (error) {
      this.notFound(error);
    }
  }
  // 获取列表
  async getList() {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.helper.http('/list/getList', ctx.request.body);
      this.success(res);
    } catch (error) {
      this.notFound(error);
    }
  }
  // 聚合数据
  async makeUpList() {
    const {
      ctx,
    } = this;
    const urls = [{ name: 'product', url: '/product' }, { name: 'news', url: '/news' }, { name: 'order', url: '/order' }, { name: 'tree', url: '/tree' }];
    const arr = {};
    await pMap(urls, async item => {
      const res = await ctx.helper.http(item.url);
      arr[item.name] = res.data;
    });
    this.success({ code: '000000', msg: 'success', data: arr });
  }
}

module.exports = HomeController;
