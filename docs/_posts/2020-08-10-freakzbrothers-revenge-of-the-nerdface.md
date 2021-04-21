---
title: "FreakzBrothers: Revenge of the Nerd(face)"
date: 2020-08-10
---

## Foreword
This is a kit I have been tracking for some time now, and during that period have obtained dozens (if not hundreds) of copies, and detected thousands of deployments over the past few months.

This post will go in to detail on how the kit works from both the attacker and victim perspective and highlight some interesting findings. At the end I have also included some common IoC's for FreakzBrothers kits and Yara rules you can utilise when doing your own threat hunting.

You may notice some similarities if you read my recent post on [16Shop](2020-05-12-16Shop-victim-analysis.md), as FreakzBrothers (despite being a different kit) shares some resources and techniques. As such, some chunks of this post are lifted straight from the other post.

## Background
### What is FreakzBrothers?
FreakzBrothers is a popular "Phishing-as-a-service" (PaaS) kit which targets several popular brands, designed  for malicious actors to quickly and easily set up believable phishing pages targeting popular brands. 

As these kits are provided as a service, the individuals buying and using FreakzBrothers do not need to be skilled, thus widening the net for potential customers.

FreakzBrothers appears to be sold and distributed via social media or private channels, as it a popular tactic for a lot of phishing kits originating from SE Asia.

### Cracked versions
Unsurprisingly, in the criminal realm of phishing not everyone wants to pay for a service like FreakzBrothers and instead simply "crack" the kit and remove any functions which serve as to try and prevent unauthorised use.

FreakzBrothers does employ some basic methods in order to try and ensure users are authenticated and approved by the author. However, there are versions where these controls have been removed and is re-sold and distributed across multiple channels. Many cracked versions have also been completely re-branded to remove association with FreakzBrothers, but the underlying code and functionality are the same.

