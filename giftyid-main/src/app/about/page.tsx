"use client";

import React from 'react';
import Link from 'next/link';
import { 
  FaCode, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaShoppingCart, 
  FaUserFriends,
  FaRocket,
  FaBolt,
  FaGlobe,
  FaShieldAlt,
  FaArrowRight,
  FaQuoteLeft,
  FaAward,
  FaChartLine,
  FaUsers,
  FaClock
} from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="bg-adaptive-light min-h-screen overflow-hidden">
      {/* Hero Section with Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse duration-4000"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-blue-300/20 rounded-lg rotate-45 animate-pulse duration-3000"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-pulse duration-5000"></div>
          <div className="absolute bottom-20 right-32 w-16 h-16 bg-blue-200/20 rounded-lg rotate-12 animate-pulse duration-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    <FaBolt className="mr-2 text-yellow-300" />
                    Công nghệ tiên tiến
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Gifty Tech
                    </span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                    Kiến tạo tương lai số cho doanh nghiệp Việt Nam với những giải pháp công nghệ đột phá
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                    🚀 E-commerce Platform
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                    📱 Zalo Mini App
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                    🌐 Digital Ecosystem
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dich-vu" className="btn-primary group">
                    Khám phá dịch vụ
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                 
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="relative w-full h-96 lg:h-[500px]">
                  {/* Central Hub */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <FaCode className="text-4xl text-white" />
                    </div>
                  </div>

                  {/* Floating Tech Icons */}
                  <div className="absolute top-10 left-10 animate-float">
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <FaLaptopCode className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute top-20 right-16 animate-float-delayed">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <FaMobileAlt className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-20 left-20 animate-float">
                    <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <FaShoppingCart className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-32 right-8 animate-float-delayed">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <FaGlobe className="text-2xl text-white" />
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="50%" y1="50%" x2="35%" y2="80%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaUsers className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-adaptive-gray">Đối tác tin tưởng</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaChartLine className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-adaptive-gray">Dự án thành công</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaCode className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-adaptive-gray">Chuyên gia IT</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaClock className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
                <div className="text-adaptive-gray">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-adaptive-heading mb-6">
                Về <span className="text-primary">Gifty Tech</span>
              </h2>
              <p className="text-xl text-adaptive-gray max-w-3xl mx-auto">
                Chúng tôi là đội ngũ passionate về công nghệ, cam kết mang đến những giải pháp số hóa tối ưu cho doanh nghiệp Việt Nam
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Gifty Tech */}
              <div className="card-elevated p-8 group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <FaRocket className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-adaptive-heading">Gifty Tech</h3>
                    <p className="text-primary font-medium">Technology Company</p>
                  </div>
                </div>
                
                <p className="text-adaptive-gray mb-6 leading-relaxed">
                  Công ty công nghệ hàng đầu tại Hải Dương, chuyên phát triển các giải pháp 
                  TMĐT và ứng dụng di động hiện đại. Với đội ngũ engineer giàu kinh nghiệm, 
                  chúng tôi sử dụng các công nghệ cutting-edge để tạo ra những sản phẩm 
                  chất lượng cao.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">React/Next.js</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">Cloud Computing</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">AI/ML</span>
                </div>
              </div>

              {/* GiftyID Platform */}
              <div className="card-elevated p-8 group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <FaShoppingCart className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-adaptive-heading">GiftyID</h3>
                    <p className="text-emerald-600 font-medium">E-commerce Platform</p>
                  </div>
                </div>
                
                <p className="text-adaptive-gray mb-6 leading-relaxed">
                  Nền tảng thương mại điện tử toàn diện trên Zalo Mini App, kết nối 
                  triệu người dùng với các doanh nghiệp địa phương. GiftyID mang đến 
                  trải nghiệm mua sắm seamless và giải pháp bán hàng hiệu quả.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium rounded-full">Zalo Mini App</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium rounded-full">E-commerce</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium rounded-full">Booking System</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium rounded-full">Payment Gateway</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-adaptive-heading mb-6">
                Technology <span className="text-primary">Stack</span>
              </h2>
              <p className="text-xl text-adaptive-gray">
                Chúng tôi sử dụng những công nghệ tiên tiến nhất để mang đến giải pháp tối ưu
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaLaptopCode className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-2">Frontend</h3>
                <p className="text-adaptive-gray mb-4">Modern UI/UX</p>
                <div className="text-sm text-adaptive-gray space-y-1">
                  <div>React.js / Next.js</div>
                  <div>TypeScript</div>
                  <div>Tailwind CSS</div>
                </div>
              </div>
              
              <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaCode className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-2">Backend</h3>
                <p className="text-adaptive-gray mb-4">Scalable APIs</p>
                <div className="text-sm text-adaptive-gray space-y-1">
                  <div>Node.js / Express</div>
                  <div>Python / Django</div>
                  <div>MongoDB / PostgreSQL</div>
                </div>
              </div>
              
              <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaGlobe className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-2">Cloud</h3>
                <p className="text-adaptive-gray mb-4">Infrastructure</p>
                <div className="text-sm text-adaptive-gray space-y-1">
                  <div>AWS / Azure</div>
                  <div>Docker / Kubernetes</div>
                  <div>CI/CD Pipeline</div>
                </div>
              </div>
              
              <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaMobileAlt className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-2">Mobile</h3>
                <p className="text-adaptive-gray mb-4">Cross-platform</p>
                <div className="text-sm text-adaptive-gray space-y-1">
                  <div>React Native</div>
                  <div>Zalo Mini App</div>
                  <div>Progressive Web App</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="card-elevated p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                <div className="flex items-center mb-6">
                  <FaRocket className="text-3xl text-blue-600 mr-4" />
                  <h3 className="text-3xl font-bold text-adaptive-heading">Tầm nhìn</h3>
                </div>
                <p className="text-lg text-adaptive-gray leading-relaxed">
                  Trở thành công ty công nghệ hàng đầu Việt Nam trong lĩnh vực phát triển 
                  nền tảng thương mại điện tử và giải pháp số hóa doanh nghiệp, góp phần 
                  thúc đẩy chuyển đổi số toàn diện cho nền kinh tế.
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-medium">
                  <span>Leading the Digital Future</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              <div className="card-elevated p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                <div className="flex items-center mb-6">
                  <FaBolt className="text-3xl text-emerald-600 mr-4" />
                  <h3 className="text-3xl font-bold text-adaptive-heading">Sứ mệnh</h3>
                </div>
                <p className="text-lg text-adaptive-gray leading-relaxed">
                  Kiến tạo những giải pháp công nghệ đột phá, dễ sử dụng và hiệu quả, 
                  giúp doanh nghiệp Việt Nam tăng cường năng lực cạnh tranh và phát triển 
                  bền vững trong kỷ nguyên số.
                </p>
                <div className="mt-6 flex items-center text-emerald-600 font-medium">
                  <span>Empowering Businesses</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-adaptive-heading mb-6">
                Giá trị <span className="text-primary">Cốt lõi</span>
              </h2>
              <p className="text-xl text-adaptive-gray">
                Những nguyên tắc định hướng mọi hoạt động của chúng tôi
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaBolt className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-3">Innovation</h3>
                <p className="text-adaptive-gray leading-relaxed">
                  Luôn tiên phong trong việc nghiên cứu và ứng dụng các công nghệ mới nhất
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaGlobe className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-3">Local Focus</h3>
                <p className="text-adaptive-gray leading-relaxed">
                  Hiểu sâu thị trường địa phương để tạo ra giải pháp phù hợp nhất
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaAward className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-3">Excellence</h3>
                <p className="text-adaptive-gray leading-relaxed">
                  Cam kết mang đến chất lượng và giá trị vượt trội cho đối tác
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaShieldAlt className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-adaptive-heading mb-3">Sustainability</h3>
                <p className="text-adaptive-gray leading-relaxed">
                  Xây dựng mối quan hệ bền vững và phát triển cùng cộng đồng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Achievement Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-adaptive-heading mb-6">
                Đội ngũ <span className="text-primary">Chuyên gia</span>
              </h2>
              <p className="text-xl text-adaptive-gray max-w-3xl mx-auto">
                Hơn 25 chuyên gia công nghệ giàu kinh nghiệm, đam mê sáng tạo và cam kết mang đến những giải pháp tốt nhất
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card-elevated p-8 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaCode className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-lg font-medium text-adaptive-heading mb-2">Senior Developers</div>
                <div className="text-adaptive-gray">Full-stack & Mobile Development</div>
              </div>
              
              <div className="card-elevated p-8 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaChartLine className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-lg font-medium text-adaptive-heading mb-2">Dự án thành công</div>
                <div className="text-adaptive-gray">E-commerce & Digital Solutions</div>
              </div>
              
              <div className="card-elevated p-8 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaUserFriends className="text-2xl text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-lg font-medium text-adaptive-heading mb-2">Khách hàng hài lòng</div>
                <div className="text-adaptive-gray">Across Vietnam</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="card-elevated p-8 lg:p-12 relative overflow-hidden">
              <FaQuoteLeft className="text-4xl text-blue-200 dark:text-blue-800 absolute top-6 left-6" />
              <div className="relative z-10 text-center">
                <p className="text-xl lg:text-2xl text-adaptive-gray leading-relaxed mb-6 italic">
                  &ldquo;Đội ngũ Gifty Tech không chỉ là những developer xuất sắc, mà còn là những người hiểu biết sâu sắc về business. 
                  Họ đã giúp chúng tôi số hóa toàn bộ quy trình kinh doanh một cách hiệu quả.&rdquo;
                </p>
                <div className="flex items-center justify-center">
                  <div>
                    {/* <div className="text-lg font-bold text-adaptive-heading">CEO, Thien Thai Company</div> */}
                    <div className="text-adaptive-gray">E-commerce Partner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Sẵn sàng Hợp tác?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed">
              Hãy cùng chúng tôi kiến tạo tương lai số cho doanh nghiệp của bạn. 
              Liên hệ ngay để được tư vấn miễn phí!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/dich-vu#demo" className="btn-primary bg-white text-blue-600 hover:bg-blue-50 group px-8 py-4 text-lg">
                Trở thành đối tác
              </Link>
          
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 