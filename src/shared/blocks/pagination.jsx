"use client";
import { useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./blocks.module.css";
import { Button } from "../Buttons/Buttons";

function PageButton({ pageNumber, isActive, onClick, disabled = false }) {
  return (
    <Button 
      ariaLabel={`Перейти на сторінку ${pageNumber}`}
      click={() => !disabled && onClick(pageNumber)}
      disabled={disabled}
      style={isActive?"active":""}
      clName={styles.PaginationPadding}
    >
      {pageNumber}
    </Button>
  );
}

function NavigationButton({ direction, onClick, disabled, children }) {
  return (
    <Button 
      clName={styles.PaginationButton} 
      disabled={disabled} 
      click={onClick}
    >
      {children}
    </Button>
  );
}

export function Pagination({ 
  totalPages, 
  currentPage, 
  maxVisiblePages = 5,
  showNavigation = true,
  showInfo = true,
  baseUrl = '',
  totalItems = 0,
  itemsPerPage = 12
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef(null);

  // Добавляем отладочную информацию
  console.log('Pagination props:', {
    totalPages,
    currentPage,
    totalItems,
    itemsPerPage,
    baseUrl
  });

  // Вычисляем видимые страницы
  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    
    // Добавляем первую страницу если нужно
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }
    
    // Добавляем видимые страницы
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Добавляем последнюю страницу если нужно
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  // Обработчик изменения страницы с обновлением URL
  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;

    // Получаем текущий путь без параметров
    const currentPath = window.location.pathname;
    
    // Обновляем URL для SEO
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    
    // Формируем новый URL используя текущий путь
    const newUrl = queryString ? `${currentPath}?${queryString}` : currentPath;
    router.push(newUrl);
  };

  // Информация о текущих элементах
  const currentItemsInfo = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  }, [currentPage, itemsPerPage, totalItems]);

  // Не показываем пагинацию если страница одна или меньше
  if (totalPages <= 1) return null;

  return (
    <nav 
      className="flex flex-col items-center"
      style={{
        padding: '24px 0'
      }}
      aria-label="Навигация по страницам"
      ref={containerRef}
    >
      {/* Информация о текущих элементах */}
      {showInfo && totalItems > 0 && (
        <div 
          style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}
          aria-live="polite"
        >
          Показано {currentItemsInfo.start}-{currentItemsInfo.end} з {totalItems} элементов
        </div>
      )}

      {/* Пагинация */}
      <div 
        className="flex flex-row justify-center items-center flex-wrap" 
        style={{width: "100%", gap: ".5rem"}}
      >
        {/* Кнопка "Назад" */}
        {showNavigation && (
          <NavigationButton
            direction="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Назад
          </NavigationButton>
        )}

        {/* Страницы */}
        {visiblePages.map((page, index) => (
          <div key={`page-${index}`}>
            {page === '...' ? (
              <span 
                className="flex items-center justify-center"
                style={{
                  minWidth: '40px',
                  height: '40px',
                  color: '#9ca3af'
                }}
              >
                ...
              </span>
            ) : (
              <PageButton
                pageNumber={page}
                isActive={page === currentPage}
                onClick={handlePageChange}
              />
            )}
          </div>
        ))}

        {/* Кнопка "Вперед" */}
        {showNavigation && (
          <NavigationButton
            direction="next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед →
          </NavigationButton>
        )}
      </div>
    </nav>
  );
}