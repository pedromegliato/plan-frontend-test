'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { Spinner } from '@/components/atoms/Spinner'
import { CountryFlag } from '@/components/molecules/CountryFlag'
import { CountryDetailHeader } from '@/components/organisms/CountryDetailHeader'
import { CountryDetailInfo } from '@/components/organisms/CountryDetailInfo'
import { Footer } from '@/components/organisms/Footer'
import { UI_TEXT } from '@/constants/uiText'
import { useCountryDetail } from '@/hooks/useCountryDetail'
import { getContinentDisplayName } from '@/utils/getContinentDisplayName'

export default function CountryPage() {
  const params = useParams()
  const router = useRouter()
  const code = params.code as string
  const { country, loading, error } = useCountryDetail(code)

  const handleBack = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500"
        role="status"
        aria-live="polite"
        aria-label="Carregando informações do país"
      >
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500 p-4">
        <div className="text-center bg-white rounded-xl p-8 shadow-2xl max-w-md">
          <h1 className="text-lg font-semibold text-red-600 mb-2">
            {UI_TEXT.common.error}
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            {error || 'País não encontrado'}
          </p>
          <button
            onClick={handleBack}
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            {UI_TEXT.common.back}
          </button>
        </div>
      </div>
    )
  }

  const continentDisplayName = getContinentDisplayName(
    country.continent,
    country.subregion,
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500">
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-[35px] max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="flex-shrink-0">
              <Image
                src="/img/LOGO PLAN.svg"
                alt="Plan International"
                width={140}
                height={60}
                priority
                className="h-10 sm:h-12 w-auto"
              />
            </div>
          </div>

          <div className="w-full max-w-[1300px] mx-auto my-5">
            <div className="bg-white rounded-[20px] shadow-[0_4px_10px_0_rgba(0,0,0,0.20)] overflow-hidden">
              <CountryDetailHeader
                continentDisplayName={continentDisplayName}
                continent={country.continent}
                subregion={country.subregion}
              />

              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 p-5">
                <CountryFlag flag={country.flag} flagAlt={country.flagAlt} />
                <CountryDetailInfo
                  country={country}
                  continentDisplayName={continentDisplayName}
                />
              </div>

              <div className="flex justify-center items-center pt-5" style={{ paddingBottom: '44px' }}>
                <button
                  onClick={handleBack}
                  aria-label="Voltar para a página inicial"
                  className="cursor-pointer text-center font-exo italic font-black transition-opacity hover:opacity-90 active:scale-95 w-full max-w-[270px] bg-orange rounded-[20px] text-white text-[15px]"
                  style={{ height: '47px' }}
                >
                  {UI_TEXT.common.back}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
