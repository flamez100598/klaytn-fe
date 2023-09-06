interface IVideoBanner {
  url?: string;
}

const VideoBanner = (props: IVideoBanner) => {
  const { url } = props;
  console.log("url", url);
  return (
    <video
      width="100%"
      loop
      autoPlay
      muted
      src="https://testnet.fra-art.com/static/media/FRA-ART.video.fea5da1e7864f6696e6d.mp4"
      playsInline
    ></video>
  );
};
export default VideoBanner;
