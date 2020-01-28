import { Action } from '@ngrx/store';

export enum ECartActions {
    GetItems = '[Items] Get Items',
    GetItemsSuccess = '[Items] Get Items Success',
    DeleteItem = '[Items] Delete Item',
    AddItem = '[Items] Add Item'
  }
  
  export class GetItems implements Action {
    public readonly type = ECartActions.GetItems;
  }
  
  export class GetItemsSuccess implements Action {
    public readonly type = ECartActions.GetItemsSuccess;
    constructor(public payload: any []) {}
  }

  export class DeleteItem implements Action {
    public readonly type = ECartActions.DeleteItem;
    constructor(public payload: number) {}
  }

  export class AddItem implements Action {
    public readonly type = ECartActions.AddItem;
    constructor(public payload: any) {}
  }

  export type CartActions = GetItems | GetItemsSuccess | DeleteItem | AddItem;