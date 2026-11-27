import { API_URL } from '../config/env';
import type { ApiErrorBody } from '../models/api.types';
import { clearSessionToken } from './session.service';
export class HttpError extends Error {
 readonly status:number;readonly code:string;readonly requestId?:string;
 constructor(status:number,code:string,message:string,requestId?:string) {
  super(message);this.name='HttpError';this.status=status;this.code=code;this.requestId=requestId;
 }
}
interface RequestOptions extends Omit<RequestInit,'body'> {body?:unknown}
export async function http<T>(path:string,token:string,options:RequestOptions={}):Promise<T> {
 let response:Response;
 try {response=await fetch(API_URL+path,{
   ...options,
   body:options.body===undefined?undefined:JSON.stringify(options.body),
   headers:{Accept:'application/json',...(options.body===undefined?{}:{'Content-Type':'application/json'}),
    ...(token?{Authorization:'Bearer '+token}:{}),...options.headers}
 });} catch(error) {
   if(error instanceof Error && error.name==='AbortError')throw error;
   throw new HttpError(0,'NETWORK_ERROR','No fue posible conectar con la API.');
 }
 if(response.status===204)return undefined as T;
 const payload:unknown=await response.json().catch(()=>null);
 if(!response.ok) {
   if(response.status===401&&token){clearSessionToken();window.dispatchEvent(new Event('task-auth-expired'));}
   const body=payload as Partial<ApiErrorBody>|null;
   throw new HttpError(response.status,body?.error?.code||'HTTP_ERROR',
    body?.error?.message||'Error HTTP '+response.status,body?.error?.requestId);
 }
 if(payload===null)throw new HttpError(response.status,'INVALID_JSON','Respuesta JSON inválida.');
 return payload as T;
}
