import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TreatmentApi } from './query/TreatmentQuery/TreatmentQuery';

// Функция, создающая экземпляр store
export const makeStore = () =>
  configureStore({
    reducer: { [TreatmentApi.reducerPath]: TreatmentApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(TreatmentApi.middleware),
  });

// Создаем экземпляр store
const store = makeStore();

// Инициализируем слушатели с помощью store.dispatch
setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
