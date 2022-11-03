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
