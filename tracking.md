# Tracking

*Describes how tracking works*

After display load impression pixel is tracked by function `SatakuTracking#displayLoad`\
The following pixels are tracked for products:

>CREATION_TYPE_EXPAND_VIDEO\
>CREATION_TYPE_EXPAND_PREMIUM\
>CREATION_TYPE_RICH_EXPAND\
>CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE\
>CREATION_TYPE_MOBILE_MULTI_RECTANGLE\
>CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE\
>CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT\
>CREATION_TYPE_MOBILE_EXPAND_PREMIUM\
>CREATION_TYPE_MOBILE_EXPAND_RICH\
>CREATION_TYPE_MOBILE_EXPAND_VIDEO

* After **each** click or at the end of counting down, function `SatakuTracking#displayClick` tracks the pixel

>CREATION_TYPE_RICH_DISPLAY\
>CREATION_TYPE_MOBILE_VIDEO\
>CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE

* After **first** click or at the end of counting down, function `SatakuTracking#displayClick` tracks the pixel

>CREATION_TYPE_VIDEO_DISPLAY_STANDARD

* `#display-content`\
After **each** click or at the end of counting down, function `SatakuTracking#displayClick` tracks the pixel
* `#teaser-wrapper`\
After **first** click or at the end of counting down, function `SatakuTracking#displayClick` tracks the pixel
