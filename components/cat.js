export default function Home(props) {
  return (
    <div>
      <div style={catFaceStyle(props.catColor)}>
        <div style={catLeftEar(props.catColor)} />
        <div style={innerLeftCatLeftEar()} />
        <div style={catRightEar(props.catColor)} />
        <div style={innerRightCatLeftEar()} />
        <div style={catEyes()}>
          <div style={outerLeftCatEye()} />
          <div style={innerLeftCatEye()} />
          <div style={innerInnerLeftCatEye()} />
          <div style={outerRightCatEye()} />
          <div style={innerRightCatEye()} />
          <div style={innerInnerRightCatEye()} />
        </div>
        <div className="cat-nose"></div>
        <div className="cat-mouth"></div>
      </div>
    </div>
  );
}

const catFaceStyle = (catColor) => ({
  backgroundColor: `${catColor}`,
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  display: 'block',
  position: 'relative',
  float: 'left',
});

const catLeftEar = (catColor) => ({
  zIndex: '-1',
  position: 'absolute',
  display: 'block',
  content: '',
  width: '0',
  height: '0',
  borderLeft: '75px solid transparent',
  borderRight: '75px solid transparent',
  borderBottom: `100px solid ${catColor}`,
  borderRadius: '12.5px',
  left: '-42.5px',
  top: '-12.5px',
  transform: 'rotate(-40deg)',
});

const innerLeftCatLeftEar = () => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '0',
  height: '0',
  borderLeft: '30px solid transparent',
  borderRight: '30px solid transparent',
  borderBottom: `50px solid #FFC0CB`,
  borderRadius: '12.5px',
  left: '-5.5px',
  top: '5px',
  transform: 'rotate(-45deg)',
});

const catRightEar = (catColor) => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '0',
  height: '0',
  borderLeft: '75px solid transparent',
  borderRight: '75px solid transparent',
  borderBottom: `100px solid ${catColor}`,
  borderRadius: '12.5px',
  right: '-42.5px',
  top: '-12.5px',
  transform: 'rotate(40deg)',
});

const innerRightCatLeftEar = () => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '0',
  height: '0',
  borderLeft: '30px solid transparent',
  borderRight: '30px solid transparent',
  borderBottom: `50px solid #FFC0CB`,
  borderRadius: '12.5px',
  right: '-5.5px',
  top: '5px',
  transform: 'rotate(45deg)',
});

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
  backgroundColor: '#DAF7A6 ',
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
  backgroundColor: '#DAF7A6',
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
