export interface ApiResponse<T> {
    statusCode: number,
    message: string,
    error: string | null,
    data: T,
    meta? :{
        page: number
        limit: number
        total: number
        totalPage: number
    }
}

export interface AuthUser {
    id: string,
    email: string,
    userName: string,
    fullName?: string,
    isActive: boolean,
}

export interface LoginPayload {
    email: string,
    password: string,
}

export interface RegisterPayload {
    email: string,
    fullName: string,
    username: string,
    password: string,
}

export type MeResponse = AuthUser