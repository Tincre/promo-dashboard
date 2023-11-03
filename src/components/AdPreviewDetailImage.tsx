/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react';
const VIDEO_EXTENSIONS = [
  'm3u8',
  'ts',
  'm2ts',
  'mts',
  'mov',
  'mkv',
  'mp4',
  'mpeg',
  'mpd',
];
const checkIsVideo = (creativeUrl: string) => {
  const extension = creativeUrl
    .split('/')
    .slice(-1)[0]
    .split('.')
    .slice(-1)[0]
    .toLowerCase();
  return VIDEO_EXTENSIONS.includes(extension) ? true : false;
};

const getVideoPoster = (creativeUrl: string) =>
  `${creativeUrl.substring(0, creativeUrl.lastIndexOf('.'))}.webp`;
export function AdPreviewDetailImage({ creativeUrl }: { creativeUrl: string }) {
  const [isVideo, setIsVideo] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (typeof isVideo === 'undefined') {
      setIsVideo(checkIsVideo(creativeUrl));
    }
  }, [isVideo]);
  return (
    <div className="relative ">
      {!isVideo ? (
        <img
          src={creativeUrl}
          className="rounded-lg object-cover w-full h-56 sm:h-72 md:h-96"
          alt=""
        />
      ) : (
        <video
          muted
          controls
          className="rounded-lg object-cover w-full h-56 sm:h-72 md:h-96"
          poster={getVideoPoster(creativeUrl)}
        >
          <source src={creativeUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
