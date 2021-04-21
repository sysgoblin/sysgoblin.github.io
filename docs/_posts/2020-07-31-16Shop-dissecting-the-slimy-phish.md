---
title: "16Shop: Dissecting the Slimy Phish"
date: 2020-05-12
---

# {{$page.title}}

![logo](https://user-images.githubusercontent.com/50568995/115523452-fc776d00-a284-11eb-8eb1-49ebb0565272.gif)

<span style="color: #999;">{{$page.readingTime.text}}...</span>

## Foreword
16Shop is not especially new in the world of phishing kits. It's been written about before, analysed many times over and has even been cracked and ripped to shreds by other threat actors within the phishing community.

However, it's still arguably the most popular and successful "Phishing-as-a-service" (PaaS) kits around and it is constantly evolving, making it an interesting phish to try and catch. 🎣

This article will cover a lot regarding 16Shop including its origins, change over time, a deep-dive in to how the kit works and other interesting artefacts which can be used to help you hunt 16Shop.

For a live feed of 16Shop detections as well as other popular PaaS kits, please take a look at [phishingreel.io](https://phishingreel.io). (Full disclosure, PhishingReel was developed by myself and is now being maintained by [@thumbscrw](https://twitter.com/thumbscrw))

## Background
### 16what?
![wha?](https://media.giphy.com/media/ybcMkow8xLIrK/giphy.gif)

16Shop is the name of a sophisticated Phishing kit distribution network, designed  for malicious actors to quickly and easily set up believable phishing pages targeting popular brands. As these kits are provided as a service, the individuals buying and using 16Shop do not need to be skilled, thus widening the net for potential customers.

### Evolution
16Shop has been around for some time now, with articles reporting on the kit since late 2018. However it's likely 16Shop has been around for longer than this, with public discussions taking place in early 2018. This indicates the kit was likely being sold for a period before then.

Originally 16Shop targeted only Apple and contained language localisation for Japan and the US, eventually adding more language options as time went on.Lures were in the form of phishing emails purporting to be from Apple, asking the user to confirm their login details and follow the link within an attached PDF document.

![](https://www.mcafee.com/wp-content/uploads/2019/07/email-2.png)
![](https://www.mcafee.com/wp-content/uploads/2019/07/phishing-pdf.png)
_Images courtesy of McAfee_

Just ahead of Amazon Prime day 2019 [McAfee](https://www.mcafee.com/blogs/other-blogs/mcafee-labs/16shop-now-targets-amazon/) discovered a new version of 16Shop targeting Amazon which quickly gained popularity, clearly trying to cash in on the hype around the upcoming Amazon Prime day.

Later, around Jan 2020 [ZeroFox](https://www.zerofox.com/blog/16shop-adds-paypal-american-express-to-their-catalog/) reported 16Shop had added kits targeting PayPal and AMEX to their available products, further diversifying their range of targets.

### Author
Early versions of the kit contained code comments and artefacts attributing the creation of 16Shop to the alias "devilscream"

![](https://www.mcafee.com/wp-content/uploads/2019/07/tags.png)  
_Images courtesy of McAfee_

> Devil Scream or Devils Cream?

Through OSINT sources the alias DevilScreaM was publicly attributed to "Riswanda" from Indonesia. He has been previously responsible for defacing vulnerable Wordpress sites and later on producing tools and exploits for malicious activity. He is also an active member of the cyber crime gang "Indonesian Cyber Army".

<blockquote class="twitter-tweet" align="center"><p lang="en" dir="ltr" align="center">The <a href="https://twitter.com/Apple?ref_src=twsrc%5Etfw">@Apple</a> <a href="https://twitter.com/hashtag/Phishing?src=hash&amp;ref_src=twsrc%5Etfw">#Phishing</a> kit author &#39;devilscream&#39; does a bad job of hiding his identity (or a good job of inventing a fake one).<br><br>He won a website design competition in early 2017 and is pictured below with his mother. I doubt she would be very proud of his most recent work. <a href="https://t.co/FUx8dezwWe">pic.twitter.com/FUx8dezwWe</a></p>&mdash; Phishing AI (@PhishingAi) <a href="https://twitter.com/PhishingAi/status/1011688773610979328?ref_src=twsrc%5Etfw">June 26, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Cracked Kits
Unsurprisingly, in the criminal realm of phishing not everyone wants to pay for a service like 16Shop and instead simply "crack" the kit's validation methods in order to use the kit free of charge.

There are many versions of cracked 16Shop kits floating around, most notably a version discovered recently by [Akamai](https://blogs.akamai.com/sitr/2019/05/16shop-commercial-phishing-kit-has-a-hidden-backdoor.html) which included a backdoor, allowing the individual who distributed the cracked version to obtain a copy of all victim credentials sent to a telegram bot under their control.

16Shop code has also been taken and included within other popular PaaS kits recently such as FreakzBrothers kits, and also even been completely rebranded and distributed without any reference to its original source.

## Distribution
Similarly to other PaaS kits, 16Shop is sold through an online store where individuals can register and purchase the kit in its various forms for fixed prices set by the author.

### Storefront
The online store offers a glimpse at what is available for purchase, and prompts visitors to either sign in or register to access the "member" area.

![16shop-store-1](https://user-images.githubusercontent.com/50568995/115518271-e1562e80-a27f-11eb-8090-47c8d50e6af0.png)

Current targets include Apple, Amazon, PayPal and AMEX (the broken image link references the AMEX logo). The copyright would also indicate the kit has been for sale since before it started showing up on researcher's radars.

The member login area offers further information on what is available for purchase, showing prices for the various kits along with user guides on how to install and configure them.

![member-prices](https://user-images.githubusercontent.com/50568995/115518314-eca95a00-a27f-11eb-908b-1ccd92977d59.png)

The "shortlink" service is a recent addition, offering something akin to bit.ly in order to obfuscate phishing URL's being sent to potential victims and further control how these victims can access and interact with the phishing page.

![shortlink](https://user-images.githubusercontent.com/50568995/115518351-f763ef00-a27f-11eb-8900-f956007a1730.png)

Other pages allow access to tools such as credential validators, IP reputation checkers and obfuscation tools which can all be used by "customers".

### Following the money
Taking a look at the payment options again we can see there are 3 options available:
1. Bank transfer (only available within Indonesia)
2. Bitcoin
3. Litecoin
Selecting the bitcoin option presents us with a btc address of `1NyjuDCFpwEuzuWWAZWqt94maZSuTddx3P` to send payment to.  
This particular address has been active since mid 2018 and to date has had 949 transactions totalling almost 3.6 BTC/$40k USD.

![btcwallet](https://user-images.githubusercontent.com/50568995/115518480-1cf0f880-a280-11eb-8fd3-160ad49506dd.png)
[Wallet history](https://www.blockchain.com/btc/address/1NyjuDCFpwEuzuWWAZWqt94maZSuTddx3P)

Practically all funds that go in to this wallet are shortly thereafter transferred out to another wallet believed to be owned by a cryptocurrency exchange (which would explain the numbers!). This wallet (as of writing) holds approx 27.6 BTC/$303k USD

![2ndwallet](https://user-images.githubusercontent.com/50568995/115518535-2e3a0500-a280-11eb-9b9f-c84736703595.png)
[Wallet history](https://www.blockchain.com/btc/address/1JUToCyRL5UwgeucjnFAagKs4v1YqhjT1d)

The litecoin wallet `MHg1zYpLNrsRWkb5nGSAWvLeStdamKJ8AA` tells a similar tale. So far netting around a modest 12 LTC, which has subsequently been transferred to another wallet which held 129,233 LTC.

## 16Shop Dissection
This section will cover a lot of in-depth information pertaining to how the kit works, the information obtained from victims, how it avoids detection and reversing the source code and functionality of the kit.

Not all kits will necessarily function the same as below, as each targeted brand has their own unique elements. However as the latest addition to the 16Shop portfolio is AMEX, we'll be taking a look at this kit.

### Directory structure
Just so we all know what we are working with here, here is the structure of the AMEX kit.

<details>
    <summary>tree output (long!)</summary>
    
```
16Shop-Amex-New-V1.zip.
|   .DS_Store
|   .htaccess
|   antibot.ini
|   antibot.php
|   blacklist.php
|   blocker.php
|   crawlerdetect.php
|   index.php
|   load.php
|   main.php
|   onetime.php
|   proxyblock.php
|   server.ini
|
+---admin
|   |   .DS_Store
|   |   antibot.php
|   |   bot.php
|   |   index.php
|   |   login.php
|   |   logout.php
|   |   reset.php
|   |   visitor.php
|   |
|   +---css
|   |       font-face.css
|   |       theme.css
|   |
|   +---fonts
|   |   \---poppins
|   |           poppins-v5-latin-100.eot
|   |           poppins-v5-latin-100.svg
|   |           poppins-v5-latin-100.ttf
|   |           poppins-v5-latin-100.woff
|   |           poppins-v5-latin-100.woff2
|   |           poppins-v5-latin-100italic.eot
|   |           poppins-v5-latin-100italic.svg
|   |           poppins-v5-latin-100italic.ttf
|   |           poppins-v5-latin-100italic.woff
|   |           poppins-v5-latin-100italic.woff2
|   |           poppins-v5-latin-200.eot
|   |           poppins-v5-latin-200.svg
|   |           poppins-v5-latin-200.ttf
|   |           poppins-v5-latin-200.woff
|   |           poppins-v5-latin-200.woff2
|   |           poppins-v5-latin-200italic.eot
|   |           poppins-v5-latin-200italic.svg
|   |           poppins-v5-latin-200italic.ttf
|   |           poppins-v5-latin-200italic.woff
|   |           poppins-v5-latin-200italic.woff2
|   |           poppins-v5-latin-300.eot
|   |           poppins-v5-latin-300.svg
|   |           poppins-v5-latin-300.ttf
|   |           poppins-v5-latin-300.woff
|   |           poppins-v5-latin-300.woff2
|   |           poppins-v5-latin-300italic.eot
|   |           poppins-v5-latin-300italic.svg
|   |           poppins-v5-latin-300italic.ttf
|   |           poppins-v5-latin-300italic.woff
|   |           poppins-v5-latin-300italic.woff2
|   |           poppins-v5-latin-500.eot
|   |           poppins-v5-latin-500.svg
|   |           poppins-v5-latin-500.ttf
|   |           poppins-v5-latin-500.woff
|   |           poppins-v5-latin-500.woff2
|   |           poppins-v5-latin-500italic.eot
|   |           poppins-v5-latin-500italic.svg
|   |           poppins-v5-latin-500italic.ttf
|   |           poppins-v5-latin-500italic.woff
|   |           poppins-v5-latin-500italic.woff2
|   |           poppins-v5-latin-600.eot
|   |           poppins-v5-latin-600.svg
|   |           poppins-v5-latin-600.ttf
|   |           poppins-v5-latin-600.woff
|   |           poppins-v5-latin-600.woff2
|   |           poppins-v5-latin-600italic.eot
|   |           poppins-v5-latin-600italic.svg
|   |           poppins-v5-latin-600italic.ttf
|   |           poppins-v5-latin-600italic.woff
|   |           poppins-v5-latin-600italic.woff2
|   |           poppins-v5-latin-700.eot
|   |           poppins-v5-latin-700.svg
|   |           poppins-v5-latin-700.ttf
|   |           poppins-v5-latin-700.woff
|   |           poppins-v5-latin-700.woff2
|   |           poppins-v5-latin-700italic.eot
|   |           poppins-v5-latin-700italic.svg
|   |           poppins-v5-latin-700italic.ttf
|   |           poppins-v5-latin-700italic.woff
|   |           poppins-v5-latin-700italic.woff2
|   |           poppins-v5-latin-800.eot
|   |           poppins-v5-latin-800.svg
|   |           poppins-v5-latin-800.ttf
|   |           poppins-v5-latin-800.woff
|   |           poppins-v5-latin-800.woff2
|   |           poppins-v5-latin-800italic.eot
|   |           poppins-v5-latin-800italic.svg
|   |           poppins-v5-latin-800italic.ttf
|   |           poppins-v5-latin-800italic.woff
|   |           poppins-v5-latin-800italic.woff2
|   |           poppins-v5-latin-900.eot
|   |           poppins-v5-latin-900.svg
|   |           poppins-v5-latin-900.ttf
|   |           poppins-v5-latin-900.woff
|   |           poppins-v5-latin-900.woff2
|   |           poppins-v5-latin-900italic.eot
|   |           poppins-v5-latin-900italic.svg
|   |           poppins-v5-latin-900italic.ttf
|   |           poppins-v5-latin-900italic.woff
|   |           poppins-v5-latin-900italic.woff2
|   |           poppins-v5-latin-italic.eot
|   |           poppins-v5-latin-italic.svg
|   |           poppins-v5-latin-italic.ttf
|   |           poppins-v5-latin-italic.woff
|   |           poppins-v5-latin-italic.woff2
|   |           poppins-v5-latin-regular.eot
|   |           poppins-v5-latin-regular.svg
|   |           poppins-v5-latin-regular.ttf
|   |           poppins-v5-latin-regular.woff
|   |           poppins-v5-latin-regular.woff2
|   |
|   +---images
|   |   |   bg-title-01.jpg
|   |   |   bg-title-02.jpg
|   |   |
|   |   \---icon
|   |           avatar-01.jpg
|   |           avatar-02.jpg
|   |           avatar-03.jpg
|   |           avatar-04.jpg
|   |           avatar-05.jpg
|   |           avatar-06.jpg
|   |           avatar-big-01.jpg
|   |           logo-blue.png
|   |           logo-mini.png
|   |           logo-white.png
|   |           logo.png
|   |           Untitled-1.jpg
|   |
|   +---js
|   |       main.js
|   |
|   \---vendor
|       |   jquery-3.2.1.min.js
|       |   jquery-ui.min.js
|       |
|       +---animsition
|       |       animsition.min.css
|       |       animsition.min.js
|       |
|       +---bootstrap-4.1
|       |       bootstrap.min.css
|       |       bootstrap.min.js
|       |       popper.min.js
|       |
|       +---bootstrap-progressbar
|       |       bootstrap-progressbar-3.3.4.min.css
|       |       bootstrap-progressbar.min.js
|       |
|       +---chartjs
|       |       Chart.bundle.min.js
|       |
|       +---circle-progress
|       |       circle-progress.js
|       |       circle-progress.min.js
|       |
|       +---countdown
|       |       countdowntime.js
|       |       jquery.countdown.min.js
|       |       moment-timezone-with-data.min.js
|       |       moment-timezone.min.js
|       |       moment.min.js
|       |
|       +---counter-up
|       |       jquery.counterup.min.js
|       |       jquery.waypoints.min.js
|       |       waypoints.min.js
|       |
|       +---css-hamburgers
|       |       hamburgers.css
|       |       hamburgers.min.css
|       |
|       +---font-awesome-4.7
|       |   |   HELP-US-OUT.txt
|       |   |
|       |   +---css
|       |   |       font-awesome.css
|       |   |       font-awesome.min.css
|       |   |
|       |   \---fonts
|       |           fontawesome-webfont.eot
|       |           fontawesome-webfont.svg
|       |           fontawesome-webfont.ttf
|       |           fontawesome-webfont.woff
|       |           fontawesome-webfont.woff2
|       |           FontAwesome.otf
|       |
|       +---font-awesome-5
|       |   +---css
|       |   |       fontawesome-all.min.css
|       |   |
|       |   \---webfonts
|       |           fa-brands-400.eot
|       |           fa-brands-400.svg
|       |           fa-brands-400.ttf
|       |           fa-brands-400.woff
|       |           fa-brands-400.woff2
|       |           fa-regular-400.eot
|       |           fa-regular-400.svg
|       |           fa-regular-400.ttf
|       |           fa-regular-400.woff
|       |           fa-regular-400.woff2
|       |           fa-solid-900.eot
|       |           fa-solid-900.svg
|       |           fa-solid-900.ttf
|       |           fa-solid-900.woff
|       |           fa-solid-900.woff2
|       |
|       +---fullcalendar-3.10.0
|       |   |   CHANGELOG.txt
|       |   |   CONTRIBUTING.txt
|       |   |   fullcalendar.css
|       |   |   fullcalendar.js
|       |   |   fullcalendar.min.css
|       |   |   fullcalendar.min.js
|       |   |   fullcalendar.print.css
|       |   |   fullcalendar.print.min.css
|       |   |   gcal.js
|       |   |   gcal.min.js
|       |   |   LICENSE.txt
|       |   |   locale-all.js
|       |   |   README.txt
|       |   |
|       |   +---lib
|       |   |       moment.min.js
|       |   |
|       |   \---locale
|       |           af.js
|       |           ar-dz.js
|       |           ar-kw.js
|       |           ar-ly.js
|       |           ar-ma.js
|       |           ar-sa.js
|       |           ar-tn.js
|       |           ar.js
|       |           be.js
|       |           bg.js
|       |           bs.js
|       |           ca.js
|       |           cs.js
|       |           da.js
|       |           de-at.js
|       |           de-ch.js
|       |           de.js
|       |           el.js
|       |           en-au.js
|       |           en-ca.js
|       |           en-gb.js
|       |           en-ie.js
|       |           en-nz.js
|       |           es-do.js
|       |           es-us.js
|       |           es.js
|       |           et.js
|       |           eu.js
|       |           fa.js
|       |           fi.js
|       |           fr-ca.js
|       |           fr-ch.js
|       |           fr.js
|       |           gl.js
|       |           he.js
|       |           hi.js
|       |           hr.js
|       |           hu.js
|       |           id.js
|       |           is.js
|       |           it.js
|       |           ja.js
|       |           ka.js
|       |           kk.js
|       |           ko.js
|       |           lb.js
|       |           lt.js
|       |           lv.js
|       |           mk.js
|       |           ms-my.js
|       |           ms.js
|       |           nb.js
|       |           nl-be.js
|       |           nl.js
|       |           nn.js
|       |           pl.js
|       |           pt-br.js
|       |           pt.js
|       |           ro.js
|       |           ru.js
|       |           sk.js
|       |           sl.js
|       |           sq.js
|       |           sr-cyrl.js
|       |           sr.js
|       |           sv.js
|       |           th.js
|       |           tr.js
|       |           uk.js
|       |           vi.js
|       |           zh-cn.js
|       |           zh-hk.js
|       |           zh-tw.js
|       |
|       +---lightbox2
|       |   +---dist
|       |   |   +---css
|       |   |   |       lightbox.css
|       |   |   |
|       |   |   +---images
|       |   |   |       close.png
|       |   |   |       loading.gif
|       |   |   |       next.png
|       |   |   |       prev.png
|       |   |   |
|       |   |   \---js
|       |   |           lightbox-plus-jquery.js
|       |   |           lightbox-plus-jquery.min.js
|       |   |           lightbox-plus-jquery.min.map
|       |   |           lightbox.js
|       |   |           lightbox.min.js
|       |   |           lightbox.min.map
|       |   |
|       |   \---src
|       |       +---css
|       |       |       lightbox.css
|       |       |
|       |       +---images
|       |       |       close.png
|       |       |       loading.gif
|       |       |       next.png
|       |       |       prev.png
|       |       |
|       |       \---js
|       |               lightbox.js
|       |
|       +---mdi-font
|       |   +---css
|       |   |       material-design-iconic-font.css
|       |   |       material-design-iconic-font.min.css
|       |   |
|       |   \---fonts
|       |           Material-Design-Iconic-Font.eot
|       |           Material-Design-Iconic-Font.svg
|       |           Material-Design-Iconic-Font.ttf
|       |           Material-Design-Iconic-Font.woff
|       |           Material-Design-Iconic-Font.woff2
|       |
|       +---perfect-scrollbar
|       |       perfect-scrollbar.css
|       |       perfect-scrollbar.js
|       |       perfect-scrollbar.min.js
|       |
|       +---progressbar
|       |       progressbar.js
|       |       progressbar.min.js
|       |
|       +---select2
|       |       select2.min.css
|       |       select2.min.js
|       |
|       +---slick
|       |   |   ajax-loader.gif
|       |   |   config.rb
|       |   |   slick-theme.css
|       |   |   slick-theme.less
|       |   |   slick-theme.scss
|       |   |   slick.css
|       |   |   slick.js
|       |   |   slick.less
|       |   |   slick.min.js
|       |   |   slick.scss
|       |   |
|       |   \---fonts
|       |           slick.eot
|       |           slick.svg
|       |           slick.ttf
|       |           slick.woff
|       |
|       +---smk-accordion
|       |       accordion.css
|       |       accordion.js
|       |       accordion.min.js
|       |
|       +---sweetalert
|       |       sweetalert.min.js
|       |
|       +---vector-map
|       |       jquery.vmap.brazil.js
|       |       jquery.vmap.europe.js
|       |       jquery.vmap.france.js
|       |       jquery.vmap.germany.js
|       |       jquery.vmap.js
|       |       jquery.vmap.min.js
|       |       jquery.vmap.russia.js
|       |       jquery.vmap.sampledata.js
|       |       jquery.vmap.usa.js
|       |       jquery.vmap.world.js
|       |       jqvmap.min.css
|       |
|       \---wow
|               animate.css
|               wow.min.js
|
+---CrawlerDetect
|   |   .DS_Store
|   |   CrawlerDetect.php
|   |   ReferralSpamDetect.php
|   |
|   \---Fixtures
|           AbstractProvider.php
|           AbstractReff.php
|           Crawlers.php
|           Exclusions.php
|           Headers.php
|           Headerspam.php
|           SpamReferrers.php
|
+---myca
|   |   .DS_Store
|   |   .htaccess
|   |   done.php
|   |   index.php
|   |   link_email.php
|   |   login.php
|   |   session.php
|   |   submit_email.php
|   |   submit_verification.php
|   |   verification.php
|   |   verification_payment.php
|   |
|   \---img
|           amex_generic_img.gif
|           BlueCashEveryday.png
|           icon-gear.gif
|           img-cardart-bce.png
|           iNav_sprite_footer.gif
|           logo_bluebox_1x.gif
|           mobile_myca_300x250.gif
|
+---result
|       index.php
|
\---security
        blacklist.dat
        index.php
        onetime.dat
        whitelist.dat
```
    
</details>  
<br>

There are a lot of resources within this kit, however the more interesting directories we'll be focusing on are;
* The root directory
* `admin`
* `security`
* `myca`

### Avoiding detection
![](https://media.giphy.com/media/QA88yMhazfDI4/giphy.gif)

16Shop kits utilise several methods to attempt and evade detection which may prompt a takedown of their deployment. Some of these controls are further covered in the C2 section which explores how the kit interacts with 16Shop's api to alter its behaviour.

#### .htaccess
Within several directories a specially made Apache `.htaccess` file (almost 10,000 lines!) redirects or blocks visitors based on attributes of the request. If the request appears to come from a known crawler, scanner or what would appear to not be a potential victim, it will redirect the browser to a legitimate URL.

#### CrawlerDetect
[CrawlerDetect](https://github.com/JayBizzle/Crawler-Detect) is an open source tool written in PHP which aims to identify and stop known bots/crawlers/spiders based on the `user_agent` and `http_from` headers.

#### Antibot
Antibot is a popular service for many PaaS kits that deserves a deep-dive all of it's own. The service provides an api which can be queried along with an ip. If the ip has been associated with a bot or service which crawls for malicious sites it will block the request and present the requester with a 403 http response.

As you can see from the below code taken from `antibot.php` it will check for the existence of an `antibot.ini` file which should (if the user has paid for the service) contain an API key. If it exists, it allows the function `getUserIPszz()` to be called which checks the IP against antibot and logs the details if it is blocked.

![antibotcode-1](https://user-images.githubusercontent.com/50568995/115519161-d780fb00-a280-11eb-80ca-b92fb5e6ad69.png)

#### Killbot
Killbot is a recent addition to some versions of 16Shop and is running as a direct competitor to antibot, touting additional functionality and cheaper costs. Killbot code is not present in this kit we are looking at, however I will be producing a write-up on this soon.

#### Proxyblock
16Shop also utilises some PHP code alongside a third-party api hosted by `mind-media.com` which will check the visitor's IP against a list of known proxy and VPN IP ranges. If there's a match, the visitor is presented with a 403 http response and details are logged.

#### Arguments
16Shop can utilise required arguments/parameters as part of a GET request when navigating to the domain. This means that unless you know the param which is specified by the kit owner you will be unable to even reach the phishing page.  
This is covered in more detail further on.

### DRM
Similarly to other big players on the PaaS market, 16Shop includes basic digital rights management and licensing capabilities to try and prevent individuals from running off with the source code and deploying the kit as many times as they like. Likewise this allows further control from the 16Shop author and monetisation options.  
This control mainly consists of various functions and obfuscated PHP code, stemming from `index.php` in the root of the kit directory.

![image-4](https://user-images.githubusercontent.com/50568995/115519346-07300300-a281-11eb-8ccc-cc2f37e47564.png)

Looking at `index.php` it's clear there is not much there, however it is including `load.php` and calling a function.  
Opening `load.php` we can see it contains obfuscated code to try and prevent further analysis.

![drmcode](https://user-images.githubusercontent.com/50568995/115519467-2333a480-a281-11eb-8684-3dcc840d4ae0.png)  
_Some code truncated for brevity_

Taking the variables and unescaping/converting from HEX and Octal reveals the variables and functions being declared:

![obfus1](https://user-images.githubusercontent.com/50568995/115519534-33e41a80-a281-11eb-9fc1-f513f07dc287.png)

From here we can easily deobfuscate the eval taking place from  
`$kMjE4NDcxODYxs($det($wNTg0NDQ1MjE4z($gMjY1MzcwMjYf($aNzk0MjAxOTMyd("7U0Jrts...yN9gO3/6o/w8="))))))`  
to  
`hex2bin(str_rot13(gzinflate(str_rot13(base64_decode("7U0Jrts...yN9gO3/6o/w8="))))));`

Calling these functions in reverse reveals further obfuscated code. (Bonus points for spotting the easter egg within the variable names)

![obfus2](https://user-images.githubusercontent.com/50568995/115519663-4fe7bc00-a281-11eb-8ec8-65a351840b6d.png)

After a few more rounds of deobfuscation we end up with the following code:

![unobfus1-1](https://user-images.githubusercontent.com/50568995/115519695-57a76080-a281-11eb-8a58-b0fc484595e5.png)

This code is mainly responsible for checking the deployment has been registered- and if it has, will return and process the code required to allow the kit to function correctly. This alongside some other PHP embedded in the kit serves as a method of ensuring any deployments have to go via 16Shops C2 to be validated and work as intended.

### C2
![](https://media.giphy.com/media/8EmeieJAGjvUI/giphy.gif)

As we can now see the api endpoint and data being sent to 16Shops C2, we can simply call it directly and capture the response to see what is happening behind the scenes when browsing to the root URL of a 16Shop deployment.

![c2codereturned](https://user-images.githubusercontent.com/50568995/115519760-68f06d00-a281-11eb-81c9-4a518270e19c.png)

There is a lot happening within this chunk of code so let's break it down;

![image-3](https://user-images.githubusercontent.com/50568995/115519799-71e13e80-a281-11eb-893a-07240f92c0b9.png)

`main.php` is being included, which contains various functions for the kit such as getting the IP and OS information of the visitor, sending emails to the threat actor behind the deployment and most interestingly obtaining the "settings" for the deployment.

![getsetting](https://user-images.githubusercontent.com/50568995/115519839-7b6aa680-a281-11eb-9cc4-7b13459dbfd7.png)

This function will return a json response which contains the configuration options for the deployment as configured by the actor. For example;
```json
{                                           
  "email_result": "email@domain.com",
  "login_result": "email@domain.com",
  "lock_platform": "",                      
  "sender_mail": "admin@16shop.us",         
  "site_parameter": "param",               
  "site_password": "16shop",                
  "site_param_on": "on",                    
  "site_pass_on": "",                       
  "send_login": "on",                       
  "get_photo": "on",                        
  "get_vbv": "on",                          
  "get_email": "on",                        
  "get_bank": "on",                         
  "onetime": "on",                          
  "block_host": "on",                       
  "block_ua": "on",                         
  "block_iprange": "on",                    
  "block_isp": "on",                        
  "block_vpn": "on",                        
  "letter": "unusual_activity",             
  "double_cc": "",                          
  "block_referrer": "on"                      
}
```

The `email_result` and `login_result` values contain the exfil email addresses associated with this deployment, and all phishing results will be sent to these mailboxes. Tracking these addresses allow us to attribute multiple deployments to the same actor(s) until their email address is either rotated or closed by the mail provider. This has been such an effective method of tracking activity in fact, that some even felt compelled to leave me a message by amending their `email_result` details.

![image-5](https://user-images.githubusercontent.com/50568995/115520001-9e955600-a281-11eb-8ef6-b2583433d7a7.png)

Some of these "settings" dicate how some of the rest of this code will execute.

![image-2](https://user-images.githubusercontent.com/50568995/115520057-a94feb00-a281-11eb-876a-08815ed0353e.png)

As we can see, most of these settings are set to "on" which will result in the referenced PHP files to be executed. These PHP scripts are designed to try and prevent bots, crawlers and other IP ranges to try and reduce detections from automated systems.

The following code block is responsible for then directing the potential victim to the phishing page. This functionality is not unique to 16Shop, but serves as another clever mechanism to avoid deliberate/accidental detection.

![image-1](https://user-images.githubusercontent.com/50568995/115520080-b10f8f80-a281-11eb-9460-7a681c496394.png)

From the above code we can see the following steps are taking place
* If the setting `site_param_on` is on, get the specified `site_parameter` stored in `$setting`
* Check the specified parameter has been supplied as an argument within the GET request (i.e. `https://exampledomain.com/?param` with param matching the setting).
* If it's present set `$key` to the PHP session key
* If it's not present, log and respond with 403
* If `$key` has been set, log the request and set the location to `https://exampledomain.com/myca?key=$key`

At this point in the phish, if the visitor has been identified as:
* Not a bot
* Not coming from a blacklisted IP
* Not using a proxy/VPN service
* Provided the correct "key"/parameter (generally from clicking on the URL from within a phishing email)
They will be forwarded on to the phishing page.

### Attack phase
When a potential victim lands on the first stage phishing page, `session.php` is called which checks for the existence of a valid `$key` which was declared before being redirected.  
This is to prevent guessing or visiting the phishing page directly without first providing the valid parameter.

![keycode](https://user-images.githubusercontent.com/50568995/115520281-e74d0f00-a281-11eb-922d-30635d843a7b.png)

After "de-fanging" the kit and changing the output of some functions, we are able to easily run this locally to simulate the process that the victim would follow. Any malicious external calls have been removed and all results are output to local files instead of emails.

The process of this phish breaks down to the following stages:
1. Victim prompted for user ID and password for their AMEX account
1. Victim prompted for full name and billing address
1. Victim prompted for credit card information
1. Victim prompted for email address and email password
1. Victim redirected to legitimate `americanexpress.com` landing page

#### AMEX login
The potential victim is prompted with an almost exact copy of AMEX's own account login screen, with even various assets such as images being pulled from `americanexpress.com` directly.

Upon entering a user id and password a POST is sent to `login.php` which takes that POST data and constructs message which is then sent to the kit owner or email address declared within `$setting`.  
The message contents would appear as below in the threat actors mailbox:

```
#--------------------[ AMEX LOGIN ]-------------------------#
User ID		    : ".$_POST['UserID']."
Password		: ".$_POST['password']."
Account Type	: ".$_POST['type']."
#--------------------------[ PC INFORMATION ]-------------------------#
IP Address		: ".$ip."
ISP		        : ".$ispuser."
Region		    : ".$regioncity."
City		    : ".$citykota."
Continent		: ".$continent."
Timezone		: ".$timezone."
OS/Browser		: ".$os." / ".$br."
Date			: ".$date."
User Agent		: ".$user_agent."
#--------------------------[ PRIVATE ]-----------------------------#
```

After sending this information, the IP of the victim is logged within 2 files, `total_login.txt` and `log_visitor.txt`. These are referenced further on when we take a look at the admin panel of 16Shop.  
The next location the victim is directed to is `verification?request_type=LogonHandler&Face=en_US&key=$key`

#### Billing information
This page requests the potential victims billing address information including full name and date of birth.

![billingaddress](https://user-images.githubusercontent.com/50568995/115523124-a6a2c500-a284-11eb-8d04-37339530a0ba.png)

Once the fields have been populated and the victim clicks continue, there is another POST sent to `verification_payment.php` where the form data is temporarily stored within a hidden input field.

#### CC info
On this next page, the victim is prompted for their credit card information.

![ccinfo](https://user-images.githubusercontent.com/50568995/115523252-c9cd7480-a284-11eb-9539-10ca885accf6.png)

There are several functions called here which check the validity of the data entered, and will only allow the user to progress if they enter a valid AMEX credit card number.

![cccheckfunc](https://user-images.githubusercontent.com/50568995/115523284-d3ef7300-a284-11eb-9885-cb05bc9d0134.png)

If the card information entered pass these checks, the card data along with the billing information stored within the hidden form are submitted via POST to `submit_verification.php` which again constructs a message which is then emailed to the threat actor.The message content would appear as below.

```
$messag#--------------------[ 16SHOP - AMEX ]-------------------------#
User ID		    : ".$_SESSION['UserID']."
Password		: ".$_SESSION['password']."
#--------------------------------[ CARD DETAILS ]----------------------------#
Type			: ".strtoupper($bin["scheme"])." - ".strtoupper($bin["type"])."
Level			: ".strtoupper($bin["brand"])."
Cardholders     : ".$_POST['fullname']."
CC Number		: ".$_POST['cc1']."
Expired		    : ".$_POST['exp_month']."/".$_POST['exp_year']."
Card Security Code	: ".$_POST['cvv']."
4-Digits Card   : ".$_POST['cvv2']."
Copy Check Live : ".$_POST['cc1']."|".$_POST['exp_month']."|".$_POST['exp_year']."
#-------------------------[ BILLING ADDRESS ]--------------------------------#
Full Name		: ".$_POST['fullname']."
Address		    : ".$_POST['address']."
City			: ".$_POST['city']."
State			: ".$_POST['state']."
Country		    : ".$_POST['country']."
Zip			    : ".$_POST['zipcode']."
DOB			    : ".$_POST['tanggal']."/".$_POST['bulan']."/".$_POST['tahun']."
SSN			    : ".$_POST['ssn']."
#--------------------------[ PC INFORMATION ]-------------------------#
IP Address		: ".$ip."
ISP		        : ".$ispuser."
Region		    : ".$regioncity."
City		    : ".$citykota."
Continent		: ".$continent."
Timezone		: ".$timezone."
OS/Browser		: ".$os." / ".$br."
Date			: ".$date."
User Agent		: ".$user_agent."
#--------------------------[ PRIVATE ]-----------------------------#
```

If the data is not valid or the user did not complete the form, they are redirected to the billing information page and prompted to restart the process.

![ccredirect](https://user-images.githubusercontent.com/50568995/115523360-e5d11600-a284-11eb-878b-81d04f4c16fd.png)

The victim IP is once again logged to the following log files: `total_cc.txt`, `total_bin.txt`, `log_visitor.txt`. After this logging takes place, the victim is then redirected to `link_email.php`.

#### Email credentials
The next screen prompts the victim to "linked an email account", and generically asks for their email credentials.

![linkemail](https://user-images.githubusercontent.com/50568995/115523426-f6818c00-a284-11eb-9f89-ccc7f3dac60b.png)

Once the information is entered, this data is submitted via POST to `submit_email.php` which again, constructs an email to the threat actor and logs the victim IP to `total_email.php` and `log_visitor.php`.  
The mail body would appear as below:

```
#--------------------[ AMEX LOGIN ]-------------------------#
User ID		: ".$_POST['emailaddress']."
Password		: ".$_POST['emailpassword']."
#--------------------------[ PC INFORMATION ]-------------------------#
IP Address		: ".$ip."
ISP		    : ".$ispuser."
Region		    : ".$regioncity."
City		    : ".$citykota."
Continent		: ".$continent."
Timezone		: ".$timezone."
OS/Browser		: ".$os." / ".$br."
Date			: ".$date."
User Agent		: ".$user_agent."
#--------------------------[ PRIVATE ]-----------------------------#
```

After the logging is complete, the victim is redirected to `done.php`.

#### Completion
This is the final page in the attack phase of this phish. The victim is thanked for their information and then redirected to the legitimate AMEX account login page.

![thanks](https://user-images.githubusercontent.com/50568995/115523820-609a3100-a285-11eb-82f6-ebd641c8f7e2.png)

Another interesting tactic employed by the 16Shop kit here is through the use of a function called "onetime". Once the victim has reached the final step, and if the "onetime" `$setting` is set to "on", their IP is logged to the file `onetime.dat`.

![onetime](https://user-images.githubusercontent.com/50568995/115523924-7c053c00-a285-11eb-9475-ad9a09b90990.png)

You may recall we saw this setting referenced in the code being returned from the C2 earlier on, along with the file `onetime.php`. This PHP code is responsible for ensuring that once a victim has entered their information and completed the process, they are unable to visit the page again and instead are immediatley redirected to the legitimate AMEX account login url.

![onetimecheck](https://user-images.githubusercontent.com/50568995/115523941-81fb1d00-a285-11eb-95f7-1dec5fc1326b.png)

There are many functions at play here. At a high level, the contents of `onetime.dat` are retrieved along with some other blacklists utilised by the kit. The victim or visitor IP is then checked against this array of IP addresses and if there is a match, the visit is logged and the user redirected to `https://online.americanexpress.com/myca/logon/us/action/LogonHandler?request_type=LogonHandler&Face=en_US`.

And with that, the victim interaction is done and any sensitive information will be with the threat actor behind the deployment.

### Admin panel
#### Dashboard
16Shop kits also come with an admin panel of sorts, which allows for the threat actor to access an overview/dashboard of recent events and how successful the deployment has been.  
Navigating to `/admin/login.php` presents the following login page.

![adminlogin](https://user-images.githubusercontent.com/50568995/115524345-ef0eb280-a285-11eb-976b-1235381b08e7.png)

Looking at the PHP code, upon entering the key, username and password the following function is called.

![adminloginfunc](https://user-images.githubusercontent.com/50568995/115524357-f59d2a00-a285-11eb-9409-782a31647782.png)

This takes the provided key, username and password and submits them to an API endpoint controlled by the 16Shop author. These details are then checked and if valid, the `$server_output` will contain "valid".  
Humorously enough, an invalid request results in the following response.

![invalidcall](https://user-images.githubusercontent.com/50568995/115524407-0352af80-a286-11eb-8b72-565c27d34d54.png)

When validated, the operator will be presented with a dashboard containing statistics and basic details on visits and successful phishing attempts.

![paneldashboard](https://user-images.githubusercontent.com/50568995/115524438-09e12700-a286-11eb-92d2-911f22452327.png)

Each menu item on the left hand side of the page offers different views allowing for:
* Adding or amending the antibot API key.
* Listing IP and OS information on visitors and victims
* Information on blocked visitors and bots
* Resetting the various log files which victim/bot IP information is logged to.
Outside of these capabilities the dashboard simply serves as a portal for the operator to gather basic statistics and information about the deployment. All victim information is sent directly to the threat actor via email and is not stored locally on web host.

#### Statistic sources
The stats presented on the admin dashboard are pulled directly from various log files written to during the attack phase.
* `log_visitor.txt` Contains IP and OS info of the victim, as well as a timestamp for each stage of the phish they reached
* `total_bin.txt` BIN number and OS of victims which entered bank details
* `total_cc.txt` IP of each victim which entered CC info
* `total_email.txt` IP of each victim which entered email credentials
* `total_login.txt` IP of each victim which submitted credentials
These files do not contain credentials or data which may lead the reader to attribute the information to a victims identity, however all of these log files are exposed for each 16Shop deployment. This means anyone can view the contents of these log files.

![logexample](https://user-images.githubusercontent.com/50568995/115524528-241b0500-a286-11eb-89af-2d142d9766f9.png)

Some time ago I ran a small experiment scraping these exposed log files and performing some analysis on a sample of the data from over a week period. If you're interested in what was discovered take a look at the post [here](./2020-05-12-16Shop-victim-analysis.md).

## IoC's
### Hashes
Below are some common hashes for 16Shop kit zip files in their various forms and versions. This also includes commonly found cracked kits which have not been re-branded. (SHA-256)
```
D59D89BDDB51425E1ADCF064A67697D491C296DAA8AED35F99A6F63075559D44
ECBC631A09CD2C4B2C6DBE393301AFC6D2AC545FAF9E599F6DCA296FDD4F1112
3C7E53177AEC628F12485F0C29A05B6312581448A172A759CFC7FE46296DC0C7
1554C68833C7D233FFD947D00865C5E102FEBB1321931D6ACD6F6404DF568F0C
E0F10F410EDCD2B2FB37FFDF6541DCC302899A9C584759E43F85A34308781043
1D2FF1E46E15F8F75458077C56183B16834A42AF40B03E649601D3BAB7178004
16DD5BF59391B1BF81F3861062654690B751208B2DFB8D37815F12B91BCD34E3
CB6E71C71845F41A7FBFB69D63A56E6024493492E23F392B056A84772D0DCF94
A41784D93D1AC04ED554AF814A56A5F99A53368D87F89B01D92C0B82C9291C87
3FDE92528C99D96151C5EE53E828A89555936825E5F38E3F4F47EA2D381E660F
3C626FC4D0169B223ED95D190A73382C5D52A854D5EC8CBBFCD4AC7E65216136
0D1D53B3B28A2CC82E03D3F823E881B7DAF55AADFF7FA784183D30634EBD91F2
9664C129777B69C88E9A63439F8836B38AD25A8EEE7B3D16D557C898F0B77B89
B3335A4A30360533BF982198DAD98711D90EC43C3C396754149C77B06536822D
2C0100E6147D43DCA5437AEBD2B2C044A5064F28CFE0A2E1E4137FC7B8F12B44
969A59F3F973E29D7FC8672AF5F3FC57D7B21855866A60A486C18B8D40EC9648
4BD048EBF4B4F7DD71E8D0B532FDE35967423A77589EA43C11262B751A138197
A74CFEB948863D04D3BD915082D1EA13DF32CAF25738088CFC3D4B00E044E65F
A3C3F907ED1F93FBFC7F9CF89F7EB22B9B4D24BD6EFBC5FEF64627E03A5D6CED
CE143EC97EE4314A24DB9DD666E25FBE52E4F97A4E0D351F6BCD21868493FD2B
04DB6A464A38C110039406E5DBE80CC09526D0EB34D36DF335EEB543DB5A9248
A331E200BD78329979FB02CA5B613DA6183CC8DCD87E24F79FAF2D2BBBC182D9
119D463D63016E3AD6A11484C1CF3C67602EA692623986F36EAA5043054B42E9
888985300972915442E09981094800CF5DF4A3992D42AEEEBF74D20C01F12D8A
60D65062E50FE51BC693ED6B3F762D760F1F4EA47D948E8DC7D95806636796C5
177E2D6BC0E39EF7FE8631FC0B35A3E40886C280BA119C90D13455C145BC5EDE
9F2074E0E645DCB90C2F88A5454222C474D2B190F3787413F099358BEF39A393
15C8BA0E16635974D3FDD39B8D01A7679E67E92EB4368DB3BC80DFFF2571DE0D
786411310F28F35FC7162D94458B956B27781ABC09CB742C2E8947E88B3E0DCC
A7C40CAC5D70C2CE37DCAB1BEFE8DA5A8B50BFCA0744532D3395F68C638706E4
F3FD85565F6305B90AAD9DB383234C19E271A9066B97CD941D37A42EB3AD7F9C
C654FFCBE96C3F08AC750073B5DB5FB3465F41BFF5CF2F88570C0BD88324EE02
AA0B0F3B90DEF9F832B35F5C4D5E55C22CA28AF7F272422A27A8A3EE24C2284A
1666295080DAFC6270EBBE71659FC0522C41714D4F89C62485579541CC6D460A
5FD138A3476CF3297CE4931A783ADDB90E9AC2096C9E2E93DE7F12908AA47377
8F2AB02C04F53F84FF8F7D2003439787367F9D710EF7306060B21114FEF8F349
B3684388AC2F55EE2EF0254A8518ECB695480CE02B954781D898424B5F074561
AF061C782C28E4F0BCF064C083216D22A715306B0C72F512E215D7BFC849BA92
1A286E02D29FFAAF404B7C35CDAA8450264F753FFBD779BE78D78AE1AEF581DD
49F4EC03DB7CBD77DCFAEDD1750F168ECCB8441842712EE8988D0ABEE29C2673
30F514B48471409D438BF5844E943B54A0D39ABC79C6764652AB27FAB3A8CC51
F7306A94AE651D9FEE774396E61EE231B66F686C0FB6482E8F6DD6FCAD47E097
```

### IP addresses
These ip's have been commonly associated with 16Shop deployments or C2 calls and should be treated with suspicion. Many of them are associated with dynamic DNS providers.
```
178.128.104.179
128.199.154.155
162.241.120.50
162.241.121.114
162.241.70.167
162.241.114.38
40.121.142.222
162.241.115.237
162.241.121.96
63.250.41.93
52.249.252.153
162.144.100.8
35.223.249.15
64.225.124.116
```

### Yara rules
These rules can be ran against zip files or any repository of phishing kit zips to identify if they contain common artefacts of 16Shop kits. The generic rule aims to capture any 16Shop kit including cracked versions, whereas the specific rules will identify 16Shop kits based on their targeted brand.

<details>
    <summary>Generic</summary>

```yara
rule PhishKit_16Shop
{
    meta:
        description = "Generic rule for 16Shop kits included cracked versions."
        author = "@sysgoblin"
        date = "2020-07-18"
        reference = ""

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "security"
        $dir2 = "admin"
        $server_ini = "server.ini"
        $setting_ini = "setting.ini"
        $file1 = "onetime.php"
        $file2 = "main.php"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        ($server_ini or $setting_ini) and
        $file1 and $file2 and
        $dir1 and $dir2
}
```
</details>
<br>

<details>
    <summary>Apple</summary>

```yara
rule PhishKit_16Shop_Apple
{
    meta:
        description = "Rule for 16Shop kits targeting Apple, including cracked versions."
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "security"
        $dir2 = "admin"
        $dir3 = "result"
        $server_ini = "server.ini"
        $setting_ini = "setting.ini"
        $file1 = "onetime.php"
        $file2 = "main.php"
        $ap_file1 = "truelogin.php"
        $ap_file2 = "icloud.css"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        ($server_ini or $setting_ini) and
        all of ($file*) and
        all of ($dir*) and
        all of ($ap_file*)
}
```
</details>
<br>

<details>
    <summary>Amazon</summary>

```yara
rule PhishKit_16Shop_Amazon
{
    meta:
        description = "Rule for 16Shop kits targeting Amazon, including cracked versions."
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "security"
        $dir2 = "admin"
        $dir3 = "result"
        $server_ini = "server.ini"
        $setting_ini = "setting.ini"
        $file1 = "onetime.php"
        $file2 = "main.php"
        $am_dir = "ap"
        $am_file1 = "additional.php"
        $am_file2 = "upload-cc.php"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        ($server_ini or $setting_ini) and
        all of ($file*) and
        all of ($dir*) and
        $am_dir and
        all of ($am_file*)
}
```
</details>
<br>

<details>
    <summary>PayPal</summary>

```yara
rule PhishKit_16Shop_PayPal
{
    meta:
        description = "Rule for 16Shop kits targeting PayPal, including cracked versions."
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "security"
        $dir2 = "admin"
        $dir3 = "result"
        $server_ini = "server.ini"
        $setting_ini = "setting.ini"
        $file1 = "onetime.php"
        $file2 = "main.php"
        $pp_dir = "pap"
        $pp_file1 = "limited.ini"
        $pp_file2 = "unusual_activity.ini"
        $pp_file3 = "unusual.php"
        $pp_file4 = "upload_selfie.php"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        ($server_ini or $setting_ini) and
        all of ($file*) and
        all of ($dir*) and
        $pp_dir and
        2 of ($pp_file*)
}
```
</details>
<br>

<details>
    <summary>AMEX</summary>

```yara
rule PhishKit_16Shop_Amex
{
    meta:
        description = "Rule for 16Shop kits targeting AMEX, including cracked versions."
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "security"
        $dir2 = "admin"
        $dir3 = "result"
        $server_ini = "server.ini"
        $setting_ini = "setting.ini"
        $file1 = "onetime.php"
        $file2 = "main.php"
        $amex_dir = "myca"
        $amex_file1 = "submit_verification.php"
        $amex_file2 = "amex_generic_img.gif"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        ($server_ini or $setting_ini) and
        all of ($file*) and
        all of ($dir*) and
        $amex_dir and
        all of ($amex_file*)
}
```
</details>
<br>

### Feeds
For a feed of recent 16Shop detections and exfil emails, check out the api over at [phishingreel.io](https://phishingreel.io)  

## Epilogue
Thanks for reading this c h o n k of a post. Here's a shout out to some awesome peeps who deserve a follow for helping review this content and also helping the fight against phishing!
* [@dave_daves](https://twitter.com/dave_daves)
* [@JCyberSec_](https://twitter.com/JCyberSec_)
* [@nullcookies](https://twitter.com/nullcookies)
* [@aneilan](https://twitter.com/aneilan)
* [@steved3](https://twitter.com/steved3)
* [@n0p1ishing](https://twitter.com/n0p1ishing)