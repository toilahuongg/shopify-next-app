import { createContext } from "react";
import RootStore from "src/models";

const store = RootStore.create();
const RootContext = createContext(store);
export default RootContext;