import HeroBanner from "@/components/home/HeroBanner";
import CategoryList from "@/components/home/CategoryList";
import ProductGrid from "@/components/products/ProductGrid";
import FlashSale from "@/components/home/FlashSale";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const newProducts = products.slice(0, 10);
  const flashSaleProducts = products.filter(product => product.originalPrice).slice(0, 8);
  const topRatedProducts = products
    .filter(product => product.rating && product.rating >= 4.5)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-adaptive-light">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category List */}
      <CategoryList />

      {/* Flash Sale */}
      <FlashSale products={flashSaleProducts} />

      {/* Top Deals */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 overflow-hidden">
          {/* Hot Deal Banner */}
          <div className="gradient-primary text-white py-4 px-6 rounded-t-xl flex justify-between items-center relative overflow-hidden shadow-adaptive">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-10 top-0 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-400 blur-xl"></div>
              <div className="absolute right-20 bottom-0 w-60 h-60 rounded-full bg-blue-400 dark:bg-blue-300 blur-xl"></div>
            </div>

            <div className="flex items-center space-x-3 z-10">
              <Image
                src="/images/starfish.svg"
                alt="Starfish"
                width={40}
                height={40}
                className="animate-pulse"
              />
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">HOT DEAL ONLY 12-19/6</h2>
            </div>

            <Link href="/products/deals" className="bg-white text-blue-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-blue-400 dark:hover:bg-neutral-700 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center z-10">
              Xem thêm <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="card p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {flashSaleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="relative gradient-accent rounded-xl overflow-hidden hover:shadow-md transition-all group p-3"
                >
                  {/* Discount badge */}
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
                    -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                  </div>

                  <div className="h-36 flex items-center justify-center mb-2 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-2">
                    <h3 className="text-xs font-medium text-adaptive-heading line-clamp-2 min-h-[32px] group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex items-baseline mt-2">
                      <span className="text-red-600 font-semibold text-sm">
                        {new Intl.NumberFormat('vi-VN').format(product.price)} ₫
                      </span>
                      <span className="ml-2 text-xs text-adaptive-price line-through">
                        {new Intl.NumberFormat('vi-VN').format(product.originalPrice!)} ₫
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Rated Products */}
      <div className="container mx-auto px-4 pb-8">
        <div className="card-elevated overflow-hidden mb-10">
          <div className="gradient-secondary text-white py-3 px-6 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <FaStar className="mr-2" /> Sản phẩm nổi bật
            </h2>
            <Link href="/products/top-rated" className="text-white hover:text-neutral-200 text-sm hover:underline flex items-center">
              Xem tất cả <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRatedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group">
                  <div className="border-adaptive rounded-lg overflow-hidden hover:shadow-md transition-shadow card group-hover:border-emerald-200 dark:group-hover:border-emerald-700">
                    <div className="h-48 relative gradient-accent p-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white flex items-center px-2 py-1 rounded text-xs font-bold">
                        <FaStar className="mr-1 text-emerald-200" /> {product.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-adaptive-heading mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {new Intl.NumberFormat('vi-VN').format(product.price)} ₫
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Products */}
      <div className="container mx-auto px-4 pb-12">
        <ProductGrid
          products={newProducts}
          title="Sản phẩm mới"
          viewAllLink="/products"
          titleClass="text-xl font-bold text-adaptive-heading mb-6 flex items-center before:content-[''] before:inline-block before:w-4 before:h-8 before:bg-blue-500 before:mr-3 before:rounded"
        />
      </div>
      {/* CTA Section */}
      <div className="gradient-primary text-white rounded-lg p-10 text-center shadow-adaptive mx-4 mb-8">
        <div className="p-8 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Bạn muốn hợp tác cùng chúng tôi</h2>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto text-justify">
            Dù bạn là doanh nghiệp muốn số hóa hoạt động kinh doanh hay cộng tác viên muốn gia tăng thu nhập,
            chúng tôi luôn sẵn sàng kết nối và hợp tác.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/sell" className="bg-white text-blue-600 hover:bg-neutral-100 dark:bg-white dark:text-blue-400 dark:hover:bg-grey-500 px-6 py-3 rounded-md font-medium transition duration-300 hover:-translate-y-1">
              Trở thành đối tác
            </a>
            <a href="/collaborator" className="bg-blue-700 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-500 px-6 py-3 rounded-md font-medium transition duration-300 border border-white/30">
              Tham gia CTV
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
