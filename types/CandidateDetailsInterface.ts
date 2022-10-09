import {ReactNode} from 'react'

export type CandidateDetails = {
    id: string
    name: string
    email: string
    birth_date: string
    year_of_experience: number
    position_applied: string
    application_date: string
    status: string
}
export enum TColumnCode {
    NAME = 'name',
    EMAIL = 'email',
    BIRTH_DATE = 'birth_date',
    YEAR_OF_EXPERIENCE = 'year_of_experience',
    POSITION_APPLIED = 'position_applied',
    APPLICATION_DATE = 'application_date',
    STATUS = 'status',
}

export type IEachCdColumnDetails<T> = {
    code: string
    cellKey: string
    type: string
    label: string
    isSortable: boolean
    isShowing: boolean
    isFilterable: boolean
    widthRatio: number
    getDisplayValue: (dataObj: T) => ReactNode
}

export type IEachCDColumnItem = {
    [key in TColumnCode]: IEachCdColumnDetails<CandidateDetails>
}