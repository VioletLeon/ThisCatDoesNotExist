import CatEars from './catEars';
import CatEyes from './catEyes';
import CatNose from './catNose';
import CatMouth from './catMouth';

export default function Cat(props) {
  console.log('main cat com:', props.eyeColor);

  return (
    <div>
      <div style={catFaceStyle(props.catColor)}>
        <div style={lowerFace()} />
        <CatEars catColor={props.catColor} />
        <CatEyes catEyeColor={props.eyeColor} />
        <CatNose />
        <CatMouth />
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

const lowerFace = () => ({
  position: 'absolute',
  bottom: '0',
  zIndex: '1',
  left: '10px',
  width: '0px',
  height: '0px',
  borderRight: '115px solid transparent',
  borderLeft: '115px solid transparent',
  borderBottom: '205px solid #fff',
  borderRadius: '50%',
});
