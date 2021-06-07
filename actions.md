# Actions

*Describes default user interactions in template*

For each display/expand there are following interactions dependent on product type:

>CREATION_TYPE_EXPAND_VIDEO\
>CREATION_TYPE_EXPAND_PREMIUM\
>CREATION_TYPE_RICH_EXPAND\
>CREATION_TYPE_MOBILE_EXPAND_PREMIUM\
>CREATION_TYPE_MOBILE_EXPAND_RICH\
>CREATION_TYPE_MOBILE_EXPAND_VIDEO

* After **each** click or at the end of counting down, `SatakuMessenger` sends message to loader to open expand

>CREATION_TYPE_RICH_DISPLAY

* After **first** click or at the end of counting down, function `Sataku.richDisplayOpen` is invoked

>CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE\
>CREATION_TYPE_MOBILE_MULTI_RECTANGLE\
>CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE\
>CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT

* After **each** click or at the end of counting down, new window is opened

>CREATION_TYPE_VIDEO_DISPLAY_STANDARD

* `#display-content`\
After **each** click or at the end of counting down, new window is opened
* `#teaser-wrapper`\
After **first** click or at the end of counting down, function `Sataku.vdsDisplayOpen` is invoked

>CREATION_TYPE_MOBILE_VIDEO\
>CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE

* After **first** click or at the end of counting down, function `SatakuPlayer#start` is invoked
