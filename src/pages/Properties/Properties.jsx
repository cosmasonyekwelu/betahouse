import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Pagination from "../../components/Pagination/Pagination";
import PopularProperties from "../../components/PopularProperties/PopularProperties";
import Footer from "../../components/Footer/Footer";

import API from "../../api/axios";
import "./Properties.css";

export default function Properties() {
  const [query, setQuery] = useState({ sort: "default" });
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
      const useSearch =
        query.location || query.type || query.bedrooms
          ? "/search"
          : "/properties";

      const response = await API.get(useSearch, {
        params: {
          ...query,
          page,
          pageSize,
          sort: query.sort !== "default" ? query.sort : undefined,
        },
      });

      setItems(response.data.items || []);
      setTotal(response.data.meta?.total || 0);
    } catch (err) {
      setErrorMsg("Unable to load properties.");
      setItems([]);
      setTotal(0);
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

      <Hero query={query} setQuery={setQuery} setPage={setPage} />

      <main className="properties-container">
        {errorMsg && <div className="properties-error">{errorMsg}</div>}

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
              <p className="no-results">No properties found.</p>
            ) : (
              items.map((p) => <PropertyCard key={p._id} data={p} />)
            )}
          </section>
        )}

        <Pagination page={page} pages={pages} onChange={setPage} />

        <PopularProperties items={[]} />
      </main>

      <Footer />
    </div>
  );
}
