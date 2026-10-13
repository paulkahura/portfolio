# Portfolio media provenance

Captured October 13, 2026.

- Socio web: rendered isolated copies of the product's FeedShell, FullScreenFeed, CustomerShell, PostGrid, ChatThread, profile, sessions, and booking components. Service imports were replaced with synthetic fixtures. No customer database or production service was connected.
- Socio native: rendered the original Flutter sign-in, registration, and account-type widgets in an isolated widget-test harness. Auth and routing integrations were stubbed. Font and icon assets were loaded for export.
- Socio responsive: chat and booking screens at phone size are responsive web captures, explicitly distinguished from native Flutter screens in their captions.
- Client-name masking is baked into the raster screenshots. Web text was replaced with a generic label before blurring and export. Native branding text was blurred during rendering; the account-type copy uses a generic label. Only anonymized PNGs and a name-free symbol are included in public assets.
- All conversations, appointments, profiles, and counts are sample data. Landscape sample media: Unsplash photo IDs `photo-1470770841072-f978cf4d019e`, `photo-1500530855697-b586d89ba3ee`, and `photo-1464822759023-fed622ff2c3b`.
- FirstHour: public homepage capture from https://firsthour.ai/ with the cookie banner omitted. This is current product branding and a public website capture, not a claim of website authorship. Existing `repsafe` route IDs remain stable.
- Blue Box AI: an explicitly labelled interface concept informed by the repository's camera, analytics, query, and event workflows. It is not a screenshot of a deployed dashboard. Retail sample image: Unsplash `photo-1441986300917-64674bd600d8`.
- Anton display font is self-hosted with its SIL Open Font License in `public/fonts/Anton-OFL.txt`.

Temporary rendering harnesses stay in ignored `tmp/`; they are not shipped or committed.
