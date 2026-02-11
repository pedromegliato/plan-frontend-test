import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="w-full bg-white/10 backdrop-blur-sm py-4">
      <div className="container mx-auto px-6 max-w-7xl">
        <Link href="/" className="inline-block hover:opacity-80 transition-opacity cursor-pointer">
          <Image
            src="/img/LOGO PLAN.svg"
            alt="Plan International"
            width={150}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>
      </div>
    </header>
  )
}
