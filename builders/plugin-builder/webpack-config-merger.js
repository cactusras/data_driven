"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfigs = void 0;
const webpack_merge_1 = require("webpack-merge");
const lodash_1 = require("lodash");
function mergeConfigs(webpackConfig1, webpackConfig2, mergeStrategies = {}, replacePlugins = false) {
    const mergedConfig = webpack_merge_1.smartStrategy(mergeStrategies)(webpackConfig1, webpackConfig2);
    if (webpackConfig1.plugins && webpackConfig2.plugins) {
        const conf1ExceptConf2 = lodash_1.differenceWith(webpackConfig1.plugins, webpackConfig2.plugins, (item1, item2) => item1.constructor.name === item2.constructor.name);
        if (!replacePlugins) {
            const conf1ByName = lodash_1.keyBy(webpackConfig1.plugins, 'constructor.name');
            webpackConfig2.plugins = webpackConfig2.plugins.map(p => conf1ByName[p.constructor.name] ? lodash_1.merge(conf1ByName[p.constructor.name], p) : p);
        }
        mergedConfig.plugins = [...conf1ExceptConf2, ...webpackConfig2.plugins];
    }
    return mergedConfig;
}
exports.mergeConfigs = mergeConfigs;
