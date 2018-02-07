import * as react from 'react';
import { TicketInfo } from './Model';

const { ul, li, div } = react.DOM;

const ticketGrid = (Tickets: TicketInfo[]) =>
  Tickets.length === 0 ? 'No Tickets Returned' :
  Tickets.map((ticketInfo: TicketInfo) =>
    ul({ key: ticketInfo.Id },
      li({},
        div({ className: 'ms-font-l' }, `Title: ${ticketInfo.Title}`),
        div({ className: 'ms-font-l' }, `Status: ${ticketInfo.Status}`),
        div({ className: 'ms-font-l' }, `Time Open: ${ticketInfo.Time_Open}`),
        div({ className: 'ms-font-l' }, `Category: ${ticketInfo.Category}`),
        div({ className: 'ms-font-l' }, `Assigned To: ${ticketInfo.Assigned_To}`),
        div({ className: 'ms-font-l' }, `CC'd: ${ticketInfo.CC_List}`),
      ),
    ),
  );

export default ticketGrid;
