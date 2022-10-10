import {capitalizeFirstLetter, getAge} from "./utils";
import {IEachCDColumnItem} from "../types/CandidateDetailsInterface";

/* The main configuration file for different fields that needs to be displayed in dashboard.
* Using this configuration the dashboard can be customized to a great extent. */

/* FUTURE IMPROVEMENTS: We can have more properties that can be leveraged in the application.
* isShowing is not currently used and can be used in future to hide the fields altogether
* Logic in getDisplayValue can be enhanced to show the display value as per requirement */
export function getAllColumnsConfig(): IEachCDColumnItem {
    return {
        name: {
            code: 'name',
            cellKey: 'name',
            type: 'text',
            label: 'Name',
            isSortable: false,
            isShowing: true,
            isFilterable: true,
            widthRatio: 2,
            getDisplayValue: (dataObject) => {
                return dataObject.name || ''
            },
        },
        email: {
            code: 'email',
            cellKey: 'email',
            type: 'text',
            label: 'Email',
            isSortable: false,
            isShowing: true,
            isFilterable: false,
            widthRatio: 2,
            getDisplayValue: (dataObject) => {
                return dataObject.email || ''
            },
        },
        birth_date: {
            code: 'birth_date',
            cellKey: 'birth_date',
            type: 'text',
            label: 'Age',
            isSortable: false,
            isShowing: true,
            isFilterable: false,
            widthRatio: 1,
            getDisplayValue: (dataObject) => {
                return getAge(dataObject.birth_date) || ''
            },
        },
        year_of_experience: {
            code: 'year_of_experience',
            cellKey: 'year_of_experience',
            type: 'number',
            label: 'Years of experience',
            isSortable: true,
            isShowing: true,
            isFilterable: false,
            widthRatio: 1,
            getDisplayValue: (dataObject) => {
                return dataObject.year_of_experience || ''
            },
        },
        position_applied: {
            code: 'position_applied',
            cellKey: 'position_applied',
            type: 'text',
            label: 'Position applied',
            isSortable: true,
            isShowing: true,
            isFilterable: true,
            widthRatio: 1,
            getDisplayValue: (dataObject) => {
                return dataObject.position_applied || ''
            },
        },
        application_date: {
            code: 'application_date',
            cellKey: 'application_date',
            type: 'text',
            label: 'Date of application',
            isSortable: true,
            isShowing: true,
            isFilterable: false,
            widthRatio: 1,
            getDisplayValue: (dataObject) => {
                return new Date(dataObject.application_date).toLocaleDateString("en-GB") || ''
            },
        },
        status: {
            code: 'status',
            cellKey: 'status',
            type: 'text',
            label: 'Status of application',
            isSortable: false,
            isShowing: true,
            isFilterable: true,
            widthRatio: 1,
            getDisplayValue: (dataObject) => {
                return capitalizeFirstLetter(dataObject.status) || ''
            },
        },
    }
}
