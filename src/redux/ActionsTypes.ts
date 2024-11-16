export const ADD_FAVORITES_ACTION = 'ADD_FAVORITES_ACTION';
export const REMOVE_FAVORITES_ACTION = 'REMOVE_FAVORITES_ACTION';
export const FILTER_FAVORITES_ACTION = 'FILTER_FAVORITES_ACTION';
export const ORDER_FAVORITES_ACTION = 'ORDER_FAVORITES_ACTION';
export const RESET_ACTION = 'RESET_ACTION';

export interface Action {
    type: string;
    payload?: any;
    [key: string]: any;
  }
