import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router/router";

const AppRouter = () => {
    const isAuth = false;
    return (
        isAuth
        ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
            </Routes>
        :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
            </Routes>
    );
};

export default AppRouter;