"use client";
import { useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./blocks.module.css";

function PageButton({ pageNumber, isActive, onClick, disabled = false }) {
  return (
    <button
      onClick={() => !disabled && onClick(pageNumber)}
      disabled={disabled}
      className={styles.PaginationPages}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '40px',
        height: '40px',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? 'var(--orange, #ff6b35)' : '#ffffff',
        color: isActive ? '#ffffff' : '#374151',
        border: isActive ? '2px solid var(--orange, #ff6b35)' : '2px solid #d1d5db',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? '0.5' : '1'
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive) {
          e.target.style.backgroundColor = '#f9fafb';
          e.target.style.borderColor = 'var(--orange, #ff6b35)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive) {
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.borderColor = '#d1d5db';
        }
      }}
      aria-label={`Перейти на страницу ${pageNumber}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {pageNumber}
    </button>
  );
}

function NavigationButton({ direction, onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '40px',
        height: '40px',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
        color: disabled ? '#9ca3af' : '#374151',
        border: disabled ? 'none' : '2px solid #d1d5db',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = '#f9fafb';
          e.target.style.borderColor = 'var(--orange, #ff6b35)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.borderColor = '#d1d5db';
        }
      }}
      aria-label={direction === 'prev' ? 'Предыдущая страница' : 'Следующая страница'}
    >
      {children}
    </button>
  );
}

export function Pagination({ 
  totalPages, 
  currentPage, 
  onPageChange, 
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

    // Обновляем URL для SEO
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const newUrl = `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
    
    // Вызываем callback
    onPageChange(page);
  };

  // Информация о текущих элементах
  const currentItemsInfo = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  }, [currentPage, itemsPerPage, totalItems]);

  if (totalPages <= 1) return null;

  return (
    <nav 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
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
            color: '#6b7280'
          }}
          aria-live="polite"
        >
          Показано {currentItemsInfo.start}-{currentItemsInfo.end} из {totalItems} элементов
        </div>
      )}

      {/* Пагинация */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
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
          <div key={index}>
            {page === '...' ? (
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '40px',
                height: '40px',
                color: '#9ca3af'
              }}>
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

      {/* Быстрый переход (для больших списков) */}
      {totalPages > 10 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px'
        }}>
          <span style={{ color: '#6b7280' }}>Перейти к странице:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                handlePageChange(page);
              }
            }}
            style={{
              width: '64px',
              padding: '4px 8px',
              textAlign: 'center',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--orange, #ff6b35)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
            }}
            aria-label="Номер страницы"
          />
          <span style={{ color: '#6b7280' }}>из {totalPages}</span>
        </div>
      )}
    </nav>
  );
}