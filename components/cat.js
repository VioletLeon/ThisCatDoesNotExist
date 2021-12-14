export default function Home(props) {
  return (
    <div>
      <div style={catFaceStyle(props.catColor)}>
        <div style={catLeftEar(props.catColor)} />
        <div style={innerLeftCatLeftEar()} />
        <div style={catRightEar(props.catColor)} />
        <div style={innerRightCatLeftEar()} />
        <div className="cat-eyes"></div>
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
