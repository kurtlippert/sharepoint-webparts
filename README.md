# SharePoint Table Demo
`yarn run api` to run the api  
`yarn start` to start the app  

## Features
- TS / React DOM Factories
  - See [another project of mine](https://github.com/kurtlippert/html-to-react-hs#motivation) for more info on this
- Webpack written in TS
- Redux  

## Thought Process...
- Reusable **Pager** view function (src/Pager/View.ts)
- **Container** function to tie the store state with pager view function.  
- **TicketQueue** is like the parent view function that includes the ajax table and **Pager**  

The idea was supposed to be a reusable view function that just needed some container function (src/Pager/index.ts) to tie in with the state store. This view function is consumed by **TicketQueue** to display the pager component and react to changes from there, as well as display and update the table component.  

This **TicketQueue** function can be nested within yet another function that updates and displays other things.  

The **Pager** can be independent from **TicketQueue** and the **TicketQueue** from anything else.
