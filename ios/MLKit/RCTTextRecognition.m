// RCTTextRecognition.m
#import "RCTTextRecognition.h"
#import <React/RCTLog.h>
@import MLKit;

@implementation RCTTextRecognition

RCT_EXPORT_MODULE(TextRecognitionModule);

// Function to normalize image orientation
- (UIImage *)normalizeImageOrientation:(UIImage *)image {
    if (image.imageOrientation == UIImageOrientationUp) return image;

    UIGraphicsBeginImageContextWithOptions(image.size, NO, image.scale);
    [image drawInRect:CGRectMake(0, 0, image.size.width, image.size.height)];
    UIImage *normalizedImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return normalizedImage;
}

// Function to resize image to fit a target size
- (UIImage *)resizeImage:(UIImage *)image toSize:(CGSize)newSize {
    UIGraphicsBeginImageContextWithOptions(newSize, NO, image.scale);
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
    UIImage *resizedImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return resizedImage;
}

// Function to get screen dimensions (for scaling frames)
- (NSDictionary *)getScreenDimensions {
    CGRect screenBounds = [UIScreen mainScreen].bounds;
    CGFloat screenWidth = screenBounds.size.width;
    CGFloat screenHeight = screenBounds.size.height;
    return @{@"width": @(screenWidth), @"height": @(screenHeight)};
}

// Function to adjust frame based on image size and screen dimensions
- (NSMutableDictionary *)getFrameDictionary:(CGRect)frame forImageSize:(CGSize)imageSize {
    NSMutableDictionary *rect = [NSMutableDictionary dictionary];
    
    // Get screen dimensions (for scaling)
    NSDictionary *screenDimensions = [self getScreenDimensions];
    CGFloat screenWidth = [screenDimensions[@"width"] floatValue];
    CGFloat screenHeight = [screenDimensions[@"height"] floatValue];
    
    // Scale the frame based on image size and the screen dimensions
    CGFloat scaleX = screenWidth / imageSize.width;
    CGFloat scaleY = screenHeight / imageSize.height;
    
    CGRect scaledFrame = CGRectMake(frame.origin.x * scaleX, frame.origin.y * scaleY,
                                    frame.size.width * scaleX, frame.size.height * scaleY);
    
    [rect setValue:@(scaledFrame.origin.x) forKey:@"left"];
    [rect setValue:@(scaledFrame.origin.y) forKey:@"top"];
    [rect setValue:@(scaledFrame.size.width) forKey:@"width"];
    [rect setValue:@(scaledFrame.size.height) forKey:@"height"];
    
    return rect;
}

RCT_EXPORT_METHOD(recognizeImage:(NSString *)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"URL: %@", url);
    NSURL *_url = [NSURL URLWithString:url];
    
    // Check if image data can be loaded
    NSData *imageData = [NSData dataWithContentsOfURL:_url];
    if (!imageData) {
        RCTLogInfo(@"Failed to load image data.");
        reject(@"text_recognition", @"Failed to load image data", nil);
        return;
    }
    
    UIImage *image = [UIImage imageWithData:imageData];
    if (!image) {
        RCTLogInfo(@"Failed to convert image data to UIImage.");
        reject(@"text_recognition", @"Failed to convert image data to UIImage", nil);
        return;
    }

    // Normalize image orientation before processing
    UIImage *normalizedImage = [self normalizeImageOrientation:image];
    
    // Optionally resize image if needed (adjust size as appropriate for your use case)
    UIImage *resizedImage = [self resizeImage:normalizedImage toSize:CGSizeMake(1024, 1024)]; // Resize to fit 1024px width/height or any other size
    
    // Initialize VisionImage with normalized and resized image
    MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:resizedImage];
    visionImage.orientation = resizedImage.imageOrientation;  // Set orientation explicitly

    // Initialize Text Recognizer
    MLKTextRecognizerOptions *latinOptions = [[MLKTextRecognizerOptions alloc] init];
    MLKTextRecognizer *latinTextRecognizer = [MLKTextRecognizer textRecognizerWithOptions:latinOptions];

    [latinTextRecognizer processImage:visionImage completion:^(MLKText * _Nullable result, NSError * _Nullable error) {
        if (error != nil || result == nil) {
            // Log detailed error information
            RCTLogInfo(@"Text recognition failed with error: %@", error.localizedDescription);
            reject(@"text_recognition", @"Text recognition failed", error);
            return;
        }

        RCTLogInfo(@"Result blocks: %@", result.blocks);  // Log blocks

        NSMutableDictionary *response = [NSMutableDictionary dictionary];
        [response setValue:[NSNumber numberWithInt:image.size.width] forKey:@"width"];
        [response setValue:[NSNumber numberWithInt:image.size.height] forKey:@"height"];
        
        NSMutableArray *blocks = [NSMutableArray array];
        for (MLKTextBlock *block in result.blocks) {
            NSMutableDictionary *blockDict = [NSMutableDictionary dictionary];

            [blockDict setValue:block.text forKey:@"text"];
            [blockDict setValue:[self getFrameDictionary:block.frame forImageSize:resizedImage.size] forKey:@"rect"];
            
            NSMutableArray *lines = [NSMutableArray array];
            for (MLKTextLine *line in block.lines) {
                NSMutableDictionary *lineDict = [NSMutableDictionary dictionary];
                [lineDict setValue:line.text forKey:@"text"];
                [lineDict setValue:[self getFrameDictionary:line.frame forImageSize:resizedImage.size] forKey:@"rect"];
                
                [lines addObject:lineDict];
            }
            [blockDict setValue:lines forKey:@"lines"];
            [blocks addObject:blockDict];
        }
        
        [response setValue:blocks forKey:@"blocks"];
        resolve(response);
    }];
}

@end
