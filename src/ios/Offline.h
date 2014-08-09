#import <Cordova/CDV.h>

@interface Offline : CDVPlugin {
    UIWebView* _webView;
    BOOL _visible;
}

- (void)show:(CDVInvokedUrlCommand*)command;
- (void)hide:(CDVInvokedUrlCommand*)command;

@end
