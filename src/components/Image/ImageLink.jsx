export const ImageLink = ({ src, alt, className, style }) => {
  return (
    <>
      <img src={src} alt={alt} className={className} style={style} />
    </>
  );
};
