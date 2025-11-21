import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Pagination from "../../components/Pagination/Pagination";
import PopularProperties from "../../components/PopularProperties/PopularProperties";
import Footer from "../../components/Footer/Footer";

import API from "../../api/axios"; 
import localProperties from "../../data/properties"; 

import "./Properties.css";

export default function Properties() {

  const [query, setQuery] = useState({
    sort: "default",
  });

  const [items, setItems] = useState([]);  
  const [total, setTotal] = useState(0);


  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 9;


  const fetchProperties = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.get("/properties", {
        params: {
          page,
          pageSize,
          sort: query.sort !== "default" ? query.sort : undefined,
        },
      });

      const backendItems = res.data.items || [];
      const backendTotal = res.data.meta?.total || 0;

      // If backend returns an empty array → fallback to local data
      if (backendItems.length === 0) {
        console.warn("No backend properties → using fallback data.");

        const sortedLocal = sortData([...localProperties]);
        const pagedLocal = sortedLocal.slice((page - 1) * pageSize, page * pageSize);

        setItems(pagedLocal);
        setTotal(sortedLocal.length);
        return;
      }

      setItems(backendItems);
      setTotal(backendTotal);

    } catch (error) {
      console.error("API error → switching to local fallback:", error);

      setErrorMsg("Unable to reach server. Showing offline properties.");

      // Fallback offline properties
      const sortedLocal = sortData([...localProperties]);
      const pagedLocal = sortedLocal.slice((page - 1) * pageSize, page * pageSize);

      setItems(pagedLocal);
      setTotal(sortedLocal.length);

    } finally {
      setLoading(false);
    }
  };

  // Sorting function
  const sortData = (data) => {
    if (query.sort === "price-desc") return data.sort((a, b) => b.price - a.price);
    if (query.sort === "price-asc") return data.sort((a, b) => a.price - b.price);
    return data; 
  };

  
  useEffect(() => {
    fetchProperties();
  }, [page, query]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="properties-page">

      <Header />

      {/* HERO SEARCH UI */}
      <Hero query={query} setQuery={setQuery} />

      <main className="properties-container">

        {/* ERROR MESSAGE */}
        {errorMsg && <div className="properties-error">{errorMsg}</div>}

        {/* TOPBAR */}
        <div className="properties-topbar">
          <button className="filter-btn">More Filter</button>

          <span className="topbar-results">
            Showing {Math.min(page * pageSize, total)} of {total} results
          </span>

          {/* SORT BOX */}
          <div className="sort-box">
            <label>Sort by:&nbsp;</label>
            <select
              value={query.sort}
              onChange={(e) => {
                setQuery({ ...query, sort: e.target.value });
                setPage(1);
              }}
            >
              <option value="default">Default</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="price-asc">Price: Low → High</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading && <div className="properties-loading">Loading properties…</div>}

        {/* PROPERTY GRID */}
        {!loading && (
          <section className="properties-grid">
            {items.length === 0 ? (
              <p className="no-results">No properties available.</p>
            ) : (
              items.map((p) => (
                <PropertyCard key={p._id || p.id} data={p} />
              ))
            )}
          </section>
        )}

        {/* PAGINATION */}
        <Pagination page={page} pages={pages} onChange={setPage} />

        {/* POPULAR PROPERTIES */}
        <PopularProperties items={localProperties.slice(0, 6)} />

      </main>

      <Footer />

    </div>
  );
}
