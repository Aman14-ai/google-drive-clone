'use server'
// we will use node sdk
import { Account, Avatars, Client, Databases, Storage } from 'node-appwrite'
import { appwriteConfig } from '@/lib/appwrite/config';
import { cookies } from 'next/headers';
// create client

export const createSessionClient = async () => {
    try {
        const client = new Client();
        client
            .setEndpoint(appwriteConfig.endpointUrl)
            .setProject(appwriteConfig.projectId);

        const session = (await cookies()).get('appwrite-session');
        if (!session || !session.value) {
            throw new Error("No session found from try block");
        }
        client.setSession(session.value);

        return {
            get account() {
                return new Account(client);
            },
            get databases() {
                return new Databases(client);
            }
        }
    }
    catch (error) {
        console.log("Error coming from file lib/appwrite/index.ts in  catch block while creating session client: ", error);
        throw new Error("Failed to create appwrite client.");
    }

}

// creating admin client

export const createAdminClient = async () => {
    try {
        const client = new Client();
        client
            .setEndpoint(appwriteConfig.endpointUrl)
            .setProject(appwriteConfig.projectId)
            .setKey(appwriteConfig.secretId);
        
        
        return {
            get account() {
                return new Account(client);
            },
            get databases() {
                return new Databases(client);
            },
            get storage(){
                return new Storage(client);
            },
            get avatars() {
                return new Avatars(client);
            }
        }
        
        
    } 
    catch (error) {
        console.log("Error coming from file lib/appwrite/index.ts in  catch block while creating admin client: ", error);
        throw new Error("Failed to create appwrite client.");
    }
}
