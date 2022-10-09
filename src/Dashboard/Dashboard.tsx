import React, { useEffect } from "react";
import { useQueryStringState} from "../utils";
import './Dashboard.css'
import {CandidateDetails, TColumnCode} from "../../types/CandidateDetailsInterface";

const Dashboard: React.FC = () => {
  const [candidatesDetails, setCandidatesDetails] = React.useState<CandidateDetails[]>([]);
  const [origCandidatesDetails, setOrigCandidatesDetails] =
    React.useState<CandidateDetails[]>([]);
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

  return (
    <section>
      {!loading && !error && (
          <>
            'Candidates Data'
          </>
      )}
      {loading ? 'Loading' : null}
      {error ? 'Error' : null}
    </section>
  );
};

export default Dashboard;
