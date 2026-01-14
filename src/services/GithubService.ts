import axios from "axios";
import { RepositoryItem } from "../Interfaces/RepositoryItem";
import { UserInfo } from "../Interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_URL_API;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
return config;
}, (error) => {
    return Promise.reject(error);
});





export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get("/user/repos",{
            params:{
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
            }
        });
        type GitHubRepo = {
            name: string;
            description?: string | null;
            owner?: { avatar_url?: string; login?: string } | null;
            language?: string | null;
        };

        const repositories: RepositoryItem[]= response.data.map((repo: GitHubRepo) => ({

            name: repo.name,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner ? repo.owner.avatar_url || null : null,
            owner: repo.owner ? repo.owner.login || null : null,
            language: repo.language ? repo.language : null,

        }));
        return repositories;

    }    catch (error) {
            console.error("Hubo un error al obtener repositorios", error);
            return [];
        }
    }

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await githubApi.post("/user/repos",repo);
        console.log("Repositorio ingresado", response.data);
       } catch (error){
            console.error("Error al crear repositorio", error);
        }
    };


    export const getUserInfo = async () : Promise<UserInfo> => {
        try {
            const response = await githubApi.get("/user");
            return response.data as UserInfo;
                
        } catch (error) {   
            console.error("Error al obtener información del usuario", error);
            const userNotFound : UserInfo = {
                login: 'undefined',
                name: 'Usuario no encontrado',
                bio: 'No se pudo obtener la información del usuario.',
                avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_eN9ltaN4YL-7g4jrTdTXHsBUf_bWxQ_cSg&s',
        }
            return userNotFound;
    }
};


export const updateRepository = async (owner: string, repoName: string, data: { name?: string; description?: string | null }): Promise<boolean> => {
    try {
        const payload: Record<string, string | null> = {};
        if (data.name !== undefined) payload.name = data.name;
        if (data.description !== undefined) payload.description = data.description;

        const response = await githubApi.patch(`/repos/${owner}/${repoName}`, payload);
        console.log('Repositorio actualizado', response.data);
        return true;
    } catch (error) {
        console.error('Error al actualizar repositorio', error);
        return false;
    }
};

export const deleteRepository = async (owner: string, repoName: string): Promise<boolean> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
        console.log('Repositorio eliminado', `${owner}/${repoName}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar repositorio', error);
        return false;
    }
};