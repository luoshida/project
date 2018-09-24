import { createStore,applyMiddleware } from 'redux';

//使store.dispatch()可以接受一个函数 的中间件
import ReduxThunk from 'redux-thunk';

//帮助调试数据传输的错误 的中间件
import { createLogger } from 'redux-logger';
import reducer from './reducer.js';

const middlewares = [ReduxThunk];
if (process.env.NODE_ENV === 'development') {
  const Logger = createLogger();
  middlewares.push(Logger);
}

const store = createStore(reducer,applyMiddleware(...middlewares));

export default store;