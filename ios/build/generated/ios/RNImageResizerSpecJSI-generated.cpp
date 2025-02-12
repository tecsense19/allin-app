/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleCpp.js
 */

#include "RNImageResizerSpecJSI.h"

namespace facebook::react {

static jsi::Value __hostFunction_NativeImageResizerCxxSpecJSI_createResizedImage(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeImageResizerCxxSpecJSI *>(&turboModule)->createResizedImage(
    rt,
    args[0].asString(rt),
    args[1].asNumber(),
    args[2].asNumber(),
    args[3].asString(rt),
    args[4].asNumber(),
    args[5].asString(rt),
    args[6].asBool(),
    count <= 7 || args[7].isNull() || args[7].isUndefined() ? std::nullopt : std::make_optional(args[7].asNumber()),
    count <= 8 || args[8].isNull() || args[8].isUndefined() ? std::nullopt : std::make_optional(args[8].asString(rt)),
    count <= 9 || args[9].isNull() || args[9].isUndefined() ? std::nullopt : std::make_optional(args[9].asBool())
  );
}

NativeImageResizerCxxSpecJSI::NativeImageResizerCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("ImageResizer", jsInvoker) {
  methodMap_["createResizedImage"] = MethodMetadata {10, __hostFunction_NativeImageResizerCxxSpecJSI_createResizedImage};
}


} // namespace facebook::react
