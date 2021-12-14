export default function Cat(props) {
  return (
    <div>
      <div style={catNose()} />
    </div>
  );
}

const catNose = () => ({
  display: 'block',
  content: '',
  position: 'absolute',
  top: '175px',
  left: '50%',
  marginLeft: '-12.5px',
  width: '0',
  height: '0',
  borderRight: '12.5px solid transparent',
  borderLeft: '12.5px solid transparent',
  borderTop: '12.5px solid #000',
  zIndex: 2,
});
