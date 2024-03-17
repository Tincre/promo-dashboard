/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useCreative } from '../lib/hooks/useCreative';

export function AdPreviewDetailImage({ creativeUrl }: { creativeUrl: string }) {
  const { internalCreativeUrl, isVideo, videoPosterUrl } =
    useCreative(creativeUrl);
  return (
    <div className="relative ">
      {!isVideo ? (
        <img
          src={internalCreativeUrl}
          className="rounded-lg object-cover w-full h-56 sm:h-72 md:h-96"
          alt=""
        />
      ) : (
        <video
          muted
          controls
          className="rounded-lg object-cover w-full h-56 sm:h-72 md:h-96"
          poster={videoPosterUrl}
        >
          <source src={internalCreativeUrl} type="video/mp4" />
          {internalCreativeUrl.endsWith('.mov') ? (
            <source
              src={internalCreativeUrl.replace('.mov', '.mp4') || ''}
              type="video/mp4"
            />
          ) : null}
        </video>
      )}
    </div>
  );
}
