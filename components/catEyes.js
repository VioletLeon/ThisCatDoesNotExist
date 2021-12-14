export default function Cat(props) {
  console.log(props);

  return (
    <div style={catEyes()}>
      <div style={outerLeftCatEye()} />
      <div style={innerLeftCatEye(props.catEyeColor)} />
      <div style={innerInnerLeftCatEye()} />
      <div style={outerRightCatEye()} />
      <div style={innerRightCatEye(props.catEyeColor)} />
      <div style={innerInnerRightCatEye()} />
    </div>
  );
}

const catEyes = () => ({
  position: 'absolute',
  top: '125px',
  width: '137.5px',
  left: '50%',
  marginLeft: '-67.5px',
  zIndex: '2',
});

const outerLeftCatEye = () => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '32.5px',
  height: '32.5px',
  backgroundColor: 'black',
  left: '0',
  top: '0',
  borderRadius: '50%',
});

const innerLeftCatEye = (eyeColor) => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '22.5px',
  height: '22.5px',
  backgroundColor: `${eyeColor}`,
  left: '4.5px',
  top: '3.5px',
  borderRadius: '50%',
});

const innerInnerLeftCatEye = () => ({
  position: 'absolute',
  content: '',
  width: '10.5px',
  height: '22.5px',
  backgroundColor: 'black',
  left: '10.5px',
  top: '0px',
  borderRadius: `75%`,
});

const outerRightCatEye = () => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '32.5px',
  height: '32.5px',
  backgroundColor: 'black',
  right: '0',
  top: '0',
  borderRadius: '50%',
});

const innerRightCatEye = (eyeColor) => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '22.5px',
  height: '22.5px',
  backgroundColor: `${eyeColor}`,
  right: '4.5px',
  top: '3.5px',
  borderRadius: '50%',
});

const innerInnerRightCatEye = () => ({
  position: 'absolute',
  content: '',
  width: '10.5px',
  height: '22.5px',
  backgroundColor: 'black',
  right: '10.5px',
  top: '0px',
  borderRadius: `75%`,
});
