// ========== Улучшенный компонент списка товаров ==========
"use client";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./products.module.css";
import { Card } from "../Cards/Card";
import { Button } from "../../shared/Buttons/Buttons";
import { Pagination } from "@/shared/blocks/pagination";

export default function GridProductsList({ 
  list = [], 
  itemsPerPage = 12,
  showLoadMore = true,
  baseUrl = '',
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [items,setItems] = useState(list);
  const [loading, setLoading] = useState(false);
  const [loadMoreMode, setLoadMoreMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  // Вычисляем пагинацию
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    
    return {
      totalPages,
      currentItems,
      hasMore: endIndex < items.length,
      totalItems: items.length
    };
  }, [items, currentPage, itemsPerPage]);

  // Для режима "Load More"
  const handleLoadMore = async () => {
    setLoading(true);
    setVisibleCount(prev => Math.min(prev + itemsPerPage, items.length));
    


    setLoadMoreMode(true);
    setLoading(false);
  };

  // Обработчик изменения страницы
  const handlePageChange = (page) => {
    setLoadMoreMode(false); 
    setVisibleCount(itemsPerPage);

  };

  // Определяем какие товары показывать
  const displayItems = loadMoreMode ? items.slice(0, visibleCount) : pagination.currentItems;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '1rem 0rem'
    }}>

      <div className={styles.GridProductsList}>
        {displayItems.map((el, ind) => {  
          return (
            <Card 
              key={`card-${currentPage}-${ind}`}
              type="grid" 
              obj={el} 
              priority={ind < 4}
            />
          )
        })}
      </div>

      {/* Загрузить еще (только если не в режиме пагинации) */}
      {!loadMoreMode && showLoadMore && pagination.hasMore && (
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button 
            title={loading ? "Загрузка..." : `Показати ще ${Math.min(itemsPerPage, items.length - visibleCount)}`}
            click={handleLoadMore} 
            clName="justify-center"
          />
        </div>
      )}

      {/* Информация о загруженных товарах в режиме Load More */}
      {loadMoreMode && (
        <div style={{
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <p>Показано {visibleCount} из {items.length} товаров</p>
          <button
            onClick={() => {
              setLoadMoreMode(false);
              setVisibleCount(itemsPerPage);
              router.push(`${baseUrl}?page=${currentPage}`);
            }}
            style={{
              marginTop: '8px',
              color: 'var(--orange, #ff6b35)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'none';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
          >
            Перейти к пагинации
          </button>
        </div>
      )}

      {/* Пагинация (только если не в режиме Load More) */}
      {!loadMoreMode && pagination.totalPages > 1 && (
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          baseUrl={baseUrl}
          totalItems={pagination.totalItems}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          showNavigation={true}
        />
      )}

      {/* Сообщение о том, что все товары показаны */}
      {!pagination.hasMore && !loadMoreMode && items.length > itemsPerPage && (
        <div style={{
          textAlign: 'center',
          color: '#6b7280',
          padding: '16px 0'
        }}>
          Показані всі оголошення ({items.length})
        </div>
      )}
    </div>
  );
}