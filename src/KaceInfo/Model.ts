export interface MachineInfo {
  Id: string;
  User: string;
  Name: string;
  Os_name: string;
}

export interface TicketInfo {
  Id: number;
  Title: string;
  Status: string;
  Time_Open: string;
  Category: string;
  Assigned_To: string;
  Submitter: string;
  CC_List: string;
}

export interface KaceInfo {
  Machines: MachineInfo[];
  Tickets: TicketInfo[];
}

export const initialKaceInfo = {
  Machines: [],
  Tickets: [],
};
