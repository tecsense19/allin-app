/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#import "rndocumentpicker.h"


namespace facebook::react {
  
    static facebook::jsi::Value __hostFunction_NativeDocumentPickerSpecJSI_pick(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
      return static_cast<ObjCTurboModule&>(turboModule).invokeObjCMethod(rt, PromiseKind, "pick", @selector(pick:resolve:reject:), args, count);
    }

    static facebook::jsi::Value __hostFunction_NativeDocumentPickerSpecJSI_releaseSecureAccess(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
      return static_cast<ObjCTurboModule&>(turboModule).invokeObjCMethod(rt, PromiseKind, "releaseSecureAccess", @selector(releaseSecureAccess:resolve:reject:), args, count);
    }

    static facebook::jsi::Value __hostFunction_NativeDocumentPickerSpecJSI_pickDirectory(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
      return static_cast<ObjCTurboModule&>(turboModule).invokeObjCMethod(rt, PromiseKind, "pickDirectory", @selector(pickDirectory:reject:), args, count);
    }

  NativeDocumentPickerSpecJSI::NativeDocumentPickerSpecJSI(const ObjCTurboModule::InitParams &params)
    : ObjCTurboModule(params) {
      
        methodMap_["pick"] = MethodMetadata {1, __hostFunction_NativeDocumentPickerSpecJSI_pick};
        
        
        methodMap_["releaseSecureAccess"] = MethodMetadata {1, __hostFunction_NativeDocumentPickerSpecJSI_releaseSecureAccess};
        
        
        methodMap_["pickDirectory"] = MethodMetadata {0, __hostFunction_NativeDocumentPickerSpecJSI_pickDirectory};
        
  }
} // namespace facebook::react
