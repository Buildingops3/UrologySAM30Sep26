# EVA Pharma Saudi — Urology SAM Survey

GitHub Pages frontend + Google Apps Script / Google Sheets backend.

## Data stored

The `Responses` sheet stores **final submitted answers only**:

1. Timestamp
2. Session ID
3. First Name
4. Last Name
5. Email
6. Mobile Number
7. Region
8. Consent
9. Scientific Agenda Rating
10. Overall Program Rating
11. Preferred Next SAM Location
12. Future SAM Improvements
13. WhatsApp Clicked
14. WhatsApp Clicked At
15. Submitted At

There is **no Events sheet** and no logging of taps, page views, answer changes, typing, navigation, or drop-offs.

## Google Sheets setup

1. Create/open the Google Sheet that should receive the responses.
2. Go to **Extensions → Apps Script**.
3. Replace the Apps Script code with the contents of `Code.gs`.
4. Save.
5. Choose **Deploy → New deployment**.
6. Select **Web app**.
7. Set **Execute as:** Me.
8. Set **Who has access:** Anyone.
9. Deploy and authorize the script if Google asks.
10. The HTML already contains the `/exec` URL supplied for this deployment. If Google generates a different deployment URL, replace `SHEET_ENDPOINT` in `index.html` with the new `/exec` URL.

### Existing Google Sheet

You can keep the header row shown below. If you are starting fresh, the Apps Script will create a `Responses` tab automatically.

```text
Timestamp | Session ID | First Name | Last Name | Email | Mobile Number | Region | Consent | Scientific Agenda Rating | Overall Program Rating | Preferred Next SAM Location | Future SAM Improvements | WhatsApp Clicked | WhatsApp Clicked At | Submitted At
```

## GitHub Pages setup

1. Create a GitHub repository, for example `EVA-Saudi-Urology-SAM`.
2. Upload `index.html`.
3. You can keep `Code.gs` and this README in the repository for reference; they are not executed by GitHub Pages.
4. In GitHub go to **Settings → Pages**.
5. Set **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`.
7. Save.
8. GitHub will provide the public Pages URL.

## WhatsApp tracking

The survey records `WhatsApp Clicked = Yes` and the exact `WhatsApp Clicked At` timestamp when the WhatsApp CTA is clicked.

It does not claim that the user actually sent a WhatsApp message, because the browser cannot reliably verify what the user does after WhatsApp opens.

## Important

Do not put Google account credentials, API keys, or other secrets in the HTML or GitHub repository.
