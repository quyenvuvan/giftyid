"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import SimpleAddressSelector from "../shared/SimpleAddressSelector";
import LogoutButton from "../LogoutButton";
import { useAuth } from '@/context/AuthContext';
import { FaClock, FaBlog, FaSignOutAlt, FaUser } from 'react-icons/fa';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("TP. Hải Dương");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const employeeDropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { employee, logout } = useAuth();
  const router = useRouter();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setServiceDropdownOpen(false);
      }
      if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target as Node)) {
        setEmployeeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load address from localStorage on component mount
  useEffect(() => {
    if (mounted) {
      const savedAddress = localStorage.getItem('deliveryAddress');
      if (savedAddress) {
        setDeliveryAddress(savedAddress);
      }
    }
  }, [mounted]);

  // Function to handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // Function to handle address change
  const handleAddressChange = (address: string) => {
    setDeliveryAddress(address);
    // Save to local storage
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('deliveryAddress', address);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle about dropdown
  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };
  const toggleServiceDropdown = () => {
    setServiceDropdownOpen(!serviceDropdownOpen);
  };

  // Toggle mobile about dropdown
  const toggleMobileAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen);
  };

  // Toggle mobile service dropdown
  const toggleMobileService = () => {
    setMobileServiceOpen(!mobileServiceOpen);
  };

  // Handle navigation click - close menus and show loading
  const handleNavClick = () => {
    setIsLoading(true);

    // Close all dropdowns and menus
    setTimeout(() => {
      setMobileMenuOpen(false);
      setMobileAboutOpen(false);
      setMobileServiceOpen(false);
      setAboutDropdownOpen(false);
      setServiceDropdownOpen(false);
      setEmployeeMenuOpen(false);
    }, 100);

    // Hide loading after navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Handle employee logout
  const handleLogout = async () => {
    try {
      await logout();
      setEmployeeMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Prevent hydration mismatch by not rendering client-specific content until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 bg-adaptive z-50 shadow-adaptive font-inter text-vietnamese">
        {/* Delivery Address */}
        <div className="bg-neutral-100 dark:bg-neutral-800 py-1 px-4">
          <div className="container mx-auto">
            <SimpleAddressSelector
              initialAddress="TP. Hải Dương"
              onAddressChange={() => { }}
            />
          </div>
        </div>

        {/* Logo and User Controls */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="Postgifty"
                width={150}
                height={40}
                className="h-10 w-auto"
                style={{ width: "auto" }}
              />
            </Link>

            {/* Search Bar - Desktop only */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <form className="flex w-full">
                <button
                  type="button"
                  className="flex items-center justify-between bg-adaptive border border-adaptive rounded-l-md px-4 py-2 text-sm text-adaptive-heading whitespace-nowrap"
                >
                  Ngành hàng
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="flex-1 border-y border-adaptive px-4 py-2 outline-none bg-adaptive text-adaptive-heading"
                  placeholder="Tìm kiếm sản phẩm..."
                />
                <button
                  type="submit"
                  className="bg-adaptive border border-adaptive rounded-r-md px-4 py-2"
                >
                  <FaSearch className="text-adaptive-gray" />
                </button>
              </form>
            </div>

            {/* User and Cart */}
            <div className="flex items-center space-x-4">
              {/* Employee Menu */}
              {employee && (
                <div className="relative" ref={employeeDropdownRef}>
                  <button
                    onClick={() => setEmployeeMenuOpen(!employeeMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                  >
                    <FaUser className="text-sm" />
                    <span className="hidden sm:block text-sm font-medium">{employee.name}</span>
                    <FaChevronDown className={`text-xs transition-transform ${employeeMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Employee Dropdown Menu */}
                  {employeeMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">ID: {employee.id}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={handleNavClick}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaUser className="text-purple-500" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/cham-cong"
                        onClick={handleNavClick}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaClock className="text-blue-500" />
                        <span>Chấm công</span>
                      </Link>

                      <Link
                        href="/blog"
                        onClick={handleNavClick}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaBlog className="text-green-500" />
                        <span>Quản lý Blog</span>
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <FaSignOutAlt />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!employee && <LogoutButton />}

              <Link href="/cart" className="relative">
                <FaShoppingCart className="text-xl text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-adaptive-heading"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Mobile only */}
        <div className="md:hidden container mx-auto px-4 pb-3">
          <form className="flex w-full">
            <button
              type="button"
              className="flex-shrink-0 flex items-center justify-between bg-adaptive border border-adaptive rounded-l-md px-4 py-2 text-sm text-adaptive-heading whitespace-nowrap"
            >
              Ngành hàng
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <input
              type="text"
              className="flex-1 border-y border-adaptive px-4 py-2 outline-none bg-adaptive text-adaptive-heading min-w-0"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-adaptive border border-adaptive rounded-r-md px-4 py-2"
            >
              <FaSearch className="text-adaptive-gray" />
            </button>
          </form>
        </div>

        {/* Main Navigation Menu */}
        <div className="gradient-primary text-white">
          <div className="container mx-auto px-4">
            <nav className="hidden md:flex items-center">
              <Link href="/" className="nav-link">
                Trang chủ
              </Link>

              {/* About dropdown */}
              <div className="relative">
                <button className="flex items-center nav-link">
                  Về chúng tôi
                  <FaChevronDown className="ml-1 text-xs" />
                </button>
              </div>

              <Link href="/sell" className="nav-link">
             Bán hàng trên PostGifty
              </Link>
              <Link href="/collaborator" className="nav-link">
                Chương trình CTV bán hàng
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden gradient-primary text-white transition-all duration-300 max-h-0 overflow-hidden">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col">
              <Link href="/" className="py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200">
                Trang chủ
              </Link>
              <Link href="/sell" className="py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200">
             Bán hàng trên PostGifty
              </Link>
              <Link href="/collaborator" className="py-3 px-4 hover:bg-blue-700 font-medium transition-colors duration-200">
                Chương trình CTV bán hàng
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 bg-adaptive z-50 shadow-adaptive font-inter text-vietnamese">
      {/* Loading bar */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            <div className="h-full bg-white/30 animate-[loading-slide_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}

      {/* Delivery Address */}
      <div className="bg-neutral-100 dark:bg-neutral-800 py-1 px-4">
        <div className="container mx-auto">
          <SimpleAddressSelector
            initialAddress={deliveryAddress}
            onAddressChange={handleAddressChange}
          />
        </div>
      </div>

      {/* Logo and User Controls */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={handleNavClick}>
            <Image
              src="/logo.jpg"
              alt="Postgifty"
              width={150}
              height={40}
              className="h-10 w-auto"
              style={{ width: "auto" }}
            />
          </Link>

          {/* Search Bar - Desktop only */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="flex w-full">
              <button
                type="button"
                className="flex items-center justify-between bg-adaptive border border-adaptive rounded-l-md px-4 py-2 text-sm text-adaptive-heading whitespace-nowrap"
              >
                Ngành hàng
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="flex-1 border-y border-adaptive px-4 py-2 outline-none bg-adaptive text-adaptive-heading"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-adaptive border border-adaptive rounded-r-md px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaSearch className="text-adaptive-gray" />
                )}
              </button>
            </form>
          </div>

          {/* User and Cart */}
          <div className="flex items-center space-x-4">
            <LogoutButton />
            <Link href="/cart" className="relative" onClick={handleNavClick}>
              <FaShoppingCart className="text-xl text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-adaptive-heading"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar - Mobile only */}
      <div className="md:hidden container mx-auto px-4 pb-3">
        <form onSubmit={handleSearch} className="flex w-full">
          <button
            type="button"
            className="flex-shrink-0 flex items-center justify-between bg-adaptive border border-adaptive rounded-l-md px-4 py-2 text-sm text-adaptive-heading whitespace-nowrap"
          >
            Ngành hàng
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <input
            type="text"
            className="flex-1 border-y border-adaptive px-4 py-2 outline-none bg-adaptive text-adaptive-heading min-w-0"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-adaptive border border-adaptive rounded-r-md px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSearch className="text-adaptive-gray" />
            )}
          </button>
        </form>
      </div>

      {/* Main Navigation Menu */}
      <div className="gradient-primary text-white">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center">
            <Link href="/" className="nav-link hover:bg-white/10 transition-colors duration-200" onClick={handleNavClick}>
              Trang chủ
            </Link>

            {/* About dropdown */}
            <div ref={aboutDropdownRef} className="relative">
              <button
                onClick={toggleAboutDropdown}
                className="flex items-center nav-link hover:bg-white/10 transition-colors duration-200"
              >
                Về chúng tôi
                <FaChevronDown className={`ml-1 text-xs transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="nav-dropdown animate-[fadeInDown_0.3s_ease-out]">
                  <Link
                    href="/about"
                    className="nav-dropdown-item border-b border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    onClick={handleNavClick}
                  >
                    Giới thiệu GiftyTech
                  </Link>
                  <Link
                    href="/giftyid"
                    className="nav-dropdown-item border-b border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    onClick={handleNavClick}
                  >
                    Giới thiệu Postgifty
                  </Link>
                  <Link
                    href="/tinh-nang"
                    className="nav-dropdown-item hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    onClick={handleNavClick}
                  >
                    Giới thiệu Zalo mini app
                  </Link>
                </div>
              )}
            </div>

            <Link href="/sell" className="nav-link hover:bg-white/10 transition-colors duration-200" onClick={handleNavClick}>
            Bán hàng trên PostGifty
            </Link>
            <Link href="/collaborator" className="nav-link hover:bg-white/10 transition-colors duration-200" onClick={handleNavClick}>
              Chương trình CTV bán hàng
            </Link>
            {/* Dich vu dropdown */}
            <div ref={serviceDropdownRef} className="relative">
              <button
                onClick={toggleServiceDropdown}
                className="flex items-center nav-link hover:bg-white/10 transition-colors duration-200"
              >
                Dịch vụ
                <FaChevronDown className={`ml-1 text-xs transition-transform duration-200 ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviceDropdownOpen && (
                <div className="nav-dropdown animate-[fadeInDown_0.3s_ease-out]">

                  <Link
                    href="/dich-vu"
                    className="nav-dropdown-item border-b border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    onClick={handleNavClick}
                  >
                    Dịch vụ Zalo mini app
                  </Link>

                  <Link
                    href="/dich-vu/tinh-phi"
                    className="nav-dropdown-item border-b border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    onClick={handleNavClick}
                  >
                    Bảng tính phí dịch vụ chi tiết
                  </Link>

                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="nav-link hover:bg-white/10 transition-colors duration-200"
              onClick={handleNavClick}
            >
              Tin tức
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden gradient-primary text-white transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col">
            <Link
              href="/"
              className="py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200"
              onClick={handleNavClick}
            >
              Trang chủ
            </Link>

            {/* Mobile About dropdown */}
            <div>
              <button
                onClick={toggleMobileAbout}
                className="w-full flex items-center justify-between py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200"
              >
                <span>Về chúng tôi</span>
                <FaChevronDown className={`transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`transition-all duration-200 overflow-hidden ${mobileAboutOpen ? 'max-h-48' : 'max-h-0'}`}>
                <Link
                  href="/about"
                  className="block py-3 px-8 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600"
                  onClick={handleNavClick}
                >
                  Giới thiệu GiftyTech
                </Link>
                <Link
                  href="/giftyid"
                  className="block py-3 px-8 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600"
                  onClick={handleNavClick}
                >
                  Giới thiệu Postgifty
                </Link>
                <Link
                  href="/tinh-nang"
                  className="block py-3 px-8 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600"
                  onClick={handleNavClick}
                >
                  Giới thiệu Zalo mini app
                </Link>
              </div>
            </div>

            <Link
              href="/sell"
              className="py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200"
              onClick={handleNavClick}
            >
            Bán hàng trên PostGifty
            </Link>
            <Link
              href="/collaborator"
              className="py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200"
              onClick={handleNavClick}
            >
              Chương trình CTV bán hàng
            </Link>

            {/* Mobile Service dropdown */}
            <div>
              <button
                onClick={toggleMobileService}
                className="w-full flex items-center justify-between py-3 px-4 hover:bg-blue-700 font-medium border-b border-blue-500 transition-colors duration-200"
              >
                <span>Dịch vụ</span>
                <FaChevronDown className={`transition-transform duration-200 ${mobileServiceOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`transition-all duration-200 overflow-hidden ${mobileServiceOpen ? 'max-h-48' : 'max-h-0'}`}>
            <Link
              href="/dich-vu"
                  className="block py-3 px-8 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600"
                  onClick={handleNavClick}
                >
                  Dịch vụ Zalo mini app
                </Link>
                <Link
                  href="/dich-vu/tinh-phi"
                  className="block py-3 px-8 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600"
              onClick={handleNavClick}
            >
                  Bảng tính phí dịch vụ chi tiết
            </Link>
              </div>
            </div>
            <Link
              href="/blog"
              className="py-3 px-4 hover:bg-blue-700 font-medium transition-colors duration-200"
              onClick={handleNavClick}
            >
              Tin tức
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 