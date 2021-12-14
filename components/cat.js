export default function Home(props) {
  return (
    <div>
      <div style={catFaceStyle(props.catColor)}>
        <div style={catLeftEar(props.catColor)} />
        <div style={catRightEar(props.catColor)} />
        <div className="cat-eyes"></div>
        <div className="cat-nose"></div>
        <div className="cat-mouth"></div>
      </div>
    </div>
  );
}

const catFaceStyle = (catColor) => ({
  backgroundColor: `${catColor}`,
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  display: 'block',
  position: 'relative',
  float: 'left',
});

const catLeftEar = (catColor) => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '0',
  height: '0',
  borderLeft: '30px solid transparent',
  borderRight: '30px solid transparent',
  borderBottom: `40px solid ${catColor}`,
  borderRadius: '5px',
  left: '-15px',
  top: '-5px',
  transform: 'rotate(-40deg)',
});

const catRightEar = (catColor) => ({
  position: 'absolute',
  display: 'block',
  content: '',
  width: '0',
  height: '0',
  borderLeft: '30px solid transparent',
  borderRight: '30px solid transparent',
  borderBottom: `40px solid ${catColor}`,
  borderRadius: '5px',
  right: '-15px',
  top: '-5px',
  transform: 'rotate(40deg)',
});
