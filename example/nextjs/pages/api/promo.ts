// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Promo API route support: https://tincre.dev/docs/reference
import { generateAccessToken, getToken } from '@tincre/promo-button-node';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};
type CloudinaryPayload = {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  original_extension: string;
  eager: Array<{
    status: string;
    batch_id: string;
    url: string;
    secure_url: string;
  }>;
  path: string;
  thumbnail_url: string;
};
type CampaignBodyData = {
  target_link: string;
  budget: number;
  email: string;
  creative_uri: Array<CloudinaryPayload>;
  asset_title: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const clientSecret: string = process.env.PROMO_CLIENT_SECRET || '';
  const appId: string = process.env.PROMO_APP_ID || '';
  const clientId: string = process.env.PROMO_CLIENT_ID || '';
  let accessTokenSigned: string = generateAccessToken(
    'http://localhost:3000',
    clientId,
    appId,
    clientSecret
  );

  let resultToken: string = await getToken(accessTokenSigned);
  const promoApiUrl = 'https://promo.api.tincre.dev/campaigns';
  // get data from client
  const data: CampaignBodyData = req.body;
  console.debug(
    `/api/promo received ${JSON.stringify(
      data
    )} from the frontend. Preparing request to ${promoApiUrl} now.`
  );

  // build request options
  const creative_uris: Array<string> = [];
  data.creative_uri.map((value: CloudinaryPayload) =>
    creative_uris.push(value.secure_url)
  );
  const promoApiRoutePayload = JSON.stringify([
    {
      asset_title: data.asset_title,
      creative_uri: creative_uris,
      target_link: data.target_link,
      budget: `${data.budget}`,
    },
  ]);
  console.debug(`Request prepared, sending body: ${promoApiRoutePayload}`);
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${resultToken}`,
  };
  // build request options
  const promoApiRequestOptions = {
    method: 'POST',
    headers: headers,
    body: promoApiRoutePayload,
  };
  // send request to tincre.dev Promo API
  // forward the status value
  const promoApiResponse = await fetch(promoApiUrl, promoApiRequestOptions);
  const promoApiResponseBody = await promoApiResponse.json();

  if (promoApiResponse.status === 200) {
    console.debug(`Successful response from the /campaigns Promo API route.`);
    // only one campaign
    const { pid } = promoApiResponseBody.campaigns[0];
    console.debug(
      `promoApiResponse body: ${JSON.stringify(promoApiResponseBody)}`
    );
    // Get payment link via Promo API /payments route
    const promoApiPayUrl = 'https://promo.api.tincre.dev/payments';
    const promoApiPayRoutePayload = JSON.stringify([
      {
        email: data.email,
        environment: 'prod',
        promoUserEmail: 'jason@tincre.com',
        budget: `${data.budget}`,
        pid: pid,
        paymentType: 'smart',
      },
    ]);
    const promoApiPayRequestOptions = {
      method: 'POST',
      headers: headers,
      body: promoApiPayRoutePayload,
    };
    const promoApiPayResponse = await fetch(
      promoApiPayUrl,
      promoApiPayRequestOptions
    );
    const promoApiPayResponseBody = await promoApiPayResponse.json();
    if (promoApiPayResponse.status !== 200) {
      console.error(
        `Bad response from the promo-api /payments: ${promoApiPayResponse.status}`
      );
      console.error(`${promoApiPayResponseBody}`);
      res.status(promoApiPayResponse.status).json(promoApiPayResponseBody);
    }

    console.log(JSON.stringify(promoApiPayResponseBody));
    res.json({ ...promoApiResponseBody, ...promoApiPayResponseBody });
  } else {
    console.warn(
      `Failed response from the /campaigns Promo API route. Status: ${promoApiResponse.status}`
    );
    console.debug(JSON.stringify(await promoApiResponse.json()));
    res.status(promoApiResponse.status).json(promoApiResponseBody);
  }
}
