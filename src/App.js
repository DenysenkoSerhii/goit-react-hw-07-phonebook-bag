import { Provider } from "react-redux";


import MyContacts from "./modules/MyContacts";

import store from "./redux/store";



function App() {
  return (
    <Provider store={store}>
        <MyContacts />
    </Provider>

  );
}

export default App;