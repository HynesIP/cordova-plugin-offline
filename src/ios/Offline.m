#import "Offline.h"
#import <Cordova/CDVViewController.h>

@implementation Offline

- (void)pluginInitialize
{

  [NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pageDidLoad) name:CDVPageDidLoadNotification object:self.webView];

   [self createViews];
}

- (void)show:(CDVInvokedUrlCommand*)command
{
    [self setVisible:YES];
}

- (void)hide:(CDVInvokedUrlCommand*)command
{
    [self setVisible:NO];
}

- (void)createViews
{
    NSLog(@"%s", "Create Views.");

    _visible = true;
    UIView* parentView = self.viewController.view;

    parentView.frame = CGRectMake(0, 0, [[UIScreen mainScreen] applicationFrame].size.width,
                                                            [[UIScreen mainScreen] applicationFrame].size.height);


    NSString *offlineHtml = [[NSBundle mainBundle] pathForResource:@"offline" ofType:@"html" inDirectory:@"www"];
    NSURL *offlineUrl = [NSURL URLWithString:offlineHtml];
    NSURLRequest *offlineRequest = [NSURLRequest requestWithURL:offlineUrl
                                                     cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                                 timeoutInterval:60];
    
    _webView=[[UIWebView alloc]initWithFrame:parentView.bounds];

    //_webView.frame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height);
    [_webView loadRequest:offlineRequest];
    [parentView insertSubview:_webView atIndex:1];
}

- (void)destroyViews
{
    [_webView removeFromSuperview];
    _webView = nil;
}

- (void)setVisible:(BOOL)visible
{

   NSLog(@"%s", "Set Visible.");

    if (visible == _visible) {
        return;
    }
    _visible = visible;

    if (visible) {
      NSLog(@"%s", "show.");
        if (_webView == nil) {
            [self createViews];
        }
    } else {
        NSLog(@"%s", "hide.");
        [self destroyViews];
    }
}

@end