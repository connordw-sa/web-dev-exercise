export default function Banner({ bannerData }) {
  //destructuring banner + loading
  const { Image, Title, Description } = bannerData;
  if (!bannerData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="banner d-flex">
        <img src={`https://arthurfrost.qflo.co.za/${Image}`} alt="banner" />
        <h1>"{Title}!"</h1>
      </div>
      <h2> {Description}</h2>
    </>
  );
}
