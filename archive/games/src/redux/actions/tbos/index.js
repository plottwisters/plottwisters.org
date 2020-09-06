import { ActionCreators as UndoActionCreators } from 'redux-undo';
export * from './root';
export * from './task';

export let {redo, undo, jumpToFuture, jumpToPast} = UndoActionCreators;
