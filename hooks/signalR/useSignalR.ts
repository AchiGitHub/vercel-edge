import { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const clockId= "clock-test1";

export const createHubConnection = (accessToken: string): HubConnection => {
    const signalRUrl = "https://clockhub-testing.azurewebsites.net/clockHub";
    return new HubConnectionBuilder().withUrl(signalRUrl, {
        accessTokenFactory: () => accessToken,
        logMessageContent: true,
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Credentials": '*'
        }
    }).build();
}

async function startConnection(connection: HubConnection) {
    try {
        await connection.start();
        connection.invoke("AddToGroup", clockId);
    } catch (error) {
    }
}

type InputParams = { accessToken: string, updateTime: any };

export const useSignalR = function ({ accessToken, updateTime }: InputParams) {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    useEffect(() => {
        const connection = createHubConnection(accessToken);
        startConnection(connection);
        setConnection(connection);

        return () => {
            connection.stop()
        }

    }, [accessToken]);

    useEffect(() => {
        if (connection) {
            connection.on('UpdateTime', updateTime);
        }
    }, [connection])
    

}

