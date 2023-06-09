"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCustomWebpackBrowser = void 0;
const architect_1 = require("@angular-devkit/architect");
const build_angular_1 = require("@angular-devkit/build-angular");
const common_1 = require("./common");
function buildCustomWebpackBrowser(options, context) {
    //@ts-ignore
    return build_angular_1.executeBrowserBuilder(options, context, common_1.getTransforms(options, context));
}
exports.buildCustomWebpackBrowser = buildCustomWebpackBrowser;
exports.default = architect_1.createBuilder(buildCustomWebpackBrowser);
