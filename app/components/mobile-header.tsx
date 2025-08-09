import logo from '~/assets/images/logo.svg'

export function MobileHeader() {
  return (
    <header className="bg-gray-100 px-4 py-3 md:px-8 md:py-4 lg:hidden">
      <img src={logo} alt="Notes" />
    </header>
  )
}
