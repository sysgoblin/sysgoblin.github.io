---
title: 16Shop Victim Analysis
date: 2020-05-12
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

The most popular commercial phishing kit being detected by [PhishingReel](https://twitter.com/phishingreel) at the moment is **16Shop**, making up nearly 40% of all detections. I thought it may be interesting to do some analysis on the victim log data I have collected from over the past week.

If you are not familiar with 16Shop or what it is, I recommend you have a read through [this](https://twitter.com/JCyberSec_/status/1255902497782317056) thread by [@JCyberSec_](https://twitter.com/jcybersec_) which gives a great overview of what it is and its history.

I've made this analysis from a sample of the total data set, consisting of victim information from just over 100 unique deployments from the past week. The data scraped consists of IP/geo/device information for those which have visited the phishing site, entered credentials or even supplied bank and credit card information.

I have parsed this data and will be focusing on analysing where the victim has entered credentials to the phishing page. Now bear in mind not all of these may be genuine, some may have decided to instead leave a "message" to the owner of the phishing page- however, there is no way to determine this, so numbers are presented as is. 👨‍💻

After cleansing the data and removing duplicates, I produced some basic statistics.

|||
|---|:---|
| Unique domains | 105 |
| Countries | 135 | 
| IP addresses | 13 |
| ISP's | 147 |
| IP's | 13735 |
| **Total victims logged** | **13936** |

&nbsp;  
&nbsp;  

## Victim geolocation

From an initial eyeball of the victim data it was apparent that the US was the most targeted country out of these deployments, making up almost **60%** of all victims. I took the victim data and extrapolated the below graph of the top 10 countries by victim count.  

_Click details for full results._
![16shop-victim-analysis-bins_by_country](https://user-images.githubusercontent.com/50568995/115514083-a9e58300-a27b-11eb-94cd-9b2500253213.png)

<details> 
<table class="tg">
<thead>
  <tr>
    <th class="tg-g7sd">Name</th>
    <th class="tg-g7sd">Count</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-lboi">United States</td>
    <td class="tg-lboi">8499</td>
  </tr>
  <tr>
    <td class="tg-lboi">Australia</td>
    <td class="tg-lboi">1502</td>
  </tr>
  <tr>
    <td class="tg-cly1">Japan</td>
    <td class="tg-cly1">656</td>
  </tr>
  <tr>
    <td class="tg-cly1">United Kingdom</td>
    <td class="tg-cly1">378</td>
  </tr>
  <tr>
    <td class="tg-cly1">Canada</td>
    <td class="tg-cly1">342</td>
  </tr>
  <tr>
    <td class="tg-cly1">Spain</td>
    <td class="tg-cly1">259</td>
  </tr>
  <tr>
    <td class="tg-cly1">Germany</td>
    <td class="tg-cly1">243</td>
  </tr>
  <tr>
    <td class="tg-cly1">Mexico</td>
    <td class="tg-cly1">187</td>
  </tr>
  <tr>
    <td class="tg-cly1">Brazil</td>
    <td class="tg-cly1">155</td>
  </tr>
  <tr>
    <td class="tg-cly1">Italy</td>
    <td class="tg-cly1">146</td>
  </tr>
  <tr>
    <td class="tg-cly1">Belgium</td>
    <td class="tg-cly1">127</td>
  </tr>
  <tr>
    <td class="tg-cly1">Netherlands</td>
    <td class="tg-cly1">110</td>
  </tr>
  <tr>
    <td class="tg-cly1">Sweden</td>
    <td class="tg-cly1">89</td>
  </tr>
  <tr>
    <td class="tg-cly1">France</td>
    <td class="tg-cly1">72</td>
  </tr>
  <tr>
    <td class="tg-cly1">Portugal</td>
    <td class="tg-cly1">69</td>
  </tr>
  <tr>
    <td class="tg-cly1">Colombia</td>
    <td class="tg-cly1">66</td>
  </tr>
  <tr>
    <td class="tg-cly1">Ireland</td>
    <td class="tg-cly1">61</td>
  </tr>
  <tr>
    <td class="tg-cly1">Puerto Rico</td>
    <td class="tg-cly1">57</td>
  </tr>
  <tr>
    <td class="tg-cly1">Indonesia</td>
    <td class="tg-cly1">48</td>
  </tr>
  <tr>
    <td class="tg-cly1">Norway</td>
    <td class="tg-cly1">40</td>
  </tr>
  <tr>
    <td class="tg-cly1">Switzerland</td>
    <td class="tg-cly1">37</td>
  </tr>
  <tr>
    <td class="tg-cly1">Argentina</td>
    <td class="tg-cly1">36</td>
  </tr>
  <tr>
    <td class="tg-cly1">Philippines</td>
    <td class="tg-cly1">33</td>
  </tr>
  <tr>
    <td class="tg-cly1">Peru</td>
    <td class="tg-cly1">30</td>
  </tr>
  <tr>
    <td class="tg-cly1">India</td>
    <td class="tg-cly1">29</td>
  </tr>
  <tr>
    <td class="tg-cly1">Greece</td>
    <td class="tg-cly1">28</td>
  </tr>
  <tr>
    <td class="tg-cly1">Venezuela</td>
    <td class="tg-cly1">27</td>
  </tr>
  <tr>
    <td class="tg-cly1">Saudi Arabia</td>
    <td class="tg-cly1">26</td>
  </tr>
  <tr>
    <td class="tg-cly1">Thailand</td>
    <td class="tg-cly1">25</td>
  </tr>
  <tr>
    <td class="tg-cly1">Denmark</td>
    <td class="tg-cly1">23</td>
  </tr>
  <tr>
    <td class="tg-cly1">Singapore</td>
    <td class="tg-cly1">22</td>
  </tr>
  <tr>
    <td class="tg-cly1">Chile</td>
    <td class="tg-cly1">21</td>
  </tr>
  <tr>
    <td class="tg-cly1">Austria</td>
    <td class="tg-cly1">21</td>
  </tr>
  <tr>
    <td class="tg-cly1">Dominican Republic</td>
    <td class="tg-cly1">21</td>
  </tr>
  <tr>
    <td class="tg-cly1">Ecuador</td>
    <td class="tg-cly1">20</td>
  </tr>
  <tr>
    <td class="tg-cly1">New Zealand</td>
    <td class="tg-cly1">19</td>
  </tr>
  <tr>
    <td class="tg-cly1">Turkey</td>
    <td class="tg-cly1">18</td>
  </tr>
  <tr>
    <td class="tg-cly1">Finland</td>
    <td class="tg-cly1">17</td>
  </tr>
  <tr>
    <td class="tg-cly1">Cyprus</td>
    <td class="tg-cly1">14</td>
  </tr>
  <tr>
    <td class="tg-cly1">Malaysia</td>
    <td class="tg-cly1">14</td>
  </tr>
  <tr>
    <td class="tg-cly1">Costa Rica</td>
    <td class="tg-cly1">13</td>
  </tr>
  <tr>
    <td class="tg-cly1">Romania</td>
    <td class="tg-cly1">13</td>
  </tr>
  <tr>
    <td class="tg-cly1">United Arab Emirates</td>
    <td class="tg-cly1">13</td>
  </tr>
  <tr>
    <td class="tg-cly1">Malta</td>
    <td class="tg-cly1">11</td>
  </tr>
  <tr>
    <td class="tg-cly1">El Salvador</td>
    <td class="tg-cly1">11</td>
  </tr>
  <tr>
    <td class="tg-cly1">Uruguay</td>
    <td class="tg-cly1">10</td>
  </tr>
  <tr>
    <td class="tg-cly1">Egypt</td>
    <td class="tg-cly1">9</td>
  </tr>
  <tr>
    <td class="tg-cly1">Hong Kong</td>
    <td class="tg-cly1">9</td>
  </tr>
  <tr>
    <td class="tg-cly1">Israel</td>
    <td class="tg-cly1">9</td>
  </tr>
  <tr>
    <td class="tg-cly1">Bahamas</td>
    <td class="tg-cly1">9</td>
  </tr>
  <tr>
    <td class="tg-cly1">Nigeria</td>
    <td class="tg-cly1">9</td>
  </tr>
  <tr>
    <td class="tg-cly1">South Africa</td>
    <td class="tg-cly1">8</td>
  </tr>
  <tr>
    <td class="tg-cly1">South Korea</td>
    <td class="tg-cly1">8</td>
  </tr>
  <tr>
    <td class="tg-cly1">Luxembourg</td>
    <td class="tg-cly1">8</td>
  </tr>
  <tr>
    <td class="tg-cly1">Guatemala</td>
    <td class="tg-cly1">8</td>
  </tr>
  <tr>
    <td class="tg-cly1">Trinidad and Tobago</td>
    <td class="tg-cly1">7</td>
  </tr>
  <tr>
    <td class="tg-cly1">Qatar</td>
    <td class="tg-cly1">7</td>
  </tr>
  <tr>
    <td class="tg-cly1">Kuwait</td>
    <td class="tg-cly1">6</td>
  </tr>
  <tr>
    <td class="tg-cly1">Taiwan</td>
    <td class="tg-cly1">6</td>
  </tr>
  <tr>
    <td class="tg-cly1">Estonia</td>
    <td class="tg-cly1">6</td>
  </tr>
  <tr>
    <td class="tg-cly1">Bosnia and Herzegovina</td>
    <td class="tg-cly1">6</td>
  </tr>
  <tr>
    <td class="tg-cly1">Serbia</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Albania</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">U.S. Virgin Islands</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Morocco</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Panama</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Vietnam</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Bolivia</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Croatia</td>
    <td class="tg-cly1">5</td>
  </tr>
  <tr>
    <td class="tg-cly1">Curaçao</td>
    <td class="tg-cly1">4</td>
  </tr>
  <tr>
    <td class="tg-cly1">Hungary</td>
    <td class="tg-cly1">4</td>
  </tr>
  <tr>
    <td class="tg-cly1">China</td>
    <td class="tg-cly1">4</td>
  </tr>
  <tr>
    <td class="tg-cly1">Angola</td>
    <td class="tg-cly1">4</td>
  </tr>
  <tr>
    <td class="tg-cly1">North Macedonia</td>
    <td class="tg-cly1">4</td>
  </tr>
  <tr>
    <td class="tg-cly1">Paraguay</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Belize</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Slovenia</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Slovakia</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Saint Vincent and the Grenadines</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Honduras</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Russia</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Sri Lanka</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">Guam</td>
    <td class="tg-cly1">3</td>
  </tr>
  <tr>
    <td class="tg-cly1">French Guiana</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Algeria</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Suriname</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Bahrain</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Ukraine</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Jamaica</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Senegal</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Pakistan</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Oman</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Kenya</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Lebanon</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Cameroon</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Cayman Islands</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Georgia</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Czechia</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Iraq</td>
    <td class="tg-cly1">2</td>
  </tr>
  <tr>
    <td class="tg-cly1">Tanzania</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Turks and Caicos Islands</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Syria</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Seychelles</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Jersey</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Poland</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Andorra</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Anguilla</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Antigua and Barbuda</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Aruba</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Azerbaijan</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Bangladesh</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Barbados</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Bonaire, Sint Eustatius, and Saba</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Brunei</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Ghana</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Gibraltar</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Guernsey</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Guyana</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Hashemite Kingdom of Jordan</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Iceland</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Iran</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Isle of Man</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Latvia</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Liberia</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Martinique</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Mauritius</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Montenegro</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Nepal</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">New Caledonia</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Nicaragua</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Northern Mariana Islands</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Palau</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Saint Lucia</td>
    <td class="tg-cly1">1</td>
  </tr>
  <tr>
    <td class="tg-cly1">Zimbabwe</td>
    <td class="tg-cly1">1</td>
  </tr>
</tbody>
</table>
</details>

## US victim analysis

Out of the US victims it was also clear a vast majority of them were accessing these phishing pages via mobile devices. 📲  
This is not entirely surprising, as use of mobile devices to browse the web continues to increase. It is also generally being harder for mobile users to discern legitimate and malicious websites within a mobile browser- especially when these kits are responsive/"mobile friendly".

![16shop-victim-analysis-device_pie_chart](https://user-images.githubusercontent.com/50568995/115514347-e913d400-a27b-11eb-8f28-c5956fa776a9.png)

A top 10 of the ISP information shows these are primarily from consumer home and mobile internet providers.

| ISP | Count |
|---|:---|
|Comcast Cable Communications, LLC|1412|
|Charter Communications|1379|
|Verizon Wireless|817|
|AT&T Corp.|762|
|T-Mobile USA, Inc.|600|
|AT&T Mobility LLC|583|
|Verizon Business|435|
|Sprint Communications, Inc.|315|
|Cox Communications Inc.|290|
|CenturyLink Communications, LLC|252|

From looking at the less common ISP and IP information, it's also possible to identify some potential victims from particular locations or businesses. Some of these included individuals located at:
- **Decatur Manor Healthcare**, a care facility for the chronically or mentally ill.
- **University of Texas Medical Branch**
- **University of Arkansas for Medical Sciences**
- **Acucraft Fireplaces**, a luxury fireplace maker based in Minnesota
- **Bickerstaff Parham LLC**, a real estate firm
- **Cornell University**

The victim logs contained data on those which had supplied bank details, however, these are not able to be correlated with login activity. From the data collected it was evident that bank details had been provided 3389 times with (unsurprisingly) the majority of these details originating from the US.  
  
_Click details for full results._  

![16shop-victim-analysis-bins_by_country](https://user-images.githubusercontent.com/50568995/115514522-1496be80-a27c-11eb-91bb-66645444bdfa.png)

<details>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">Country</th>
    <th class="tg-0pky">Count</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">United States</td>
    <td class="tg-0pky">2277</td>
  </tr>
  <tr>
    <td class="tg-0pky">Japan</td>
    <td class="tg-0pky">176</td>
  </tr>
  <tr>
    <td class="tg-0pky">United Kingdom</td>
    <td class="tg-0pky">121</td>
  </tr>
  <tr>
    <td class="tg-0pky">Australia</td>
    <td class="tg-0pky">112</td>
  </tr>
  <tr>
    <td class="tg-0pky">Spain</td>
    <td class="tg-0pky">80</td>
  </tr>
  <tr>
    <td class="tg-0pky">Mexico</td>
    <td class="tg-0pky">57</td>
  </tr>
  <tr>
    <td class="tg-0pky">Italy</td>
    <td class="tg-0pky">56</td>
  </tr>
  <tr>
    <td class="tg-0pky">Canada</td>
    <td class="tg-0pky">48</td>
  </tr>
  <tr>
    <td class="tg-0pky">Brazil</td>
    <td class="tg-0pky">37</td>
  </tr>
  <tr>
    <td class="tg-0pky">Germany</td>
    <td class="tg-0pky">32</td>
  </tr>
  <tr>
    <td class="tg-0pky">Sweden</td>
    <td class="tg-0pky">30</td>
  </tr>
  <tr>
    <td class="tg-0pky">Colombia</td>
    <td class="tg-0pky">19</td>
  </tr>
  <tr>
    <td class="tg-0pky">Norway</td>
    <td class="tg-0pky">19</td>
  </tr>
  <tr>
    <td class="tg-0pky">Portugal</td>
    <td class="tg-0pky">17</td>
  </tr>
  <tr>
    <td class="tg-0pky">Puerto Rico</td>
    <td class="tg-0pky">15</td>
  </tr>
  <tr>
    <td class="tg-0pky">Belgium</td>
    <td class="tg-0pky">15</td>
  </tr>
  <tr>
    <td class="tg-0pky">Philippines</td>
    <td class="tg-0pky">14</td>
  </tr>
  <tr>
    <td class="tg-0pky">France</td>
    <td class="tg-0pky">14</td>
  </tr>
  <tr>
    <td class="tg-0pky">Ireland</td>
    <td class="tg-0pky">13</td>
  </tr>
  <tr>
    <td class="tg-0pky">Argentina</td>
    <td class="tg-0pky">11</td>
  </tr>
  <tr>
    <td class="tg-0pky">Indonesia</td>
    <td class="tg-0pky">10</td>
  </tr>
  <tr>
    <td class="tg-0pky">Denmark</td>
    <td class="tg-0pky">9</td>
  </tr>
  <tr>
    <td class="tg-0pky">Saudi Arabia</td>
    <td class="tg-0pky">8</td>
  </tr>
  <tr>
    <td class="tg-0pky">Netherlands</td>
    <td class="tg-0pky">7</td>
  </tr>
  <tr>
    <td class="tg-0pky">Switzerland</td>
    <td class="tg-0pky">7</td>
  </tr>
  <tr>
    <td class="tg-0pky">Greece</td>
    <td class="tg-0pky">7</td>
  </tr>
  <tr>
    <td class="tg-0pky">El Salvador</td>
    <td class="tg-0pky">7</td>
  </tr>
  <tr>
    <td class="tg-0pky">Venezuela</td>
    <td class="tg-0pky">7</td>
  </tr>
  <tr>
    <td class="tg-0pky">Chile</td>
    <td class="tg-0pky">7</td>
  </tr>
  <tr>
    <td class="tg-0pky">Finland</td>
    <td class="tg-0pky">6</td>
  </tr>
  <tr>
    <td class="tg-0pky">Singapore</td>
    <td class="tg-0pky">6</td>
  </tr>
  <tr>
    <td class="tg-0pky">Ecuador</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Dominican Republic</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Trinidad and Tobago</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Israel</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Cyprus</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Serbia</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Romania</td>
    <td class="tg-0pky">5</td>
  </tr>
  <tr>
    <td class="tg-0pky">Uruguay</td>
    <td class="tg-0pky">4</td>
  </tr>
  <tr>
    <td class="tg-0pky">Bahamas</td>
    <td class="tg-0pky">4</td>
  </tr>
  <tr>
    <td class="tg-0pky">New Zealand</td>
    <td class="tg-0pky">4</td>
  </tr>
  <tr>
    <td class="tg-0pky">Nigeria</td>
    <td class="tg-0pky">4</td>
  </tr>
  <tr>
    <td class="tg-0pky">Saint Vincent and the Grenadines</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Peru</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Malta</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">South Korea</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">United Arab Emirates</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Egypt</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Kuwait</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky"> </td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Costa Rica</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Croatia</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Estonia</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Curaçao</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">India</td>
    <td class="tg-0pky">3</td>
  </tr>
  <tr>
    <td class="tg-0pky">Guatemala</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Senegal</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Czechia</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Sri Lanka</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Hong Kong</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Angola</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Taiwan</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Bolivia</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Thailand</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Guam</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Paraguay</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Turkey</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">U.S. Virgin Islands</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">North Macedonia</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Malaysia</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Luxembourg</td>
    <td class="tg-0pky">2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Antigua and Barbuda</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Algeria</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Austria</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Albania</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">South Africa</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Georgia</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Honduras</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Seychelles</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Guernsey</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Kenya</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Saint Lucia</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Russia</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Qatar</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Bahrain</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Bonaire, Sint Eustatius, and Saba</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Hungary</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Cameroon</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Iceland</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Cayman Islands</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Nepal</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Jamaica</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Slovenia</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Northern Mariana Islands</td>
    <td class="tg-0pky">1</td>
  </tr>
</tbody>
</table>
</details>

![16shop-victim-analysis-bins_by_bank](https://user-images.githubusercontent.com/50568995/115514606-2e380600-a27c-11eb-90e3-8f99fac30354.png)

&nbsp; 
&nbsp; 
It was also possible to produce a top 10 of banks whose customers had fell victim to these phishing sites.

## Trends within the data

During analysis it became clear there were certain similarities between the victim logs.

My focus had been on analysing victim data where the user had entered sensitive information. However, all clicks/visits to the sites are also logged, regardless of if the user has entered information at any point.  
A common thread between a large portion of these deployments were the first few visits.

From looking at the first visitor from each deployment, almost **40%** came from Indonesian IP addresses before then logging US victims or victims based in other geolocations.  
This would indicate a portion of the threat actors "test" their deployment when it's live, before sending out phishing/smishing to their intended victims. It also evidences that the larger customer base for 16Shop is based in Indonesia.

Some of these "visitors" can be tracked across several domains, indicating the same threat actor was behind it's creation.

| Domain                                                                           | IP Address      | Browser          | OS         | ISP |
| :---                                                                              | ---             | ---              | ---        | --- |
| `amazon.accountalert01.com`                                                        | 110.136.88.251  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `amazon.notificationalertappsdys908239d.tecxies.com`                               | 110.136.88.251  | Firefox          | Windows 10 | PT Telkom Indonesia |
| `asd-paypal124-help1.ga`                                                           | 110.137.112.18  | Firefox          | Windows 10 | PT Telkom Indonesia |
| `manage-account.paypalinsc.com`                                                    | 110.137.220.119 | Chrome           | Windows 10 | PT Telkom Indonesia |
| `websecure-mailupdate-account.verification.kloutscormnvr.com`                      | 110.138.150.92  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `websecure.account-verification.myloveyouflo.com`                                  | 110.138.151.198 | Chrome           | Windows 10 |  |
| `update-amazon.com.serv01-updateamazon.com`                                        | 110.138.96.172  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `sign-ins-aces2try-phaypal1.com`                                                   | 112.78.180.121  | Chrome           | Windows 10 | Biznet ISP |
| `amzaon.com.verificationcentrehomesupport.hyeoapld.com`                            | 114.122.70.144  | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `limited.paypalservice.customer-support.it.heasads.com`                            | 114.124.139.210 | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `cslivesupport.manage-appservice.com`                                              | 114.124.165.246 | Firefox          | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `security-verification.fashionablemidnight.com`                                    | 114.125.12.110  | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `signin-webverifyacc-vg9eapple.serveusers.com`                                     | 125.161.107.254 | Chrome           | Windows 7  | PT Telkom Indonesia |
| `cgs-informationupdate.apps.com.snezenieea.com`                                    | 125.161.137.118 | Handheld Browser | Android    | PT Telkom Indonesia |
| `secure01-amazon.serveirc.com`                                                     | 125.167.50.218  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `cg-summary.verivicacionlockedappservice.com`                                      | 140.213.15.132  | Handheld Browser | iPhone     | PT XL Axiata |
| `notice-applestoremanagers.gheafem.com`                                            | 180.241.152.234 | Chrome           | Windows 10 | PT Telkom Indonesia |
| `manage-scure-login.acc-brsae.com`                                                 | 180.241.161.183 | Chrome           | Windows 10 | PT Telkom Indonesia |
| `appleid.apple.com-noreply-informations.186341735184331.org`                       | 180.241.45.178  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `signin.secure.account.support.center.tld100.tstrr11.com`                          | 180.242.235.36  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `manageaccount-appleid.com.stokestrategy.com`                                      | 180.247.45.136  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `service.verification-accountid.appsidga.com`                                      | 180.248.123.152 | Handheld Browser | iPhone     | PT Telkom Indonesia |
| `service-account.usmislead.com`                                                    | 180.251.2.158   | Chrome           | Windows 10 | PT Telekomunikasi Indonesia |
| `amazon-secured-signed-in-uknown-access-from-unauthorise-device.avshgbupdsko.com`  | 180.251.58.144  | Chrome           | Windows 10 | PT Telkom Indonesia |
| `service.account.costumecharge.business`                                           | 182.1.13.46     | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `service.account.dedicatejurisdiction.com`                                         | 182.1.13.46     | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `service.account.ealogoeitai.com`                                                  | 182.1.15.157    | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `security-verification.flexiblewire.info`                                          | 182.1.16.90     | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `amazon.verificationalertnotificationappshomeen.yupxis.com`                        | 182.1.75.30     | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `en.amazon.verificationalertaccountaiueugdhaasddxs.fafanms.com`                    | 182.1.75.30     | Chrome           | Windows 10 | PT. Telekomunikasi Selular Indonesia |
| `en.secureaccountlimited-paypal.com`                                               | 182.253.219.4   | Firefox          | Windows 10 | Biznet ISP |
| `manageamazonaccountservicemmzjftsass.vkjnkwd.com`                                 | 36.68.23.62     | Chrome           | Windows 10 | PT Telkom Indonesia |
| `livesupportcsdatacenter.mertgthea.com`                                            | 36.68.4.104     | Firefox          | Windows 10 | PT Telkom Indonesia |
| `manage.unlock-services.accounts.myappleid.pellocks.com`                           | 36.69.4.51      | Firefox          | Windows 10 | PT Telekomunikasi Indonesia |
| `amazon.com-webserviceincresolvedetaild.amdsupportcustomers.com`                   | 36.75.238.40    | Firefox          | Windows 10 | PT Telekomunikasi Indonesia |
| `app.sign.in.amazon.jp.langh-jp.j4r.p.wafoainc.com`                                | 36.76.167.184   | Chrome           | Windows 10 | PT Telkom Indonesia |
| `sign-account-paypal-configure.coreymniez.com`                                     | 36.84.227.169   | Chrome           | Windows 10 | PT Telkom Indonesia |
| `amazon-reportdaily-service.theworkpc.com`                                         | 36.85.217.57    | Firefox          | Windows 10 | PT Telkom Indonesia |
| `secureserver-amazonredirectwebview.kozow.com`                                     | 36.85.218.204   | Firefox          | Windows 10 | PT Telkom Indonesia |
| `amazon.com-limitedcenter.webserviceidrecoverycentersupporte.com`                  | 36.85.219.37    | Firefox          | Windows 10 | PT Telkom Indonesia |
| `mail-helpdeskupdateaccountserv8091.upgandegan.com`                                | 36.88.126.200   | Chrome           | Windows 10 | PT Telkom Indonesia |
| `intl-costumer.limited.6y123-sys.info`                                             | 36.90.159.35    | Chrome           | Windows 10 | PT Telkom Indonesia |
| `user.auth-recover.limited-account.online.pply.534-tyr.net`                        | 36.90.159.35    | Chrome           | Windows 10 | PT Telkom Indonesia |
| `user.limited-account.reactivate.97ter.com`                                        | 36.90.159.35    | Chrome           | Windows 10 | PT Telkom Indonesia |
| `support.mailapp.secuirity-verifikey.ascavc.com`                                   | 36.90.76.191    | Handheld Browser | iPhone     | PT Telkom Indonesia |
| `safeandmanage.accinfo-formlimitation2020.tembelekgarings.com`                     | 36.90.88.240    | Chrome           | Windows 10 | PT Telkom Indonesia |

&nbsp;  

In total there were 38246 visits recorded with 29551 of those being unique. With the total victim count, this shows these 16Shop kits have had an average **47% success rate**. 😰

&nbsp;  
&nbsp;  
## Summary of findings
> 60% of all victims are US based

> The vast majority of victims were using mobile devices

> 40% of deployments appear to originate from Indonesia

> Deployments have an average 47% click to phish ratio

These results go to show that commercial kits like 16Shop are highly targeted, effective and simple to use. This effectively lowers the bar for potential fraudsters wanting to make a quick buck. 
