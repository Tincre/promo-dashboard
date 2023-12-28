import { useState, useEffect } from 'react';

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

export function useCreative(creativeUrl: string) {
  const [isVideo, setIsVideo] = useState<boolean | undefined>();
  const [internalCreativeUrl, setInternalCreativeUrl] =
    useState<string>(creativeUrl);
  const [videoPosterUrl, setVideoPosterUrl] = useState<string | undefined>();

  useEffect(() => {
    if (typeof isVideo === 'undefined') {
      let isVideoLocal = checkIsVideo(internalCreativeUrl);
      setIsVideo(isVideoLocal);
      if (isVideoLocal) setVideoPosterUrl(getVideoPoster(internalCreativeUrl));
    } else {
      if (isVideo) setVideoPosterUrl(getVideoPoster(internalCreativeUrl));
    }
  }, [isVideo, internalCreativeUrl]);
  useEffect(() => {
    setInternalCreativeUrl(creativeUrl);
  }, [creativeUrl]);
  return { internalCreativeUrl, isVideo, videoPosterUrl };
}
