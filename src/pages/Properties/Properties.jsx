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
  const [query, setQuery] = useState({ sort: "default" });
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 9;

  // SORTING UTILITY
  const sortData = (data) => {
    switch (query.sort) {
      case "price-desc":
        return data.sort((a, b) => b.price - a.price);
      case "price-asc":
        return data.sort((a, b) => a.price - b.price);
      default:
        return data;
    }
  };

  // API FETCH
  const fetchProperties = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await API.get("/properties", {
        params: {
          page,
          pageSize,
          sort: query.sort !== "default" ? query.sort : undefined,
        },
      });

      const backendItems = response.data.items || [];
      const backendTotal = response.data.meta?.total || 0;

      if (backendItems.length === 0) {
        console.warn("Backend returned 0 — Falling back to local data");

        const sortedLocal = sortData([...localProperties]);
        const pagedLocal = sortedLocal.slice((page - 1) * pageSize, page * pageSize);

        setItems(pagedLocal);
        setTotal(sortedLocal.length);
        return;
      }

      setItems(backendItems);
      setTotal(backendTotal);
    } catch (err) {
      console.error("API error — Using fallback data:", err);
      setErrorMsg("Unable to load properties. Showing offline results.");

      const sortedLocal = sortData([...localProperties]);
      const pagedLocal = sortedLocal.slice((page - 1) * pageSize, page * pageSize);

      setItems(pagedLocal);
      setTotal(sortedLocal.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page, query]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="properties-page">

      <Header />

      <Hero query={query} setQuery={setQuery} />

      <main className="properties-container">

        {errorMsg && <div className="properties-error">{errorMsg}</div>}

        {/* TOP BAR */}
        <div className="properties-topbar">
          <button className="filter-btn">More Filter</button>

          <span className="topbar-results">
            Showing {Math.min(page * pageSize, total)} of {total} results
          </span>

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

        {loading && <div className="properties-loading">Loading properties…</div>}

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

        <Pagination page={page} pages={pages} onChange={setPage} />

        <PopularProperties items={localProperties.slice(0, 6)} />
      </main>

      <Footer />
    </div>
  );
}
