import {createApp} from './main';

export default (context) => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp();

        // 设置服务器端 router 的位置
        router.push(context.url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({
                    code: 404
                });
            }
            Promise.all(matchedComponents.map((Component) => {
                if (Component.extendOptions.asyncData) {
                    const result = Component.extendOptions.asyncData({
                        store,
                        route: router.currentRoute,
                            options: {},
                    });
                    return result;
                }
            })).then(() => {
                // 状态将自动序列化为 window.__INITIAL_STATE__，并注入 HTML。
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        }, reject);
    });
};