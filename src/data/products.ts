import { ProductCardProps } from "@/components/ProductCard/ProductCard";

export interface ProductData extends ProductCardProps {
    description: string;
    category: string;
    sizes: number[];
}

export const allProducts: ProductData[] = [
    {
        id: "1",
        name: "Nike Air Max 90",
        slug: "nike-air-max-90",
        brand: "Nike",
        price: 14990,
        image: "/products/nike-air-max-90.jpg",
        colors: ["#ffffff", "#1a1a1a", "#c7c7c7"],
        badge: "Хит",
        description:
            "Легендарные кроссовки Nike Air Max 90, ставшие иконой стритвир-культуры. Видимая воздушная подушка Max Air обеспечивает непревзойденную амортизацию, а классический дизайн выглядит стильно в любой ситуации.",
        category: "lifestyle",
        sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    },
    {
        id: "2",
        name: "Adidas Ultraboost 23",
        slug: "adidas-ultraboost-23",
        brand: "Adidas",
        price: 18990,
        image: "/products/adidas-ultraboost.jpg",
        colors: ["#000000", "#2d4a8c"],
        badge: "Новинка",
        description:
            "Революционные беговые кроссовки с технологией Boost. Промежуточная подошва из материала BOOST возвращает энергию при каждом шаге, а верх из Primeknit обеспечивает идеальную посадку.",
        category: "running",
        sizes: [39, 40, 41, 42, 43, 44],
    },
    {
        id: "3",
        name: "Air Jordan 1 Retro High OG",
        slug: "jordan-1-retro-high",
        brand: "Jordan",
        price: 21990,
        image: "/products/jordan-1-retro.jpg",
        colors: ["#c41e3a", "#000000", "#ffffff"],
        description:
            "Легендарная модель, положившая начало баскетбольной культуре. Air Jordan 1 в расцветке Chicago — одна из самых узнаваемых и желанных пар кроссовок в истории.",
        category: "lifestyle",
        sizes: [40, 41, 42, 43, 44, 45, 46],
    },
    {
        id: "4",
        name: "New Balance 550",
        slug: "new-balance-550",
        brand: "New Balance",
        price: 15490,
        image: "/products/new-balance-550.jpg",
        colors: ["#ffffff", "#2e6b30", "#1a1a1a"],
        badge: "Sale",
        description:
            "Ретро-баскетбольные кроссовки New Balance 550, вернувшиеся в моду. Чистый дизайн из натуральной кожи и характерная подошва делают их идеальным выбором для повседневного стиля.",
        category: "lifestyle",
        sizes: [38, 39, 40, 41, 42, 43, 44],
    },
    {
        id: "5",
        name: "Nike Dunk Low Retro",
        slug: "nike-dunk-low-retro",
        brand: "Nike",
        price: 12990,
        image: "/products/nike-dunk-low.jpg",
        colors: ["#ffffff", "#8b4513"],
        description:
            "Классические Nike Dunk Low в ретро-расцветке. Изначально созданные для баскетбола, сегодня они стали неотъемлемой частью скейт и стритвир-культуры.",
        category: "lifestyle",
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    },
    {
        id: "6",
        name: "Adidas Samba OG",
        slug: "adidas-samba-og",
        brand: "Adidas",
        price: 11990,
        image: "/products/adidas-samba.jpg",
        colors: ["#ffffff", "#000000"],
        badge: "Популярное",
        description:
            "Культовые Adidas Samba OG — одна из самых продаваемых моделей в истории бренда. Созданные для футзала, ставшие иконой уличного стиля. Натуральная кожа и характерная подошва из гевеи.",
        category: "lifestyle",
        sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    },
    {
        id: "7",
        name: "Nike Air Force 1 '07",
        slug: "nike-air-force-1",
        brand: "Nike",
        price: 11490,
        image: "/products/nike-air-force-1.jpg",
        colors: ["#ffffff"],
        description:
            "Легенда Nike — Air Force 1 в классическом полностью белом исполнении. Технология Air в подошве, прочная кожа и вневременной дизайн, который остается актуальным уже более 40 лет.",
        category: "lifestyle",
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    },
    {
        id: "8",
        name: "New Balance 2002R",
        slug: "new-balance-2002r",
        brand: "New Balance",
        price: 17990,
        image: "/products/new-balance-2002r.jpg",
        colors: ["#c4c4c4", "#3d3d3d"],
        badge: "Новинка",
        description:
            "Премиальные кроссовки New Balance 2002R с системой амортизации N-ERGY. Верх из замши и сетки обеспечивает комфорт, а ретро-дизайн делает их стильным выбором на каждый день.",
        category: "running",
        sizes: [40, 41, 42, 43, 44, 45],
    },
    {
        id: "9",
        name: "Nike Air Max 97",
        slug: "nike-air-max-97",
        brand: "Nike",
        price: 16990,
        image: "/products/nike-air-max-90.jpg",
        colors: ["#c0c0c0", "#ffffff"],
        description:
            "Вдохновленные скоростными поездами, Nike Air Max 97 отличаются полноразмерной воздушной подушкой и узнаваемым волнообразным дизайном. Футуристический стиль каждый день.",
        category: "lifestyle",
        sizes: [39, 40, 41, 42, 43, 44, 45],
    },
    {
        id: "10",
        name: "Adidas Forum Low",
        slug: "adidas-forum-low",
        brand: "Adidas",
        price: 12490,
        image: "/products/adidas-samba.jpg",
        colors: ["#ffffff", "#1e40af"],
        description:
            "Ретро-баскетбольные кроссовки Adidas Forum Low. Характерный ремешок и чистый кожаный верх делают их элегантным выбором для уличного стиля.",
        category: "lifestyle",
        sizes: [38, 39, 40, 41, 42, 43, 44],
    },
    {
        id: "11",
        name: "Jordan 4 Retro",
        slug: "jordan-4-retro",
        brand: "Jordan",
        price: 24990,
        image: "/products/jordan-1-retro.jpg",
        colors: ["#000000", "#808080", "#ffffff"],
        badge: "Лимитированная серия",
        description:
            "Air Jordan 4 — модель, которую Майкл Джордан носил в сезоне 1988/89. Технология видимого Air в пятке и характерные крылья делают эти кроссовки узнаваемыми мгновенно.",
        category: "lifestyle",
        sizes: [40, 41, 42, 43, 44, 45],
    },
    {
        id: "12",
        name: "New Balance 574",
        slug: "new-balance-574",
        brand: "New Balance",
        price: 10990,
        image: "/products/new-balance-550.jpg",
        colors: ["#4a6741", "#1a1a1a", "#696969"],
        description:
            "Классические New Balance 574 — одна из самых узнаваемых моделей бренда. Комбинация замши и текстиля с амортизирующей подошвой ENCAP для комфорта весь день.",
        category: "lifestyle",
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    },
];

export const featuredProducts = allProducts.slice(0, 8);

export const brands = [
    { name: "Nike", slug: "nike" },
    { name: "Adidas", slug: "adidas" },
    { name: "Jordan", slug: "jordan" },
    { name: "New Balance", slug: "new-balance" },
    { name: "Puma", slug: "puma" },
    { name: "Reebok", slug: "reebok" },
];

export const categories = [
    { name: "Все", slug: "" },
    { name: "Лайфстайл", slug: "lifestyle" },
    { name: "Бег", slug: "running" },
];

export function getProductBySlug(slug: string): ProductData | undefined {
    return allProducts.find((p) => p.slug === slug);
}

export function filterProducts(params: {
    brand?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    search?: string;
}): ProductData[] {
    let filtered = [...allProducts];

    if (params.brand) {
        filtered = filtered.filter(
            (p) => p.brand.toLowerCase() === params.brand!.toLowerCase()
        );
    }

    if (params.category) {
        filtered = filtered.filter((p) => p.category === params.category);
    }

    if (params.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= params.minPrice!);
    }

    if (params.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= params.maxPrice!);
    }

    if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q)
        );
    }

    if (params.sort) {
        switch (params.sort) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "newest":
            default:
                break;
        }
    }

    return filtered;
}
