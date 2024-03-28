import React, { useContext } from "react";
import { Profile } from "../../components/Profile";
import Header from "../../components/header";
import { MovieContext } from "../../contexts/MovieContext";
import PageLoading from "../../components/pageLoading";
export default function Person() {
    const { isLoading } = useContext(MovieContext); 
    
    return isLoading ? <PageLoading /> : (
        <div data-testid="person-component">
            <Header />
            <Profile />
        </div>
    )
}

