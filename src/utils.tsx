import { useState, useCallback } from "react";
import qs from "query-string";
import {CandidateDetails, TColumnCode} from "../types/CandidateDetailsInterface";

const setQueryParamsInUrl = (queryString: string) => {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryString}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

/* Utility function to get values from querystring */
const getValuesFromQueryString = (
    key: string,
    queryString = window.location.search
) => {
  const values: any = qs.parse(queryString);
  if (key === "filterBy" && values[key]) {
    const filterByValuesToArray = values[key]?.split(',');
    let keyValueMap: {[key: string]: string} = {}
    filterByValuesToArray.forEach((value: string): void => {
      keyValueMap[value.split('|')[0]] = value.split('|')[1]
    })
    return keyValueMap
  }
  return values[key];
};

/* Utility function to set values in URL query params */
const setValuesInQueryString = (
    key: string,
    value: string | {[key in TColumnCode]: any},
    queryString = window.location.search
) => {
  const values: any = qs.parse(queryString);
  let valueToSet: string | {[key in TColumnCode]: any} | undefined = value;
  if (key === "filterBy") {
    if(Object.keys(value).length === 0) {
      valueToSet = undefined
    } else {
      valueToSet = ""
      Object.keys(value).forEach((key) => {
        // @ts-ignore
        valueToSet += `${key}|${value[key]},`
      })
      valueToSet = valueToSet.slice(0, -1)
    }
    const newQsValue = qs.stringify({ ...values, [key]: valueToSet });
    setQueryParamsInUrl(`?${decodeURIComponent(newQsValue)}`);
  } else {
    const newQsValue = qs.stringify({ ...values, [key]: valueToSet });
    setQueryParamsInUrl(`?${newQsValue}`);
  }
};

/* Custom hook to manipulate the sorting and searching states */
export const useQueryStringState = (key: string, initialValue: string | {[key in TColumnCode]: any}) => {
  const [currentValue, setValue] = useState(
      getValuesFromQueryString(key) || initialValue
  );
  setValuesInQueryString(key, currentValue);
  const setNewValue = useCallback(
      (newValue: string | {[key in TColumnCode]: any}) => {
        setValue(newValue);
        setValuesInQueryString(key, newValue);
      },
      [key]
  );

  return [currentValue, setNewValue];
};

/* Utility function to search a set of data */
export const filterCandidates = (dataToFilter: CandidateDetails[], filterBy: {[key in TColumnCode]: any}) => {
  const filteredData: CandidateDetails[] = dataToFilter.filter((candidate) => {
    for (let key in filterBy) {
      // @ts-ignore
      if(!candidate[key] || !candidate[key].toLowerCase().includes(filterBy[key].toLowerCase())) {
        return false
      }
    }
    return true;
  });

  return [...filteredData]
};

/* Utility function to sort a set of data */
export const sortCandidates = (dataToSort: CandidateDetails[], sortBy: TColumnCode, sortDirection: string) => {
  dataToSort.sort((a, b) => {
    if (typeof a?.[sortBy] === "number") {
      if (sortDirection === "asc") {
        // @ts-ignore
        return a?.[sortBy] - b?.[sortBy];
      } else {
        // @ts-ignore
        return b?.[sortBy] - a?.[sortBy];
      }
    } else {
      if (sortDirection === "asc") {
        // @ts-ignore
        return a?.[sortBy]?.localeCompare(b?.[sortBy]);
      } else {
        // @ts-ignore
        return b?.[sortBy]?.localeCompare(a?.[sortBy]);
      }
    }

  });

  return [...dataToSort];
};

/* Utility function to get Age from a date string */
export const getAge = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/* Utility function to Capitalize first letter of a string */
export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}