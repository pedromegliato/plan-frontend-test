import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchCountriesRequest,
  setSearchTerm,
  setContinents,
  setLanguage,
  applyFilters,
  clearFilters,
  setPage,
  nextPage,
  prevPage,
  selectPaginatedCountries,
  selectFilters,
  selectAvailableLanguages,
  selectLoading,
  selectError,
  selectPagination,
  selectFilteredItems,
} from '@/store/modules/countries'

import { useDebounce } from './useDebounce'

export const useCountries = () => {
  const dispatch = useAppDispatch()

  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300)

  const filters = useAppSelector(selectFilters)
  const availableLanguages = useAppSelector(selectAvailableLanguages)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const pagination = useAppSelector(selectPagination)
  const paginatedCountries = useAppSelector(selectPaginatedCountries)
  const filteredItems = useAppSelector(selectFilteredItems)

  const totalCountries = filteredItems.length

  useEffect(() => {
    dispatch(fetchCountriesRequest())
  }, [dispatch])

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm))
  }, [debouncedSearchTerm, dispatch])

  useEffect(() => {
    dispatch(applyFilters())
  }, [dispatch, filters.searchTerm, filters.continents, filters.language])

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value)
  }

  const handleContinentsChange = (continents: string[]) => {
    dispatch(setContinents(continents))
  }

  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage(language))
  }

  const handleClearFilters = () => {
    setLocalSearchTerm('')
    dispatch(clearFilters())
  }

  const handlePageChange = (page: number) => {
    dispatch(setPage(page))
  }

  const handleNextPage = () => {
    dispatch(nextPage())
  }

  const handlePrevPage = () => {
    dispatch(prevPage())
  }

  return {
    countries: paginatedCountries,
    totalCountries,
    filters: {
      ...filters,
      searchTerm: localSearchTerm,
    },
    availableLanguages,
    loading,
    error,
    pagination,
    handleSearchChange,
    handleContinentsChange,
    handleLanguageChange,
    handleClearFilters,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
  }
}
