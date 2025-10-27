export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categorySlug: string;
  inStock: boolean;
  rating?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Nước lau sàn Polar Bear hương hoa Lily 1,5kg',
    slug: 'nuoc-lau-san-polar-bear-huong-hoa-lily',
    description: 'Nước lau sàn Polar Bear hương lily là sự kết hợp hoàn hảo giữa công thức tiên tiến với hương hoa lily nhẹ nhàng, dễ chịu. Đem lại khả năng làm sạch một cách mạnh mẽ và nhanh chóng, tẩy sạch mọi vết bẩn, vết ố vàng, khử mùi hôi khó chịu, làm sạch các vết bẩn và bụi bám trong mọi ngóc ngách… Chất hoạt động bề mặt tiên tiến giúp tách vết dơ ra khỏi sàn nhà ngay khi vừa tiếp xúc, đồng thời hoạt chất tẩy rửa sẽ diệt khuẩn, hạn chế bám bụi trở lại, giúp việc lau dọn nhà cửa trở nên nhanh chóng và nhẹ nhàng hơn.',
    price: 60000,
    originalPrice: 100000,
    image: '/products/nuoc-lau-san-polar-bear-huong-hoa-lily.png',
    category: 'Chất tẩy rửa, hóa mỹ phẩm',
    categorySlug: 'chat-tay-rua-hoa-my-pham',
    inStock: true,
    rating: 4.7
  },
  {
    id: '2',
    name: 'Nước xả mềm vải Polar Bear 2,9 Kg ',
    slug: 'nuoc-xam-mem-vai-polar-bear-29-kg',
    description: 'Nước xả làm mềm vải Polar Bear hoàn thiện việc giặt quần áo, giúp xả sạch bọt trên quần áo, vải vóc, không còn cảm giác nhờn dính khó chịu. Sản phẩm thấm sâu vào từng sợi vải giúp sợi vải mềm mại, bông xốp như quần áo mới. ',
    price: 136000,
    originalPrice: 160000,
    image: '/products/nuoc-xam-mem-vai-polar-bear-29-kg.png',
    category: 'Chất tẩy rửa, hóa mỹ phẩm',
    categorySlug: 'chat-tay-rua-hoa-my-pham',
    inStock: true,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Nước rửa chén đậm đặc Polar Bear 750g',
    slug: 'nuoc-rua-chen-dam-dac-polar-bear-750g',
    description: 'Nước rửa chén đậm đặc Polar Bear với chiết xuất tinh chất bưởi là trợ thủ đắc lực của căn bếp giúp làm sạch chén đũa chỉ lần lau, được yêu thích nhờ tính thân thiện với môi trường.',
    price: 30000,
    originalPrice: undefined,
    image: '/products/nuoc-rua-chen-dam-dac-polar-bear-750g.png',
    category: 'Chất tẩy rửa, hóa mỹ phẩm',
    categorySlug: 'chat-tay-rua-hoa-my-pham',
    inStock: true,
    rating: 4.6
  },
  {
    id: '4',
    name: 'Nước giặt cao cấp Caremore hương nước hoa 3,8 kg',
    slug: 'nuoc-giat-cao-cap-caremore-huong-nuoc-hoa-38-kg',
    description: 'Nước giặt cao cấp Caremore với hương thơm nước hoa giúp làm sạch quần áo hiệu quả, lưu hương thơm lâu',
    price: 173000,
    originalPrice: 200000,
    image: '/products/nuoc-giat-caremore-huong-nuoc-hoa-38-kg.png',
    category: 'Chất tẩy rửa, hóa mỹ phẩm',
    categorySlug: 'chat-tay-rua-hoa-my-pham',
    inStock: true,
    rating: 4.8
  },
  {
    id: '5',
    name: 'Nước rửa chén Haso hương lô hội chai 750gr',
    slug: 'nuoc-rua-chen-haso-huong-lo-hoi-chai-750gr',
    description: 'Thành phần: Water, Sodium Linear Alkylbenzene Sulfonate, Sodium Lauryl Ether Sulfate, Sodium Hydroxide, Magnesium Sulfate, Decyl Glucoside, chiết xuất Chanh thiên nhiên (10ppm), CI 42090, các chất phụ gia khác.',
    price: 27000,
    originalPrice: undefined,
    image: '/products/nuoc-rua-chen-haso-huong-lo-hoi-chai-750gr.png',
    category: 'Chất tẩy rửa, hóa mỹ phẩm',
    categorySlug: 'chat-tay-rua-hoa-my-pham',
    inStock: true,
    rating: 4.5
  },
  {
    id: '6',
    name: 'Giấy vệ sinh cao cấp Kimi siêu dai 10 cuộn 3 lớp 1,1kg',
    slug: 'giay-ve-sinh-cao-cap-kimi-sieu-dai-10-cuon-3-lop-11kg',
    description: 'Giấy vệ sinh cao cấp Kimi siêu dai 10 cuộn 3 lớp 1,1kg',
    price: 69000,
    originalPrice: undefined,
    image: '/products/giay-ve-sinh-cao-cap-kimi-sieu-dai-10-cuon-3-lop-11kg.jpg',
    category: 'Khăn, giấy',
    categorySlug: 'khang-giay',
    inStock: true
  },
  {
    id: '7',
    name: 'Khăn ướt TapTap không mùi 100 tờ',
    slug: 'khang-uot-taptap-khong-mui-100-to',
    description: 'Khăn ướt TapTap không mùi 100 tờ',
    price: 145000,
    originalPrice: undefined,
    image: '/products/khang-uot-taptap-khong-mui-100-to.jpg',
    category: 'Khăn, giấy',
    categorySlug: 'khang-giay',
    inStock: true
  },
  {
    id: '8',
    name: 'Xịt tẩy đa năng Kliin (BTCOM) 650ml',
    slug: 'xit-tay-da-nang-kliin-btcom-650ml',
    description: 'Với công thức thế hệ mới cùng tinh chất cam giúp tẩy sạch vết dầu mỡ, vết bẩn đóng rắn và hỗ trợ diệt khuẩn, ngăn côn trùng.',
    price: 39000,
    originalPrice: undefined,
    image: '/products/xit-tay-da-nang-kliin-btcom-650ml.png',
    category: 'Chất tẩy rửa, hóa mỹ phẩm',
    categorySlug: 'chat-tay-rua-hoa-my-pham',
    inStock: true
  },
  {
    id: '9',
    name: 'Bàn chải đánh răng VISMOR kim cương - cán dạng trong, mềm, siêu mảnh',
    slug: 'ban-chai-danh-rang-vismor-kim-cuong-can-dang-trong-mem-sieu-manh',
    description: 'Bàn chải đánh răng VISMOR kim cương - cán dạng trong, mềm, siêu mảnh',
    price: 13000,
    originalPrice: undefined,
    image: '/products/ban-chai-danh-rang-vismor-kim-cuong-can-dang-trong-mem-sieu-manh.png',
    category: 'Chăm sóc cá nhân',
    categorySlug: 'cham-soc-ca-nhan',
    inStock: true
  },
  {
    id: '10',
    name: 'Sữa tắm nước hoa Grasse 620ml',
    slug: 'sua-tam-nuoc-hoa-grasse-620ml',
    description: 'Sữa tắm nước hoa Grasse 620ml',
    price: 120000,
    originalPrice: 150000,
    image: '/products/sua-tam-nuoc-hoa-grasse-620ml.png',
    category: 'Chăm sóc cá nhân',
    categorySlug: 'cham-soc-ca-nhan',
    inStock: true
  },
  {
    id: '11',
    name: 'BVS Aiwina (Hương trà) Siêu mỏng cánh 07 Ngày 24 - 8x48',
    slug: 'bvs-aiwina-huong-tra-sieu-mong-cach-07-ngay-24-8x48',
    description: 'BVS Aiwina (Hương trà) Siêu mỏng cánh 07 Ngày 24 - 8x48',
    price: 20000,
    originalPrice: 35000,
    image: '/products/bvs-aiwina-huong-tra-sieu-mong-cach-07-ngay-24-8x48.png',
    category: 'Chăm sóc cá nhân',
    categorySlug: 'cham-soc-ca-nhan',
    inStock: true
  },
  {
    id: '12',
    name: 'Dâù gội DL Thái Dương 3',
    slug: 'dau-goi-dl-thai-duong-3',
    description: 'Dâù gội DL Thái Dương 3',
    price: 60000,
    originalPrice: 95000,
    image: '/products/dau-goi-dl-thai-duong-3.png',
    category: 'Chăm sóc cá nhân',
    categorySlug: 'cham-soc-ca-nhan',
    inStock: true
  },
  {
    id: '13',
    name: 'Dầu Địa Liền',
    slug: 'dau-dia-lien',
    description: 'THÀNH PHẦN: chưng cất từ các dược liệu: Tinh dầu địa liền 4 ml, ngải cứu, bạc hà, đại hoàng, bạch thược, xuyên tiêu, đinh hương, hồng hoa, bạch hoa xà thiệt thảo, tam thất, khương hoàng, EThanol 32% vừa đủ 120 ml.',
    price: 130000,
    originalPrice: 160000,
    image: '/products/dau-dia-lien.png',
    category: 'Chăm sóc cá nhân',
    categorySlug: 'cham-soc-ca-nhan',
    inStock: true
  },
  {
    id: '14',
    name: 'Sữa tắm gội Deko 1.2 Lít',
    slug: 'sua-tam-goi-deko-12-lit',
    description: 'Sữa tắm gội Deko 1.2 Lít',
    price: 149000,
    originalPrice: 180000,
    image: '/products/sua-tam-goi-deko-12-lit.png',
    category: 'Chăm sóc cá nhân',
    categorySlug: 'cham-soc-ca-nhan',
    inStock: true
  },
  // Trung tâm anh ngữ products
  {
    id: '15',
    name: 'Khóa học TOEIC Intensive',
    slug: 'khoa-hoc-toeic-intensive',
    description: 'Khóa học TOEIC Intensive với giáo viên bản ngữ, cam kết đầu ra 600+ điểm',
    price: 5000000,
    originalPrice: 6000000,
    image: '/products/book.jpg',
    category: 'Trung tâm anh ngữ',
    categorySlug: 'trung-tam-anh-ngu',
    inStock: true,
    rating: 4.8
  },
  {
    id: '16',
    name: 'Khóa học IELTS Speaking',
    slug: 'khoa-hoc-ielts-speaking',
    description: 'Khóa học IELTS Speaking chuyên sâu với giáo viên có chứng chỉ IELTS 8.0+',
    price: 3000000,
    originalPrice: 3500000,
    image: '/products/book.jpg',
    category: 'Trung tâm anh ngữ',
    categorySlug: 'trung-tam-anh-ngu',
    inStock: true,
    rating: 4.9
  },
  // Hoa tươi products
  {
    id: '17',
    name: 'Bó hoa hồng đỏ 12 bông',
    slug: 'bo-hoa-hong-do-12-bong',
    description: 'Bó hoa hồng đỏ tươi 12 bông, kèm thiệp chúc mừng',
    price: 350000,
    originalPrice: 400000,
    image: '/products/book.jpg',
    category: 'Hoa tươi',
    categorySlug: 'hoa-tuoi',
    inStock: true,
    rating: 4.7
  },
  {
    id: '18',
    name: 'Giỏ hoa sinh nhật',
    slug: 'gio-hoa-sinh-nhat',
    description: 'Giỏ hoa sinh nhật với hoa hồng, baby và hoa phụ kiện',
    price: 800000,
    originalPrice: 900000,
    image: '/products/book.jpg',
    category: 'Hoa tươi',
    categorySlug: 'hoa-tuoi',
    inStock: true,
    rating: 4.6
  },
  // Thời trang products
  {
    id: '19',
    name: 'Áo sơ mi nam công sở',
    slug: 'ao-so-mi-nam-cong-so',
    description: 'Áo sơ mi nam công sở, chất liệu cotton cao cấp, form dáng chuẩn',
    price: 450000,
    originalPrice: 550000,
    image: '/products/book.jpg',
    category: 'Thời trang',
    categorySlug: 'thoi-trang',
    inStock: true,
    rating: 4.5
  },
  {
    id: '20',
    name: 'Đầm công sở nữ',
    slug: 'dam-cong-so-nu',
    description: 'Đầm công sở nữ, thiết kế thanh lịch, phù hợp môi trường văn phòng',
    price: 650000,
    originalPrice: 750000,
    image: '/products/book.jpg',
    category: 'Thời trang',
    categorySlug: 'thoi-trang',
    inStock: true,
    rating: 4.8
  },
  // Studio chụp ảnh products
  {
    id: '21',
    name: 'Gói chụp ảnh chân dung',
    slug: 'goi-chup-anh-chan-dung',
    description: 'Gói chụp ảnh chân dung chuyên nghiệp, bao gồm 50 ảnh chỉnh sửa',
    price: 1500000,
    originalPrice: 1800000,
    image: '/products/book.jpg',
    category: 'Studio chụp ảnh',
    categorySlug: 'studio-chup-anh',
    inStock: true,
    rating: 4.9
  },
  {
    id: '22',
    name: 'Gói chụp ảnh cưới',
    slug: 'goi-chup-anh-cuoi',
    description: 'Gói chụp ảnh cưới trọn gói, bao gồm ảnh ngoại cảnh và trong nhà',
    price: 5000000,
    originalPrice: 6000000,
    image: '/products/book.jpg',
    category: 'Studio chụp ảnh',
    categorySlug: 'studio-chup-anh',
    inStock: true,
    rating: 5.0
  },
  // Gara/showroom products
  {
    id: '23',
    name: 'Dịch vụ bảo dưỡng xe máy',
    slug: 'dich-vu-bao-duong-xe-may',
    description: 'Dịch vụ bảo dưỡng xe máy định kỳ, thay dầu, lọc gió, kiểm tra phanh',
    price: 200000,
    originalPrice: 250000,
    image: '/products/book.jpg',
    category: 'Gara/showroom',
    categorySlug: 'gara-showroom',
    inStock: true,
    rating: 4.6
  },
  {
    id: '24',
    name: 'Dịch vụ sửa chữa động cơ',
    slug: 'dich-vu-sua-chua-dong-co',
    description: 'Dịch vụ sửa chữa động cơ xe máy chuyên nghiệp, bảo hành 6 tháng',
    price: 800000,
    originalPrice: 1000000,
    image: '/products/book.jpg',
    category: 'Gara/showroom',
    categorySlug: 'gara-showroom',
    inStock: true,
    rating: 4.7
  }
];
