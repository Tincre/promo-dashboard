import jwt from 'jsonwebtoken';
/**
 * Encode (and sign) a given object as JWT.
 *
 * @param data object to encode in base64 and sign via HMAC and the given
 *     passphrase
 * @param passphrase string secret passphrase for producing the HMAC hash of the
 *     data
 * @returns string JWT token
 */
function encodeJwt(data: object, passphrase: string): string {
  if (typeof data !== 'object')
    throw new Error(
      'data is not a JavaScript object. Do better next time, please.'
    );
  const token = jwt.sign(data, passphrase);
  return token;
}

interface PromoAccessTokenJwt {
  sub: string;
  iss: string;
  cid: string;
  aid: string;
  iat: string | number;
  exp: string | number;
  scope: string;
  token_type: string;
}
/**
 * Given the issuer URL, clientId, appId, and clientSecret return a
 * signed access token.
 *
 * @param issuer the URL for which this token should be valid and usable
 * @param clientId the string clientId from the tincre.dev dashboard
 * @param appId the string appId from the tincre.dev dashboard
 * @param clientSecret the string clientSecret from the tincre.dev dashboard
 * @param expiration optional expiration number in seconds; defaults to 30 min
 * @returns string JWT signed with the clientSecret provided
 */
function generateAccessToken(
  issuer: string,
  clientId: string,
  appId: string,
  clientSecret: string,
  expiration?: number
) {
  const timestamp = Date.now();
  const exp = expiration ? timestamp + expiration : timestamp + 1800;
  let accessToken: PromoAccessTokenJwt = {
    sub: '',
    iss: issuer,
    cid: clientId,
    aid: appId,
    iat: timestamp,
    exp: exp,
    scope: '',
    token_type: 'Access',
  };

  return encodeJwt(accessToken, clientSecret);
}

export { encodeJwt, generateAccessToken };
