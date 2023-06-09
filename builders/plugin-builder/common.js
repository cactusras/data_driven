"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransforms = exports.indexHtmlTransformFactory = exports.customWebpackConfigTransformFactory = void 0;
const core_1 = require("@angular-devkit/core");
const custom_webpack_builder_1 = require("./custom-webpack-builder");
const utils_1 = require("./utils");
const customWebpackConfigTransformFactory = (options, { workspaceRoot, target }) => browserWebpackConfig => {
    return custom_webpack_builder_1.CustomWebpackBuilder.buildWebpackConfig(core_1.normalize(workspaceRoot), options, browserWebpackConfig, options, target);
};
exports.customWebpackConfigTransformFactory = customWebpackConfigTransformFactory;
const indexHtmlTransformFactory = ({ indexTransform }, { workspaceRoot, target }) => {
    if (!indexTransform)
        return null;
    utils_1.tsNodeRegister(indexTransform);
    const indexModule = require(`${core_1.getSystemPath(core_1.normalize(workspaceRoot))}/${indexTransform}`);
    const transform = indexModule.default || indexModule;
    return (indexHtml) => __awaiter(void 0, void 0, void 0, function* () { return transform(target, indexHtml); });
};
exports.indexHtmlTransformFactory = indexHtmlTransformFactory;
const getTransforms = (options, context) => ({
    webpackConfiguration: exports.customWebpackConfigTransformFactory(options, context),
    indexHtml: exports.indexHtmlTransformFactory(options, context),
});
exports.getTransforms = getTransforms;
