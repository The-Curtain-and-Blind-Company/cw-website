export default function CWMark({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="22" viewBox="0 0 48 22" className={className}>
      <text x="0" y="18" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="700" letterSpacing="-1">
        <tspan fill="#C03736">C</tspan>
        <tspan fill="#676E6D">W</tspan>
      </text>
    </svg>
  )
}
