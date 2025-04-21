function Logo({ large }) {
  const src = "/logo.svg";

  return (
    <div>
      <img className='mx-auto' width={large ? 300 : 200} height={large ? 300 : 200} src={src} alt='Logo' />
    </div>
  );
}

export default Logo;
