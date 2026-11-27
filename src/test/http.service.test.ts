import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { http } from '../services/http.service';
import { getSessionToken, saveSessionToken } from '../services/session.service';
const fetchMock=vi.fn();
beforeEach(() => { fetchMock.mockReset(); vi.stubGlobal('fetch', fetchMock); });
afterEach(() => vi.unstubAllGlobals());
describe('HTTP', () => {
 it('envía Bearer y recupera JSON', async () => {
   fetchMock.mockResolvedValue({ok:true,status:200,json:async()=>({data:{title:'OK'}})});
   const result=await http<{data:{title:string}}>('/tasks','token-falso');
   expect(result.data.title).toBe('OK');
   const [url,options]=fetchMock.mock.calls[0] as [string, RequestInit];
   expect(url).toBe('/api/tasks');
   expect(new Headers(options.headers).get('Authorization')).toBe('Bearer token-falso');
 });
 it('admite 204 sin parsear JSON', async () => {
   const json=vi.fn(); fetchMock.mockResolvedValue({ok:true,status:204,json});
   await expect(http<void>('/tasks/id','token-falso',{method:'DELETE'})).resolves.toBeUndefined();
   expect(json).not.toHaveBeenCalled();
 });
 it('elimina token ante 401', async () => {
   saveSessionToken('token-falso');
   const eventSpy=vi.fn(); window.addEventListener('task-auth-expired',eventSpy);
   fetchMock.mockResolvedValue({ok:false,status:401,json:async()=>({error:{code:'TOKEN_INVALID',message:'Inválido'}})});
   try {
     await expect(http('/tasks','token-falso')).rejects.toMatchObject({status:401,code:'TOKEN_INVALID'});
     expect(getSessionToken()).toBeNull(); expect(eventSpy).toHaveBeenCalledOnce();
   } finally {window.removeEventListener('task-auth-expired',eventSpy);}
 });
});
