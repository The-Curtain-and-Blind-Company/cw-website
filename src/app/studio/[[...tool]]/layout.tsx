export const metadata = {
  title: 'CurtainWorld Studio',
  description: 'CurtainWorld content management',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="sanity" style={{ height: '100vh' }}>
      {children}
    </div>
  )
}
