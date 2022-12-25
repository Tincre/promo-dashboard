/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export function AdPreviewDetailImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative ">
      {' '}
      <img
        src={imageUrl}
        className="rounded-lg object-cover w-full h-56 sm:h-72 md:h-96"
        alt=""
      />
    </div>
  );
}
