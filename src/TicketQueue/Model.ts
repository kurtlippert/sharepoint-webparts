import { PaginationModelOptions } from 'ultimate-pagination'

export interface Ticket {
  Id: string
  Title: string
  Status: string
  Time_Open: string
  Category: string
  Assigned_To: string
  Submitter: string
  CC_List: string
}

export interface TicketQueue {
  Tickets: Ticket[]
  PagerOptions: PaginationModelOptions
  isSearchingTitles: boolean
  isFilteringStatus: boolean
  titleSearchText: string
  statusFilterText: string
  statusFilterOptions: string[]
}

export const initialTicketQueue: TicketQueue = {
  PagerOptions: {
    currentPage: 5,
    totalPages: 10,
  },
  Tickets: [],
  isFilteringStatus: false,
  isSearchingTitles: false,
  statusFilterOptions: [],
  statusFilterText: '',
  titleSearchText: '',
}