![image-16](https://user-images.githubusercontent.com/50568995/115612559-4db64980-a2e3-11eb-9b20-71779f1ae416.png)

## Analysis
We're going to be looking at a kit which is a few versions behind, however is still commonly seen being deployed. This particular kit targets Amazon, a popular "flavour" of FreakzBrothers. Other targets include Apple, PayPal, Netflix, and recently USAA.

### Directory structure

<details>
    <summary>tree output (long!)</summary>

```
AMAZON-FREAKZBROTHERS.V2.4.zip
|   .htaccess
|   additional.php
|   antibot.ini
|   blacklist.php
|   blocker.php
|   blocker2.php
|   crawlerdetect.php
|   index.php
|   killbot.ini
|   killbot.php
|   lang.php
|   main.php
|   onetime.php
|   proxyblock.php
|   session.php
|
+---admin
|   |   .htaccess
|   |   antibot.php
|   |   index.js
|   |   index.php
|   |   login.php
|   |   logout.php
|   |   reset.php
|   |   setting.php
|   |
|   +---css
|   |       bootstrap.min.css
|   |       bootstrap.min.css.map
|   |       paper-dashboard.css
|   |       paper-dashboard.css.map
|   |       paper-dashboard.min.css
|   |
|   +---demo
|   |       demo.css
|   |       demo.js
|   |
|   +---fonts
|   |       nucleo-icons.eot
|   |       nucleo-icons.ttf
|   |       nucleo-icons.woff
|   |       nucleo-icons.woff2
|   |
|   +---img
|   |   |   apple-icon.png
|   |   |   bg5.jpg
|   |   |   damir-bosnjak.jpg
|   |   |   default-avatar.png
|   |   |   favicon.png
|   |   |   header.jpg
|   |   |   jan-sendereks.jpg
|   |   |   logo-small.png
|   |   |   mike.jpg
|   |   |
|   |   \---faces
|   |           ayo-ogunseinde-1.jpg
|   |           ayo-ogunseinde-2.jpg
|   |           clem-onojeghuo-1.jpg
|   |           clem-onojeghuo-2.jpg
|   |           clem-onojeghuo-3.jpg
|   |           clem-onojeghuo-4.jpg
|   |           erik-lucatero-1.jpg
|   |           erik-lucatero-2.jpg
|   |           joe-gardner-1.jpg
|   |           joe-gardner-2.jpg
|   |           kaci-baum-1.jpg
|   |           kaci-baum-2.jpg
|   |
|   +---js
|   |   |   paper-dashboard.js
|   |   |   paper-dashboard.js.map
|   |   |   paper-dashboard.min.js
|   |   |
|   |   +---core
|   |   |       bootstrap.min.js
|   |   |       jquery.min.js
|   |   |       popper.min.js
|   |   |
|   |   \---plugins
|   |           bootstrap-notify.js
|   |           chartjs.min.js
|   |           perfect-scrollbar.jquery.min.js
|   |
|   +---scss
|   |   |   paper-dashboard.scss
|   |   |
|   |   \---paper-dashboard
|   |       |   _alerts.scss
|   |       |   _animated-buttons.scss
|   |       |   _buttons.scss
|   |       |   _cards.scss
|   |       |   _checkboxes-radio.scss
|   |       |   _dropdown.scss
|   |       |   _fixed-plugin.scss
|   |       |   _footers.scss
|   |       |   _images.scss
|   |       |   _inputs.scss
|   |       |   _misc.scss
|   |       |   _mixins.scss
|   |       |   _navbar.scss
|   |       |   _nucleo-outline.scss
|   |       |   _page-header.scss
|   |       |   _responsive.scss
|   |       |   _sidebar-and-main-panel.scss
|   |       |   _tables.scss
|   |       |   _typography.scss
|   |       |   _variables.scss
|   |       |
|   |       +---cards
|   |       |       _card-chart.scss
|   |       |       _card-map.scss
|   |       |       _card-plain.scss
|   |       |       _card-stats.scss
|   |       |       _card-user.scss
|   |       |
|   |       +---mixins
|   |       |       _buttons.scss
|   |       |       _cards.scss
|   |       |       _dropdown.scss
|   |       |       _inputs.scss
|   |       |       _page-header.scss
|   |       |       _transparency.scss
|   |       |       _vendor-prefixes.scss
|   |       |
|   |       \---plugins
|   |               _plugin-animate-bootstrap-notify.scss
|   |               _plugin-perfect-scrollbar.scss
|   |
|   \---vendor
|           config.php
|
+---ap
|   |   .DS_Store
|   |   .htaccess
|   |   authenticationContext.php
|   |   bank.php
|   |   bank_acc.php
|   |   billing.php
|   |   blacklist.php
|   |   done.php
|   |   email.php
|   |   index.php
|   |   login.php
|   |   login_email.php
|   |   payment.php
|   |   signin.php
|   |   submit_email.php
|   |   submit_upload_cc.php
|   |   updateBilling.php
|   |   update_billing.php
|   |   verify_credit.php
|   |
|   +---files
|   |   |   bank.php
|   |   |   billing.php
|   |   |   card.php
|   |   |   done.php
|   |   |   email.php
|   |   |   index.php
|   |   |   locked.php
|   |   |   login-aol.php
|   |   |   login-gmail.php
|   |   |   login-hotmail.php
|   |   |   login-hotmailjp.php
|   |   |   login-yahoo.php
|   |   |   login-yahoojp-mobile.php
|   |   |   login-yahoojp.php
|   |   |   signin.php
|   |   |   signin_mobile.php
|   |   |   upload-cc.php
|   |   |
|   |   \---comcast
|   |       |   index.php
|   |       |
|   |       \---Assets
|   |           +---css
|   |           |       fonts-remote.min.css
|   |           |       styles-light.min.css
|   |           |
|   |           +---img
|   |           |       favicon.ico
|   |           |
|   |           \---js
|   |                   com.js
|   |                   coms2.js
|   |
|   \---google
|           2googlelogo_color_112x36dp.png
|           arrow_back_grey600_24dp.png
|           avatar_2x.png
|           checkmark.png
|           cJZKeOuBrn4kERxqtaUH3T8E0i7KZn-EPnyo3HZu7kw.woff
|           DXI1ORHCpsQm3Vp6mXoaTXhCUOGz7vYGh680lGh-uXM.woff
|           googleg_lodp.ico
|           googlelogo_color_112x36dp.png
|           index.php
|           logo_1x.png
|           logo_2x.png
|           universal_language_settings-21.png
|           wlogostrip_230x17_1x.png
|           wlogostrip_230x17_2x.png
|           x_8px.png
|
+---assets
|   |   .DS_Store
|   |   index.php
|   |
|   +---css
|   |       billing.css
|   |       hotmail.css
|   |       main.css
|   |       mobile_login.css
|   |       yahoo-grid.css
|   |       yahoo-main.css
|   |       yahoojp-mob.css
|   |       yahoojp-mobile.css
|   |       yahoojp.css
|   |
|   +---img
|   |       .DS_Store
|   |       0.jpg
|   |       amazon.png
|   |       AmazonUIBaseCSS-sprite_1x-c4a765aedd886dc04d89e7e93b6a02c59ecb7013._V2_.png
|   |       favicon.ico
|   |       logo.png
|   |       logo_pc.png
|   |       uploadcc.png
|   |
|   \---js
|           .DS_Store
|           additional-methods.min.js
|           index.php
|           jquery-1.9.1.js
|           jquery.js
|           jquery.masked.js
|           jquery.maskedinput.js
|           jquery.payment.js
|           jquery.validate.min.js
|           validate.php
|           validation.js
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
+---result
|       index.php
|
+---security
|       blacklist.dat
|       index.php
|       onetime.dat
|       user.dat
|       whitelist.dat
|
\---upload
        .htaccess
        index.php
```
</details>
<br>

### Evasion
FreakzBrothers utilises several methods to attempt to evade detection or being scanned by bots. These methods include;

#### .htaccess
Within several directories a specially made Apache `.htaccess` file redirects or blocks visitors based on attributes of the request. If the request appears to come from a known crawler, scanner or what would appear to not be a potential victim, it will redirect the browser to a legitimate URL.

#### CrawlerDetect
[CrawlerDetect](https://github.com/JayBizzle/Crawler-Detect) is an open source tool written in PHP which aims to identify and stop known bots/crawlers/spiders based on the `user_agent` and `http_from` headers.

#### Antibot
Antibot is a popular service for many PaaS kits that deserves a deep-dive all of it's own. The service provides an api which can be queried along with an ip. If the ip has been associated with a bot or service which crawls for malicious sites it will block the request and present the requester with a 403 http response.

As you can see from the below code taken from `blocker2.php` it will check for the existence of an `antibot.ini` file which should (if the user has paid for the service) contain an API key. If it exists, it allows the function `getUserIPszz()` to be called which checks the IP against antibot and logs the details if it is blocked.

![image-17](https://user-images.githubusercontent.com/50568995/115612573-53ac2a80-a2e3-11eb-9f68-d77efc039025.png)

#### Killbot
Killbot is a recent addition to some versions of FreakzBrothers and is running as a direct competitor to antibot, touting additional functionality and cheaper costs. Killbot is present within the kit we are looking at, however I will be producing a separate write-up on this soon.

#### Proxyblock
FreakzBrothers also utilises some PHP code alongside a third-party api hosted by mind-media.com which will check the visitor's IP against a list of known proxy and VPN IP ranges. If there's a match, the visitor is presented with a 403 http response and details are logged.

#### Parameters
FreakzBrothers can utilise required arguments/parameters as part of a GET request when navigating to the phishing URL. This means that unless you know the param which is specified by the kit owner you will be unable to even reach the phishing page.

This is covered in more detail below.

### Attack phase
#### Clicking the link
Attacks generally originate from an email purporting to be from Amazon asking the potential victim to check their account. Within these messages there will be a link to the malicious site which will be generally structured like `https://fakeamazon.domain.com/?param` with the `param` being specified within the configuration of the kit if this is enabled.

When clicking the URL and connecting to the site, the landing page (`index.php`) performs several checks depending on the kit configuration.

First of all, several other PHP files are included which are responsible for importing various functions and configuration options, then a check is performed to see if there are existing API keys present for antibot or killbot. Additional PHP scripts are also included to check the visitors IP against block lists, as well as the use of a "one time" function.

![image-24](https://user-images.githubusercontent.com/50568995/115613110-ea78e700-a2e3-11eb-86c9-6f0b085f0f4d.png)

The file `onetime.php` includes several functions which if enabled, are there to ensure victims cannot visit the site again after entering their credentials.

Next the user agent and ISP of the requesting IP address are checked against address a word list, which returns a `403` response or redirect to `amazon.com` if there is a match.

![image-25](https://user-images.githubusercontent.com/50568995/115613123-eea50480-a2e3-11eb-9410-9bb0d0deb7c1.png)

The user agents and ISP's being blocked are commonly associated with web crawlers and VPS providers such as AWS and DigitalOcean. Any blocked request is then logged to `block_bot.txt` and `total_bot.txt`

Access to the site can further be restricted via a "site password" or requiring a specific `GET` parameter.

![image-26](https://user-images.githubusercontent.com/50568995/115613213-0aa8a600-a2e4-11eb-9390-6e6254f841c3.png)

If either of these options are enabled and the password/parameter is not correct, the visitor is redirected to `amazon.com` and the request logged within `block_bot.txt` and `total_bot.txt`.

If the request has provided the correct password or parameter, the visit is logged to `log_visitor.txt` and `total_click.txt` and the potential victim is then forwarded on to the first stage of the phishing attack.

![image-27](https://user-images.githubusercontent.com/50568995/115613298-23b15700-a2e4-11eb-9e30-cd4135363f92.png)  
_`$key` is a SHA1 hash of a base64 encoded string consisting of the victims IP and user agent_

At this point in the phish, if the visitor has been identified as:

* Not a bot
* Not coming from a blacklisted IP
* Not using a proxy/VPN service
* Provided the correct "key"/parameter (generally from clicking on the URL from within a phishing email)

They will be forwarded on to the phishing page.

#### Amazon credentials
The first stage phishing page presented to the user is an exact clone of Amazon's own "sign in" page.

![image-28](https://user-images.githubusercontent.com/50568995/115613484-58251300-a2e4-11eb-82d9-1ca7906043b1.png)

Depending on the OS of the device connecting to the page, the potential victim may instead be presented with a mobile view of the page. We will be following these steps from a desktop OS however.

![image-29](https://user-images.githubusercontent.com/50568995/115613565-725ef100-a2e4-11eb-9a5b-ca03b7ac6f7b.png)

After supplying credentials and clicking submit, the information is posted to `login.php` where several checks are made before proceeding.

![image-38](https://user-images.githubusercontent.com/50568995/115613589-7be85900-a2e4-11eb-982c-f55258b750ee.png)

These functions check that the provided email address and password are of sufficient length, and if the email provided is empty or belongs to a temporary mail service, the visitors IP is added to `onetime.dat`, where from then on `onetime.php` will prevent them from visiting the site again.

If the information provided by the victim passes these checks, the information is collated and submitted to the exfil email address set by the owner of the deployment. The message would appear as below;

```
++++++++++++++++++++++++[ FREAKZBROTHERS V2.0 ]+++++++++++++++++++++++++++
+--------------------------[ AMAZON ACCOUNT ]-------------------------+
# ACCOUNT        : ".$_POST['emailLogin']."
# PASSWORD   : ".$_POST['passwordLogin']."
+--------------------------[ PC INFORMATION ]-------------------------+
# IP ADDRESS     : ".$ip."
# ISP                    : ".$ispuser."
# REGION            : ".$regioncity."
# CITY                 : ".$citykota."
# CONTINENT      : ".$continent."
# TIMEZONE        : ".$timezone."
# DATE                : ".$date."
# USER AGENT    : ".$user_agent."
++++++++++++++++++++++++[ FREAKZBROTHERS V2.0 ]+++++++++++++++++++++++++++
```

The IP of the victim is also logged to `total_login.txt` before then being directed to `locked.php`.

At this stage depending on configuration, the victim is  informed their account has been locked, is suspended or needs to confirm an invoice, and that they are required to enter further information in order to resolve the issue.

![image-30](https://user-images.githubusercontent.com/50568995/115613653-96223700-a2e4-11eb-869b-a2404f8e272e.png)  
_Account locked message, one of multiple potential warnings the victim will get_

At this stage, when clicking "continue" the victim will either be directed straight to entering billing information, or if enabled, prompted to confirm their email credentials.

![image-39](https://user-images.githubusercontent.com/50568995/115613724-acc88e00-a2e4-11eb-8e59-68386f2fdb6d.png)

In this instance, `get_email` is set to `IYA` so we are directed to a copy of our mail providers login portal.

#### Email Credentials
The `login_email.php` file called determines what resources to load depending on the results of a regex match against the provided email address.

![image-40](https://user-images.githubusercontent.com/50568995/115613762-bd790400-a2e4-11eb-9b02-cbd1137c52c8.png)  
_Code which determines which fake email sign-in portal to present_

If there is no match (as in someone entered an email address associated with a domain not listed above), they are directed straight to the billing information stage.

In this example I entered a fake Gmail address, as such I have been directed to a fake Google account sign in page.

![image-31](https://user-images.githubusercontent.com/50568995/115613821-c9fd5c80-a2e4-11eb-950c-234b3d7be33f.png)

After the victim enters their email credentials, the password is stored within the `$_SESSION` variable for later retrieval. The victim is then redirected back to an Amazon themed page and prompted for further information.

#### Billing Information
The PHP file `billing.php` is called and presented to the victim. This form requests for their billing information in order to "verify" their account. This form supports auto fill as well as providing drop down options for the country.

![image-32](https://user-images.githubusercontent.com/50568995/115613893-e4cfd100-a2e4-11eb-95eb-03c6ca0c390e.png)

Once all the fields have been populated this information is submitted via `POST` to `card.php` and the victim is taken to the next stage.

#### Credit Card Information
All the information provided so far is `POST`'ed to this PHP file, and all information is saved to the `$_SESSION` variable.

![image-41](https://user-images.githubusercontent.com/50568995/115613933-f31ded00-a2e4-11eb-981e-059cc632a0b9.png)

Note there are some fields we have not encountered in this process (e.g. Passport information, citizen ID etc), this appears to be version/region specific.

This next page asks the victim to enter their credit card information to continue verification. Again, these forms support auto fill.

![image-33](https://user-images.githubusercontent.com/50568995/115613958-fa44fb00-a2e4-11eb-82ad-57cc5e12f850.png)

Once the victim has entered their card information, they may be asked to enter it for a second time depending on the configuration the threat actor has set. If `double_cc` is enabled, they will receive the below prompt and have to re-enter their details.

![image-34](https://user-images.githubusercontent.com/50568995/115614017-092bad80-a2e5-11eb-9541-19fe030c662f.png)

This information is then sent via `POST` to `updateBilling.php` where several checks are then performed to validate the input from the victim.

![image-43](https://user-images.githubusercontent.com/50568995/115614056-1779c980-a2e5-11eb-9d17-76bcd6f79ef1.png)

In this block of code, the entered information is checked and the following outcomes may occur:

1. If the credit card number was blank, add the user to `onetime.dat` and respond with `403`
2. If a credit card number is present call `validate_card()` which performs a simple regex check to validate card type (VISA, Mastercard etc)
3. If the expiry year is less than 2019, add the user to `onetime.dat` and respond with `403`
4. If the expiry month is greater than "12", add the user to `onetime.dat` and respond with `403`

All data entered so far is then collated in to another email which is sent to the exfil email address set within the kit configuration.

```
++++++++++++++++++++++++++++[ FREAKZBROTHERS ]+++++++++++++++++++++++++++
++-------------------------[ AMAZON ACCOUNT ]------------------------++
# Email 			:	".`$_SESSION`['email']."
# Password 		:	".`$_SESSION`['password']."
++--------------------------[ CREDIT CARD ]--------------------------++
# Bank 			:	".$bin["bank"]["name"]."
# Type 			:	".strtoupper($bin["scheme"])." - ".strtoupper($bin["type"])."
# Level 			:	".strtoupper($bin["brand"])."
# Card Holder 		:	".$_POST['ccname']."
# Card Number 	:	".$_POST['ccno']."
# Expire Date 		:	".$_POST['exp_bulan']."/".$_POST['exp_tahun']."
# Cvv 			:	".$_POST['cvv']."
# Amex CID 		:	".$_POST['cid']."
# Account Number 	:	".$_POST['acno']."
# Sort Code 		:	".$_POST['sortcode']."
# Credit Limit 		:	".$_POST['climit']."
# For Check 		:	".$_POST['ccno']."|".$_POST['exp_bulan']."|".$_POST['exp_tahun']."|".$_POST['cvv']."
++-----------------------------[ VBV JP ]---------------------------++
# Card Password 	:	".$_POST['passjp']."
# Web ID 			:	".$_POST['cardid']."
++-----------------------------[ BILLING ]--------------------------++
# Full Name 		:	".`$_SESSION`['fullname']."
# Address 		:	".`$_SESSION`['address']."
# City 			:	".`$_SESSION`['city']."
# State 			:	".`$_SESSION`['state']."
# Zip 			:	".`$_SESSION`['zipcode']."
# Country 		:	".`$_SESSION`['country']."
# DOB 			:	".`$_SESSION`['dob']."
# Phone Number 	:	".`$_SESSION`['phone']."
# Phone Carrier 	:	".$phone['carrier']."
++----------------------------[ OTHER INFO ]-----------------------++
# ID Number 				:	".`$_SESSION`['numbid']."
# Civil ID 					:	".`$_SESSION`['civilid']."
# Qatar ID 				:	".`$_SESSION`['qatarid']."
# National ID 				:	".`$_SESSION`['naid']."
# Citizen ID 				:	".`$_SESSION`['naid']."
# Passport Number 			:	".`$_SESSION`['passport']."
# Bank Access Number 		:	".`$_SESSION`['bans']."
# Social Insurance Number 	:	".`$_SESSION`['sin']."
# Social Security Number 	:	".`$_SESSION`['ssn']."
# OSID Number 			:	".`$_SESSION`['osidnumber']."
++----------------------------[ DEVICE INFO ]----------------------++
# IP Address 		:	".$ip."
# ISP 			:	".$ispuser."
# Region 			:	".$regioncity."
# City 			:	".$citykota."
# Continent 		:	".$continent."
# Time Zone 		:	".$timezone."
# OS/Browser 		:	".$os." / ".$br."
# Date 			:	".$date."
# User Agent 		:	".$user_agent."
++++++++++++++++++++++++++++[ FREAKZBROTHERS ]+++++++++++++++++++++++++++
```

At this point the victims IP is then also logged to `total_cc.txt` and `total_bin.txt`.

The final step of this PHP script is to determine the next stage for the victim depending on the configuration.

![image-44](https://user-images.githubusercontent.com/50568995/115614161-3d06d300-a2e5-11eb-8cf1-281459908237.png)

In our example, `get_bank` is set to "Yups" so we are directed to `bank.php`.

#### Bank Account Information
The next stage of the attack asks the victim to verify their bank account information by populating the below form.

![image-35](https://user-images.githubusercontent.com/50568995/115614196-4db74900-a2e5-11eb-83e2-3b30249694bf.png)

This information is then submitted via `POST` to `bank_acc.php` and some code is executed based on the inputted data.

![image-45](https://user-images.githubusercontent.com/50568995/115614227-5871de00-a2e5-11eb-9a24-74ebd9955b1f.png)

This code checks if any of the form fields were empty, and if they were it adds the IP of the victim to `onetime.dat` and responds with a `403`, meaning the victim will then be unable to visit the site again.

The victims information is then collated in to another email message to the exfil email address:

```
+++++++++++++++++++++++++[ FREAKZBROTHERS ]+++++++++++++++++++++++
++-----------------------[ BANK ACCOUNT ]----------------------++
# Bank Account Name 		:	".$_POST['bankname']."
# Bank Account Username 	:	".$_POST['bankuser']."
# Bank Account Password 	:	".$_POST['bankpass']."
# Bank Routing Number 		:	".$_POST['routing']."
# Bank Account Number 		:	".$_POST['accountnumber']."
# PIN Number 				:	".$_POST['pin']."
++------------------------[ DEVICE INFO ]----------------------++
# IP Address 		:	".$ip."
# ISP 				:	".$ispuser."
# Region 			:	".$regioncity."
# City 			:	".$citykota."
# Continent 		:	".$continent."
# Time Zone 		:	".$timezone."
# OS / Browser 	:	".$os." / ".$br."
# Date 			:	".$date."
# User Agent 		:	".$user_agent."
++++++++++++++++++++++++++[ FREAKZBROTHERS ]++++++++++++++++++++++
```

The victims IP is then logged to `total_bank.txt` and directed to either `verify_credit.php` or `done.php` depending on configuration.

![image-46](https://user-images.githubusercontent.com/50568995/115614292-70496200-a2e5-11eb-84b1-425001bdb6f0.png)

#### Photos
If `get_photo` is set to "Oks" then the victim is prompted to upload a photo of their card as another form of verification. This process exists is all known kits but the design is different depending on that targeted brand.

![image-36](https://user-images.githubusercontent.com/50568995/115614328-7c352400-a2e5-11eb-880a-19649c224167.png)

Once the images are selected and the victim clicks update, they are processed by `submit_upload_cc.php` where the `content-type` is checked and stored within a directory called `upload` or `uploads`. Copies of these images are also sent to the threat actor via email as attachments.

#### Completion
At this point each phase of the phish has been completed and the victim is directed to `done.php`, informing them that their "account has been recovered".

![image-37](https://user-images.githubusercontent.com/50568995/115614392-940ca800-a2e5-11eb-8ca4-d84cb0553cd4.png)

Then the victim is redirected to a legitimate Amazon sign in page.

### Admin Panel
#### Logging in
Over time the admin panel for FreakzBrothers has had a few iterations, with the "nerdface" (thanks [@dave_daves](https://twitter.com/dave_daves)) design being replaced for some time. Recently however it seems the majority of kits have this login panel design instead, opting for the cartoon image which appears to originate from `creative-tim.com`.  
Likely explanation is simply that the kit author took a template design from the source, leaving default images and icons in place.

![image-compare_png](https://user-images.githubusercontent.com/50568995/115614735-f2d22180-a2e5-11eb-94f9-23bc73394c16.png)  
_"FreakzBrothers X Amazon" panel (left), "Nerdface" panel (right)_

The panel is generally located at `/admin/login.php`. All panels prompt the user for an email address and password, which upon entry are checked against a Firebase instance under the control of the of author of FreakzBrothers.

![image-23](https://user-images.githubusercontent.com/50568995/115614828-0c736900-a2e6-11eb-8771-19cc5bbf1e6b.png)  
_Firebase config viewable within source of page_


Request made to Firebase instance (left), Error when entering incorrect details (right)
If the credentials are valid the user is then taken to the dashboard where they can administer the deployment or check recent activity.

This authentication also serves as a form of ensuring the user is "licensed" to use the kit, in an effort to keep distribution and use under the control of the original author.

#### Obfuscation
The kit in of itself does not contain much in the way of obfuscation apart from the script under `/admin/login.php`. The code within this file has been altered by the now defunct MessPHP in order to try and dissuade alteration, however it is fairly trivial to get around this.



Obfuscated (left), Deobfuscated (right)
Deobfuscating the PHP code of the login page reveals there is a hidden token form which allows bypassing of the username/password field by entering a key which is defined in `/admin/vendor/config.php`

![tokenform-1](https://user-images.githubusercontent.com/50568995/115614883-22812980-a2e6-11eb-95ed-784dc100d9e9.png)  
_Hidden token form_

#### Dashboard
Once authenticated the dashboard provides an overview of recent activity, statistics of victims and access to configuration data, antibot/killbot settings and the ability to reset local logs.

![image-19](https://user-images.githubusercontent.com/50568995/115614919-2d3bbe80-a2e6-11eb-9b97-ec2ffd037f03.png)

The statistic widgets contain a total count of entries from the appropriate logs. The visitor log section also contains an output of recent visits including timestamps, IP, country and OS information.

These log files (similarly to [16Shop](2020-07-31-16Shop-dissecting-the-slimy-phish.md)) are also exposed, allowing anyone to view the contents.

* `log_visitor.txt` Contains IP and OS info of the victim, as well as a timestamp for each stage of the phish they reached
* `total_bank.txt` IP of victims who enter bank account credentials
* `total_bin.txt` BIN number and OS of victims which entered bank details
* `total_bot.txt` IP of any suspected bots which have been blocked
* `total_cc.txt` IP of each victim which entered CC info
* `total_click.txt` IP of anyone who accessed the phishing page with the correct `GET` parameter
* `total_email.txt` IP of each victim which entered email credentials
* `total_login.txt` IP of each victim which submitted credentials
* `total_photocc.txt` IP of victims which uploaded CC photos
* `total_photoid.txt` IP of victims which uploaded photo ID
* `total_vbv.txt` IP of victims which passed "3D Secure" process

![image-21](https://user-images.githubusercontent.com/50568995/115614992-48a6c980-a2e6-11eb-8ef8-9b460aac691a.png)  
_An exposed log_visitor.txt file_

#### Settings
This page contains the configuration data for the deployment, which is pulled from `main.php` as well as giving the capability to change it on the fly. Entering or selecting the new option and clicking on `save` updates the config, with these changes also reflected in `main.php`.

![image-20](https://user-images.githubusercontent.com/50568995/115615062-5c523000-a2e6-11eb-93dd-4d6bcdffb753.png)

#### Antibot
This page allows for entry of antibot/killbot API keys. Pasting keys in to the appropriate input and clicking `update` will test the key and then enable functionality of antibot or killbot checks against IP addresses accessing the site.

![image-22](https://user-images.githubusercontent.com/50568995/115615323-ba7f1300-a2e6-11eb-9efa-b77734891c35.png)

### Vulnerabilities
FreakzBrothers kits (in all versions I have looked at) contain the same set of vulnerabilities which allows **full access to the panel and settings page with no authorisation**. As such, any unauthenticated individual could theoretically "take over" the deployment and divert credentials to a mailbox under their control.

It would also be possible for someone to simply script this process, and delete the exfil email address every time it is updated so no credentials are ever sent to the attacker. Or even change the parameter whenever it's corrected so potential victims clicking on the phishing URL won't even be able to reach the phish.

I don't know who would do that though. 🙃

There are also other vulnerabilities which exist in some versions of FreakzBrothers (including cracked versions) which are much more serious, however I will not be sharing details of these.

## Indicators
Below are some IoC's commonly associated with FreakzBrothers along with some Yara rules I have written which can be utilised to scan any kits you may have for identification.

### Hashes
Below are some common hashes for FreakzBrothers kit zip files in their various forms and versions. This also includes commonly found cracked kits which have been re-branded. (SHA-256)

```
7D9C3837DF13669BE3846EAB09E55592E7C819D6010A51F868A2E13057DC81FE
C482992E50616F7770EA8A8CECCB4C4F987E6B299A21EB91A1A3FB5D81EBF1F7
A6ABCE22A0C1962BF535D3CBA0A1FF911E2FDE87E841B0A7060BC69049EB1159
3BDCC110C7D0CE80F151D909DD9D3544D718C079012BE17D14D9171C395B129F
C2831C26B2A2D3CD1360CBBD7B1D03B0297E2A4285B319FBE880CF6F5193F1C3
709EDEED26E226D8BC6FFA3CCFA23223B3EF9E68B6D4D7B41B64F18131C5A51A
399BD6325500039BDF9DC9E889A930035F67910CFC76775250AA901078FA7A19
EB30834ED5DBD5407919E9A293BAF799F46FAFBE30D814111DBCB32A508FF834
3B6112271B08BF205CF45FC9A289D6B886B93254002FBDD94EDCD0519E281D12
F9E19640C808B44165A97F434B22B5417A5B5C0E44D163D5E0C40F027AEE1AE0
C7E208B8605B1C76BED0FACED5DA9799D1C792AF08D3137BE19479495EB9BFAF
30E17DC7D7A34353D357B7FD7B55E49F39C0A0B26CFA60EA24E66ECE573FB9A2
86E33ED848A840658AEA66F7277F28620565DF1C82C82D9D84BE2082D09FE8AF
F7F7E5F278813F964AAE50F173BE7218C888F800465A76FE413BC145423AD067
58D5829E0FCAFADEB3615F675CFD7E10B928B6565098318CFF5B3027BC92F618
9987DE1558A466DB6AFB511E83A008EA7DD75934635678860F7CC8CD21E44D63
07F98D9C48AF76295D09C6C1BE5B25C7208E77A25D918C82C309D7894C306DD6
6D6FC9886139D3DD3444552D437FB8A7C6854097C2088AF3BA2CCAE726E48DC4
32F906A8F16993A8BB7194BBB4BCF8AC045C39DE36B7F5768F10ED4AE36387CB
68F1C82B0D3FE33F957A3EC48296A164074AEE6964B11F1825E877AA9D7C1ACA
A0816B994402386F5E94459EAEA9A24D6000E0ED87D3C14CBCB8D206DB3854D1
6C0571ACCE5A723AB7F414FC909B1BB760F9C8B24FB38ED822970B8E573B0344
21AFB0A54C50258B7FD00B6B220CC008D26D4A70E1E586100A0C374B4CD0F086
96ADFBA4BC1F728EC01E5A4AC4B7E32B0E26C71E698AF5CFE6EC74827BC4B08B
DAC94D25E4D246C48F12F09E82DD4FBFEA88B24DF5B318EB23FD1575BA97D215
9FD2DF307D42B80ADD3D78533ABD587A31BE803F297D18248E02B59DEEB7E90D
71CCF7BC6223F2F8EA36AB17DBCE764C0900AF4902521978EFE6588F5E3F8646
ED7EBE25F91FDD8DE7BB8805ECE349F72FFEE38530752F0AFFAE959D78B9B787
0FC3EC0B1026FEFD53F76D04B19D2E41AC8CED3D1974E567DB5C047E601134E9
CBBBC1C093AFACFCD1E6C4A3743629CE10E67833BA37A56B0EBF1A767845027C
F94B04B040B35444816C25777D5C60CDB68744C962A734940DC27F3A03B5661C
8C91484ABF0A9879C9528CB3309C1ABBEDDCA80DD0CB472F4F792FC4C09FCCED
89C3B988D1CEB59C38F197FFD92826F92D3E910D736969BBA5801FB5C7C3D94D
77EC37FE76531EA55443F9D02AF41C3E65279E71FF40CB99B799D699A380B258
BE61B431401B154B2B4688A56857F1D66A1C3EAE9FC8ECE4D7FB87BC18D38FAD
CBFCFABDE2CCA369692EC0ACA82D3BE1A7FC5F5E7EACF5C860C51C15E3706264
2504B1AD951ABA44793AD68B3587C21AFE517D1FC023051FCD0F2AE9F8C3FFC2
26265F134B077F976CB235CE980C0324D112F7FC8B14B9F2DB306E7B06711C35
FEB89BC8D73D9D1E2855F92AAD2B1141533D5AF868EA60BDF4B8D92B5CB96391
8BE164934937CDF1DBF015730DC20C4A4DA3FF6694666DC10DCBB43C8E4BF439
0D7AFA91BA81AA96DC5DC4CDD07284A398BF542D5A26AA50B26481A3E7189B23
8280B70E38C8C5E309B392B471665B19C254E5CC6FF796BE89333E20D267348E
8BB42A65746C5EE40A120B2236235CB68713135AA52DF9B711EDEA9BB288812C
D215895C334B314A699B5777E0C437A4771CF730424017CFB3B3635E325EC4FC
C6BB7054803AD830BAD03F26DB6034791C5D6A46F3C342017C562BD5006D470D
7A092A0C75537DC5C9F23EFC221B6E8B987F614ACA918D4D4B75559BA5A3FFB2
ABB3100FC013980E641185F7E481F489809FDB60B4AD54557032E543B6CFBEA5
ABB3100FC013980E641185F7E481F489809FDB60B4AD54557032E543B6CFBEA5
DB6EC9C078EA8E71D13865D379991BEDD1BF3567E8A3ED525B2019E6BA939ACD
C9634341CD8746110F72DB36A2EB7AFA890D3FC6D60489EA5C62F887C06B44BB
219EDADF9F9BAF57E6D9452DF06C0E5C203386D7B7C277A0601331E6F784DF27
928030EA6A8C657E20EF2140F0BDE56178CD7AA803898477D817B0939B24095A
9FCA04FCFCD1A4F47AA1F0C646BD10589E89A384483F693B4EEBEBD05387B421
60C6F05C7D06840CE0C5F21A501172B34DEEDF7FD32E7B7FF0FF993F57E92725
E820B1D225C2F03CE1A9A35719D22CA1A19203ED5CAC1F6BBEDCE1EEC012B69C
D4DDDE834BD2C7A1D5BC256530DD5CB4D9C310759A52B40B34A0FB90725050F1
A471D6EB2790C369BEBFAB4779EF344D16E0145E92ECC124F244ED8218FB77FB
60C91641C3A9AD00424EC51042A0DFC08451DBA5E6EF1ED6F323833504A49227
6330BB94D326B871E4E13196C216FE2BB6423A1E9F4447C19B5E3FE363CE6502
```

### IP Addresses
These IP's have been commonly associated with FreakzBrothers deployments and should be treated with suspicion. Some are also associated with dynamic DNS providers.

```
52.229.207.24
137.135.77.178
13.77.201.14
168.62.55.66
104.223.143.106
162.0.233.72
64.235.45.62
51.140.141.249
162.241.121.240
198.255.78.54
199.192.16.182
162.0.228.93
162.241.121.193
192.240.99.117
52.183.36.7
```

### YARA Rules
These rules can be ran against zip files or any repository of phishing kit zips to identify if they contain common artefacts of FreakzBrothers kits. The generic rule aims to capture any FreakzBrothers kit including cracked versions, whereas the specific rules will identify FreakzBrothers kits based on their targeted brand.

<details>
    <summary>Generic</summary>

```yara
rule PhishKit_FreakzBrothers
{
    meta:
        description = "Generic rule for FreakzBrothers kits"
        author = "@sysgoblin"
        date = "2020-07-18"
        reference = ""

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "admin"
        $dir2 = "result"
        $conf_file1 = "conf.php"
        $conf_file2 = "config.php"
        $file1 = "setting.php"
        $file2 = "antibot.php"
        $file3 = "paper-dashboard.scss"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        all of ($dir*) and
        1 of ($conf_file*) and
        all of ($file*)
}
```
</details>
<br>

<details>
    <summary>Amazon</summary>
    
```yara
rule PhishKit_FreakzBrothers_Amazon
{
    meta:
        description = "Rule for FreakzBrothers kits targeting Amazon"
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "admin"
        $dir2 = "result"
        $conf_file1 = "conf.php"
        $conf_file2 = "config.php"
        $file1 = "setting.php"
        $file2 = "antibot.php"
        $file3 = "paper-dashboard.scss"
        $file4 = "amazon.png"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        all of ($dir*) and
        1 of ($conf_file*) and
        all of ($file*)
}
```
</details>
<br>

<details>
    <summary>Apple</summary>
    
```yara
rule PhishKit_FreakzBrothers_Apple
{
    meta:
        description = "Rule for FreakzBrothers kits targeting Apple"
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "admin"
        $dir2 = "result"
        $conf_file1 = "conf.php"
        $conf_file2 = "config.php"
        $file1 = "setting.php"
        $file2 = "antibot.php"
        $file3 = "paper-dashboard.scss"
        $icon1 = "icloud_icon.png"
        $icon2 = "app-small.svg"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        all of ($dir*) and
        1 of ($conf_file*) and
        all of ($file*) and
        ($icon1 or $icon2)
}
```
</details>
<br>

<details>
    <summary>PayPal</summary>
    
```yara
rule PhishKit_FreakzBrothers_PayPal
{
    meta:
        description = "Rule for FreakzBrothers kits targeting PayPal"
        author = "@sysgoblin"
        date = "2020-07-18"

    strings:
        $zip = { 50 4b 03 04 }
        $dir1 = "admin"
        $dir2 = "result"
        $dir3 = "security"
        $dir4 = "myaccount"
        $conf_file1 = "conf.php"
        $conf_file2 = "config.php"
        $file1 = "setting.php"
        $file2 = "antibot.php"
        $file3 = "paper-dashboard.scss"
        $file4 = "user.dat"

    condition:
        uint32(0) == 0x04034b50 and
        $zip and 
        all of ($dir*) and
        1 of ($conf_file*) and
        all of ($file*)
}
```
</details>
<br>

### Feeds
For a feed of recent FreakzBrothers detections and exfil emails, check out the api over at [phishingreel.io](https://phishingreel.io/)

## Credits
Shout out to the legends below for keeping up the good fight!

* [@dave_daves](https://twitter.com/dave_daves)
* [@JCyberSec_](https://twitter.com/JCyberSec_)
* [@nullcookies](https://twitter.com/nullcookies)
* [@aneilan](https://twitter.com/aneilan)
* [@steved3](https://twitter.com/steved3)
* [@n0p1ishing](https://twitter.com/n0p1ishing)
* [@kb_intel](https://twitter.com/kb_intel)