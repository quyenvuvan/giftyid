"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { FiTrash2, FiArrowLeft, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, subtotal } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Check if cart is empty using actual cart data
  const cartIsEmpty = totalItems === 0;
  
  // Fixed shipping cost in VND
  const shippingCost = 30000; 
  const total = subtotal + shippingCost;
  
  const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(subtotal);
  const formattedShipping = new Intl.NumberFormat('vi-VN').format(shippingCost);
  const formattedTotal = new Intl.NumberFormat('vi-VN').format(total);

  // Close popup and redirect
  const handleConfirmRedirect = () => {
    setShowPopup(false);
    setIsRedirecting(true);
    
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "https://zalo.me/s/4587093583111512573";
      clearCart();
    }, 500);
  };

  const handleCheckout = () => {
    setShowPopup(true);
  };

  // Close popup when pressing Escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPopup) {
        setShowPopup(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [showPopup]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Custom Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-[fadeIn_0.3s_ease-in-out]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Xác nhận chuyển hướng</h2>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">Bạn sẽ được chuyển sang Zalo Mini App để hoàn tất đặt hàng</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Tổng thanh toán: <span className="font-semibold text-red-600">{formattedTotal}₫</span></p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors sm:flex-1"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmRedirect}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors sm:flex-1"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center mb-6">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400 dark:text-white">/</span>
        <span className="text-sm text-gray-900 dark:text-white">Giỏ hàng</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-8 text-center dark:text-black">Giỏ hàng của bạn</h1>

        {cartIsEmpty ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 rounded-full p-6 mb-6">
              <FaShoppingCart className="text-5xl text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Giỏ hàng của bạn đang trống!</h2>
            <p className="text-gray-500 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiến hành đặt hàng</p>
            <Link
              href="/products"
              className="bg-blue-700 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-800 transition duration-200"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart items */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đơn giá
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thành tiền
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => {
                    const itemTotal = item.product.price * item.quantity;
                    const formattedPrice = new Intl.NumberFormat('vi-VN').format(item.product.price);
                    const formattedItemTotal = new Intl.NumberFormat('vi-VN').format(itemTotal);
                    
                    return (
                      <tr key={item.product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 relative flex-shrink-0 mr-4">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover rounded"
                                sizes="64px"
                              />
                            </div>
                            <div>
                              <Link 
                                href={`/products/${item.product.slug}`}
                                className="text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-black"
                              >
                                {item.product.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formattedPrice} ₫
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border border-gray-300 rounded w-24">
                            <button 
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <span className="px-2 py-1 flex-1 text-center dark:text-black">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formattedItemTotal} ₫
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between mt-6 pt-6 border-t">
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 flex items-center"
              >
                <FiTrash2 className="mr-1" /> Xóa giỏ hàng
              </button>
              <Link
                href="/products"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FiArrowLeft className="mr-1" /> Tiếp tục mua sắm
              </Link>
            </div>
            
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 dark:text-black">Tóm tắt đơn hàng</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tổng tiền sản phẩm</span>
                  <span className="dark:text-black">{formattedSubtotal} ₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="dark:text-black">{formattedShipping} ₫</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t">
                  <span className="dark:text-black">Tổng thanh toán</span>
                  <span className="text-red-600">{formattedTotal} ₫</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isRedirecting}
                className={`w-full mt-6 py-3 rounded-md text-white font-semibold ${
                  isRedirecting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRedirecting ? 'Đang chuyển hướng...' : 'Thanh toán'}
              </button>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>Bằng việc tiến hành đặt hàng, bạn đồng ý với điều khoản dịch vụ và chính sách bảo mật của chúng tôi.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 