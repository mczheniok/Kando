require('dotenv').config();

/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  async additionalPaths(config) {
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    if (!baseUrl) {
      console.error('❌ ОШИБКА: Переменная окружения NEXT_PUBLIC_URL не задана');
      return [];
    }

    try {
      // Правильный объект options для fetch
      const fetchOptions = {
        method: "GET",
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${baseUrl}/api/items`, fetchOptions),
        fetch(`${baseUrl}/api/items/categories`, fetchOptions)
      ]);

      // Проверяем статус ответов
      if (!productsRes.ok) {
        console.error(`❌ Ошибка загрузки товаров: ${productsRes.status} ${productsRes.statusText}`);
      }
      
      if (!categoriesRes.ok) {
        console.error(`❌ Ошибка загрузки категорий: ${categoriesRes.status} ${categoriesRes.statusText}`);
      }

      const productsData = productsRes.ok ? await productsRes.json() : null;
      const categoriesData = categoriesRes.ok ? await categoriesRes.json() : null;

      const productPaths = productsData?.data?.items?.map((product) => ({
        loc: `/product/${product.id}`,
        changefreq: 'weekly',
        priority: 0.8,
      })) || [];


      const categoriesRaw = categoriesData?.data || [];

      const categoriesFlat = categoriesRaw.flat();

      const categoryPaths = categoriesFlat.map(category => ({
        loc: `/c/${category}`,
        changefreq: 'weekly',
        priority: 0.7,
      })) || [];

      return [...productPaths, ...categoryPaths];
    } catch (err) {
      console.error('❌ Ошибка при получении данных для sitemap:', err);
      return [];
    }
  },
};