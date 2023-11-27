import React, { useState, useEffect } from "react";
import SingleSermon from "./SingleSermon";
import Banner from "./Banner";

export default function Sermons() {
  // Setting the state for fetching data and for the pagination since there are over 2000 items
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Empty dependancy array on the useEffect so it only renders once
  // I removed the fetch for the audio due to CORS block, and I couldn't get a proxy to work
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://arthurfrost.qflo.co.za/php/getTimeline.php"
        );
        if (response.ok) {
          const { Timeline } = await response.json();
          setData(Timeline);

          console.log(data);
        } else {
          console.log("Error fetching sermons");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // conditional to check if data exists before applying slice and filter + removing and returning
  // first object in array since its properties seem more like a welcome message/banner
  const itemsPerPage = 10;
  const itemWithId1 = data && data.find((item) => item.Id === 1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data
        .slice(indexOfFirstItem, indexOfLastItem)
        .filter((item) => item.Id !== 1)
    : [];
  const totalPages = Math.ceil(data && data.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      {itemWithId1 && <Banner key={itemWithId1.Id} bannerData={itemWithId1} />}
      <div className="sermons">
        {currentItems &&
          currentItems.map((sermon) => (
            <SingleSermon key={sermon.Id} sermonData={sermon} />
          ))}
      </div>
      <div className="pagination-buttons">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <div>
          <select
            onChange={(e) => paginate(Number(e.target.value))}
            value={currentPage}
          >
            {getPageNumbers().map((pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                {pageNumber}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </>
  );
}
