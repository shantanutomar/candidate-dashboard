import React, { useEffect } from "react";
import CandidatesGrid from "../CandidatesGrid/CandidatesGrid";
import {filterCandidates, sortCandidates, useQueryStringState} from "../utils";
import './Dashboard.css'
import Loader from "../Loader/Loader";
import Error from "../Error/Error"
import {CandidateDetails, TColumnCode} from "../../types/CandidateDetailsInterface";

/* The Dashboard component responsible for managing the state and rendering the candidates list */
const Dashboard: React.FC = () => {
  const [candidatesDetails, setCandidatesDetails] = React.useState<CandidateDetails[]>([]);
  const [origCandidatesDetails, setOrigCandidatesDetails] =
      React.useState<CandidateDetails[]>([]);
  /* FUTURE IMPROVEMENTS: The API fetching states can be moved to a custom hook with params like
  * API to call and it will return loading and error states. Will be helpful in case of multiple API calls
  * in a project */
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = useQueryStringState("sortBy", "name");
  const [sortDirection, setSortDirection] = useQueryStringState(
      "sortDirection",
      "asc"
  );
  const [filterBy, setFilterBy] = useQueryStringState("filterBy", {} as string | {[key in TColumnCode]: any});

  const fetchCandidateDetails = async () => {
    setLoading(true);
    const apiResponse = await fetch(
        "https://personio-fe-test.herokuapp.com/api/v1/candidates"
    ).then(response => response.json());

    apiResponse.error && setError(true);
    if (apiResponse.data) {
      console.log(apiResponse.data[0])
      setCandidatesDetails(apiResponse.data);
      setOrigCandidatesDetails(apiResponse.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidateDetails();
  }, []);

  useEffect(() => {
    if(!loading) {
      let filteredData: CandidateDetails[] = []
      let sortedData: CandidateDetails[] = []
      if(Object.keys(filterBy).length > 0) {
        filteredData = filterCandidates([...origCandidatesDetails], filterBy);
        sortedData = sortCandidates([...filteredData], sortBy, sortDirection);
      } else {
        sortedData = sortCandidates([...origCandidatesDetails], sortBy, sortDirection)
      }
      setCandidatesDetails([...sortedData])
    }
  }, [filterBy, loading]);

  useEffect(() => {
    if (sortBy !== "" && candidatesDetails.length > 0) {
      const sortedData: CandidateDetails[] = sortCandidates([...candidatesDetails], sortBy, sortDirection);
      setCandidatesDetails([...sortedData]);
    }
  }, [sortBy, sortDirection]);


  const changeSortDirection = () => {
    if(sortDirection === 'asc') {
      setSortDirection('dsc')
    } else {
      setSortDirection('asc')
    }
  }

  return (
      <section>
        {!loading && !error && (
            <>
              <CandidatesGrid
                  candidatesDetails={candidatesDetails}
                  setSortBy={setSortBy}
                  setSortDirection={changeSortDirection}
                  setFilterBy={setFilterBy}
                  filterBy={filterBy}
                  loading={loading}
                  error={error}
              />
            </>
        )}
        {loading ? <Loader/> : null}
        {error ? <Error /> : null}
      </section>
  );
};

export default Dashboard;
