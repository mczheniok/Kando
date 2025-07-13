"use client";

import { useSearchParams } from "next/navigation";
import styles from "./products.module.css";
import { Card } from "../Cards/Card";
import { Pagination } from "@/shared/blocks/pagination"; // Исправлен путь импорта

export default function GridProductsList({ 
    list = [], 
    withPagination = true,
    itemsPerPage = 12,
    totalCount = 0,
    filter = {
      course: "UAH"
    }
  }) 
  {
  
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  const displayedItems = list;

  const course = searchParams.get("currency") || "UAH";
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '1rem 0rem'
    }}>

      <section className={styles.GridProductsList}>
        {displayedItems.map((el, ind) => {  
          return (
            <Card 
              course={course}
              key={`card-${currentPage}-${ind}`}
              type="grid" 
              obj={el} 
              priority={ind < 4}
            />
          )
        })}
      </section>

      {totalPages > 1 && withPagination && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
        />
      )}

    </div>
  );
}