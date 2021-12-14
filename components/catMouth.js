export default function catMouth(props) {
  return (
    <div style={catMouthStyle()}>
      <div style={catLeftLip()} />
      <div style={catRightLip()} />
    </div>
  );
}

const catMouthStyle = () => ({
  width: '125px',
  height: '42.5px',
  position: 'absolute',
  top: '175px',
  left: '50%',
  marginLeft: '-62.5px',
  zIndex: '2',
  overflow: 'hidden',
});

const catLeftLip = () => ({
  content: '',
  display: 'block',
  position: 'absolute',
  left: '3px',
  bottom: '0',
  border: '2px solid #000',
  width: '60px',
  height: '70px',
  borderRadius: '50%',
});

const catRightLip = () => ({
  content: '',
  display: 'block',
  position: 'absolute',
  right: '3px',
  bottom: '0',
  border: '2px solid #000',
  width: '60px',
  height: '70px',
  borderRadius: '50%',
});
