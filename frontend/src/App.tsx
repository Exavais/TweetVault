import {

    Routes,

    Route

} from "react-router-dom";


import Timeline from "./pages/Timeline";

import ArchiveDetail from "./pages/ArchiveDetail";



function App(){


    return (

        <Routes>


            <Route

                path="/"

                element={<Timeline/>}

            />


            <Route

                path="/archives/:id"

                element={<ArchiveDetail/>}

            />


        </Routes>

    );


}



export default App;