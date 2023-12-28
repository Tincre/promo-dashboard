import React from 'react';
import { render } from '@testing-library/react';
import { useCreative } from '../../../src/lib/hooks/useCreative';

// Test component that uses the useCreative hook
const TestComponent = ({ creativeUrl }: { creativeUrl: string }) => {
  const { internalCreativeUrl, isVideo, videoPosterUrl } =
    useCreative(creativeUrl);
  return (
    <div>
      <div data-testid="creative-url">{internalCreativeUrl}</div>
      <div data-testid="is-video">{isVideo ? 'Video' : 'Not Video'}</div>
      {videoPosterUrl && <div data-testid="video-poster">{videoPosterUrl}</div>}
    </div>
  );
};

describe('useCreative', () => {
  it('identifies a video URL and sets the poster URL correctly', () => {
    const videoUrl = 'http://example.com/video.mp4';
    const { getByTestId } = render(<TestComponent creativeUrl={videoUrl} />);

    expect(getByTestId('creative-url').textContent).toBe(videoUrl);
    expect(getByTestId('is-video').textContent).toBe('Video');
    expect(getByTestId('video-poster').textContent).toBe(
      'http://example.com/video.webp'
    );
  });

  it('identifies a non-video URL correctly', () => {
    const imageUrl = 'http://example.com/image.jpg';
    const { getByTestId, queryByTestId } = render(
      <TestComponent creativeUrl={imageUrl} />
    );

    expect(getByTestId('creative-url').textContent).toBe(imageUrl);
    expect(getByTestId('is-video').textContent).toBe('Not Video');
    expect(queryByTestId('video-poster')).toBeNull();
  });

  it('updates when the creative URL changes', () => {
    const videoUrl = 'http://example.com/initial.mp4';
    const videoPosterUrl = 'http://example.com/initial.webp';
    const { getByTestId, rerender } = render(
      <TestComponent creativeUrl={videoUrl} />
    );

    expect(getByTestId('is-video').textContent).toBe('Video');
    expect(getByTestId('video-poster').textContent).toBe(videoPosterUrl);

    const newVideoUrl = 'http://example.com/newvideo.mp4';
    rerender(<TestComponent creativeUrl={newVideoUrl} />);

    expect(getByTestId('creative-url').textContent).toBe(newVideoUrl);
    expect(getByTestId('is-video').textContent).toBe('Video');
    expect(getByTestId('video-poster').textContent).toBe(
      'http://example.com/newvideo.webp'
    );
  });

  // Add more tests for different file extensions and edge cases
});
