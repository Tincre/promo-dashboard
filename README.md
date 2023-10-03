# promo-dashboard, by [Tincre`.dev`](https://tincre.dev/)

A dashboard for Tincre [Promo](https://tincre.dev/promo). Use it in conjunction with the [`promo-button`](https://github.com/Tincre/promo-button).

- [promo-dashboard, by Tincre`.dev`](#promo-dashboard-by-tincredev)
  - [Installation](#installation)
    - [Yarn](#yarn)
    - [Npm](#npm)
    - [Environment variables](#environment-variables)
      - [`.env.local` Example](#envlocal-example)
    - [Usage](#usage)
      - [Frontend](#frontend)
        - [`campaignsData`](#campaignsdata)
        - [`isLoading`](#isLoading)
        - [`campaignDetailData`](#campaigndetaildata)
        - [`handleRepeatButtonClick`](#handlerepeatbuttonclick)
        - [`handleSubmitSaveButtonClick`](#handlesubmitsavebuttonclick)
        - [`profileSettingsData`](#profilesettingsdata)
        - [`dashboardOptions`](#dashboardoptions)
      - [Backend](#backend)
      - [Styling](#styling)
  - [Support](#support)
  - [License](#license)
  - [Development](#development)
    - [Releases](#releases)
      - [Release prep](#release-prep)
        - [Test release](#test-release)
      - [Release `latest` tag](#release-latest-tag)

## Installation

Use your favorite package manager to rock installation of `promo-dashboard`.

### Yarn

```
yarn add @tincre/promo-dashboard# -D if you want this as a dev dep
```

### Npm

```
npm install @tincre/promo-dashboard # --save-dev if you want it as a dev dep
```

### Environment variables

You'll need the following environment variables available in Node.js:

- `PROMO_CLIENT_ID`
- `PROMO_CLIENT_SECRET`
- `PROMO_APP_ID`
- `PROMO_API_KEY` (optional)

These values can be found in the [Tincre.dev Dashboard](https://tincre.dev/dashboard)
after you're logged in and have created at least one app.

#### `.env.local` Example

```env
PROMO_API_KEY=
PROMO_CLIENT_ID=
PROMO_APP_ID=
PROMO_CLIENT_SECRET=
```

### Usage

- Import the frontend component
- Add backend functionality
- Update the backend property in your frontend from 1
- Add an environment file, e.g. .env.local
- Add environment variables to your deployment
- Deploy!

#### Frontend

```jsx
import { PromoDashboard } from '@tincre/promo-dashboard';

<PromoDashboard
  campaignsData={campaignsData}
  campaignDetailData={campaignDetailData || undefined}
  isLoading={false}
  handleRepeatButtonClick={handleRepeatButtonClick || undefined}
/>;
```

##### `campaignsData`

A simple array of [`CampaignData`](/src/lib/types.ts) types.

##### `campaignDetailData`

The [`CampaignData`](/src/lib/types.ts) type.

```ts
interface CampaignData {
  pid?: string;
  email?: string;
  adTitle?: string;
  budget?: string | number;
  description?: string;
  target?: string;
  adCopy?: string;
  creativeUrls?: string[];
  adCallToAction?: string;
  buttonText?: string;
  isActive?: boolean;
  currency?: string;
  stats?: object[];
}
```

##### `isLoading`

The Promo Dashboard accepts an optional loading boolean property. Not including
the prop or giving `isLoading` a value of `false` will render the dashboard
in full.

If the `isLoading` prop is set to `true` the rendered dashboard frame will be
shown.

##### `handleRepeatButtonClick`

In order to fully utilize the `PromoButton` and `PromoDashboard` together, you should provide a handler similar to the below, defined in your parent component.

```jsx
import { useState } from 'react';

export default Index() {
  // Add your state hooks
  const [promoCampaignData, setPromoCampaignData] = useState();
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] = useState(false);
  // Add your custom button click callback
  const handleRepeatButtonClick = (
    event,
    data,
  ) => {
    // set at least the following parameters, same type as campaignDetailData
    setPromoCampaignData({
      adTitle: data?.adTitle,
      budget: data?.budget,
      description: data?.description,
      target: data?.target,
      adCopy: data?.adCopy || data?.description,
      adCallToAction: data?.adCallToAction,
      buttonText: data?.buttonText,
    });
    // not required but a useful pattern
    // used to open the promo button when isRepeatButtonClicked === true
    if (typeof setIsRepeatButtonClicked !== 'undefined') {
      setIsRepeatButtonClicked(!isRepeatButtonClicked);
    }
  };
  return <div>
    ...
    <PromoDashboard handleRepeatButtonClick={handleRepeatButtonClick}>
  </div>
};

```

##### `handleSubmitSaveButtonClick`

Callers can add a handler function to be called on click of the "Save" button rendered in the `Profile` component.

For example,

```tsx
import { MouseEvent } from 'react';
import { Settings } from '@tincre/promo-dashboard';

export function MyApp() {
  const handleSettingsSaveButtonOnClick = (event: MouseEvent, data: Settings) => {
    // do whatevs, like track state from above
  }
  render <PromoDashboard
    handleSettingsSaveButtonClick={handleSettingsSaveButtonOnClick}
  />
}
```

##### `profileSettingsData`

You can easily provide the settings data yourself and handle it from outside the dashboard. Simply add a `Settings` object to your `PromoDashboard` rendering.

For example,

```jsx
<PromoDashboard
  handleSettingsSaveButtonClick={handleSettingsSaveButtonOnClick}
  profileSettingsData={{
    userName: 'testUserName',
    fullName: 'Test McTesterson',
    image: 'favicon.ico',
  }}
/>
```

##### `dashboardOptions`

Users can customize some behavior within the dashboard, such as the support email domain and the local email part.

> ℹ️ There are two customizable portions in `team@tincre.dev`, the **local part**, i.e. `team` and the **email domain**, i.e. `tincre.dev`.

For example,

```jsx
<PromoDashboard
  dashboardOptions={{
    emailDomain: 'tincre.com',
    emailLocalPart: 'awesome-team',
  }}
/>
```

You can also control whether the table is initially collapsed or not via the optional
`isTableCollapsed` prop. The example below will collapse the table by default.

```jsx
<PromoDashboard
  dashboardOptions={{
    isTableCollapsed: true,
  }}
/>
```


#### Backend

🚧 Features and documentation content updates coming soon!

#### Styling

The Promo dashboard supports limited styling support. Essentially anything
with a prominent color can be customized within your global imported
tailwindcss css file.

See the file `/styles/global.css` in the Next.js example:

```css
#promo-dashboard-save-button {
  @apply bg-red-700 hover:bg-red-900;
}
#promo-dashboard-download-campaign-button {
  @apply bg-red-700 hover:bg-red-900;
}
#promo-dashboard-campaign-detail-back-button {
  @apply bg-red-700 hover:bg-red-900;
}
#promo-dashboard-save-button {
  @apply bg-red-700 hover:bg-red-900;
}
#promo-dashboard-line-chart {
  @apply bg-red-700 hover:bg-red-800;
}
#promo-dashboard-stats-highlights-icon-container {
  @apply bg-red-700;
}
#promo-dashboard-stats-highlights-icon {
  @apply text-slate-900;
}
#promo-dashboard-campaign-delete-button-x-circle-icon {
  @apply hover:bg-blue-700;
}
#promo-dashboard-loading-spinner {
  @apply w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-700;
}
.promo-dashboard-campaign-delete-button {
  @apply absolute -top-2 x-inset-0;
}
```

## Support

- Documentation: [tincre.dev/docs](https://tincre.dev/docs)
- Guides and how-tos: [tincre.dev/docs/guides](https://tincre.dev/docs/guides)
- Reference docs: [tincre.dev/docs/reference](https://tincre.dev/docs/reference)
- Community: [community.tincre.dev](https://community.tincre.dev)

## License

This code is free to use for your commercial or personal projects. It is open-source
licensed under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

You will see various headers throughout the codebase and can reference the license
directly via [LICENSE](/LICENSE) herein.

## Development

### Releases

We use [`npm`](https://npmjs.com) for releases. In particular, we use
`npm --publish` to publish.

Currently, only [@thinkjrs](https://github.com/thinkjrs) has the ability to release.

#### Release prep

Prior to using `npm --publish` a release tag needs to be created for
the library using our standard tagging practices.

> Ensure that tests :white_check_mark: pass during this process prior to
> releasing via npm.

##### Test release

To do a proper release, ensure you're in the base repo directory and run
`npm publish . --access public --dry-run`.

#### Release `latest` tag

To complete a full release to the `latest` npm `dist-tag`, ensure you're in
the base repo directory and run `npm publish . --access public`.

🎉 That's it! 🎉
