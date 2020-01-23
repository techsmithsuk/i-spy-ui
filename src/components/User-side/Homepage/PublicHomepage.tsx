import React, { useState, useEffect, useContext } from 'react';
import { SuspectCard } from '../../general/SuspectCard';
import './PublicHomepage.scss';
import { Link } from "react-router-dom";
import {asyncJSONFetch, asyncAdminJSONFetch} from '../../general/helpers/asyncJSONFetcher';
import { Suspect } from '../../general/helpers/SuspectInterfaces';
import { AuthContext } from '../../AuthContext';

enum FetchStatus {
    FETCHING,
    COMPLETE,
    ERROR,
}

interface LoadingComponentProps {
    fetchData: () => Promise<any>
    onFetchComplete: (data: any) => void,
    subscribesTo?: any[],
    children: JSX.Element
}

function LoadingComponent(props: LoadingComponentProps): JSX.Element {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.FETCHING);

    useEffect(() => {
        setFetchStatus(FetchStatus.FETCHING);
        props.fetchData()
            .then(data => props.onFetchComplete(data))
            .then(() => console.log("fetch got completed"))
            .then(() => setFetchStatus(FetchStatus.COMPLETE))
            .catch(() => setFetchStatus(FetchStatus.ERROR))

    }, props.subscribesTo || [])

    switch (fetchStatus) {
        case FetchStatus.FETCHING:
            return <div>Fetching data...</div>;
        case FetchStatus.ERROR:
            return <div>Oh No!!! There was an error</div>;
        case FetchStatus.COMPLETE:
            return props.children;
    }
}

function Title() {
    return <h1>FBI Most Wanted</h1>
}

interface SuspectListProps {
    suspects: Suspect[]
}

function SuspectList(props: SuspectListProps) {
    return (
        <ol className="suspectCardList"> 
            {props.suspects.map(suspect => 
                <Link to={`/profile/${suspect.id}`} className ="suspectCardIndiv" data-testid = "SuspectCard">
                    <SuspectCard name = {suspect.title} image = {suspect.imageUrl}/>
                </Link>)}
        </ol>
    );
}

interface HomePageProps {
    subscribesTo?: any[],
}

interface JsonSuspectResponse{
    items : Suspect[],
    totalNumberOfItems: number,
    previousPage: string | null,
    nextPage: string | null
}

export function HomePage(props: HomePageProps) {
    const [url, setUrl] = useState<string>(`${process.env.REACT_APP_API_URL}/suspects?page=1`);
    let initialObject :JsonSuspectResponse = {
        items : [],
        totalNumberOfItems: 0,
        previousPage: null,
        nextPage: null
    }
    const [suspects, setSuspects] = useState<JsonSuspectResponse>(initialObject);
    
    function getButtonClassName(button :string) :string{
        if(button === "previous" && suspects.previousPage !== null){
            return "indivPageButton"
        }
        if(button === "next" && suspects.nextPage !== null){
            return "indivPageButton"
        }
        return "buttonInvisible"
    }

    return (
        <LoadingComponent fetchData={() => asyncJSONFetch(url)} onFetchComplete={setSuspects} subscribesTo={[props.subscribesTo,url]}>
            <div className="homepage">
                <Title></Title>
                <SuspectList suspects={suspects.items}/>
                <div className = "pageButtons">
                    <button className = {getButtonClassName("previous")} onClick={() => setUrl(`${process.env.REACT_APP_API_URL}${suspects.previousPage}`)}>PREVIOUS</button>
                    <button className = {getButtonClassName("next")} onClick={() => setUrl(`${process.env.REACT_APP_API_URL}${suspects.nextPage}`)}>NEXT</button>
                </div>
            </div>
        </LoadingComponent>
    );
}

enum UpdateListState {
    NO_UPDATE_REQUIRED,
    UPDATE_REQUIRED,
}

export function AdminHomePage() {
    const context = useContext(AuthContext);
    const updateListUrl = `${process.env.REACT_APP_API_URL}/admin/fetch-fbi-data`
    const [updateListState, setUpdateListState] = useState<UpdateListState>(UpdateListState.NO_UPDATE_REQUIRED);

    function handleUpdateList() {
        setUpdateListState(UpdateListState.NO_UPDATE_REQUIRED)
        asyncAdminJSONFetch(updateListUrl, context.token)
            .then(() => setUpdateListState(UpdateListState.UPDATE_REQUIRED));  
    }
    
    return (
        <div className="homepage">
            <HomePage subscribesTo={[updateListState]}/>
            <div className="buttons">
                <button className="indivButton" onClick={handleUpdateList}>UPDATE LIST</button>
                <Link className="indivButton" to="/new_suspect_profile">ADD NEW PROFILE</Link>
            </div>
        </div>
    );
}