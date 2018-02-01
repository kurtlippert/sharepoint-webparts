// Machine info from kace API
export interface MachineInfo {
  Id: string;
  User: string;
  Name: string;
  Os_name: string;
}

export interface KaceInfo {
  Machines: MachineInfo[];
}

export const initialKaceInfo = {
  Machines: [],
};
