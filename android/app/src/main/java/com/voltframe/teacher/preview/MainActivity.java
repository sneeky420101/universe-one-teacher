package com.voltframe.teacher.preview;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import androidx.webkit.WebViewAssetLoader;
import android.content.Intent;
import android.net.Uri;

public class MainActivity extends Activity {
  private WebView webView;
  @Override public void onCreate(Bundle state) {
    super.onCreate(state);
    webView = new WebView(this);
    final WebViewAssetLoader loader = new WebViewAssetLoader.Builder().addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
    webView.setWebViewClient(new WebViewClient() {
      @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) { return loader.shouldInterceptRequest(request.getUrl()); }
      @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Uri uri=request.getUrl();
        if (uri.getHost()!=null && uri.getHost().equals("appassets.androidplatform.net")) return false;
        if ("https".equals(uri.getScheme()) || "http".equals(uri.getScheme())) {
          startActivity(new Intent(Intent.ACTION_VIEW, uri));
          return true;
        }
        return false;
      }
    });
    WebSettings settings=webView.getSettings();
    settings.setJavaScriptEnabled(true);
    settings.setDomStorageEnabled(true);
    settings.setAllowFileAccess(false);
    settings.setAllowContentAccess(false);
    settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
    setContentView(webView);
    webView.loadUrl("https://appassets.androidplatform.net/assets/index.html");
  }
  @Override public void onBackPressed() {
    if(webView!=null && webView.canGoBack())webView.goBack();
    else super.onBackPressed();
  }
  @Override protected void onDestroy(){if(webView!=null)webView.destroy();super.onDestroy();}
}
