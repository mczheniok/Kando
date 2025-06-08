export default function ProductNavigation({refc,set,listInfoPages}) {  
    return (
      <ul ref={refc} className="flex flex-row align-center flex-wrap"
        style={{
          background: "none",
          height: "fit-content",
          padding: "0rem 0rem 1rem 0rem",
          borderBottom: "solid var(--border) 2px"
        }}
      >
        {listInfoPages.map((el,ind) => {
          return <li key={`href-list-el-${ind}`} onClick={() => set(ind)} className={`data-page-el-${ind}`} style={{fontSize: "1rem"}}><a href={el.id}>{el.title}</a></li>
        })}
      </ul>
  )
}