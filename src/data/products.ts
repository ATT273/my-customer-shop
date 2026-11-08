export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

// Mock data until a real API is wired up.
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Áo thun basic',
    price: 199000,
    description: 'Áo thun cotton 100%, form regular, thoáng mát và dễ phối đồ hằng ngày.',
  },
  {
    id: '2',
    name: 'Quần jean slim fit',
    price: 459000,
    description: 'Quần jean co giãn nhẹ, dáng slim fit ôm vừa vặn, màu xanh wash cổ điển.',
  },
  {
    id: '3',
    name: 'Giày sneaker trắng',
    price: 890000,
    description: 'Sneaker da tổng hợp màu trắng, đế cao su êm, phù hợp đi học và đi chơi.',
  },
  {
    id: '4',
    name: 'Balo laptop',
    price: 549000,
    description: 'Balo chống nước, ngăn laptop chống sốc vừa máy 15.6 inch, nhiều ngăn tiện dụng.',
  },
  {
    id: '5',
    name: 'Đồng hồ dây da',
    price: 1290000,
    description: 'Đồng hồ máy quartz, mặt kính khoáng, dây da bò thật, chống nước 3ATM.',
  },
  {
    id: '6',
    name: 'Kính mát thời trang',
    price: 320000,
    description: 'Tròng kính chống tia UV400, gọng nhựa nhẹ, kèm hộp và khăn lau.',
  },
  {
    id: '7',
    name: 'Mũ lưỡi trai',
    price: 150000,
    description: 'Mũ kaki thêu logo, khóa điều chỉnh phía sau, hợp với nhiều kiểu trang phục.',
  },
  {
    id: '8',
    name: 'Tai nghe bluetooth',
    price: 690000,
    description: 'Tai nghe true wireless, Bluetooth 5.3, pin 6 giờ, hộp sạc thêm 24 giờ.',
  },
  {
    id: '9',
    name: 'Bình giữ nhiệt',
    price: 245000,
    description: 'Bình inox 304 dung tích 500ml, giữ nóng 12 giờ và giữ lạnh 24 giờ.',
  },
  {
    id: '10',
    name: 'Ví da nam',
    price: 380000,
    description: 'Ví da bò dáng ngang, nhiều ngăn đựng thẻ, đường may chắc chắn.',
  },
].map((p) => ({ ...p, image: `https://picsum.photos/seed/myshop-${p.id}/400/400` }));

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(price: number) {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
}
