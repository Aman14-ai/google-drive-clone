'use server'

import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "../appwrite/config";
import { createAdminClient, createSessionClient } from "../appwrite/index";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const handleError = (error: unknown, msg: string) => {
    console.log(msg);
    console.log(error)
}

const getUserByEmail = async (email: string | null) => {
    try {
        if (!email) {
            return null;
        }
        const { databases } = await createAdminClient();

        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('email', email)] // Proper array of Query objects
        );

        if (user && user.documents.length > 0) {
            return user.documents[0];
        }
        return null;

    }
    catch (error) {
        handleError(error, "Error in lib/actions/user.action.ts in getUserByEmail function in catch block");
    }
}

export const sendEmailOTP = async({email}:{email:string}) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique() , email);
        if(session) return session.userId;
        return null;
    } 
    catch (error) {
        handleError(error, "Error in lib/actions/user.action.ts in sendEmailOTP function in catch block");
    }
}

export const createAccount = async ({ fullName, email }: { fullName: string; email: string }) => {

    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({email});
    console.log("Account ID from sendEmailOTP in backend: ", accountId);

    if(!accountId)
    {
        handleError(new Error("Failed to create user"), "Error in lib/actions/user.action.ts in createAccount function in catch block");
        throw new Error("Failed to send otp.");
    }

    if(!existingUser){
        try {
            const { databases } = await createAdminClient();
            await databases.createDocument(appwriteConfig.databaseId , appwriteConfig.usersCollectionId , ID.unique() , {
                fullName,
                email,
                accountId,
                avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
            })    ;
            return parseStringify({accountId});
        } 
        catch (error) {
            handleError(error , "Error in lib/actions/user.action.ts in createAccount function in catch block while creating user.");
        }
    }
}

export const verifySecret = async({accountId , password}: {accountId:string , password:string}) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(accountId , password);
        if(session) {
            (await cookies()).set('appwrite-session' , session.secret, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
            })  
            return parseStringify({sessionId: session.$id, })
        }
        console.log("Session not created");
        handleError(new Error("Session not created"), "Error in lib/actions/user.action.ts in verifySecret function in if block");
        return null;
    } 
    catch (error) {
        handleError(error, "Error in lib/actions/user.action.ts in verifySecret function in catch block");
        throw new Error("Failed to verify secret.");
    }
}

export const getCurrentUser = async() => {
    try 
    {
        const {databases , account} = await createSessionClient();  
        const results = await account.get();  
        const user = await databases.listDocuments(appwriteConfig.databaseId ,appwriteConfig.usersCollectionId , [Query.equal('accountId' , results.$id)]);
        //console.log("User from getCurrentUser: ", user);
        if(user.total <= 0) return null;
        return parseStringify(user.documents[0]);

    } 
    catch (error) {
        handleError(error, "Error in lib/actions/user.action.ts in getCurrentUser function in catch block");
        console.log(error);
    }
}