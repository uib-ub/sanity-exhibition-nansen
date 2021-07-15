import { Box } from '@chakra-ui/react'
import SvgEye from './selmer-eye.svg'

export default function SelmerEye(props) {
  /*   const eye = document.querySelector('#pupil');
  
  window.addEventListener('mousemove', (evt) => {
    const x = -(window.innerWidth / 2 - evt.pageX) / 10;
    const y = -(window.innerHeight / 2 - evt.pageY) / 10;
    eye.style.transform = `translateY(${y}px) translateX(${x}px)`;
  });   */

  const { w } = props

  return (
    <Box w={w}>
      <SvgEye />
    </Box>
  )
}
