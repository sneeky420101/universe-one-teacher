package com.universeone.teacher
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.graphics.Color
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    private lateinit var web: WebView
    private val classroom = "https://sneeky420101.github.io/universe-one-teacher/"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        web = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            settings.javaScriptCanOpenWindowsAutomatically = false
            webViewClient = object : WebViewClient() {
                override fun onPageFinished(view: WebView, url: String?) {
                    super.onPageFinished(view, url)
                    if (url?.startsWith(classroom) != true) return
                    val css = """html{-webkit-text-size-adjust:100%!important}body{font-size:20px!important;line-height:1.55!important}button,input,select,textarea,[role=button]{font-size:22px!important;min-height:60px!important;padding:14px 18px!important;box-sizing:border-box!important}button,.choice,[role=button]{touch-action:manipulation!important}a{font-size:20px!important;line-height:1.5!important}a.u1-home-link{min-height:68px!important;font-size:20px!important}a.u1-home-link .u1-home-button{font-size:20px!important;padding:13px 18px!important}small{font-size:17px!important}h1{font-size:30px!important}h2{font-size:26px!important}h3{font-size:23px!important}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:4px solid #ffe27b!important;outline-offset:3px!important}@media(max-width:520px){header,main,section{padding:16px!important}button,.choice{max-width:100%!important;white-space:normal!important}nav a{display:inline-block;padding:9px 2px!important}}"""
                    val js = "(function(){var s=document.getElementById('u1-accessibility');if(!s){s=document.createElement('style');s.id='u1-accessibility';document.head.appendChild(s)}s.textContent=" + org.json.JSONObject.quote(css) + "})()"
                    view.evaluateJavascript(js, null)
                }
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val url = request.url
                    if (url.scheme == "https" && url.host == "sneeky420101.github.io" &&
                        url.path?.startsWith("/universe-one-teacher/") == true) return false
                    if (url.scheme == "https") {
                        try { startActivity(Intent(Intent.ACTION_VIEW, url)) } catch (_: Exception) {}
                    }
                    return true
                }
            }
        }
        val layout = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        val bar = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        val label = TextView(this).apply { text = "Universe One AI Teacher"; textSize = 20f; setPadding(12, 16, 8, 8) }
        val reload = Button(this).apply { text = "Reload"; textSize = 20f; minHeight = 64; setOnClickListener { web.reload() } }
        bar.addView(label, LinearLayout.LayoutParams(0, -2, 1f))
        bar.addView(reload)
        layout.addView(bar)
        layout.addView(web, LinearLayout.LayoutParams(-1, 0, 1f))
        setContentView(layout)
        if (savedInstanceState == null) web.loadUrl(classroom) else web.restoreState(savedInstanceState)
    }
    override fun onSaveInstanceState(outState: Bundle) { web.saveState(outState); super.onSaveInstanceState(outState) }
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() { if (web.canGoBack()) web.goBack() else super.onBackPressed() }
    override fun onDestroy() { web.destroy(); super.onDestroy() }
}
