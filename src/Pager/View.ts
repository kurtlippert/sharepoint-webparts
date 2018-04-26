
// tslint:disable:no-object-literal-type-assertion no-submodule-imports

// react
import * as React from 'react'
const r = React.createElement
import { div } from 'react-dom-factories'

// redux
import { Dispatch } from 'redux'

// libs
import { DefaultButton, IIconProps } from 'office-ui-fabric-react'
import { IconNames, initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { style } from 'typestyle'
import {
  getPaginationModel,
  ITEM_KEYS,
  ITEM_TYPES,
  PaginationModelItem,
  PaginationModelOptions,
} from 'ultimate-pagination'

// actions
import {
  firstEllipsis,
  firstPage,
  lastPage,
  nextPage,
  previousPage,
  secondEllipsis,
  selectedPage,
} from './Actions'

initializeIcons()

const flexContainer = style({
  display: 'flex',
})

const flexItem = style({
  flex: '1 1 auto',
  minWidth: '1px',
  padding: '0 5px 0 5px',
})

export const paginationModelItemToPage =
  (paginationModelItem: PaginationModelItem,
   dispatch: Dispatch<PaginationModelOptions>) => {
  switch (paginationModelItem.type) {
    case ITEM_TYPES.FIRST_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.DoubleChevronLeft } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(firstPage()),
        })
      )
    case ITEM_TYPES.PREVIOUS_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.ChevronLeft } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(previousPage()),
        })
      )
    case ITEM_TYPES.NEXT_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.ChevronRight } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(nextPage()),
        })
      )
    case ITEM_TYPES.LAST_PAGE_LINK:
      return (
        r(DefaultButton, {
          className: flexItem,
          iconProps: { iconName: IconNames.DoubleChevronRight } as IIconProps,
          key: paginationModelItem.key,
          onClick: () => dispatch(lastPage()),
        })
      )
    case ITEM_TYPES.PAGE:
      return (
        r(DefaultButton, {
          checked: paginationModelItem.isActive,
          className: `${flexItem} ${style({
            $nest: {
              '&:hover': {
                $nest: {
                  '&:active': {
                    backgroundColor: 'rgb(200, 200, 200)',
                  },
                },
                backgroundColor: paginationModelItem.isActive
                  ? 'rgb(200, 200, 200)'
                  : 'rgb(234, 234, 234)',
              },
            },
          })}`,
          key: paginationModelItem.key,
          onClick: () => dispatch(selectedPage(paginationModelItem.value)),
        }, paginationModelItem.value)
      )
    case ITEM_TYPES.ELLIPSIS:
      return paginationModelItem.key === ITEM_KEYS.FIRST_ELLIPSIS
        ? r(DefaultButton, {
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatch(firstEllipsis()),
        }, '...')
        : r(DefaultButton, {
          className: flexItem,
          key: paginationModelItem.key,
          onClick: () => dispatch(secondEllipsis()),
        }, '...')
    default:
      return r(DefaultButton, { className: flexItem, key: paginationModelItem.key }, 'N/A')
  }
}

export interface PagerProps {
  paginationModelOptions: PaginationModelOptions
  dispatch: Dispatch<PaginationModelOptions>
}

export const Pager: React.SFC<PagerProps> = ({ paginationModelOptions, dispatch }) => {
  return div({ className: flexContainer },
    paginationModelOptions.totalPages > 1
      ? getPaginationModel(paginationModelOptions).map((paginationModelItem: PaginationModelItem) =>
          paginationModelItemToPage(paginationModelItem, dispatch))
      : '',
  )
}
