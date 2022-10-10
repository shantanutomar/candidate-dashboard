import React from "react";
import "./CandidatesGrid.css";
import {getAllColumnsConfig} from "../ColumnConfiguration";
import {CandidateDetails, IEachCDColumnItem} from "../../types/CandidateDetailsInterface";

type CandidatesGridProps = {
    candidatesDetails: CandidateDetails[];
    setSortBy: (column: string) => void;
    setSortDirection: () => void;
    setFilterBy: (filterBy: {}) => void;
    filterBy: {[key: string]: any};
    loading: boolean;
    error: boolean;
};

/* The grid component responsible for displaying the list of candidates   */
const CandidatesGrid: React.FC<CandidatesGridProps> = ({
                                                           candidatesDetails,
                                                           setSortBy,
                                                           setSortDirection,
                                                           setFilterBy,
                                                           filterBy, loading, error,
                                                       }) => {
    const columns: IEachCDColumnItem = getAllColumnsConfig()
    const onSortButtonClick = (sortBy: string, sortDirection: string) => {
        setSortBy(sortBy);
        setSortDirection();
    };

    const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const objectToUpdate: any = {
            ...filterBy,
            [event.target.name]: event.target.value,
        };

        if (event.target.value === "" && event.target.name) {
            delete objectToUpdate[event.target.name];
        }
        setFilterBy({ ...objectToUpdate })
    };

    /* FUTURE IMPROVEMENTS: Below 3 functional components filterHeader, tableBody and tableHeader
    can be moved to a separate file and more functionality can be introduced as per requirement */
    const filterHeader = () =>
        (
            <thead>
            <tr>
                {Object.values(columns).map((column) => {
                    if (column.isFilterable) {
                        return (
                            <th key={column.code} className={column.widthRatio === 2 ? 'large-column' : 'small-column'}>
                                <input className='search-input' placeholder={`Filter by ${column.label}`} type={column.type}
                                       onChange={onSearchInputChange} name={column.code} value={filterBy[column.code] || ''} autoComplete="off"></input>
                            </th>
                        )
                    } else {
                        return (<th className={column.widthRatio === 2 ? 'large-column' : 'small-column'} key={column.code}></th>)
                    }
                })}
            </tr>
            </thead>
        );

    const tableBody = React.useMemo(() =>
        candidatesDetails.map((candidatesDetail) => {
            return (
                <tr key={candidatesDetail.name}>
                    <td className={columns.name.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.name.getDisplayValue(candidatesDetail)}</td>
                    <td className={columns.email.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.email.getDisplayValue(candidatesDetail)}</td>
                    <td className={columns.birth_date.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.birth_date.getDisplayValue(candidatesDetail)}</td>
                    <td className={columns.year_of_experience.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.year_of_experience.getDisplayValue(candidatesDetail)}</td>
                    <td className={columns.position_applied.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.position_applied.getDisplayValue(candidatesDetail)}</td>
                    <td className={columns.application_date.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.application_date.getDisplayValue(candidatesDetail)}</td>
                    <td className={columns.status.widthRatio === 2 ? 'large-column' : 'small-column'}>{columns.status.getDisplayValue(candidatesDetail)}</td>
                </tr>
            );
        })
    , [candidatesDetails, columns])


    const tableHeader = () =>
        <thead>
        <tr className="table-heading">
            {Object.values(columns).map(column => {
                if(column.isSortable) {
                    return (
                        <th key={column.code} className={column.widthRatio === 2 ? 'large-column' : 'small-column'}>
                            <button className="sort-by" onClick={() => onSortButtonClick(column.code, "asc")}>
                                {column.label}
                            </button>
                        </th>
                    )
                } else {
                    return (<th className={column.widthRatio === 2 ? 'large-column' : 'small-column'} key={column.code}>{column.label}</th>)
                }
            })}
        </tr>
        </thead>

    return (
        <section className="grid-container">
            <div className='page-text text-align-left'>Applications</div>
            <table className='table-container'>
                {tableHeader()}
                {filterHeader()}
                {candidatesDetails.length > 0 && (
                    <tbody className='table-body'>{tableBody}</tbody>
                )}
            </table>
            {candidatesDetails.length === 0 && !loading && !error &&
                (<div className='page-text'>No records present. Please change search criteria.</div>)
            }
        </section>
    );
};

export default CandidatesGrid;
