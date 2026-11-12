import wordmark from '../assets/epro-wordmark.png'

export default function Logo({ height = 26 }) {
  return <img src={wordmark} alt="EPRO" height={height} style={{ height, width: 'auto', display: 'block' }} />
}
