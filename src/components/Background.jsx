function Background(props) {
  const backgroundStyle = {
    display: props.display,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "0",
    backdropFilter: "blur(2px)",
  };

  return <div id="background" style={backgroundStyle}></div>;
}

export default Background;
