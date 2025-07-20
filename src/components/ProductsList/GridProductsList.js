import styles from "./products.module.css";
import { Card } from "@/shared/Cards/card";
import { Pagination } from "@/shared/blocks/pagination"; // Исправлен путь импорта
import { Suspense } from "react";

export default function GridProductsList({ 
    list = [], 
    withPagination = true,
    itemsPerPage = 12,
    totalCount = 0,
    currentPage = 1,
    course = "UAH"
  }) 
  {
  
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '1rem 0rem'
    }}>

      <section className={styles.GridProductsList}>
        {list.map((el, ind) => {  
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
        <Suspense fallback={<div style={{minHeight: "100px",width: "100%"}}>Загрузка...</div>}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>  
      )}

    </div>
  );
}