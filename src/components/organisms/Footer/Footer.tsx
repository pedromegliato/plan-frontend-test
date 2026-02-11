import Image from 'next/image'

import { UI_TEXT } from '@/constants/uiText'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-black py-6 sm:py-8 md:h-[130px] md:py-0 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-4 sm:gap-0 max-w-[1440px]">
        <Image
          src="/img/LOGO GRUPO.svg"
          alt="Grupo Plan Marketing"
          width={126}
          height={92}
          className="w-24 h-auto sm:w-28 md:w-[126px]"
        />
        <p className='text-white text-center sm:text-right text-xs sm:text-sm font-bold font-["Open_Sans",sans-serif]'>
          {UI_TEXT.footer.copyright} - {currentYear}
        </p>
      </div>
    </footer>
  )
}
