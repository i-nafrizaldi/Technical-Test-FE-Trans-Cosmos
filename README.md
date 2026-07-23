# Influenzilla Figma Implementation

Responsive static implementation made with HTML, CSS, and vanilla JavaScript.

## Structure

```text
influenzilla-figma-site/
├── index.html
├── css/
│   └── index.css
├── js/
│   └── index.js
└── images/
    ├── bg_gradient_mobile.jpg
    ├── bg_gradient_wide_01.jpg
    ├── bg_gradient_wide_02.jpg
    ├── bg_gradient_wide_03.jpg
    ├── ico_star_01.png
    └── ico_wave_01.png
```

## Run locally

Open `index.html` with the VS Code Live Server extension.

## Google Tag Manager setup

1. Open `js/index.js`.
2. Replace:

```javascript
const GTM_CONTAINER_ID = "GTM-XXXXXXX";
```

with your actual container ID, for example:

```javascript
const GTM_CONTAINER_ID = "GTM-ABC1234";
```

3. In GTM, create Custom Event triggers for:

```text
click_anchor_about_us
click_anchor_expertise
click_anchor_get_started
click_anchor_what_we_do
```

4. Create one GA4 Event tag per event, or use one reusable GA4 Event tag with
   `{{Event}}` as the GA4 event name.
5. Create Data Layer Variables when needed:

```text
event_label
link_url
page_location
page_title
```

6. Test using GTM Preview and GA4 DebugView.
7. Publish the GTM container.

## Requested tracked links

The four section-navigation links push these events:

| Link | dataLayer event |
|---|---|
| About us | `click_anchor_about_us` |
| Expertise | `click_anchor_expertise` |
| Get started | `click_anchor_get_started` |
| What we do | `click_anchor_what_we_do` |

Each event also includes `event_label`, `link_url`, `page_location`, and
`page_title`.

## Before submission

- Replace `Your Name` in the HTML `<title>`.
- Enter the real GTM Container ID.
- Configure GA4 in GTM.
- Compare desktop at 1440px and mobile at 375px.
- Test Chrome, Firefox, and Edge.
- Do not commit confidential briefs or private Figma links.
